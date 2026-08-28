import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, MessageSquare, CheckCircle2, Quote, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const [activeDrinkFilter, setActiveDrinkFilter] = useState<string>('all');

  const filteredReviews = activeDrinkFilter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.favoriteItem.toLowerCase().includes(activeDrinkFilter.toLowerCase()));

  return (
    <section id="testimonials-section" className="py-20 bg-[#FAF7F2] border-t border-[#EFE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2118]">
              Cerita Mereka Tentang <span className="text-[#8C5E3C]">Ambus Coffee</span>
            </h2>
            <p className="text-sm text-[#756457] max-w-xl">
              Lebih dari sekadar secangkir kopi—inilah pengalaman nyata dari para penikmat kopi spesialti, profesional kreatif, dan penjelajah rasa.
            </p>
          </div>

          {/* Social Proof Metric Score */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] flex items-center gap-4 self-start md:self-auto shadow-xs">
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <div className="text-[#857161] font-medium">1.250+ Verifikasi Pelanggan</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[24px] bg-[#FFFFFF] border border-[#EFE8DE] p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-[#8C5E3C] transition-colors"
            >
              <div className="space-y-3">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#8C5E3C]/30" />
                </div>

                <p className="text-sm text-[#756457] leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#EFE8DE] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#EFE8DE]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-[#2D2118]">{item.name}</span>
                      {item.verifiedOrder && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E3C]" aria-label="Pesanan Terverifikasi" />
                      )}
                    </div>
                    <div className="text-[11px] text-[#857161]">{item.role}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#857161] block">Menu Favorit</span>
                  <span className="text-xs text-[#7A5236] font-semibold">{item.favoriteItem}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
