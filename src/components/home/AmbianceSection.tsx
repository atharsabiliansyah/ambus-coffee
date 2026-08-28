import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Sparkles,
  Wifi,
  Zap,
  Coffee,
  Calendar,
  ArrowRight,
  Sun,
  Users,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';

interface AmbianceSpot {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  image: string;
  features: string[];
  recommendedFor: string;
}

const AMBIANCE_SPOTS: AmbianceSpot[] = [
  {
    id: 'slow-bar',
    title: 'Slow Bar & Artisanal Brew Counter',
    subtitle: 'Interaksi Dekat dengan Barista',
    tag: 'Bar Experience',
    description: 'Duduk langsung di depan meja seduh kayu jati dengan mesin La Marzocco dan pour over station. Saksikan racikan kopi presisi sambil mendiskusikan origin biji kopi bersama barista kami.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    features: ['Scent of Fresh Roast', 'Manual Brew Interaction', 'Aesthetic Brass Bar'],
    recommendedFor: 'Pecinta kopi manual, solo visitors, coffee talk'
  },
  {
    id: 'cozy-workspace',
    title: 'Warm Sanctuary & Focus Workspace',
    subtitle: 'Kenyamanan WFC Tanpa Gangguan',
    tag: 'Work Friendly',
    description: 'Didesain khusus untuk Anda yang membutuhkan fokus tinggi. Dilengkapi pencahayaan hangat 2700K yang ramah mata, colokan listrik di setiap meja, kursi ergonomis, dan WiFi fiber stabil 150 Mbps.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    features: ['WiFi 150 Mbps', 'Colokan di Setiap Meja', 'Pencahayaan Hangat'],
    recommendedFor: 'Work from cafe (WFC), remote workers, membaca'
  },
  {
    id: 'outdoor-garden',
    title: 'Open Air Garden & Green Terrace',
    subtitle: 'Kesejukan Alami Beralas Angin Sejuk',
    tag: 'Outdoor Vibes',
    description: 'Halaman terbuka berkonsep tropical courtyard dengan kanopi peneduh dan tanaman hijau asri. Tempat sempurna untuk menikmati iced coffee di sore hari bersama teman atau keluarga.',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
    features: ['Smoking & Outdoor Friendly', 'Lush Tropical Plants', 'Breezy Natural Air'],
    recommendedFor: 'Kumpul teman, diskusi santai, sore hari'
  },
  {
    id: 'communal-lounge',
    title: 'Mezzanine Lounge & Communal Table',
    subtitle: 'Ruang Hangat Kolaborasi & Cerita',
    tag: 'Group & Meeting',
    description: 'Meja komunal panjang dari kayu utuh di area mezzanine lantai dua. Suasana hangat berbalut musik lofi akustik yang pas untuk diskusi santai, meeting kecil, maupun nongkrong bersama.',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&q=80',
    features: ['Meja Panjang 8-10 Orang', 'Suasana Tenang & Hangat', 'Akustik Lembut'],
    recommendedFor: 'Meeting tim, diskusi komunitas, arisan santai'
  }
];

