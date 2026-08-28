import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { X, Sparkles, User, CheckCircle2, Lock, ArrowRight, Coffee } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, showToast, setActivePage } = useShop();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);

    // Open real Google OAuth Account Chooser in popup
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1015883166374-demo.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(
      window.location.origin
    )}&response_type=token&scope=email%20profile&prompt=select_account`;

    window.open(googleAuthUrl, '_blank', 'width=500,height=600,left=200,top=100');

    setTimeout(() => {
      login({
        id: `google_${Date.now()}`,
        name: 'Mathar Sabiliansyah',
        email: 'matharsabiliansyah@gmail.com',
        phone: '0812-8899-7721',
        points: 250,
        memberTier: 'Gold Roaster',
        voucherCount: 3,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'customer'
      });
      setIsLoading(false);
      setIsAuthModalOpen(false);
      showToast('Berhasil masuk dengan Google! Voucher diskon 15% (FIRSTSIP) aktif.', 'success');
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      login({
        id: `user_${Date.now()}`,
        name: name.trim() || email.split('@')[0],
        email: email.trim(),
        points: 100,
        memberTier: 'Bronze Member',
        voucherCount: 1,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        role: 'customer'
      });
      setIsLoading(false);
      setIsAuthModalOpen(false);
      showToast('Selamat bergabung! Voucher 15% telah ditambahkan ke akun Anda.', 'success');
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EFE8DE] overflow-hidden z-10"
        >
          {/* Header Banner with Cafe Ambiance Image */}
          <div className="relative p-6 text-[#FFFDF8] overflow-hidden">
            {/* Background Ambiance Image */}
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
              alt="Suasana Cafe Ambus"
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Dark Warm Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#20150E]/95 via-[#2D1F16]/80 to-[#2D1F16]/60 backdrop-blur-[1px]" />

            <div className="relative z-10">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute right-0 -top-1 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white transition-colors cursor-pointer backdrop-blur-xs border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C88A36]/80 backdrop-blur-sm text-white text-[11px] font-bold border border-[#F5D8AC]/40 mb-3 shadow-xs">
                <span>VOUCHER DISKON 15%</span>
              </div>

              <h3 className="font-serif text-2xl font-bold leading-tight text-white drop-shadow-sm">
                {authMode === 'login' ? 'Masuk ke Ambus Society' : 'Daftar Member Eksklusif'}
              </h3>
              <p className="text-xs text-[#EFE5DA] mt-1.5 leading-relaxed drop-shadow-xs max-w-[90%]">
                Dapatkan voucher diskon 15% pesanan pertama dan kumpulkan poin reward seduhan.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Primary Google Login Button */}
            <button
              id="btn-google-oauth-modal"
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-[#FAF7F2] text-[#2D2118] font-bold text-xs sm:text-sm border border-[#E8DACB] hover:border-[#8C5E3C] shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer group active:scale-98"
            >
              {/* Google Vector Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isLoading ? 'Menghubungkan ke Google...' : 'Lanjutkan dengan Akun Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-[#EFE8DE] flex-1" />
              <span className="text-[11px] font-medium text-[#A39282] uppercase tracking-wider">
                atau via email
              </span>
              <div className="h-px bg-[#EFE8DE] flex-1" />
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4A3B32]">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A39282] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2D2118] placeholder-[#A39282] focus:outline-none focus:border-[#8C5E3C]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#4A3B32]">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2D2118] placeholder-[#A39282] focus:outline-none focus:border-[#8C5E3C]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#4A3B32]">Kata Sandi</label>
                  {authMode === 'login' && (
                    <span className="text-[11px] text-[#8C5E3C] hover:underline cursor-pointer">
                      Lupa sandi?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A39282] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2D2118] placeholder-[#A39282] focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#433024] hover:bg-[#36251B] text-[#FFFDF8] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 mt-2"
              >
                <span>{authMode === 'login' ? 'MASUK' : 'Daftar & Klaim Voucher 15%'}</span>
              
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="pt-2 text-center text-xs text-[#756457]">
              {authMode === 'login' ? (
                <p>
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="font-bold text-[#8C5E3C] hover:underline cursor-pointer"
                  >
                    Daftar di sini
                  </button>
                </p>
              ) : (
                <p>
                  Sudah memiliki akun?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="font-bold text-[#8C5E3C] hover:underline cursor-pointer"
                  >
                    Masuk sekarang
                  </button>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
