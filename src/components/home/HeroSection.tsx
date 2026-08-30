import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  ArrowRight,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroAmbianceView {
  id: string;
  name: string;
  tag: string;
  image: string;
  badgeText: string;
  location: string;
  description: string;
}

const HERO_CAFE_VIEWS: HeroAmbianceView[] = [
  {
    id: 'slow-bar',
    name: 'Artisanal Slow Bar & Espresso Station',
    tag: 'Slow Bar & Roasting',
    image: '/suasana.png',
    badgeText: 'Live Pour Over & Roasting',
    location: 'Senopati Hub • Lantai 1',
    description: 'Nuansa kayu jati hangat dengan aroma biji kopi pilihan yang baru disangrai.'
  },
  {
    id: 'cozy-lounge',
    name: 'Warm Scandinavian Lounge & Work Sanctuary',
    tag: 'Focus Workspace',
    image: '/suasana2.png',
    badgeText: 'WiFi 150 Mbps & Power Outlets',
    location: 'Dago Bandung • Mezzanine',
    description: 'Pencahayaan natural lembut yang menenangkan untuk fokus bekerja, membaca, atau berdiskusi.'
  },
  {
    id: 'outdoor-terrace',
    name: 'Open-Air Garden & Tropical Courtyard',
    tag: 'Outdoor Patio',
    image: '/suasana3.png',
    badgeText: 'Breezy & Open Air',
    location: 'Senopati Garden',
    description: 'Halaman asri terbuka berpayung pepohonan rindang dengan semilir angin sejuk.'
  },
  {
    id: 'cupping-lab',
    name: 'Communal Table & Tasting Lab',
    tag: 'Ruang Kolaborasi',
    image: '/suasana4.png',
    badgeText: 'Group Discussion & Tasting',
    location: 'Kemang Roastery',
    description: 'Meja komunal panjang untuk pertemuan tim, sesi cupping kopi, dan obrolan hangat.'
  }
];

export const HeroSection: React.FC = () => {
  const { setActivePage } = useShop();
  const [selectedAmbianceIndex, setSelectedAmbianceIndex] = useState<number>(0);

  // Auto-cycle background ambiance every 8 seconds if idle
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedAmbianceIndex((prev) => (prev + 1) % HERO_CAFE_VIEWS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const currentView = HERO_CAFE_VIEWS[selectedAmbianceIndex];

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#1c1b18] text-white"
    >
      {/* Full-Screen Dynamic Background Image with Smooth Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentView.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src={currentView.image}
            alt={currentView.name}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Sophisticated Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151412] via-black/55 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
        
        {/* Subtle Warm Amber / Cream Accent Glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#C88A36]/20 rounded-full blur-[140px] pointer-events-none"></div>
      </div>

      {/* Main Center-Left Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-2 pb-6 sm:pt-4 sm:pb-8">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          
          {/* Luxury Punchy Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FFFDF9] leading-[1.1] tracking-tight drop-shadow-md"
          >
            Sensasi <span className="text-[#F4E3CB] italic font-normal">Serangan Rasa</span> Kopi Tanpa Kompromi
          </motion.h1>

          {/* Flavor Notes & Atmosphere Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-xl text-[#E8DFC8] leading-relaxed max-w-2xl font-light drop-shadow-sm"
          >
            Dari perkebunan terbaik hingga cangkir Anda <strong className="text-white font-medium">Nikmati </strong> kedalaman aroma dan <strong className="text-white font-medium">kenyamanan</strong> ruang di Ambus Coffee
          </motion.p>

          {/* Main Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 pt-3"
          >
            <button
              id="btn-hero-order-now"
              onClick={() => setActivePage('menu')}
              className="px-8 py-4 rounded-full bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-sm sm:text-base flex items-center gap-3 shadow-xl shadow-black/40 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer border border-[#8C6B52]/40"
            >
              <ShoppingBag className="w-5 h-5 text-[#FFFDF8]" />
              <span>Pesan Menu Sekarang</span>
            </button>

            <button
              id="btn-hero-reservation"
              onClick={() => setActivePage('reservation')}
              className="px-7 py-4 rounded-full bg-[#F5EDE3]/20 hover:bg-[#F5EDE3]/35 backdrop-blur-md text-[#FFFDF9] border border-[#F5EDE3]/40 font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all hover:scale-[1.02] shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#F4E3CB]" />
              <span>Reservasi Meja</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Minimalist Bottom Photo Progress Indicators */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-end py-2">
        {/* Minimal Progress Dots / Bars */}
        <div className="flex items-center gap-2">
          {HERO_CAFE_VIEWS.map((view, idx) => {
            const isSelected = idx === selectedAmbianceIndex;
            return (
              <button
                key={view.id}
                onClick={() => setSelectedAmbianceIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isSelected
                    ? 'w-8 h-1.5 bg-[#F4E3CB]'
                    : 'w-2 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
                title={view.name}
                aria-label={`Lihat suasana ${view.tag}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

