import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, Order, Reservation, ProductCategory, OrderStatus } from '../../types';
import {
  LayoutDashboard,
  ShoppingBag,
  Coffee,
  Calendar,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Search,
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    orders,
    reservations,
    updateOrderStatus,
    updateReservationStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'reservations'>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  // New Product Modal Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('signature');
  const [newProdPrice, setNewProdPrice] = useState(45000);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80');
  const [newProdBadge, setNewProdBadge] = useState('');
  const [newProdNotes, setNewProdNotes] = useState('Dark Chocolate, Caramel, Nutty');

  if (!isAdminOpen) return null;

  // Stats Calculations
  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === 'paid' || o.status === 'completed' ? sum + o.total : sum), 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'preparing' || o.status === 'pending_payment' || o.status === 'ready').length;
  const todayReservationsCount = reservations.length;
  const totalProductsCount = products.length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) {
      showToast('Nama dan harga produk wajib diisi', 'error');
      return;
    }

    const catLabels: Record<ProductCategory, string> = {
      all: 'Menu',
      signature: 'Signature Ambus',
      espresso: 'Espresso Bar',
      manual_brew: 'Manual Brew',
      non_coffee: 'Non-Coffee & Tea',
      food_pastry: 'Pastry & Kitchen',
      beans: 'Biji Kopi Sangrai',
      merchandise: 'Merchandise'
    };

    addProduct({
      name: newProdName,
      category: newProdCategory,
      categoryLabel: catLabels[newProdCategory],
      price: Number(newProdPrice),
      description: newProdDesc || 'Racikan kopi istimewa dari dapur Ambus Roastery.',
      shortDesc: newProdDesc?.slice(0, 70) || 'Racikan istimewa Ambus.',
      image: newProdImage,
      badge: newProdBadge || undefined,
      tastingNotes: newProdNotes ? newProdNotes.split(',').map((s) => s.trim()) : undefined,
      rating: 5.0,
      reviewCount: 1,
      isAvailable: true
    });

    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  return (
    <div id="admin-dashboard-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col">
      {/* Admin Topbar */}
      <header className="h-16 border-b border-[#EFE8DE] bg-white px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#8C5E3C] flex items-center justify-center font-bold border border-[#E5D7C5]">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-base font-bold text-[#2D2118]">
                Ambus Kitchen & Admin POS Portal
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#F4ECE1] text-[#7A5236] font-mono text-[10px] font-bold border border-[#E5D7C5]">
                Staff / Manager Mode
              </span>
            </div>
            <p className="text-[11px] text-[#756457]">
              Kontrol Pesanan Kitchen, Inventaris Menu, dan Reservasi Meja
            </p>
          </div>
        </div>

        <button
          id="btn-close-admin-dashboard"
          onClick={() => setIsAdminOpen(false)}
          className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE1] text-xs font-semibold text-[#2D2118] border border-[#E5D7C5] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Tutup Admin Portal</span>
        </button>
      </header>

      {/* Admin Subnav Tabs */}
      <div className="bg-[#FAF7F2] border-b border-[#EFE8DE] px-4 sm:px-6 flex items-center justify-between overflow-x-auto">
        <div className="flex gap-1 py-2">
          {[
            { id: 'overview', label: 'Ringkasan & Metrik', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'orders', label: `Pesanan Kitchen (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'products', label: `Katalog Menu (${products.length})`, icon: <Coffee className="w-4 h-4" /> },
            { id: 'reservations', label: `Reservasi Meja (${reservations.length})`, icon: <Calendar className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#433024] text-[#FFFDF8] font-bold shadow-xs'
                  : 'text-[#756457] hover:text-[#2D2118] hover:bg-[#F4ECE1]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Menu Baru</span>
          </button>
        )}
      </div>

      {/* Admin Content Viewport */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2] text-[#2D2118]">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#EFE8DE] space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#756457]">
                  <span>Total Omzet Penjualan</span>
                  <DollarSign className="w-4 h-4 text-[#8C5E3C]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#2D2118]">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </div>
                <div className="text-[11px] text-[#8C5E3C] font-mono font-semibold">
                  +18.4% dari hari kemarin
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EFE8DE] space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#756457]">
                  <span>Pesanan Aktif (Live Kitchen)</span>
                  <ShoppingBag className="w-4 h-4 text-[#8C5E3C]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#433024]">
                  {activeOrdersCount} Pesanan
                </div>
                <div className="text-[11px] text-[#857161] font-mono">
                  Antrean rata-rata 6-8 menit
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EFE8DE] space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#756457]">
                  <span>Reservasi Meja Hari Ini</span>
                  <Calendar className="w-4 h-4 text-[#8C5E3C]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#2D2118]">
                  {todayReservationsCount} Booking
                </div>
                <div className="text-[11px] text-[#8C5E3C] font-mono font-semibold">
                  Occupancy meja 85%
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EFE8DE] space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#756457]">
                  <span>Menu Tersedia di Bar</span>
                  <Coffee className="w-4 h-4 text-[#8C5E3C]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#2D2118]">
                  {totalProductsCount} Item
                </div>
                <div className="text-[11px] text-[#857161] font-mono">
                  Semua bahan siap seduh
                </div>
              </div>
            </div>

            {/* Live Kitchen Order Stream */}
            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DE] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                  Pesanan Terbaru Masuk ke Kitchen
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#8C5E3C] font-semibold hover:underline"
                >
                  Lihat Semua Pesanan →
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 3).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#8C5E3C]">#{ord.orderNumber}</span>
                        <span className="text-xs text-[#2D2118] font-semibold">{ord.customerInfo.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4ECE1] text-[#7A5236] font-mono font-semibold border border-[#E5D7C5]">
                          {ord.orderType.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-[#756457]">
                        {ord.items.map((it) => `${it.quantity}x ${it.product.name}`).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="font-mono text-sm font-bold text-[#2D2118]">
                        Rp {ord.total.toLocaleString('id-ID')}
                      </span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5D7C5] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                      >
                        <option value="pending_payment">Menunggu Bayar</option>
                        <option value="preparing">Sedang Diracik</option>
                        <option value="ready">Siap Disajikan</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                Daftar Pesanan Masuk (Kitchen KDS)
              </h3>
            </div>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-white border border-[#EFE8DE] space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8DE] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-[#8C5E3C]">#{ord.orderNumber}</span>
                      <div>
                        <div className="font-semibold text-sm text-[#2D2118]">
                          {ord.customerInfo.name} • <span className="text-[#8C5E3C]">{ord.customerInfo.tableNumber || ord.customerInfo.phone || 'Meja Bar'}</span>
                        </div>
                        <div className="text-[11px] text-[#756457]">
                          {ord.createdAt} • {ord.orderType === 'dine_in' ? `Dine-In (${ord.customerInfo.tableNumber || 'Meja'})` : ord.orderType.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-[#756457] block">Metode Pembayaran</span>
                        <span className="text-xs font-mono text-[#8C5E3C] uppercase font-bold">{ord.paymentMethod.replace('_', ' ')}</span>
                      </div>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-3 py-1.5 rounded-xl bg-[#F4ECE1] border border-[#E5D7C5] text-xs font-bold text-[#7A5236] focus:outline-none"
                      >
                        <option value="pending_payment">Menunggu Pembayaran</option>
                        <option value="preparing">Sedang Diracik</option>
                        <option value="ready">Ambil Pesanan</option>
                        <option value="completed">Pesanan Selesai</option>
                        <option value="cancelled">Batalkan Pesanan</option>
                      </select>
                    </div>
                  </div>

                  {/* Items breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {ord.items.map((it) => (
                      <div key={it.id} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs space-y-0.5">
                        <div className="font-semibold text-[#2D2118]">
                          {it.quantity}x {it.product.name}
                        </div>
                        {it.selectedOptions.iceLevel && (
                          <div className="text-[10px] text-[#857161]">{it.selectedOptions.iceLevel} • {it.selectedOptions.sweetness}</div>
                        )}
                        {it.selectedOptions.milkType && (
                          <div className="text-[10px] text-[#8C5E3C] font-medium">{it.selectedOptions.milkType}</div>
                        )}
                        {it.specialInstructions && (
                          <div className="text-[10px] text-[#8C5E3C] italic">"{it.specialInstructions}"</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#EFE8DE] flex justify-between items-center text-xs">
                    <span className="text-[#756457]">Total Tagihan:</span>
                    <span className="font-mono text-base font-bold text-[#2D2118]">
                      Rp {ord.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-white border border-[#EFE8DE] space-y-3 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-[#F4ECE1]">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      {!prod.isAvailable && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-red-300">
                          STOK HABIS
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#8C5E3C] font-semibold">{prod.categoryLabel}</div>
                      <h4 className="font-serif text-sm font-bold text-[#2D2118] line-clamp-1">{prod.name}</h4>
                      <p className="font-mono text-xs font-bold text-[#8C5E3C]">Rp {prod.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EFE8DE] flex items-center justify-between gap-2">
                    <button
                      onClick={() => updateProduct(prod.id, { isAvailable: !prod.isAvailable })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                        prod.isAvailable
                          ? 'bg-[#F4ECE1] text-[#7A5236] border-[#E5D7C5]'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {prod.isAvailable ? 'Tersedia' : 'Habis'}
                    </button>

                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 rounded-lg bg-[#FAF7F2] text-[#857161] hover:text-red-600 border border-[#EFE8DE] cursor-pointer"
                      title="Hapus Menu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. RESERVATIONS MANAGEMENT TAB */}
        {activeTab === 'reservations' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <h3 className="font-serif text-lg font-bold text-[#2D2118]">
              Daftar Reservasi Meja
            </h3>

            <div className="space-y-3">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-2xl bg-white border border-[#EFE8DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#8C5E3C]">{res.bookingCode}</span>
                      <span className="font-semibold text-sm text-[#2D2118]">{res.name}</span>
                      <span className="text-xs text-[#756457]">({res.guests} Tamu)</span>
                    </div>
                    <div className="text-xs text-[#756457]">
                      <span>{res.date}</span> • <span>{res.time} WIB</span> • <span>Area: <strong className="text-[#2D2118]">{res.seatingArea.toUpperCase()}</strong></span>
                    </div>
                    {res.specialRequest && (
                      <div className="text-[11px] text-[#8C5E3C] italic">"{res.specialRequest}"</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => updateReservationStatus(res.id, 'confirmed')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        res.status === 'confirmed'
                          ? 'bg-[#433024] text-[#FFFDF8] border-[#433024]'
                          : 'bg-[#FAF7F2] text-[#756457] border-[#E5D7C5] hover:text-[#2D2118]'
                      }`}
                    >
                      Konfirmasi
                    </button>

                    <button
                      onClick={() => updateReservationStatus(res.id, 'seated')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        res.status === 'seated'
                          ? 'bg-[#8C5E3C] text-white border-[#8C5E3C]'
                          : 'bg-[#FAF7F2] text-[#756457] border-[#E5D7C5] hover:text-[#2D2118]'
                      }`}
                    >
                      Tamu Datang
                    </button>

                    <button
                      onClick={() => updateReservationStatus(res.id, 'cancelled')}
                      className="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs border border-red-200 cursor-pointer"
                    >
                      Batalkan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add New Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-[#EFE8DE] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFE8DE] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#2D2118]">Tambah Menu Baru ke POS</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-[#857161] hover:text-[#2D2118]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#756457]">Nama Menu:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Cold Smoked Honey Latte"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#756457]">Kategori:</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                  >
                    <option value="signature">Signature Ambus</option>
                    <option value="espresso">Espresso Bar</option>
                    <option value="manual_brew">Manual Brew V60</option>
                    <option value="non_coffee">Non-Coffee & Tea</option>
                    <option value="food_pastry">Pastry & Kitchen</option>
                    <option value="beans">Biji Kopi</option>
                    <option value="merchandise">Merchandise</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#756457]">Harga (Rp):</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#756457]">Deskripsi Singkat:</label>
                <textarea
                  rows={2}
                  placeholder="Cerita racikan, keunikan aroma..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#756457]">Tasting Notes (Pisahkan dengan koma):</label>
                <input
                  type="text"
                  placeholder="Citrus, Jasmine, Dark Chocolate"
                  value={newProdNotes}
                  onChange={(e) => setNewProdNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#756457]">URL Foto Produk:</label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] text-[#2D2118] border border-[#E5D7C5] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#433024] text-[#FFFDF8] font-bold cursor-pointer hover:bg-[#302016]"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
