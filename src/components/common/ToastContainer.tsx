import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2rem)] sm:w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#FFFFFF]/98 text-[#2D2118] border-[#8C5E3C]/40 shadow-[#432E20]/10'
                : toast.type === 'error'
                ? 'bg-red-50/98 text-red-900 border-red-200 shadow-red-900/10'
                : toast.type === 'warning'
                ? 'bg-amber-50/98 text-amber-950 border-amber-200 shadow-amber-950/10'
                : 'bg-[#F4ECE1]/98 text-[#2D2118] border-[#E5D7C5] shadow-[#432E20]/10'
            }`}
          >
            <div className="shrink-0">
              {toast.type === 'success' && (
                <div className="w-7 h-7 rounded-full bg-[#F4ECE1] text-[#7A5236] flex items-center justify-center border border-[#E5D7C5]">
                  <CheckCircle2 className="w-4 h-4 text-[#7A5236]" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center border border-red-200">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'warning' && (
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-7 h-7 rounded-full bg-[#F4ECE1] text-[#7A5236] flex items-center justify-center border border-[#E5D7C5]">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="flex-1 text-xs sm:text-sm font-medium leading-snug text-[#2D2118]">
              {toast.message}
            </div>
            <button
              id={`btn-close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-[#857161] hover:text-[#2D2118] p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer shrink-0"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
