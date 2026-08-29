import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Coffee,
  Mountain,
  Flame,
  Award,
  Sparkles,
  Layers,
  Heart,
  Droplet,
  Compass,
  ArrowRight
} from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div id="about-us-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen space-y-20 text-[#2D2118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner / Header (Rata kiri sejajar penuh dengan kontainer) */}
        <div className="w-full text-left space-y-4 pt-6">
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2D2118] leading-tight tracking-tight max-w-3xl">
            Kisah di Balik <span className="text-[#8C5E3C]">Racikan Nikmat</span> Ambus Coffee
          </h1>
          <p className="text-sm sm:text-base text-[#756457] leading-relaxed max-w-2xl">
            Ambus Coffee lahir dari hasrat murni menghadirkan secangkir kopi nikmat berkualitas tinggi. Kami percaya secangkir kopi terbaik adalah hasil dari pemilihan biji kopi terbaik Nusantara dan keahlian sangrai kelompok kecil yang teliti.
          </p>
        </div>

        {/* The Sensory Triad Feature Grid (Nutty Depth, Dark Chocolate, Citrus Edge) */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFE8DE] p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#8C5E3C]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase text-[#8C5E3C] font-semibold tracking-wider">
                <Layers className="w-4 h-4" />
                <span>The Ambus Flavor Triad</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#2D2118]">
                Mengapa Dinamakan <span className="text-[#8C5E3C]">Ambus</span>?
              </h2>
              <p className="text-sm text-[#756457] leading-relaxed">
                Kata <em>Ambus</em> merefleksikan kejutan rasa saat lidah Anda menyentuh tegukan pertama. Tidak ada rasa hambar atau datar, yang ada adalah kejutan rasa berlapis yang harmonis dan terstruktur:
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F4ECE1] flex items-center justify-center text-[#7A5236] shrink-0 font-serif font-bold text-base border border-[#E5D7C5]">
                    01
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2118] text-sm">Nutty Depth</h4>
                    <p className="text-xs text-[#857161] mt-1">
                      Lapisan fondasi rasa gurih dari kacang hazelnut, almond sangrai, dan gula aren yang memberikan rasa nyaman dan hangat.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F4ECE1] flex items-center justify-center text-[#7A5236] shrink-0 font-serif font-bold text-base border border-[#E5D7C5]">
                    02
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2118] text-sm">Dark Chocolate Richness</h4>
                    <p className="text-xs text-[#857161] mt-1">
                      Kepadatan body mouthfeel tebal seperti cokelat hitam 75% tanpa kepahitan gosong yang menusuk.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F4ECE1] flex items-center justify-center text-[#7A5236] shrink-0 font-serif font-bold text-base border border-[#E5D7C5]">
                    03
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D2118] text-sm">Citrus Edge</h4>
                    <p className="text-xs text-[#857161] mt-1">
                      Aftertaste bergamot, peach, dan jeruk mandarin yang menyegarkan tenggorokan dan membuat Anda ingin terus menyeruput.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Sensory Image Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#EFE8DE] shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
                  alt="Coffee Cupping & Scent Notes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E5D7C5] text-center space-y-1 shadow-md">
                  <span className="text-xs text-[#8C5E3C] uppercase tracking-wider font-semibold">Quality Assurance</span>
                  <div className="font-serif text-base font-bold text-[#2D2118]">
                    SCA Standard Cupping Score 85+ Points
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Core Quality Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Biji Kopi Pilihan Nusantara */}
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] p-8 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#7A5236] border border-[#E5D7C5]">
                <Mountain className="w-6 h-6" />
              </div>
              <div className="text-xs text-[#8C5E3C] uppercase tracking-wider font-semibold">Biji Kopi Pilihan Nusantara</div>
              <h3 className="font-serif text-2xl font-bold text-[#2D2118]">
                Origin Terbaik Indonesia
              </h3>
              <p className="text-sm text-[#756457] leading-relaxed">
                Kami bermitra langsung dengan petani kopi terbaik di Aceh Gayo, Flores Bajawa, dan Jawa. Pemilihan ceri matang sempurna dan sortasi biji ketat menjamin cita rasa kopi yang konsisten nikmat dan beraroma harum di setiap seduhan.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EFE8DE] flex items-center justify-between text-xs text-[#8C5E3C] font-semibold">
              <span>Aceh Gayo • Flores • Java</span>
              <span>Direct Trade</span>
            </div>
          </div>

          {/* Card 2: Small Batch Roasting */}
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] p-8 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#7A5236] border border-[#E5D7C5]">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-xs text-[#8C5E3C] uppercase tracking-wider font-semibold">Metode Sangrai Khusus</div>
              <h3 className="font-serif text-2xl font-bold text-[#2D2118]">
                Small Batch Precision Roasting
              </h3>
              <p className="text-sm text-[#756457] leading-relaxed">
                Bukan pabrikasi massal. Setiap batch sangrai kami batasi maksimal 5-6 kg di mesin sangrai artisan Giesen W6A. Roaster kami mengontrol kurva suhu detik demi detik untuk mengunci minyak aromatik bunga dan buah tanpa merusak struktur seluler biji.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EFE8DE] flex items-center justify-between text-xs text-[#8C5E3C] font-semibold">
              <span>Max 6kg / Batch</span>
              <span>Giesen W6A Roaster</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Menu & Booking */}
        <div className="rounded-2xl bg-[#F4ECE1] p-8 sm:p-10 border border-[#E5D7C5] text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2118]">
            Siap Merasakan Langsung Racikan Nikmat Ambus?
          </h3>
          <p className="text-sm text-[#756457] max-w-xl mx-auto">
            Kunjungi kedai kami untuk menikmati seduhan hangat dari barista profesional, atau pesan biji kopi segar untuk diseduh di rumah.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('menu')}
              className="px-6 py-3 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Coffee className="w-4 h-4" />
              <span>Lihat Katalog Menu</span>
            </button>
            <button
              onClick={() => setActivePage('reservation')}
              className="px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#2D2118] border border-[#E5D7C5] font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Reservasi Meja</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};