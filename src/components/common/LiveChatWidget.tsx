import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  Coffee,
  Calendar,
  Phone,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const LiveChatWidget: React.FC = () => {
  const { setActivePage } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Halo! Selamat datang di Ambus Coffee. Ada yang bisa kami bantu? Rekomendasi kopi, status pesanan, atau reservasi meja',
      timestamp: 'Baru saja'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Dynamic Barista AI Reply
    setTimeout(() => {
      let replyText = 'Terima kasih telah menyapa! Barista Ambus selalu siap membantu Anda.';
      const lower = userText.toLowerCase();

      if (lower.includes('menu') || lower.includes('katalog') || lower.includes('pesan')) {
        replyText = 'Anda bisa melihat katalog menu lengkap dan langsung memesan dengan mengklik halaman Menu di atas!';
      } else if (lower.includes('buka') || lower.includes('lokasi') || lower.includes('alamat')) {
        replyText = 'Kami berlokasi di Senopati, Braga, dan Canggu. Buka setiap hari mulai pukul 07:00 - 23:00 WIB.';
      } else if (lower.includes('meja') || lower.includes('reservasi') || lower.includes('booking')) {
        replyText = 'Anda bisa memilih meja indoor, slow bar, atau terrace garden di menu "Reservasi" secara praktis.';
      } else if (lower.includes('rekomendasi') || lower.includes('enak') || lower.includes('favorit')) {
        replyText = 'Menu signature terfavorit kami adalah "Ambus Velvet Cream Latte" dan "Ambus Dirty Latte Double Ristretto".';
      }

      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            id="btn-open-live-chat"
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-[#433024] text-[#FFFDF8] flex items-center justify-center shadow-xl hover:bg-[#302016] hover:scale-105 transition-all cursor-pointer border border-[#8C6B52]/40"
            title="Chat Barista & Concierge"
          >
            <MessageSquare className="w-6 h-6 text-[#FFFDF8]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] sm:w-96 rounded-3xl bg-[#FAF7F2] border border-[#EFE8DE] shadow-2xl overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="p-4 bg-[#FFFFFF] border-b border-[#EFE8DE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#433024] text-[#FFFDF8] flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2D2118]">
                    Ambus Concierge
                  </h4>
                  <p className="text-[10px] text-[#8C5E3C] font-semibold">
                    Online • Respon Cepat
                  </p>
                </div>
              </div>

              <button
                id="btn-close-live-chat"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[#857161] hover:text-[#2D2118] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF7F2]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                      m.sender === 'user'
                        ? 'bg-[#433024] text-[#FFFDF8] font-medium rounded-br-none shadow-xs'
                        : 'bg-[#FFFFFF] text-[#2D2118] border border-[#EFE8DE] rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span
                      className={`text-[9px] block mt-1 ${
                        m.sender === 'user' ? 'text-[#E5D7C5]' : 'text-[#857161]'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Bar */}
            <div className="px-3 py-2 bg-[#FFFFFF] border-t border-[#EFE8DE] flex gap-1.5 overflow-x-auto text-[10px] scrollbar-none">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActivePage('menu');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F4ECE1] text-[#7A5236] hover:bg-[#EAE0D3] whitespace-nowrap border border-[#E5D7C5] font-medium cursor-pointer"
              >
                ☕ Lihat Menu
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActivePage('reservation');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F4ECE1] text-[#7A5236] hover:bg-[#EAE0D3] whitespace-nowrap border border-[#E5D7C5] font-medium cursor-pointer"
              >
                Reservasi Meja
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActivePage('ai_sommelier');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F4ECE1] text-[#7A5236] hover:bg-[#EAE0D3] whitespace-nowrap border border-[#E5D7C5] font-medium cursor-pointer"
              >
                AI Sommelier
              </button>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#EFE8DE] flex gap-2">
              <input
                type="text"
                placeholder="Tulis pesan untuk barista..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5D7C5] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
