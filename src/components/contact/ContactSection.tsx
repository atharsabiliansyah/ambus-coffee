import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { FAQ_ITEMS } from '../../data/mockData';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Private Event & Gathering');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjectOptions = [
    'Private Event & Gathering',
    'B2B Wholesale Biji Kopi untuk Kedai & Restoran',
    'Kolaborasi Brand & Sesi Komunitas',
    'Pertanyaan Menu & Masukan Pengalaman'
  ];

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Harap lengkapi semua bidang formulir.', 'error');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast('Pesan Anda berhasil dikirim! Tim kami akan membalas dalam 1x24 jam.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div id="contact-page" className="relative z-10 pt-24 sm:pt-28 pb-20 bg-[#FAF7F2] min-h-screen text-[#2D2118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Section */}
        <div className="text-left max-w-2xl space-y-2.5 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DE] text-[#8C5E3C] text-[11px] font-bold uppercase tracking-wider">
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2118] leading-tight">
            Terhubung Bersama <span className="text-[#8C5E3C]">Ambus Coffee</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#756457] leading-relaxed">
            Ingin mengadakan private event, kemitraan B2B suplai biji kopi sangrai, atau sekadar berdiskusi seputar seduhan? Kami siap menyambut Anda.
          </p>
        </div>

        {/* Contact Info Grid + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Side: Contact Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#EFE8DE] space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#433024] text-[#FFFDF8] flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#2D2118] text-base">
                    Chat via WhatsApp
                  </h4>
                  <p className="text-xs text-[#8C5E3C] font-semibold">
                    Respons cepat barista & concierge
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-[#756457] leading-relaxed">
                Butuh konfirmasi instan untuk reservasi meja rombongan atau ketersediaan stok biji kopi specialty?
              </p>

              <a
                href="https://wa.me/6281299887766?text=Halo%20Ambus%20Coffee,%20saya%20ingin%20bertanya%20mengenai..."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#433024] to-[#2D2118] hover:from-[#36251B] hover:to-[#221610] text-[#FFFDF8] font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi (+62 812-9988-7766)</span>
              </a>
            </div>

            {/* Address, Hours & Email Card */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#EFE8DE] space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#8C5E3C] flex items-center justify-center shrink-0 border border-[#E8DACB] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="uppercase text-[#8C5E3C] font-bold text-[10px] tracking-wider block">
                    Lokasi Flagship:
                  </span>
                  <p className="font-bold text-[#2D2118] text-sm">Ambus Senopati Flagship Store</p>
                  <p className="text-[#756457] leading-relaxed">Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2EAE0] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#8C5E3C] flex items-center justify-center shrink-0 border border-[#E8DACB] mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="uppercase text-[#8C5E3C] font-bold text-[10px] tracking-wider block">
                    Jam Operasional:
                  </span>
                  <p className="text-[#2D2118] font-medium">Senin - Jumat: <strong className="text-[#2D2118]">07:00 - 22:00 WIB</strong></p>
                  <p className="text-[#2D2118] font-medium">Sabtu - Minggu: <strong className="text-[#2D2118]">07:00 - 23:00 WIB</strong></p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2EAE0] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#8C5E3C] flex items-center justify-center shrink-0 border border-[#E8DACB] mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="uppercase text-[#8C5E3C] font-bold text-[10px] tracking-wider block">
                    Email Bisnis & Kemitraan:
                  </span>
                  <p className="text-[#2D2118] font-semibold">hello@ambuscoffee.id</p>
                  <p className="text-[#756457]">b2b@ambuscoffee.id</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form with Custom Styled Dropdown */}
          <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#E8DACB] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="space-y-1 border-b border-[#F2EAE0] pb-3.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8C5E3C] block">
                Formulir Manajemen
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2118]">
                Kirim Pesan
              </h3>
              <p className="text-xs text-[#756457] leading-relaxed">
                Pilih kebutuhan layanan Anda dan diskusikan langsung bersama tim kami.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              
              {/* Custom Styled Dropdown (Persis seperti Dropdown Menu) */}
              <div className="space-y-1.5 relative" ref={dropdownRef}>
                <label className="text-xs font-bold text-[#4A3B32] block">
                  Keperluan Layanan
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full px-4 py-3 rounded-2xl bg-white border text-left text-xs font-medium text-[#2D2118] flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                    isDropdownOpen 
                      ? 'border-[#8C5E3C] ring-2 ring-[#8C5E3C]/20 shadow-xs' 
                      : 'border-[#E8DACB] hover:border-[#8C5E3C]/60'
                  }`}
                >
                  <span className="truncate">{subject}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C5E3C] shrink-0 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Floating Menu Popover */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-[#FFFDF9] border border-[#EAE1D3] rounded-2xl shadow-xl p-1.5 z-50 space-y-1"
                    >
                      {subjectOptions.map((option) => {
                        const isSelected = subject === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setSubject(option);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#FAF7F2] text-[#8C5E3C] font-bold'
                                : 'text-[#4A3B32] hover:bg-[#F6EFE6] hover:text-[#2D2118]'
                            }`}
                          >
                            <span className="truncate">{option}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#8C5E3C] shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Data Diri Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#4A3B32] block">
                    Nama Lengkap <span className="text-[#8C5E3C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2D2118] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C]/20 focus:border-[#8C5E3C] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#4A3B32] block">
                    Alamat Email <span className="text-[#8C5E3C]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2D2118] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C]/20 focus:border-[#8C5E3C] transition-all"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3B32] block">
                  Detail Pesan <span className="text-[#8C5E3C]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan detail rencana event, perkiraan tanggal, atau pertanyaan Anda di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2D2118] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C]/20 focus:border-[#8C5E3C] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#433024] to-[#2D2118] hover:from-[#36251B] hover:to-[#221610] text-[#FFFDF8] font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <span>Mengirimkan Pesan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-10 border-t border-[#EFE8DE]">
          <div className="text-left max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DE] text-[#8C5E3C] text-[11px] font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Pusat Informasi</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D2118]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#756457]">
              Pertanyaan umum mengenai tata cara pemesanan, reservasi ruang, dan suplai biji kopi.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#FFFDF9] border-[#8C5E3C]/40 shadow-sm'
                      : 'bg-[#FFFDF9] border-[#EFE8DE] hover:border-[#8C5E3C]/30'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-[#2D2118]">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#433024] text-[#FFFDF8]'
                          : 'bg-[#FAF7F2] text-[#8C5E3C]'
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#756457] leading-relaxed border-t border-[#F2EAE0]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};