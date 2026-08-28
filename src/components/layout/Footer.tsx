import React from 'react';
import { useShop } from '../../context/ShopContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  Coffee,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Music,
  Heart,
  Bot,
  ExternalLink
} from 'lucide-react';
import { ActivePage } from '../../types';

export const Footer: React.FC = () => {
  const { setActivePage } = useShop();

  const navTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#FAF7F2] border-t border-[#EFE8DE] pt-14 pb-12 text-[#756457]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 4 Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Story */}
          <div className="space-y-4">
            <BrandLogo variant="full" size="md" />
            <p className="text-xs text-[#756457] leading-relaxed">
              Membangkitkan sensasi kenikmatan kopi specialty bermutu tinggi. Dipadukan dengan dedikasi sangrai kelompok kecil untuk cangkir kopi berkarakter seimbang.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#EFE8DE] hover:bg-[#433024] hover:text-[#FFFDF8] hover:border-[#433024] flex items-center justify-center text-[#7A5236] transition-colors"
                title="Instagram @ambuscoffee"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#EFE8DE] hover:bg-[#433024] hover:text-[#FFFDF8] hover:border-[#433024] flex items-center justify-center text-[#7A5236] transition-colors"
                title="Ambus Cafe Spotify Playlist"
              >
                <Music className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281288997721"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#EFE8DE] hover:bg-[#433024] hover:text-[#FFFDF8] hover:border-[#433024] flex items-center justify-center text-[#7A5236] transition-colors"
                title="WhatsApp Official"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2D2118]">
              Jelajahi Kedai
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navTo('menu')} className="hover:text-[#8C5E3C] transition-colors text-left cursor-pointer">
                  Katalog Menu & Biji Kopi
                </button>
              </li>
              <li>
                <button onClick={() => navTo('reservation')} className="hover:text-[#8C5E3C] transition-colors text-left cursor-pointer">
                  Reservasi Meja & Ruang Kerja
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-[#8C5E3C] transition-colors text-left cursor-pointer">
                  Cerita & Filosofi Rasa
                </button>
              </li>
              <li>
                <button onClick={() => navTo('gallery')} className="hover:text-[#8C5E3C] transition-colors text-left cursor-pointer">
                  Galeri Suasana & Roastery
                </button>
              </li>
              <li>
                <button onClick={() => navTo('blog')} className="hover:text-[#8C5E3C] transition-colors text-left cursor-pointer">
                  Jurnal & Panduan Seduh V60
                </button>
              </li>
              <li>
                <button onClick={() => navTo('faq')} className="hover:text-[#8C5E3C] transition-colors text-left cursor-pointer">
                  Pusat Bantuan & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Branches & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2D2118]">
              Cabang & Jam Buka
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1 shadow-xs">
                <div className="font-semibold text-[#2D2118]">Senopati Flagship Jakarta</div>
                <p className="text-[11px] text-[#857161]">Jl. Senopati Raya No. 42</p>
                <div className="text-[11px] text-[#8C5E3C] font-medium">07.00 - 23.00 WIB</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1 shadow-xs">
                <div className="font-semibold text-[#2D2118]">Braga Heritage Bandung</div>
                <p className="text-[11px] text-[#857161]">Jl. Braga No. 88</p>
                <div className="text-[11px] text-[#8C5E3C] font-medium">07.30 - 23.00 WIB</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1 shadow-xs">
                <div className="font-semibold text-[#2D2118]">Canggu Lab Bali</div>
                <p className="text-[11px] text-[#857161]">Jl. Pantai Batu Bolong 19B</p>
                <div className="text-[11px] text-[#8C5E3C] font-medium">06.30 - 22.00 WITA</div>
              </div>
            </div>
          </div>

          {/* Contact & Modern AI Features */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2D2118]">
              Layanan & Inovasi
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#756457]">
                <Mail className="w-3.5 h-3.5 text-[#8C5E3C]" />
                <span>hello@ambuscoffee.id</span>
              </div>
              <div className="flex items-center gap-2 text-[#756457]">
                <Phone className="w-3.5 h-3.5 text-[#8C5E3C]" />
                <span>+62 812-8899-7721 (WhatsApp)</span>
              </div>
              
              <div className="pt-3 border-t border-[#EFE8DE] space-y-2">
                <button
                  id="btn-footer-ai-info"
                  onClick={() => navTo('ai_info')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE1] border border-[#EFE8DE] text-xs text-[#7A5236] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Bot className="w-4 h-4 text-[#8C5E3C]" />
                    <span>AI & Agent Data Schema</span>
                  </div>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <p className="text-[11px] text-[#857161]">
                  Format data terstruktur khusus untuk sistem AI memahami profil Ambus Coffee secara akurat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#EFE8DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#857161]">
          <div>
            © 2026 Ambus Coffee & Roastery. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navTo('faq')} className="hover:text-[#2D2118] cursor-pointer">Ketentuan Layanan</button>
            <span>•</span>
            <button onClick={() => navTo('faq')} className="hover:text-[#2D2118] cursor-pointer">Kebijakan Privasi</button>
            <span>•</span>
            <button onClick={() => navTo('admin')} className="hover:text-[#2D2118] text-xs font-semibold cursor-pointer">Portal Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
