import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PaymentMethod, OrderType } from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  QrCode,
  CreditCard,
  Wallet,
  Building,
  Coins,
  ShieldCheck,
  Clock,
  MapPin,
  Utensils,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    orderType,
    setOrderType,
    customerInfo,
    setCustomerInfo,
    cartSubtotal,
    cartTax,
    cartServiceFee,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    createOrder,
    setActivePage,
    appliedPromo
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] text-center px-4">
        <div className="space-y-4 max-w-md">
          <ShoppingBag className="w-12 h-12 text-[#B3A090] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#2D2118]">
            Tidak Ada Item untuk Di-checkout
          </h2>
          <p className="text-xs text-[#857161]">
            Keranjang Anda kosong. Silakan tambahkan menu favorit terlebih dahulu.
          </p>
          <button
            onClick={() => setActivePage('menu')}
            className="px-6 py-3 rounded-xl bg-[#433024] text-[#FFFDF8] font-bold text-xs hover:bg-[#302016] transition-colors"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Trigger festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const order = createOrder(paymentMethod);
      setIsProcessing(false);
      setActivePage('order_tracking');
    }, 1200);
  };

  return (
    <div id="checkout-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen text-[#2D2118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between pt-2 border-b border-[#EFE8DE] pb-4">
          <button
            id="btn-back-to-menu"
            onClick={() => setActivePage('menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#756457] hover:text-[#2D2118] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Menu</span>
          </button>
          <div className="text-xs font-mono text-[#8C5E3C] font-semibold">
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Order Type & Location Details */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                  Tipe & Tujuan Pemesanan
                </h3>
              </div>

              {/* Order Type Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    orderType === 'dine_in'
                      ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>Dine-In</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pick-Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Delivery Instant</span>
                </button>
              </div>
            </div>

            {/* 2. Customer & Order Info */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                {orderType === 'delivery'
                  ? 'Data Pengiriman'
                  : orderType === 'dine_in'
                  ? 'Data Pemesan & Tempat Duduk'
                  : 'Data Pengambilan Pesanan'}
              </h3>

              {orderType === 'delivery' ? (
                /* Delivery Specific Fields */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#756457]">
                      Nama Penerima: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Hartanto"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#756457]">
                      Nomor WhatsApp Aktif: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0812-3456-7890 (Untuk dihubungi kurir)"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-[#756457]">
                      Alamat Lengkap Tujuan: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Contoh: Jl. Senopati No. 12, RT 02/05, Kebayoran Baru, Jakarta Selatan"
                      value={customerInfo.deliveryAddress}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-[#756457] flex items-center justify-between">
                      <span>Patokan Rumah:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Pagar hitam depan pos satpam, seberang minimarket, titip di resepsionis lobby timur..."
                      value={customerInfo.notes || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomerInfo((prev) => ({ ...prev, notes: val, email: val }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <p className="text-[11px] text-[#857161]">
                      Kurir akan membaca patokan ini saat mencari alamat atau jika gerbang tertutup.
                    </p>
                  </div>
                </div>
              ) : (
                /* Dine-in & Takeaway Fields */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#756457]">
                      Nama Pelanggan: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#756457]">
                      {orderType === 'dine_in' ? 'Nomor Tempat Duduk:' : 'Area / Nama Pengambilan:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.tableNumber || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomerInfo((prev) => ({ ...prev, tableNumber: val }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-[#756457]">
                      Catatan Khusus:
                    </label>
                    <input
                    
                      value={customerInfo.notes || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomerInfo((prev) => ({ ...prev, notes: val }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payment Gateway Simulator */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] shadow-xs space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                Pilih Metode Pembayaran
              </h3>

              <div className="space-y-2.5">
                {/* QRIS Option */}
                <label
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'qris'
                      ? 'bg-[#F4ECE1] border-[#8C5E3C]'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:border-[#D5C2AD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center text-black border border-[#EFE8DE]">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D2118] flex items-center gap-2">
                        <span>QRIS Dinamis Instan</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-semibold">Bebas Biaya Admin</span>
                      </div>
                      <p className="text-[11px] text-[#857161]">GoPay, OVO, ShopeePay, Dana, BCA Mobile & Semua Bank</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'qris'}
                    onChange={() => setPaymentMethod('qris')}
                    className="w-4 h-4 accent-[#433024]"
                  />
                </label>

                {/* BCA VA */}
                <label
                  onClick={() => setPaymentMethod('bca_va')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'bca_va'
                      ? 'bg-[#F4ECE1] border-[#8C5E3C]'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:border-[#D5C2AD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#005ba2] text-white flex items-center justify-center font-bold text-xs font-mono">
                      BCA
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D2118]">BCA Virtual Account</div>
                      <p className="text-[11px] text-[#857161]">Verifikasi otomatis 24 jam</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bca_va'}
                    onChange={() => setPaymentMethod('bca_va')}
                    className="w-4 h-4 accent-[#433024]"
                  />
                </label>

                {/* Mandiri VA */}
                <label
                  onClick={() => setPaymentMethod('mandiri_va')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'mandiri_va'
                      ? 'bg-[#F4ECE1] border-[#8C5E3C]'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:border-[#D5C2AD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#003d79] text-white flex items-center justify-center font-bold text-xs font-mono">
                      MNDR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D2118]">Mandiri Virtual Account</div>
                      <p className="text-[11px] text-[#857161]">Verifikasi instan via Livin' Mandiri</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'mandiri_va'}
                    onChange={() => setPaymentMethod('mandiri_va')}
                    className="w-4 h-4 accent-[#433024]"
                  />
                </label>

                {/* Credit Card */}
                <label
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-[#F4ECE1] border-[#8C5E3C]'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:border-[#D5C2AD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E5D7C5] text-[#7A5236] flex items-center justify-center border border-[#D5C2AD]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D2118]">Kartu Kredit / Debit</div>
                      <p className="text-[11px] text-[#857161]">Visa, Mastercard, JCB dengan 3D Secure OTP</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                    className="w-4 h-4 accent-[#433024]"
                  />
                </label>

                {/* Cash on Counter (Dine-in only) */}
                {orderType === 'dine_in' && (
                  <label
                    onClick={() => setPaymentMethod('cash_cashier')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cash_cashier'
                        ? 'bg-[#F4ECE1] border-[#8C5E3C]'
                        : 'bg-[#FAF7F2] border-[#EFE8DE] hover:border-[#D5C2AD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E5D7C5] text-[#7A5236] flex items-center justify-center border border-[#D5C2AD]">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2D2118]">Bayar Tunai di Kasir</div>
                        <p className="text-[11px] text-[#857161]">Bayar langsung ke barista di bar saat mengambil pesanan</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash_cashier'}
                      onChange={() => setPaymentMethod('cash_cashier')}
                      className="w-4 h-4 accent-[#433024]"
                    />
                  </label>
                )}
              </div>

              {/* QRIS Interactive Code Simulation */}
              {paymentMethod === 'qris' && (
                <div className="p-5 rounded-2xl bg-[#F4ECE1] border border-[#E5D7C5] flex flex-col items-center text-center space-y-3">
                  <div className="text-xs font-mono text-[#7A5236] font-bold">
                    NMID: ID1020088992019 • AMBUS ROASTERY
                  </div>
                  {/* Generated QR visual */}
                  <div className="p-3 bg-white rounded-2xl shadow-md border-4 border-[#433024]">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://ambuscoffee.id/pay/AMB-DEMO"
                      alt="QRIS Ambus Coffee"
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-[#857161] space-y-0.5">
                    <p className="font-semibold text-emerald-800">QR Code Siap Dipindai</p>
                    <p>Buka aplikasi e-wallet / mobile banking Anda dan arahkan kamera ke kode di atas.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Execution Button */}
          <div className="lg:col-span-5 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] p-6 space-y-6 sticky top-24 shadow-md">
            <h3 className="font-serif text-lg font-bold text-[#2D2118] border-b border-[#EFE8DE] pb-3">
              Ringkasan Pesanan
            </h3>

            {/* List of items */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[#8C5E3C] font-bold">{item.quantity}x</span>
                    <div>
                      <div className="font-semibold text-[#2D2118] line-clamp-1">{item.product.name}</div>
                      {item.selectedOptions.milkType && (
                        <div className="text-[10px] text-[#857161]">{item.selectedOptions.milkType}</div>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[#2D2118] shrink-0 font-bold">
                    Rp {(item.itemPrice * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-[#EFE8DE] space-y-2 text-xs text-[#756457]">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} Item)</span>
                <span className="font-mono text-[#2D2118]">Rp {cartSubtotal.toLocaleString('id-ID')}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Diskon Promo ({appliedPromo.code})</span>
                  <span className="font-mono">-Rp {cartDiscount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Pajak Restoran (11% PPN)</span>
                <span className="font-mono text-[#2D2118]">Rp {cartTax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan Kedai</span>
                <span className="font-mono text-[#2D2118]">Rp {cartServiceFee.toLocaleString('id-ID')}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-[#8C5E3C] font-semibold">
                  <span>Biaya Pengiriman Instant</span>
                  <span className="font-mono">Rp {cartDeliveryFee.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#E5D7C5] flex justify-between items-baseline text-sm font-bold text-[#2D2118]">
                <span>Total Tagihan:</span>
                <span className="font-mono text-xl text-[#8C5E3C] font-extrabold">
                  Rp {cartTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              id="btn-confirm-place-order"
              disabled={isProcessing}
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-base flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses Pembayaran...</span>
                </>
              ) : (
                <>
                   
                  <span>Bayar</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-[#857161] space-y-1">
              <p>Pesanan Anda langsung terkirim ke sistem Kitchen Barista Ambus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
