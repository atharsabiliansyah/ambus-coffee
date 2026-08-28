import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Package,
  Sparkles,
  ShoppingBag,
  Gift,
  Truck,
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';

export const ShopTeaser: React.FC = () => {
  const { products, setSelectedProduct, addToCart, setActivePage } = useShop();

  const retailProducts = products.filter(
    (p) => p.category === 'beans' || p.category === 'merchandise'
  ).slice(0, 3);

  return (
    <section id="shop-teaser-section" className="py-20 bg-[#FAF7F2] border-t border-[#EFE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2118]">
              Bawa Pulang Pengalaman <span className="text-[#8C5E3C]">Ambus Coffee</span>
            </h2>
            <p className="text-sm text-[#756457] max-w-xl">
              Biji kopi kemasan, tumbler tahan dingin 24 jam, set seduh manual keramik, dan kartu hadiah digital.
            </p>
          </div>
        </div>

        {/* 3 Featured Retail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {retailProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="relative cursor-pointer group rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] hover:border-[#8C5E3C] p-4 sm:p-5 flex flex-col justify-between coffee-card-hover shadow-xs overflow-hidden"
            >
              {/* Corner Lines */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#8C5E3C]/25 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#8C5E3C]/25 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#8C5E3C]/25 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#8C5E3C]/25 pointer-events-none" />

              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  {prod.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FFFDF9]/95 backdrop-blur-md text-[11px] font-bold text-[#7A5236] border border-[#E5D7C5] shadow-xs">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider text-[#857161] font-medium">
                    {prod.categoryLabel}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2118] group-hover:text-[#8C5E3C] transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#756457] leading-relaxed line-clamp-2">
                    {prod.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EFE8DE] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#857161] block">Harga</span>
                  <span className="text-base font-bold text-[#2D2118]">
                    Rp {prod.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  id={`btn-retail-add-${prod.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod, 1, {
                      grindSize: prod.category === 'beans' ? 'Medium (V60/Aeropress)' : undefined
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F4ECE1] hover:bg-[#433024] text-[#433024] hover:text-[#FFFDF8] border border-[#E5D7C5] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Beli</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Prop Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#8C5E3C] shrink-0 border border-[#E5D7C5]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2D2118]">Fresh Roast Guarantee</div>
              <div className="text-[11px] text-[#857161]">Disangrai tidak lebih dari 14 hari</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#8C5E3C] shrink-0 border border-[#E5D7C5]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2D2118]">Pengiriman Seluruh Indonesia</div>
              <div className="text-[11px] text-[#857161]">Packing aman vacuum sealed</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#8C5E3C] shrink-0 border border-[#E5D7C5]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2D2118]">Gratis Opsi Gilingan</div>
              <div className="text-[11px] text-[#857161]">Pilih gilingan V60, espresso, atau French press</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
