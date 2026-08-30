import React, { useState } from 'react';
import { BRANCH_LOCATIONS } from '../../data/mockData';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Users,
  Coffee,
  CheckCircle2
} from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCH_LOCATIONS[0].id);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Nongkrong & Ngopi Santai');

  const currentBranch = BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId) || BRANCH_LOCATIONS[0];

  const purposes = [
    { id: 'Nongkrong & Ngopi Santai', label: 'Nongkrong Santai', desc: 'Meja santai indoor dan outdoor' },
    { id: 'Work From Cafe (WFC) & Meeting', label: 'Meeting', desc: 'Dekat colokan & WiFi kencang' },
    { id: 'Acara Komunitas /Gathering', label: 'Gathering', desc: 'Area meja panjang komunal' },
    { id: 'Slow Bar & Personal Brewing', label: 'Slow Bar Experience', desc: 'Duduk di depan barista' }
  ];

  const handleWhatsAppBooking = (branch = currentBranch) => {
    const message = `Halo Admin ${branch.name}, saya ingin reservasi meja di Ambus Coffee untuk keperluan: *${selectedPurpose}*.\n\nBisa tolong dibantu info ketersediaan meja hari ini? Terima kasih!`;
    const cleanPhone = branch.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div id="reservation-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen text-[#2D2118]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-left max-w-2xl mx-auto space-y-3 pt-4">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2118]">
            Reservasi <span className="text-[#8C5E3C]"> Ambus Coffee</span>
          </h1>
        </div>

        {/* WhatsApp Reservation Box */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DE] shadow-sm p-6 sm:p-10 space-y-8">
          {/* Step 1: Branch Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2D2118] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8C5E3C]" />
                <span>Pilih Cabang</span>
              </label>
              <span className="text-xs text-[#857161]">3 Cabang Aktif</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BRANCH_LOCATIONS.map((b) => {
                const isSelected = b.id === selectedBranchId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs ring-2 ring-[#8C5E3C]/30'
                        : 'bg-[#FAF7F2] text-[#2D2118] border-[#EFE8DE] hover:border-[#8C5E3C]'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider block ${
                          isSelected ? 'text-[#E5D7C5]' : 'text-[#857161]'
                        }`}
                      >
                        {b.city}
                      </span>
                      <h3
                        className={`font-serif text-sm sm:text-base font-bold leading-snug mt-0.5 ${
                          isSelected ? 'text-[#FFFDF8]' : 'text-[#2D2118]'
                        }`}
                      >
                        {b.name}
                      </h3>
                      <p
                        className={`text-xs mt-1 line-clamp-1 ${
                          isSelected ? 'text-[#E5D7C5]' : 'text-[#756457]'
                        }`}
                      >
                        {b.address}
                      </p>
                    </div>

                    <div
                      className={`pt-2 border-t text-[11px] flex items-center gap-1.5 ${
                        isSelected ? 'border-white/15 text-[#E5D7C5]' : 'border-[#EFE8DE] text-[#857161]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{b.operatingHours}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Keperluan / Purpose */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-[#2D2118] uppercase tracking-wider flex items-center gap-1.5">
              <span>Kebutuhan</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {purposes.map((p) => {
                const isSelected = selectedPurpose === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPurpose(p.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#FAF7F2] border-[#8C5E3C] ring-1.5 ring-[#8C5E3C] text-[#2D2118]'
                        : 'bg-[#FFFFFF] border-[#EFE8DE] hover:border-[#D5C2AD] text-[#5C4A3E]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#2D2118]">{p.label}</div>
                      <div className="text-[11px] text-[#756457]">{p.desc}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#8C5E3C] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTA Card directly to WhatsApp */}
          <div className="pt-2 border-t border-[#EFE8DE] space-y-5">
            {/* WhatsApp Contact Preview Card */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#EFE8DE] space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* WhatsApp Profile Avatar */}
                  <div className="relative w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-5 h-5 fill-white" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-[#2D2118] leading-tight">
                        {currentBranch.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#756457] font-medium mt-0.5">
                      WhatsApp Official: <span className="text-[#2D2118] font-semibold">{currentBranch.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Admin Online</span>
                </div>
              </div>

              {/* Message Bubble Preview */}
              <div className="bg-[#FFFFFF] p-3 sm:p-3.5 rounded-xl border border-[#EFE8DE] text-xs text-[#5C4A3E] space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#857161] tracking-wider">
                  Format Pesan Otomatis:
                </div>
                <p className="italic text-[#2D2118] leading-relaxed bg-[#FDFBF7] p-2.5 rounded-lg border border-[#F2ECE1]">
                  "Halo Admin {currentBranch.name}, saya ingin reservasi meja di Ambus Coffee untuk keperluan: <strong className="text-[#8C5E3C]">{selectedPurpose}</strong>. Bisa tolong dibantu info ketersediaan meja? Terima kasih!"
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <button
              id="btn-whatsapp-reservation"
              type="button"
              onClick={() => handleWhatsAppBooking(currentBranch)}
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 group"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4 fill-white" />
              </div>
              <span className="tracking-wide">Chat Admin</span>
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            <p className="text-center text-xs text-[#857161]">
              Pesan siap kirim langsung di aplikasi WhatsApp
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-[#FFFFFF] p-4.5 rounded-2xl border border-[#EFE8DE] space-y-1.5">
            <Coffee className="w-5 h-5 text-[#8C5E3C] mx-auto" />
            <h4 className="font-bold text-xs text-[#2D2118]">Bebas Biaya</h4>
            <p className="text-[11px] text-[#756457]">Reservasi reguler tidak dikenakan biaya muka.</p>
          </div>
          <div className="bg-[#FFFFFF] p-4.5 rounded-2xl border border-[#EFE8DE] space-y-1.5">
            <Clock className="w-5 h-5 text-[#8C5E3C] mx-auto" />
            <h4 className="font-bold text-xs text-[#2D2118]">Toleransi Meja 15 Menit</h4>
            <p className="text-[11px] text-[#756457]">Meja akan disimpan hingga 15 menit dari jam janji.</p>
          </div>
          <div className="bg-[#FFFFFF] p-4.5 rounded-2xl border border-[#EFE8DE] space-y-1.5">
            <ShieldCheck className="w-5 h-5 text-[#8C5E3C] mx-auto" />
            <h4 className="font-bold text-xs text-[#2D2118]">Konfirmasi Cepat</h4>
            <p className="text-[11px] text-[#756457]">Admin merespons dalam jam operasional kedai.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