export const AmbianceSection: React.FC = () => {
  const { setActivePage } = useShop();
  const [activeSpotId, setActiveSpotId] = useState<string>(AMBIANCE_SPOTS[0].id);

  const activeSpot = AMBIANCE_SPOTS.find((s) => s.id === activeSpotId) || AMBIANCE_SPOTS[0];

  return (
    <section id="ambiance-section" className="py-20 bg-[#FAF7F2] border-t border-[#EFE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2118] tracking-tight">
            Ruang Tenang untuk Setiap <span className="text-[#8C5E3C] italic font-normal">Momen & Seduhan</span>
          </h2>
          <p className="text-sm sm:text-base text-[#756457] leading-relaxed">
            Ambus Coffee dirancang bukan sekadar tempat minum kopi, melainkan sanctuary hangat dengan perpaduan elemen kayu alami, pencahayaan lembut, dan sudut nyaman untuk bekerja maupun bersosialisasi.
          </p>
        </div>

        {/* Ambiance Spot Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {AMBIANCE_SPOTS.map((spot) => {
            const isSelected = spot.id === activeSpotId;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveSpotId(spot.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-sm font-bold'
                    : 'bg-[#FFFFFF] text-[#2D2118] border-[#EFE8DE] hover:border-[#E5D7C5] hover:bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold uppercase tracking-wide ${
                    isSelected ? 'text-[#E5D7C5]' : 'text-[#857161]'
                  }`}>
                    {spot.tag}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FFFDF8]' : 'bg-[#E5D7C5]'}`} />
                </div>
                <div className={`text-sm sm:text-base font-bold line-clamp-1 ${
                  isSelected ? 'text-[#FFFDF8]' : 'text-[#2D2118]'
                }`}>
                  {spot.title.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Ambiance Spotlight Card with Corner Line Accents & Doodle Details */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#FFFFFF] border border-[#EFE8DE] p-6 sm:p-8 shadow-xs overflow-hidden">
         
          {/* Left: Big Atmospheric Photo with Interactive Details */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#FAF7F2] group shadow-xs border border-[#EFE8DE]">
            <img
              src={activeSpot.image}
              alt={activeSpot.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            {/* Floating Top Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-[#7A5236] border border-[#E5D7C5] shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#8C5E3C]" />
              <span>Area: {activeSpot.tag}</span>
            </div>
          </div>

          {/* Right: Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2118]">
                {activeSpot.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#756457] leading-relaxed pt-1">
                {activeSpot.description}
              </p>
            </div>

            {/* Feature checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#857161]">
                Keunggulan Area Ini:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {activeSpot.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-center gap-2.5 text-xs text-[#2D2118]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#F4ECE1] text-[#7A5236] flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#EFE8DE] flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActivePage('reservation')}
                className="flex-1 py-3 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E5D7C5]" />
                <span>Pesan Meja</span>
              </button>

              <button
                onClick={() => setActivePage('menu')}
                className="px-5 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#2D2118] border border-[#E5D7C5] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-[#8C5E3C]" />
                <span>Lihat Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Auto-Scrolling Photo Strip (Moves to Left) */}
        <div className="relative overflow-hidden pt-2">
          {/* Subtle side fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 w-max"
            animate={{
              x: ['0%', '-50%']
            }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity
            }}
            whileHover={{ transition: { duration: 60 } }}
          >
            {[
              {
                title: 'Espresso Craft & Slow Bar',
                desc: 'Nuansa kayu jati & aroma sangrai hangat',
                img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Scandinavian Cozy Lounge',
                desc: 'Sudut baca tenang & colokan stabil',
                img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Tropical Garden Terrace',
                desc: 'Angin sejuk di bawah kanopi rindang',
                img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Artisanal Cupping Table',
                desc: 'Eksplorasi rasa bersama roaster kami',
                img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
              },
              // Duplicated items for seamless infinite left-sliding loop
              {
                title: 'Espresso Craft & Slow Bar',
                desc: 'Nuansa kayu jati & aroma sangrai hangat',
                img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Scandinavian Cozy Lounge',
                desc: 'Sudut baca tenang & colokan stabil',
                img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Tropical Garden Terrace',
                desc: 'Angin sejuk di bawah kanopi rindang',
                img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Artisanal Cupping Table',
                desc: 'Eksplorasi rasa bersama roaster kami',
                img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActivePage('gallery')}
                className="group relative w-[260px] sm:w-[300px] md:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EFE8DE] hover:border-[#8C5E3C] cursor-pointer shadow-xs transition-all shrink-0"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-3.5 inset-x-3.5 text-white space-y-0.5">
                  <div className="font-serif text-sm font-bold line-clamp-1">{item.title}</div>
                  <div className="text-[11px] text-[#E5D7C5] line-clamp-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
