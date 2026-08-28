import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { BRANCH_LOCATIONS } from '../../data/mockData';
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Navigation,
  Sparkles
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { setActivePage } = useShop();
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCH_LOCATIONS[0].id);

  const currentBranch = BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId) || BRANCH_LOCATIONS[0];

  return (
    <section id="location-section" className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#EFE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header Section (Rata Kiri, Elegan & Bersih) */}
        <div className="text-left max-w-2xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DE] text-[#8C5E3C] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cabang & Roastery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2118] leading-tight">
            Kunjungi Kedai & <span className="text-[#8C5E3C]">Roastery Ambus</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#756457] leading-relaxed">
            Dirancang sebagai ruang singgah yang nyaman untuk menikmati seduhan kopi artisanal, berkarya, berdiskusi, atau sekadar melepas lelah.
          </p>
        </div>

        {/* Branch Cards Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          {BRANCH_LOCATIONS.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                id={`btn-branch-${branch.id}`}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`group text-left p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between gap-3 relative shadow-xs ${
                  isSelected
                    ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] ring-2 ring-[#8C5E3C]/40 shadow-md shadow-[#432E20]/10 scale-[1.01]'
                    : 'bg-[#FFFDF9] text-[#2D2118] border-[#EFE8DE] hover:border-[#8C5E3C]/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#FFFDF8]/15 text-amber-300'
                          : 'bg-[#FAF7F2] text-[#8C5E3C] group-hover:bg-[#F4ECE1]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-[#E5D7C5]' : 'text-[#8C5E3C]'
                      }`}
                    >
                      {branch.city}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </div>

                <div>
                  <h3
                    className={`font-serif text-base font-bold transition-colors leading-snug line-clamp-1 ${
                      isSelected ? 'text-[#FFFDF8]' : 'text-[#2D2118] group-hover:text-[#8C5E3C]'
                    }`}
                  >
                    {branch.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 line-clamp-1 leading-relaxed ${
                      isSelected ? 'text-[#E5D7C5]' : 'text-[#756457]'
                    }`}
                  >
                    {branch.address}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Branch Detail Card + Map/Photo Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Detail Column */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FFFDF9] border border-[#EFE8DE] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm">
            <div className="space-y-5">
              
              {/* Status Header */}
              <div className="space-y-1.5 border-b border-[#F2EAE0] pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                    Buka Hari Ini
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2D2118]">
                  {currentBranch.name}
                </h3>
              </div>

              {/* Informational List */}
              <div className="space-y-3.5 text-xs text-[#756457]">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] flex items-center justify-center shrink-0 mt-0.5 text-[#8C5E3C]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <p className="leading-relaxed pt-1 text-[#2D2118] font-medium">{currentBranch.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] flex items-center justify-center shrink-0 text-[#8C5E3C]">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[#2D2118] font-semibold">{currentBranch.operatingHours}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] flex items-center justify-center shrink-0 text-[#8C5E3C]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[#2D2118] font-medium">{currentBranch.phone}</span>
                </div>
              </div>

              {/* Facilities Chips */}
              <div className="pt-2 space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C5E3C]">
                  Fasilitas & Suasana Ruang
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentBranch.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#63432C] text-xs border border-[#EAE0D3] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#8C5E3C]" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#F2EAE0] flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                id="btn-branch-reserve"
                onClick={() => setActivePage('reservation')}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#433024] to-[#36251B] hover:from-[#36251B] hover:to-[#2A1C14] text-[#FFFDF8] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#E5D7C5]" />
                <span>Reservasi Meja</span>
              </button>

              <a
                href={currentBranch.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F2E8DC] text-[#433024] border border-[#E5D7C5] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#8C5E3C]" />
                <span>Petunjuk Arah</span>
              </a>
            </div>
          </div>

          {/* Right Image & Maps Column */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFFDF9] border border-[#EFE8DE] overflow-hidden flex flex-col justify-between shadow-sm">
            {/* Foto Cabang */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#FAF7F2]">
              <img
                src={currentBranch.image}
                alt={currentBranch.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EFE8DE] text-xs shadow-md flex items-center justify-between">
                <div>
                  <div className="text-[#8C5E3C] font-bold text-xs">Suasana Ambus {currentBranch.city}</div>
                  <div className="text-[#554236] text-[11px]">Area tenang, banyak colokan & WiFi stabil</div>
                </div>
                <div className="hidden sm:block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Tersedia Ruang Outdoor
                </div>
              </div>
            </div>

            {/* Navigasi Maps Mockup */}
            <div className="p-5 sm:p-6 bg-[#FAF7F2]/50 border-t border-[#EFE8DE] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold text-[#2D2118] flex items-center justify-center sm:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>Kunjungi langsung lewat Navigasi</span>
                </div>
                <p className="text-[11px] text-[#756457] mt-0.5">
                  Tersinkronisasi langsung dengan Google Maps & Waze.
                </p>
              </div>

              <a
                href={currentBranch.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <span>Buka Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};