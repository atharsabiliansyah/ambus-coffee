import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Sparkles,
  Bot,
  Coffee,
  Send,
  Lightbulb,
  Zap,
  Flame,
  Layers,
  ArrowRight,
  RefreshCw,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiRecommendation {
  productName: string;
  reason: string;
  flavorNotes: string[];
  brewMethod: string;
  bestPairing: string;
  suggestedAddon: string;
}

export const AiSommelierSection: React.FC = () => {
  const { products, setSelectedProduct, setActivePage } = useShop();

  const [promptInput, setPromptInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null);

  const samplePrompts = [
    'Saya sedang lelah butuh fokus tinggi kerja lembur, suka kopi manis gurih',
    'Suka rasa asam segar buah (citrus/peach), tanpa susu dan diseduh manual',
    'Cuaca lagi hujan dingin, butuh kopi hangat creamy dengan aroma rempah',
    'Cari biji kopi untuk diseduh V60 di rumah dengan aroma melati dan madu'
  ];

  const handleRunAiRecommendation = (query: string) => {
    setIsAnalyzing(true);
    setPromptInput(query);

    // Dynamic AI Coffee Sommelier Engine
    setTimeout(() => {
      const lower = query.toLowerCase();

      let rec: AiRecommendation;
      if (lower.includes('asam') || lower.includes('buah') || lower.includes('citrus') || lower.includes('peach') || lower.includes('manual') || lower.includes('filter')) {
        rec = {
          productName: 'Kopi Filter V60',
          reason: 'Biji kopi 100% Arabica Gayo pilihan diseduh manual dengan metode V60 untuk mengeluarkan aroma bunga segar dan rasa buah alami yang jernih serta lembut di lidah.',
          flavorNotes: ['Sweet Floral', 'Brown Sugar', 'Crisp Citrus', 'Black Tea'],
          brewMethod: 'V60 Pour Over pada suhu 92°C dengan rasio 1:15 (2m 30s extraction)',
          bestPairing: 'Butter Croissant Klasik',
          suggestedAddon: 'Diseduh tanpa gula untuk menikmati kelembutan aroma manis alaminya.'
        };
      } else if (lower.includes('hujan') || lower.includes('hangat') || lower.includes('rempah') || lower.includes('creamy') || lower.includes('susu') || lower.includes('aren')) {
        rec = {
          productName: 'Kopi Susu Gula Aren Ambus',
          reason: 'Perpaduan espresso mantap, susu segar dingin creamy, dan gula aren murni memberikan sensasi manis legit yang sangat pas menemani hari santai Anda.',
          flavorNotes: ['Brown Sugar Aren', 'Creamy Milk', 'Caramelized Sweetness', 'Bold Coffee'],
          brewMethod: 'Espresso blend freshly extracted with fresh cold milk and pure aren',
          bestPairing: 'Roti Bakar Kaya Butter Toast',
          suggestedAddon: 'Less ice dan less sugar jika menyukai cita rasa kopi yang lebih dominan.'
        };
      } else if (lower.includes('biji') || lower.includes('rumah') || lower.includes('beans')) {
        rec = {
          productName: 'Ambus House Blend (250g)',
          reason: 'Perpaduan seimbang biji kopi Arabica & Robusta pilihan yang sangat mudah dan konsisten nikmat saat diseduh di rumah dengan alat apapun.',
          flavorNotes: ['Nutty & Bold', 'Dark Chocolate Richness', 'Brown Sugar Sweetness'],
          brewMethod: 'Espresso Machine, Moka Pot, atau French Press',
          bestPairing: 'Sore hari santai di rumah',
          suggestedAddon: 'Pilih opsi gilingan Medium untuk V60 atau Fine untuk Moka Pot/Espresso.'
        };
      } else {
        rec = {
          productName: 'Iced Caramel Macchiato',
          reason: 'Espresso aromatik berpadu susu segar lembut, sirup vanilla, dan siraman saus karamel leleh yang manis gurih dan membangkitkan mood seketika.',
          flavorNotes: ['Salted Caramel', 'Madagascar Vanilla', 'Rich Espresso', 'Silky Milk'],
          brewMethod: 'Layered espresso over cold vanilla fresh milk with caramel drizzle',
          bestPairing: 'Pain au Chocolat',
          suggestedAddon: 'Tambahan ekstra espresso shot untuk dorongan kafein ekstra.'
        };
      }

      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 900);
  };

  const handleOrderRecommended = () => {
    if (!recommendation) return;
    const match = products.find((p) => p.name.toLowerCase().includes(recommendation.productName.toLowerCase()) || recommendation.productName.toLowerCase().includes(p.name.toLowerCase()));
    if (match) {
      setSelectedProduct(match);
    } else {
      setActivePage('menu');
    }
  };

  return (
    <div id="ai-sommelier-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen text-[#2D2118] space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D2118] leading-tight">
            Konsultasi Rasa Pintar Bersama <span className="text-[#8C5E3C]">Ambus AI</span>
          </h1>
          <p className="text-sm text-[#756457]">
            Ceritakan suasana hati, kebutuhan energi, atau selera rasa Anda. Asisten pintar berbasis neural sensory mapping kami akan merekomendasikan secangkir kopi terbaik untuk momen ini.
          </p>
        </div>

        {/* Sommelier Interactive Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#FFFFFF] border border-[#EFE8DE] p-6 sm:p-10 shadow-xs space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C5E3C]/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Prompt quick suggestions */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#7A5236] font-semibold tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-[#8C5E3C]" />
              <span>Inspirasi Cepat:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunAiRecommendation(p)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#433024] hover:text-[#2D2118] text-xs border border-[#E5D7C5] text-left transition-all cursor-pointer"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (promptInput) handleRunAiRecommendation(promptInput);
            }}
            className="space-y-4"
          >
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Tuliskan di sini: misal 'saya butuh minuman segar tanpa susu untuk meeting sore nanti...' atau 'suka kopi kental manis...'"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] text-sm text-[#2D2118] placeholder-[#9C8B7F] focus:outline-none focus:border-[#8C5E3C]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isAnalyzing || !promptInput}
                className="px-6 py-3.5 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menganalisis Profil Sensorik...</span>
                  </>
                ) : (
                  <>
                  
                    <span>Rekomendasi AI</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Result Card */}
          <AnimatePresence>
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#E5D7C5] shadow-xs space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#EFE8DE] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#433024] text-[#FFFDF8] flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#7A5236] uppercase tracking-wider block font-semibold">
                        Rekomendasi Ambus AI
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2118]">
                        {recommendation.productName}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F4ECE1] text-[#7A5236] text-[11px] font-mono font-bold border border-[#E5D7C5]">
                    99.4% Match
                  </span>
                </div>

                <div className="text-xs text-[#433024] leading-relaxed">
                  <p>{recommendation.reason}</p>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1.5">
                    <span className="text-[#857161] font-mono text-[10px] uppercase block font-semibold">Tasting Notes Unggulan:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {recommendation.flavorNotes.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[#7A5236] font-mono text-[11px] border border-[#E5D7C5] font-medium">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1">
                    <span className="text-[#857161] font-mono text-[10px] uppercase block font-semibold">Metode Ekstraksi Presisi:</span>
                    <p className="text-[#2D2118] font-medium">{recommendation.brewMethod}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1">
                    <span className="text-[#857161] font-mono text-[10px] uppercase block font-semibold">Pasangan Makanan:</span>
                    <p className="text-[#7A5236] font-semibold">{recommendation.bestPairing}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-1">
                    <span className="text-[#857161] font-mono text-[10px] uppercase block font-semibold">Tips Customizer Barista:</span>
                    <p className="text-[#2D2118]">{recommendation.suggestedAddon}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center justify-between">
                  <button
                    onClick={handleOrderRecommended}
                    className="px-6 py-3 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Pesan Menu Ini Sekarang</span>
                  </button>

                  <button
                    onClick={() => handleRunAiRecommendation('Beri alternatif menu lain yang unik')}
                    className="px-4 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#756457] hover:text-[#2D2118] text-xs border border-[#E5D7C5] transition-colors cursor-pointer"
                  >
                    Coba Menu Lain
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3 Pillars of AI Integration in Ambus Roastery */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#2D2118]">
              Bagaimana Ambus Menggabungkan <span className="text-[#8C5E3C]">Keahlian Artisan & AI</span>
            </h2>
            <p className="text-xs text-[#756457]">
              Teknologi tidak menggantikan tangan barista, melainkan menyempurnakan konsistensi kurva sangrai dan kalibrasi air detik demi detik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#7A5236] flex items-center justify-center border border-[#E5D7C5]">
                <Flame className="w-5 h-5 text-[#8C5E3C]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2D2118]">
                Predictive Roasting Curve
              </h3>
              <p className="text-xs text-[#756457] leading-relaxed">
                Algoritma memantau *Rate of Rise* (RoR) suhu drum sangrai Giesen W6A untuk mencegah defect bake atau scorch pada biji kopi langka.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#7A5236] flex items-center justify-center border border-[#E5D7C5]">
                <Zap className="w-5 h-5 text-[#8C5E3C]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2D2118]">
                Water Mineral Calibration
              </h3>
              <p className="text-xs text-[#756457] leading-relaxed">
                Sistem reverse osmosis kami dikalibrasi secara konstan untuk menjaga rasio kalsium & magnesium ideal (SCA target 120-150 ppm).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#7A5236] flex items-center justify-center border border-[#E5D7C5]">
                <Layers className="w-5 h-5 text-[#8C5E3C]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2D2118]">
                Sensory Flavor Mapping
              </h3>
              <p className="text-xs text-[#756457] leading-relaxed">
                Ribuan data cupping notes diintegrasikan ke model AI untuk memandu pelanggan menemukan racikan yang selaras dengan preferensi pribadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
