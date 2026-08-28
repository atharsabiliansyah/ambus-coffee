import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  CheckCircle2,
  Clock,
  Coffee,
  PackageCheck,
  Truck,
  ArrowLeft,
  FileDown,
  Loader2
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackerView: React.FC = () => {
  const { activeOrderId, orders, updateOrderStatus, setActivePage, showToast } = useShop();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const currentOrder = orders.find((o) => o.id === activeOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="py-20 text-center min-h-[60vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="space-y-4">
          <Clock className="w-12 h-12 text-[#B3A090] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#2D2118]">Belum Ada Pesanan Aktif</h2>
          <button
            onClick={() => setActivePage('menu')}
            className="px-5 py-2.5 rounded-xl bg-[#433024] text-[#FFFDF8] font-bold text-xs hover:bg-[#302016] transition-colors cursor-pointer"
          >
            Pesan Kopi Sekarang
          </button>
        </div>
      </div>
    );
  }

  const steps: { key: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'pending_payment',
      label: 'Pembayaran Dikonfirmasi',
      desc: 'Sistem telah menerima pembayaran Anda.',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      key: 'preparing',
      label: 'Sedang Diracik Barista',
      desc: 'Biji kopi sedang digiling & diseduh presisi.',
      icon: <Coffee className="w-5 h-5" />
    },
    {
      key: 'ready',
      label: currentOrder.orderType === 'delivery' ? 'Dalam Pengantaran' : 'Siap Diambil',
      desc: currentOrder.orderType === 'delivery' ? 'Kurir sedang menuju alamat Anda.' : 'Silakan ambil di bar atau tunggu di meja.',
      icon: currentOrder.orderType === 'delivery' ? <Truck className="w-5 h-5" /> : <PackageCheck className="w-5 h-5" />
    },
    {
      key: 'completed',
      label: 'Pesanan Selesai',
      desc: 'Selamat menikmati seduhan kopi Ambus!',
      icon: <CheckCircle2 className="w-5 h-5" />
    }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending_payment':
        return 0;
      case 'preparing':
        return 1;
      case 'ready':
        return 2;
      case 'completed':
        return 3;
      default:
        return 1;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  const handleSimulateNextStep = () => {
    if (currentOrder.status === 'pending_payment') {
      updateOrderStatus(currentOrder.id, 'preparing');
    } else if (currentOrder.status === 'preparing') {
      updateOrderStatus(currentOrder.id, 'ready');
    } else if (currentOrder.status === 'ready') {
      updateOrderStatus(currentOrder.id, 'completed');
    }
  };


  const loadJsPdfLibrary = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).jspdf) {
        resolve((window as any).jspdf.jsPDF);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => {
        if ((window as any).jspdf) {
          resolve((window as any).jspdf.jsPDF);
        } else {
          reject(new Error('Gagal memuat modul PDF.'));
        }
      };
      script.onerror = () => reject(new Error('Gagal mengunduh modul PDF.'));
      document.head.appendChild(script);
    });
  };

  
  const handleDownloadRealPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const JsPDF = await loadJsPdfLibrary();

      
      const baseHeight = 135;
      const itemsHeight = currentOrder.items.length * 12;
      const totalPdfHeight = Math.max(160, baseHeight + itemsHeight);

      
      const doc = new JsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, totalPdfHeight]
      });

      doc.setFont('courier', 'normal');
      doc.setFont('courier', 'bold');
      doc.setFontSize(11);
      doc.text('AMBUS COFFEE & ROASTERY', 40, 10, { align: 'center' });

      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.text('Artisanal Specialty Coffee Bar', 40, 14, { align: 'center' });
      doc.text('Jl. Senopati Raya No. 42, Jakarta Selatan', 40, 17.5, { align: 'center' });
      doc.text('Telp / WA: +62 812-9988-7766', 40, 21, { align: 'center' });

      doc.text('------------------------------------------', 40, 24.5, { align: 'center' });

      
      let y = 28;
      doc.setFontSize(7.5);
      doc.text(`No. Struk : #${currentOrder.orderNumber}`, 6, y);
      doc.text(`${new Date().toLocaleDateString('id-ID')}`, 74, y, { align: 'right' });

      y += 4;
      doc.text(`Pelanggan : ${currentOrder.customerInfo.name}`, 6, y);
      doc.text(`${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`, 74, y, { align: 'right' });

      y += 4;
      const destinationLabel = currentOrder.orderType === 'dine_in'
        ? `Meja: ${currentOrder.customerInfo.tableNumber || 'Area Bar'}`
        : currentOrder.orderType === 'pickup'
        ? 'Pick-Up Counter'
        : 'Delivery Order';

      doc.text(`Layanan   : ${currentOrder.orderType.toUpperCase()} (${destinationLabel})`, 6, y);

      y += 4;
      doc.text(`Status    : ${currentOrder.paymentStatus === 'paid' ? 'LUNAS' : 'PENDING'}`, 6, y);
      doc.text(`[${currentOrder.paymentMethod.replace('_', ' ').toUpperCase()}]`, 74, y, { align: 'right' });

      y += 2.5;
      doc.text('------------------------------------------', 40, y, { align: 'center' });

      
      y += 4.5;
      currentOrder.items.forEach((item) => {
        doc.setFont('courier', 'bold');
        doc.text(`${item.quantity}x ${item.product.name}`, 6, y);
        doc.text(`Rp ${(item.itemPrice * item.quantity).toLocaleString('id-ID')}`, 74, y, { align: 'right' });

        doc.setFont('courier', 'normal');
        doc.setFontSize(6.5);
        if (item.selectedOptions.milkType) {
          y += 3;
          doc.text(`  + ${item.selectedOptions.milkType}`, 6, y);
        }
        if (item.selectedOptions.iceLevel) {
          y += 3;
          doc.text(`  + ${item.selectedOptions.iceLevel}`, 6, y);
        }
        if (item.specialInstructions) {
          y += 3;
          doc.text(`  * Note: "${item.specialInstructions}"`, 6, y);
        }
        doc.setFontSize(7.5);
        y += 4.5;
      });

      doc.text('------------------------------------------', 40, y, { align: 'center' });

      
      y += 4;
      doc.text('Subtotal', 6, y);
      doc.text(`Rp ${currentOrder.subtotal.toLocaleString('id-ID')}`, 74, y, { align: 'right' });

      if (currentOrder.discount > 0) {
        y += 4;
        doc.text('Diskon Promo', 6, y);
        doc.text(`-Rp ${currentOrder.discount.toLocaleString('id-ID')}`, 74, y, { align: 'right' });
      }

      y += 4;
      doc.text('Pajak (11% PPN)', 6, y);
      doc.text(`Rp ${currentOrder.tax.toLocaleString('id-ID')}`, 74, y, { align: 'right' });

      y += 4;
      doc.text('Biaya Layanan', 6, y);
      doc.text(`Rp ${currentOrder.serviceFee.toLocaleString('id-ID')}`, 74, y, { align: 'right' });

      if (currentOrder.deliveryFee && currentOrder.deliveryFee > 0) {
        y += 4;
        doc.text('Ongkos Kirim', 6, y);
        doc.text(`Rp ${currentOrder.deliveryFee.toLocaleString('id-ID')}`, 74, y, { align: 'right' });
      }

      y += 2.5;
      doc.text('==========================================', 40, y, { align: 'center' });

      y += 4.5;
      doc.setFont('courier', 'bold');
      doc.setFontSize(9);
      doc.text('TOTAL PEMBAYARAN', 6, y);
      doc.text(`Rp ${currentOrder.total.toLocaleString('id-ID')}`, 74, y, { align: 'right' });

      y += 2.5;
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.text('------------------------------------------', 40, y, { align: 'center' });

      // --- FOOTER ---
      y += 4.5;
      doc.setFont('courier', 'bold');
      doc.text('TERIMA KASIH ATAS KUNJUNGAN ANDA', 40, y, { align: 'center' });
      
      y += 3.5;
      doc.setFont('courier', 'normal');
      doc.setFontSize(6.5);
      doc.text('Selamat menikmati seduhan kopi spesial Ambus!', 40, y, { align: 'center' });
      y += 3;
      doc.text('WiFi: Ambus_Guest | Password: ambuscoffee', 40, y, { align: 'center' });
      y += 3;
      doc.text('*Simpan file struk ini sebagai bukti pembayaran sah', 40, y, { align: 'center' });

      
      doc.save(`Struk_Ambus_${currentOrder.orderNumber}.pdf`);
      showToast('Struk PDF berhasil diunduh ke perangkat Anda!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Gagal membuat file PDF. Coba kembali.', 'error');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div id="order-tracker-page" className="pt-24 sm:pt-28 pb-16 bg-[#FAF7F2] min-h-screen text-[#2D2118]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        
        
        <div className="flex items-center justify-between border-b border-[#EFE8DE] pb-4">
          <button
            onClick={() => setActivePage('menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#756457] hover:text-[#2D2118] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Menu</span>
          </button>
        </div>

        
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#EFE8DE] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-[#8C5E3C] font-semibold tracking-wider">
                Nomor Pesanan Anda
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2D2118] tracking-tight">
                #{currentOrder.orderNumber}
              </h2>
              <p className="text-xs text-[#756457] mt-1">
                Atas nama <span className="text-[#2D2118] font-semibold">{currentOrder.customerInfo.name}</span> • {currentOrder.orderType.toUpperCase()}
              </p>
            </div>

            <div className="text-left sm:text-right p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DACB]">
              <span className="text-[11px] text-[#756457] block font-medium">Estimasi Waktu Tunggu:</span>
              <span className="text-xl font-bold font-mono text-[#433024]">
                {currentOrder.estimatedMinutes || 8} Menit
              </span>
            </div>
          </div>

          
          <div className="pt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 relative">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                return (
                  <div
                    key={step.key}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#F4ECE1] border-[#8C5E3C] shadow-xs'
                        : isPassed
                        ? 'bg-[#FAF7F2] border-[#E5D7C5]'
                        : 'bg-[#FAF7F2] border-[#EFE8DE] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#433024] text-[#FFFDF8]'
                          : isPassed
                          ? 'bg-[#E5D7C5] text-[#7A5236]'
                          : 'bg-[#EFE8DE] text-[#B3A090]'
                      }`}>
                        {step.icon}
                      </div>
                      <span className="text-[10px] font-mono text-[#857161]">0{idx + 1}</span>
                    </div>

                    <h4 className="font-serif text-xs font-bold text-[#2D2118] line-clamp-1">
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-[#756457] mt-1 leading-snug">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-dashed border-[#E5D7C5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#756457]">
              <span className="text-[#433024] font-bold">Simulasi Live Status:</span> Uji pergerakan alur barista secara real-time.
            </div>
            <button
              id="btn-simulate-order-step"
              onClick={handleSimulateNextStep}
              className="px-4 py-2 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              <span>Majukan Status Barista →</span>
            </button>
          </div>
        </div>

        
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#EFE8DE] space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F2EAE0] pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                Detail Pesanan & Struk Digital
              </h3>
              <p className="text-xs text-[#756457]">Bukti transaksi resmi Ambus Coffee</p>
            </div>

            
            <button
              type="button"
              disabled={isGeneratingPdf}
              onClick={handleDownloadRealPDF}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#433024] to-[#2D2118] hover:from-[#36251B] hover:to-[#221610] text-xs text-[#FFFDF8] font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>Membuat PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-amber-300" />
                  <span>Unduh Struk</span>
                </>
              )}
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DACB] space-y-1">
              <span className="text-[#8C5E3C] font-mono text-[10px] uppercase block font-bold">
                {currentOrder.orderType === 'delivery' ? 'Tujuan & Kontak Pengiriman:' : 'Lokasi Penyajian:'}
              </span>
              <div className="font-semibold text-[#2D2118]">
                {currentOrder.orderType === 'dine_in' && (currentOrder.customerInfo.tableNumber || 'Meja Bar')}
                {currentOrder.orderType === 'pickup' && 'Pick-Up Counter (Kedai Senopati)'}
                {currentOrder.orderType === 'delivery' && (
                  <div>
                    <p>{currentOrder.customerInfo.deliveryAddress || 'Alamat Delivery'}</p>
                    <p className="text-[11px] text-[#8C5E3C] mt-0.5 font-normal">
                      Penerima: {currentOrder.customerInfo.name} ({currentOrder.customerInfo.phone})
                    </p>
                    {currentOrder.customerInfo.notes && (
                      <p className="text-[11px] text-[#756457] mt-0.5 italic">
                        Patokan Kurir: "{currentOrder.customerInfo.notes}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DACB] space-y-1">
              <span className="text-[#8C5E3C] font-mono text-[10px] uppercase block font-bold">
                Metode Pembayaran:
              </span>
              <div className="font-semibold text-[#2D2118] uppercase font-mono">
                {currentOrder.paymentMethod.replace('_', ' ')} • <span className="text-emerald-700">{currentOrder.paymentStatus === 'paid' ? 'Lunas' : 'Bayar di Kasir'}</span>
              </div>
            </div>
          </div>

          
          <div className="space-y-3 pt-2">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs pb-3 border-b border-[#F2EAE0]">
                <div>
                  <div className="font-semibold text-[#2D2118]">
                    {item.quantity}x {item.product.name}
                  </div>
                  {item.selectedOptions.milkType && (
                    <div className="text-[10px] text-[#8C5E3C]">{item.selectedOptions.milkType}</div>
                  )}
                  {item.selectedOptions.iceLevel && (
                    <div className="text-[10px] text-[#857161]">{item.selectedOptions.iceLevel}</div>
                  )}
                  {item.specialInstructions && (
                    <div className="text-[10px] italic text-[#857161]">"{item.specialInstructions}"</div>
                  )}
                </div>
                <span className="font-mono text-[#2D2118] font-bold">
                  Rp {(item.itemPrice * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          
          <div className="pt-2 space-y-1.5 text-xs text-[#756457]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-[#2D2118]">Rp {currentOrder.subtotal.toLocaleString('id-ID')}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Diskon Promo</span>
                <span className="font-mono">-Rp {currentOrder.discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Pajak (11% PPN)</span>
              <span className="font-mono text-[#2D2118]">Rp {currentOrder.tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Layanan</span>
              <span className="font-mono text-[#2D2118]">Rp {currentOrder.serviceFee.toLocaleString('id-ID')}</span>
            </div>
            {currentOrder.deliveryFee > 0 && (
              <div className="flex justify-between text-[#8C5E3C] font-semibold">
                <span>Ongkos Kirim</span>
                <span className="font-mono">Rp {currentOrder.deliveryFee.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="pt-3 border-t border-[#F2EAE0] flex justify-between text-sm sm:text-base font-bold text-[#2D2118]">
              <span>Total Pembayaran:</span>
              <span className="font-mono text-[#8C5E3C] text-lg font-bold">
                Rp {currentOrder.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};