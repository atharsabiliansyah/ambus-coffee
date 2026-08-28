import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Ticket,
  Utensils,
  ShoppingBag as BagIcon,
  Truck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderType } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    orderType,
    setOrderType,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    cartSubtotal,
    cartTax,
    cartServiceFee,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    setActivePage
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromoCode(inputCode);
    setInputCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#EFE8DE] shadow-2xl flex flex-col justify-between"
            >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#EFE8DE] flex items-center justify-between bg-[#F4ECE1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E5D7C5] flex items-center justify-center text-[#7A5236] border border-[#D5C2AD]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2118]">
                    Keranjang Pesanan
                  </h3>
                  <p className="text-[11px] text-[#857161]">
                    {cart.reduce((a, b) => a + b.quantity, 0)} item keranjang
                  </p>
                </div>
              </div>

              <button
                id="btn-close-cart-drawer"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-[#857161] hover:text-[#2D2118] hover:bg-[#E5D7C5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Order Type Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#756457] uppercase tracking-wider font-mono">
                  Tipe Pesanan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine_in')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                      orderType === 'dine_in'
                        ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                        : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Dine-In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                        : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                    }`}
                  >
                    <BagIcon className="w-4 h-4" />
                    <span>Pick-Up</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                        : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Delivery</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#B3A090] mx-auto" />
                  <p className="font-serif text-base font-bold text-[#2D2118]">
                    Keranjang Anda Masih Kosong
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActivePage('menu');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#433024] text-[#FFFDF8] font-bold text-xs hover:bg-[#302016] transition-colors"
                  >
                    Lihat Menu Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] flex items-start gap-3.5 relative shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E8DACB]"
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-[#2D2118] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#B3A090] hover:text-red-500 p-1"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Options pills */}
                        <div className="text-[10px] text-[#857161] space-y-0.5 font-mono">
                          {item.selectedOptions.iceLevel && <span>{item.selectedOptions.iceLevel} • </span>}
                          {item.selectedOptions.sweetness && <span>{item.selectedOptions.sweetness}</span>}
                          {item.selectedOptions.milkType && <div className="text-[#8C5E3C] font-semibold">{item.selectedOptions.milkType}</div>}
                          {item.selectedOptions.grindSize && <div className="text-[#8C5E3C]">Gilingan: {item.selectedOptions.grindSize}</div>}
                          {item.specialInstructions && (
                            <div className="text-[10px] italic text-[#857161]">"{item.specialInstructions}"</div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-xs font-bold text-[#2D2118]">
                            Rp {(item.itemPrice * item.quantity).toLocaleString('id-ID')}
                          </span>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2 bg-[#F4ECE1] p-1 rounded-lg border border-[#EFE8DE]">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-[#756457] hover:text-[#2D2118]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold w-4 text-center text-[#2D2118]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-[#756457] hover:text-[#2D2118]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              {cart.length > 0 && (
                <div className="pt-2 space-y-2">
                  <label className="text-xs font-semibold text-[#756457] flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-[#8C5E3C]" />
                    <span>Kode Voucher Promo:</span>
                  </label>

                  {appliedPromo ? (
                    <div className="p-3 rounded-xl bg-[#F4ECE1] border border-[#E5D7C5] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#7A5236]">{appliedPromo.code}</span>
                        <span className="text-[#756457] ml-2">(Diskon {appliedPromo.discountPercent}%)</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCode} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="FIRSTSIP / AMBUS10"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#EFE8DE] text-xs text-[#2D2118] uppercase font-mono focus:outline-none focus:border-[#8C5E3C]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#433024] text-[#FFFDF8] hover:bg-[#302016] border border-[#433024] text-xs font-bold transition-all"
                      >
                        Terapkan
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Drawer Footer & Price Summary */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#F4ECE1] border-t border-[#EFE8DE] space-y-3">
                <div className="space-y-1.5 text-xs text-[#756457]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#2D2118]">Rp {cartSubtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Diskon ({appliedPromo.code})</span>
                      <span className="font-mono">-Rp {cartDiscount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Pajak Restoran (11% PPN)</span>
                    <span className="font-mono text-[#2D2118]">Rp {cartTax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Layanan</span>
                    <span className="font-mono text-[#2D2118]">Rp {cartServiceFee.toLocaleString('id-ID')}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-[#8C5E3C] font-semibold">
                      <span>Biaya Pengiriman Instant</span>
                      <span className="font-mono">Rp {cartDeliveryFee.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#E5D7C5] flex justify-between text-sm font-bold text-[#2D2118]">
                    <span>Total Pembayaran</span>
                    <span className="font-mono text-base text-[#8C5E3C]">
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button
                  id="btn-proceed-checkout"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Pembayaran</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
};
