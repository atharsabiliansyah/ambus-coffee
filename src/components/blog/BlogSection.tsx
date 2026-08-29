import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { BLOG_ARTICLES } from '../../data/mockData';
import { BlogArticle } from '../../types';
import {
  BookOpen,
  Clock,
  User,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  Share2,
  Bookmark,
  Coffee,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogSection: React.FC = () => {
  const { showToast } = useShop();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'Semua Artikel' },
    { id: 'Tips Seduh', label: 'Tips Seduh Manual' },
    { id: 'Origin Story', label: 'Origin & Perkebunan' },
    { id: 'Coffee Science', label: 'Sains Kopi & Roasting' }
  ];

  const filteredArticles = activeCategory === 'all'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter((a) => a.category === activeCategory);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      showToast('Artikel dihapus dari bookmark', 'info');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast('Artikel disimpan ke bookmark', 'success');
    }
  };

  return (
    <div id="blog-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen text-[#2D2118] space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header (Rata kiri sejajar penuh dengan grid kartu artikel) */}
        <div className="w-full text-left space-y-3 pt-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D2118] tracking-tight">
            Eksplorasi Dunia <span className="text-[#8C5E3C]">Kopi Spesial</span>
          </h1>
          <p className="text-sm sm:text-base text-[#756457] max-w-2xl leading-relaxed">
            Panduan teknik seduh barista, cerita perjalanan origin biji kopi, hingga rahasia rasa kopi sangrai berkualitas tinggi.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-start gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] font-bold shadow-xs'
                  : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118] hover:border-[#E5D7C5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            return (
              <motion.article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] hover:border-[#8C5E3C] p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Banner */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-mono text-[#7A5236] font-semibold border border-[#E5D7C5]">
                      {article.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`absolute top-3 right-3 p-1.5 rounded-md backdrop-blur-md border border-[#E5D7C5] transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-[#433024] text-[#FFFDF8]'
                          : 'bg-white/80 text-[#756457] hover:text-[#2D2118]'
                      }`}
                      title={isBookmarked ? 'Tersimpan' : 'Simpan Artikel'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-[11px] text-[#857161] font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8C5E3C]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C5E3C]" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#2D2118] group-hover:text-[#8C5E3C] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#756457] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author footer */}
                <div className="pt-3 border-t border-[#EFE8DE] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="w-6 h-6 rounded-full object-cover border border-[#E5D7C5]"
                    />
                    <span className="text-xs font-semibold text-[#7A5236]">{article.author}</span>
                  </div>
                  <span className="text-xs text-[#8C5E3C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-3xl w-full bg-[#FFFFFF] rounded-3xl border border-[#EFE8DE] shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#2D2118] flex items-center justify-center border border-[#E5D7C5] transition-colors shadow-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
                {/* Header info */}
                <div className="space-y-3 border-b border-[#EFE8DE] pb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#F4ECE1] text-xs font-mono text-[#7A5236] font-semibold border border-[#E5D7C5]">
                      {selectedArticle.category}
                    </span>
                    <span className="text-xs text-[#857161] font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8C5E3C]" /> {selectedArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2118]">
                    {selectedArticle.title}
                  </h2>

                  <div className="flex items-center gap-3 pt-1">
                    <img
                      src={selectedArticle.authorAvatar}
                      alt={selectedArticle.author}
                      className="w-8 h-8 rounded-full object-cover border border-[#E5D7C5]"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-[#2D2118]">{selectedArticle.author}</div>
                      <div className="text-[#857161] font-mono">{selectedArticle.date}</div>
                    </div>
                  </div>
                </div>

                {/* Hero image */}
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#EFE8DE]">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="text-sm text-[#433024] leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {selectedArticle.content}
                </div>

                {/* Tags & share footer */}
                <div className="pt-6 border-t border-[#EFE8DE] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-xs text-[#7A5236] font-mono border border-[#E5D7C5] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast('Tautan artikel disalin ke clipboard!', 'success');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE1] text-xs font-semibold text-[#2D2118] border border-[#E5D7C5] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#8C5E3C]" />
                    <span>Bagikan Artikel</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};