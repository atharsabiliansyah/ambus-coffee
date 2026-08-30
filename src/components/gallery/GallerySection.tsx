import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/mockData';
import { GalleryItem } from '../../types';
import {
  Image as ImageIcon,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ambiance' | 'coffee' | 'roasting' | 'community'>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex(selectedItemIndex === 0 ? filteredItems.length - 1 : selectedItemIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex(selectedItemIndex === filteredItems.length - 1 ? 0 : selectedItemIndex + 1);
    }
  };

  return (
    <div id="gallery-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen space-y-12 text-[#2D2118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header (Rata kiri sejajar penuh dengan grid gambar) */}
        <div className="w-full text-left space-y-3 pt-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D2118] tracking-tight">
            Galeri <span className="text-[#8C5E3C]">Ambus coffee</span>
          </h1>
          <p className="text-sm sm:text-base text-[#756457] max-w-2xl">
            Kilas balik estetika kedai, ketelitian proses sangrai, seni latte art barista, dan kehangatan komunitas Ambus Coffee.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-start gap-2">
          {[
            { id: 'all', label: 'Semua Foto' },
            { id: 'ambiance', label: 'Suasana & Kedai' },
            { id: 'coffee', label: 'Kreasi Kopi & Seduh' },
            { id: 'roasting', label: 'Proses Sangrai' },
            { id: 'community', label: 'Komunitas & Acara' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`btn-gal-tab-${tab.id}`}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs font-bold'
                  : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118] hover:border-[#E5D7C5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedItemIndex(idx)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EFE8DE] hover:border-[#8C5E3C] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="self-end">
                  <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#7A5236] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#F4ECE1] tracking-wider block font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#F4ECE1] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#E5D7C5] line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedItemIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#FFFFFF] rounded-2xl border border-[#EFE8DE] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="btn-close-gallery-modal"
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#2D2118] flex items-center justify-center border border-[#E5D7C5] transition-colors shadow-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                id="btn-gal-prev"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#2D2118] flex items-center justify-center border border-[#E5D7C5] transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                id="btn-gal-next"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#2D2118] flex items-center justify-center border border-[#E5D7C5] transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="relative aspect-video sm:aspect-[16/10] bg-[#2D2118] overflow-hidden flex items-center justify-center">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details footer */}
              <div className="p-6 bg-[#FAF7F2] border-t border-[#EFE8DE] space-y-1">
                <div className="text-xs font-mono uppercase text-[#8C5E3C] font-semibold">
                  {activeItem.category} • Foto {selectedItemIndex! + 1} dari {filteredItems.length}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D2118]">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-[#756457]">
                  {activeItem.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};