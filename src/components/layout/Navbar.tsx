import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  ShoppingBag,
  Calendar,
  Sparkles,
  Menu as MenuIcon,
  X,
  User,
  LogOut,
  Coffee,
  Compass,
  MessageSquare,
  Home,
  Image as ImageIcon,
  BookOpen,
  Clock,
  Phone,
  ArrowRight
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ActivePage } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cart,
    setIsCartOpen,
    setIsLiveChatOpen,
    currentUser,
    setIsAuthModalOpen,
    logout,
    showToast
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kunci scroll background saat menu drawer mobile terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Menu Navigasi Desktop
  const desktopNavLinks: { label: string; page: ActivePage }[] = [
    { label: 'Beranda', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Reservasi', page: 'reservation' },
    { label: 'Galeri', page: 'gallery' },
    { label: 'Tentang', page: 'about' },
    { label: 'Jurnal', page: 'blog' }
  ];

  // Menu Navigasi Mobile Drawer
  const mobileNavLinks: { label: string; page: ActivePage; icon: React.ElementType; badge?: string }[] = [
  { label: 'Beranda', page: 'home', icon: Home },
  { label: 'Menu', page: 'menu', icon: Coffee },
  { label: 'Reservasi', page: 'reservation', icon: Calendar },
  { label: 'Galeri', page: 'gallery', icon: ImageIcon },
  { label: 'Tentang', page: 'about', icon: Compass },
  { label: 'Panduan', page: 'blog', icon: BookOpen },
  { label: 'Status Pesanan', page: 'order_tracking', icon: Clock }, 
  { label: 'Lokasi & Kontak', page: 'contact', icon: Phone }
];

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
  id="main-navbar"
  className={`absolute top-0 left-0 right-0 z-40 h-16 sm:h-20 flex items-center transition-all duration-300 ${
    isScrolled
      ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE1D3] shadow-xs'
      : 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EFE7DC]'
  }`}
>
  
  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8C5E3C]/60 to-transparent" />

  <div className="w-full pl-2 pr-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-3 sm:gap-4">
    <div className="flex items-center gap-4 lg:gap-7 xl:gap-8 min-w-0">
      
      
      <button
        id="btn-brand-logo"
        onClick={() => handleNavClick('home')}
        className="group flex items-center cursor-pointer shrink-0 -ml-2 sm:ml-0 transition-transform active:scale-95"
      >
        <img 
          src="/Ambus.png" 
          alt="Ambus Coffee" 
          className="h-30 sm:h-30 w-auto max-h-[120px] object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/public/Ambus.png";
          }}
        />
      </button>

      {/* Sisa navigasi ke bawah tetap sama... */}

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4ECE1]/60 p-1 rounded-xl border border-[#EBE0D2]">
            {desktopNavLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#FFFDF8] bg-[#433024] font-bold shadow-xs'
                      : 'text-[#6E5A4D] hover:text-[#2D2118] hover:bg-[#EAE0D3]/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Kolom Kanan: Tombol AI, Keranjang, Profil & Menu Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Tombol AI Sommelier */}
          <button
            id="btn-nav-ai-sommelier"
            onClick={() => handleNavClick('ai_sommelier')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              activePage === 'ai_sommelier'
                ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                : 'bg-[#FFFDF9] hover:bg-[#F6EFE6] text-[#7A5236] border-[#E8DACB] hover:border-[#8C5E3C]/40 shadow-2xs'
            }`}
            title="Asistan Ambus"
          >
            <span className="whitespace-nowrap">Asistan Ambus</span>
          </button>

          {/* Tombol Keranjang Pesanan */}
          <button
            id="btn-open-cart"
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#433024] to-[#36251B] hover:from-[#36251B] hover:to-[#2A1C14] text-[#FFFDF8] font-bold text-xs shadow-xs border border-[#6B4B35]/40 transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Buka Keranjang Pesanan"
          >
            <ShoppingBag className="w-4 h-4 text-[#EAD8C7] group-hover:text-white transition-colors shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">Pesanan</span>
            {totalCartCount > 0 && (
              <span className="flex items-center justify-center min-w-[19px] h-[19px] px-1 rounded-full bg-[#C88A36] text-[#FFFDF8] text-[10px] font-extrabold ring-2 ring-[#433024] shrink-0">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Tombol Profil Pengguna / Login (Desktop) */}
          <div className="hidden lg:block relative">
            {currentUser ? (
              <div>
                <button
                  id="btn-desktop-profile"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[#FFFDF9] hover:bg-[#F6EFE6] border border-[#E8DACB] hover:border-[#8C5E3C] transition-all cursor-pointer shadow-2xs group"
                  title="Profil Pengguna & Diskon"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#8C5E3C]/40"
                  />
                  <div className="text-left leading-tight">
                    <span className="text-xs font-bold text-[#2D2118] block max-w-[85px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-extrabold text-emerald-600 uppercase block tracking-wider">
                      Voucher 15%
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#FFFDF9] border border-[#EFE8DE] shadow-xl p-3.5 z-50 space-y-3"
                    >
                      <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#EFE8DE]">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#8C5E3C]/40 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#2D2118] truncate">{currentUser.name}</div>
                          <div className="text-[10px] text-[#756457] truncate">{currentUser.email}</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1 text-center">
                        <span className="text-[10px] font-bold text-[#8C5E3C] uppercase tracking-wider block">
                          Voucher Diskon 15% Aktif
                        </span>
                        <span className="font-mono text-xs font-bold text-[#2D2118] bg-white px-2.5 py-0.5 rounded-md border border-[#EFE8DE] inline-block shadow-2xs">
                          FIRSTSIP
                        </span>
                        <p className="text-[10px] text-[#756457] mt-0.5">
                          Otomatis terpasang saat checkout
                        </p>
                      </div>

                      <div className="pt-1 flex flex-col gap-1 text-xs">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                            showToast('Berhasil keluar dari akun.', 'info');
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-semibold transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                id="btn-desktop-login"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FFFDF9] hover:bg-[#F6EFE6] text-[#7A5236] border border-[#E8DACB] hover:border-[#8C5E3C] transition-all cursor-pointer shrink-0 shadow-2xs group"
                title="Masuk Akun"
              >
                <User className="w-4 h-4 text-[#8C5E3C] group-hover:scale-105 transition-transform shrink-0" />
                <span className="whitespace-nowrap">Masuk</span>
              </button>
            )}
          </div>

          {/* Tombol Menu Mobile Drawer */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
              isMobileMenuOpen
                ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                : 'bg-[#FFFDF9] text-[#433024] border-[#E8DACB] hover:bg-[#F6EFE6] shadow-2xs'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/35 backdrop-blur-xs z-40 top-[60px]"
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="lg:hidden fixed inset-x-0 top-[60px] bg-[#FAF7F2] border-b border-[#EFE7DC] shadow-2xl z-50 max-h-[calc(100vh-65px)] overflow-y-auto"
            >
              <div className="p-4 sm:p-5 space-y-4">
                {currentUser ? (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#EFE8DE] shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#8C5E3C]/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2D2118] truncate flex items-center gap-1.5">
                          <span>{currentUser.name}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                            15% OFF
                          </span>
                        </div>
                        <div className="text-[11px] text-[#756457] truncate">{currentUser.email}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        showToast('Berhasil keluar dari akun.', 'info');
                      }}
                      className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="Keluar (Logout)"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full p-3 rounded-2xl bg-white border border-[#E8DACB] hover:border-[#8C5E3C] shadow-xs flex items-center justify-between gap-3 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-center justify-center text-[#8C5E3C] group-hover:bg-[#433024] group-hover:text-white transition-colors shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2D2118] flex items-center gap-1.5">
                          <span>Masuk Akun Member</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#C88A36]/15 text-[#8C5E3C] text-[9px] font-bold">
                            Voucher 15%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#756457]">
                          Login instan dengan Google untuk klaim diskon
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#756457] group-hover:text-[#2D2118] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                )}

                <div className="space-y-1.5">
                  <div className="px-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#8C5E3C]">
                    <span className="text-[10px] font-normal text-[#857161]">Ambus Pilihan</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {mobileNavLinks.map((link) => {
                      const isActive = activePage === link.page;
                      const IconComponent = link.icon;

                      return (
                        <button
                          key={link.page}
                          id={`mobile-nav-${link.page}`}
                          onClick={() => handleNavClick(link.page)}
                          className={`group flex items-center gap-2.5 p-2.5 sm:p-3 text-left rounded-xl transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                              : 'bg-[#FFFFFF] text-[#4A3B32] hover:text-[#2D2118] border-[#EFE8DE] hover:border-[#8C5E3C]/40 hover:bg-[#FDFBF7]'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-white/15 text-[#FFFDF8]'
                                : 'bg-[#F6EFE6] text-[#7A5236] group-hover:bg-[#433024] group-hover:text-[#FFFDF8]'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs sm:text-sm font-semibold truncate leading-tight block">
                                {link.label}
                              </span>
                            </div>
                            {link.badge && !isActive && (
                              <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#F6EFE6] text-[#8C5E3C] border border-[#E8DACB]">
                                {link.badge}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card Pintasan AI Sommelier */}
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActivePage('ai_sommelier');
                  }}
                  className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-[#433024] via-[#523B2D] to-[#36251B] text-[#FFFDF8] cursor-pointer shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[10px] font-bold text-[#E5D7C5]">
                        <Sparkles className="w-3.5 h-3.5 text-[#E2B77A]" />
                        <span>AI Sommelier Rasa</span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-[#FFFDF8] leading-tight">
                        Temukan Racikan Kopi Favoritmu
                      </h4>
                      <p className="text-[11px] text-[#D8C7B5] leading-tight">
                        Rekomendasi instan berbasis profil notes rasa & kafein
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#433024] flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute -right-4 -bottom-4 w-24 h-24 border border-white/10 rounded-full pointer-events-none" />
                  <div className="absolute right-4 -top-6 w-16 h-16 border border-white/10 rounded-full pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};