import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';
import {
  Sparkles,
  Plus,
  Star,
  ChevronRight,
  Coffee,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedSection: React.FC = () => {
  const { products, addToCart, setSelectedProduct, setActivePage } = useShop();
  const [activeFilter, setActiveFilter] = useState<'all_featured' | 'signature' | 'seasonal'>('all_featured');

  const featuredDrinks = products.filter((p) => {
    if (activeFilter === 'signature') return p.category === 'signature';
    if (activeFilter === 'seasonal') return p.isSeasonal;
    return p.badge === 'Signature' || p.badge === 'Best Seller' || p.badge === 'Seasonal' || p.badge === 'Single Origin';
  }).slice(0, 6);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1, {
      iceLevel: 'Normal Ice',
      sweetness: 'Normal (100%)'
    });
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <section id="featured-section" className="py-20 bg-[#FAF7F2] border-t border-[#EFE5D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2118]">
              Karya Racikan Andalan <span className="text-[#8C5E3C]">Ambus Coffee</span>
            </h2>
            <p className="text-sm text-[#756457] max-w-xl">
              Diciptakan dari biji kopi Premium, susu murni segar pilihan, dan teknik ekstraksi modern untuk kelezatan cangkir terbaik Anda.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4EFEA] border border-[#E8DDCF] self-start md:self-auto">
            <button
              id="filter-featured-all"
              onClick={() => setActiveFilter('all_featured')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all_featured'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs'
                  : 'text-[#756457] hover:text-[#2D2118]'
              }`}
            >
              Semua
            </button>
            <button
              id="filter-featured-signature"
              onClick={() => setActiveFilter('signature')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'signature'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs'
                  : 'text-[#756457] hover:text-[#2D2118]'
              }`}
            >
              Signature
            </button>
            <button
              id="filter-featured-seasonal"
              onClick={() => setActiveFilter('seasonal')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'seasonal'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs'
                  : 'text-[#756457] hover:text-[#2D2118]'
              }`}
            >
              Seasonal
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDrinks.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(product)}
              className="relative group cursor-pointer rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] hover:border-[#8C5E3C]/50 hover:shadow-xl p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-300 overflow-hidden"
            >
              <div className="space-y-3.5">
                {/* Image Frame */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F7EFE6]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 pointer-events-none"></div>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md text-[11px] font-bold text-[#63432C] border border-[#E8DACB] shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Clean Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md text-xs font-bold text-[#2D2118] border border-[#E8DACB] shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>

                  {/* View Details Eye indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2D2118]/30 backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-xl bg-white text-xs font-bold text-[#2D2118] flex items-center gap-2 shadow-lg scale-95 group-hover:scale-100 transition-transform">
                      <Eye className="w-4 h-4 text-[#8C5E3C]" />
                      Lihat Detail
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#857161]">
                    <span className="font-medium">{product.categoryLabel}</span>
                    {product.origin && (
                      <span className="text-[11px] text-[#7A5236] font-semibold bg-[#FAF4ED] px-2 py-0.5 rounded-md border border-[#F0E5D8]">
                        {product.origin}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2D2118] group-hover:text-[#8C5E3C] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#756457] leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>

                  {/* Tasting notes pills */}
                  {product.tastingNotes && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {product.tastingNotes.slice(0, 2).map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-[#F8F3EC] text-[#63432C] text-[10px] font-medium border border-[#EADDCF]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="pt-3.5 mt-3.5 border-t border-[#EFE8DE] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#857161] block tracking-wider">Harga</span>
                  <span className="text-base font-bold text-[#2D2118]">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`btn-quick-add-${product.id}`}
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#433024] hover:bg-[#2D2118] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    title="Pesan Langsung"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pesan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Menu CTA */}
        
      </div>
    </section>
  );
};
