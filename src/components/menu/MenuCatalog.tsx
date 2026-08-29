import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, ProductCategory } from '../../types';
import {
  Search,
  Grid,
  List,
  FileText,
  Plus,
  Star,
  Coffee,
  Printer,
  SlidersHorizontal,
  X,
  Filter,
  ChevronDown,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedItem } from '../ui/AnimatedList';

export const MenuCatalog: React.FC = () => {
  const { products, setSelectedProduct } = useShop();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'pdf_card'>('grid');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'signature', label: 'Signature Ambus' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'manual_brew', label: 'Manual Brew' },
    { id: 'non_coffee', label: 'Non-Coffee & Tea' },
    { id: 'food_pastry', label: 'Pastry & Kitchen' },
    { id: 'beans', label: 'Biji Kopi' },
    { id: 'merchandise', label: 'Merchandise' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Paling Populer' },
    { id: 'rating', label: 'Rating Tertinggi' },
    { id: 'price_low', label: 'Harga: Rendah ke Tinggi' },
    { id: 'price_high', label: 'Harga: Tinggi ke Rendah' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtering
  const filteredProducts = products.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tastingNotes && item.tastingNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === 'all' ||
      (selectedTag === 'bestseller' && item.badge === 'Best Seller') ||
      (selectedTag === 'seasonal' && item.isSeasonal) ||
      (selectedTag === 'singleorigin' && item.badge === 'Single Origin');

    return matchesCategory && matchesSearch && matchesTag;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
  });

  const handlePrintMenu = () => {
    window.print();
  };

  const currentSortLabel = sortOptions.find((opt) => opt.id === sortBy)?.label || 'Paling Populer';

  return (
    <div id="menu-catalog-page" className="pt-28 sm:pt-32 pb-16 bg-[#FAF7F2] min-h-screen space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="text-left max-w-3xl space-y-3 pt-4">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2118] leading-tight">
            Menu & Produk <span className="text-[#8C5E3C]">Ambus Coffee</span>
          </h1>
          <p className="text-sm sm:text-base text-[#756457] max-w-2xl leading-relaxed">
            Pilih dari kopi susu signature, espresso klasik nikmat, seduhan manual filter hingga kemasan biji kopi pilihan
          </p>
        </div>

        {/* Search, Filter & View Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#857161] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-menu-search"
                type="text"
                placeholder="Cari menu"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#FFFFFF] border border-[#EFE8DE] text-xs text-[#2D2118] placeholder-[#857161] focus:outline-none focus:border-[#8C5E3C] shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#857161] hover:text-[#2D2118] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Controls Bar: Modern Dropdown & View Mode Switcher */}
            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
              {/* Custom Sort Dropdown */}
              <div ref={sortDropdownRef} className="relative">
                <button
                  type="button"
                  id="btn-sort-dropdown"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-[#FFFFFF] px-4 py-2.5 rounded-full border border-[#EFE8DE] text-xs text-[#2D2118] font-semibold shadow-xs hover:border-[#8C5E3C] transition-all cursor-pointer select-none"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>{currentSortLabel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#857161] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Popover Menu Sort */}
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 left-0 md:left-auto md:right-0 w-56 bg-[#FFFFFF] rounded-2xl border border-[#EFE8DE] shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {sortOptions.map((item) => {
                        const isSelected = sortBy === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSortBy(item.id as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#F8F3EC] text-[#433024] font-bold'
                                : 'text-[#756457] hover:bg-[#FAF7F2] hover:text-[#2D2118]'
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#8C5E3C]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center bg-[#FFFFFF] p-1 rounded-full border border-[#EFE8DE] shadow-xs shrink-0">
                <button
                  id="btn-view-grid"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#433024] text-[#FFFDF8] shadow-xs'
                      : 'text-[#857161] hover:text-[#2D2118]'
                  }`}
                  title="Tampilan Grid"
                >
                  <Grid className="w-4 h-4" />
                </button>

                <button
                  id="btn-view-list"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#433024] text-[#FFFDF8] shadow-xs'
                      : 'text-[#857161] hover:text-[#2D2118]'
                  }`}
                  title="Tampilan List Menu"
                >
                  <List className="w-4 h-4" />
                </button>

                <button
                  id="btn-view-pdf"
                  onClick={() => setViewMode('pdf_card')}
                  className={`p-2 rounded-full transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    viewMode === 'pdf_card'
                      ? 'bg-[#433024] text-[#FFFDF8] shadow-xs'
                      : 'text-[#857161] hover:text-[#2D2118]'
                  }`}
                  title="Digital PDF Menu Card Preview"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">PDF Menu</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Horizontal Scroll Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs font-bold'
                      : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118] hover:border-[#8C5E3C]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Subtag filters */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-[#857161] flex items-center gap-1 text-[11px] font-medium mr-1">
              <Filter className="w-3 h-3 text-[#8C5E3C]" /> Filter:
            </span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#756457] border border-[#EFE8DE] hover:text-[#2D2118]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedTag('bestseller')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === 'bestseller'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#756457] border border-[#EFE8DE] hover:text-[#2D2118]'
              }`}
            >
              Best Seller
            </button>
            <button
              onClick={() => setSelectedTag('seasonal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === 'seasonal'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#756457] border border-[#EFE8DE] hover:text-[#2D2118]'
              }`}
            >
              Seasonal
            </button>
            <button
              onClick={() => setSelectedTag('singleorigin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === 'singleorigin'
                  ? 'bg-[#433024] text-[#FFFDF8] shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#756457] border border-[#EFE8DE] hover:text-[#2D2118]'
              }`}
            >
              Single Origin Nusantara
            </button>
          </div>
        </div>

        {/* CONTENT DISPLAY MODES */}

        {/* 1. GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="group cursor-pointer rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] hover:border-[#8C5E3C]/50 hover:shadow-xl p-4 flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F7EFE6]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {prod.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md text-[10px] font-bold text-[#63432C] border border-[#E8DACB] shadow-xs">
                        {prod.badge}
                      </span>
                    )}

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md text-[11px] text-[#2D2118] font-bold border border-[#E8DACB] shadow-xs">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#857161] font-semibold">
                      {prod.categoryLabel}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#2D2118] group-hover:text-[#8C5E3C] transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#756457] leading-relaxed line-clamp-2">
                      {prod.shortDesc}
                    </p>

                    {prod.tastingNotes && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {prod.tastingNotes.slice(0, 2).map((note, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#F8F3EC] text-[#63432C] text-[9px] font-medium border border-[#EADDCF]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EFE8DE] flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#2D2118]">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    id={`btn-menu-add-${prod.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(prod);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#433024] hover:bg-[#2D2118] text-[#FFFDF8] font-bold text-xs flex items-center gap-1 shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pesan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {sortedProducts.map((prod, index) => (
              <AnimatedItem
                key={prod.id}
                index={index}
                delay={0.03 * (index % 6)}
                onClick={() => setSelectedProduct(prod)}
                className="w-full"
              >
                <div className="group p-3.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DE] hover:border-[#8C5E3C] flex items-center justify-between gap-3 sm:gap-4 transition-all shadow-xs hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-[#EFE8DE] shadow-2xs"
                    />

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-[#2D2118] group-hover:text-[#8C5E3C] transition-colors truncate">
                          {prod.name}
                        </h3>
                        {prod.badge && (
                          <span className="whitespace-nowrap px-2 py-0.5 rounded-md bg-[#F6EFE6] text-[10px] font-semibold text-[#63432C] border border-[#E8DACB] shrink-0">
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#756457] line-clamp-1">
                        {prod.shortDesc}
                      </p>

                      {prod.tastingNotes && prod.tastingNotes.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A5236] truncate">
                          <span className="font-semibold text-[#857161] shrink-0 text-[10px] uppercase tracking-wider">Notes:</span>
                          <span className="truncate font-medium">
                            {prod.tastingNotes.slice(0, 2).join(' • ')}
                            {prod.tastingNotes.length > 2 && (
                              <span className="text-[#857161] text-[10px] ml-1">+{prod.tastingNotes.length - 2}</span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 shrink-0 pl-1">
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-bold text-[#2D2118] whitespace-nowrap">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      id={`btn-list-order-${prod.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(prod);
                      }}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Pilih</span>
                    </button>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        )}

        {/* 3. DIGITAL PDF MENU CARD PREVIEW */}
        {viewMode === 'pdf_card' && (
          <div className="rounded-2xl bg-[#FFFFFF] text-[#2D2118] p-6 sm:p-10 shadow-md border border-[#EFE8DE] space-y-8 max-w-4xl mx-auto font-serif">
            <div className="flex items-center justify-between pb-6 border-b border-[#EFE8DE] font-sans">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8C5E3C] font-bold">
                  Official Printable Restaurant Card
                </span>
                <h3 className="text-lg font-bold text-[#2D2118]">Menu Ambus</h3>
              </div>
              <button
                id="btn-print-menu"
                onClick={handlePrintMenu}
                className="px-4 py-2 rounded-xl bg-[#433024] text-[#FFFDF8] text-xs font-bold flex items-center gap-2 hover:bg-[#302016] transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Menu</span>
              </button>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-widest text-[#2D2118]">
                AMBUS COFFEE
              </h2>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8C5E3C] font-semibold">
                Artisanal Specialty Coffee & Roastery • Est. 2026
              </p>
              <div className="w-16 h-0.5 bg-[#8C5E3C] mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans">
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold uppercase tracking-wider text-[#8C5E3C] border-b border-[#EFE8DE] pb-1 mb-3">
                    Signature Ambus
                  </h4>
                  <div className="space-y-4">
                    {products.filter((p) => p.category === 'signature').map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{item.name}</span>
                          <span className="text-xs text-[#8C5E3C] font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-xs text-[#756457] italic">{item.shortDesc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold uppercase tracking-wider text-[#8C5E3C] border-b border-[#EFE8DE] pb-1 mb-3">
                    Espresso Bar
                  </h4>
                  <div className="space-y-4">
                    {products.filter((p) => p.category === 'espresso').map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{item.name}</span>
                          <span className="font-mono text-xs text-[#8C5E3C]">Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-xs text-[#756457] italic font-sans">{item.shortDesc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold uppercase tracking-wider text-[#8C5E3C] border-b border-[#EFE8DE] pb-1 mb-3">
                    Single Origin Nusantara
                  </h4>
                  <div className="space-y-4">
                    {products.filter((p) => p.category === 'manual_brew').map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{item.name}</span>
                          <span className="font-mono text-xs text-[#8C5E3C]">Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-xs text-[#756457] italic font-sans">{item.shortDesc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold uppercase tracking-wider text-[#8C5E3C] border-b border-[#EFE8DE] pb-1 mb-3">
                     Pastry & Bakery
                  </h4>
                  <div className="space-y-4">
                    {products.filter((p) => p.category === 'food_pastry').map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{item.name}</span>
                          <span className="font-mono text-xs text-[#8C5E3C]">Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-xs text-[#756457] italic font-sans">{item.shortDesc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EFE8DE] text-center font-sans text-xs text-[#857161] space-y-1">
              <p className="font-semibold text-[#8C5E3C]">Pajak Restoran 11% (PPN) diterapkan pada saat checkout.</p>
              <p>Opsi Susu Nabati Oat Milk / Almond Milk & Decaf tersedia berdasarkan permintaan.</p>
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16 space-y-3 bg-[#FFFFFF] rounded-2xl border border-[#EFE8DE]">
            <Coffee className="w-10 h-10 text-[#857161] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#2D2118]">Tidak Ada Menu yang Cocok</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedTag('all');
              }}
              className="px-4 py-2 rounded-full bg-[#433024] text-[#FFFDF8] font-bold text-xs cursor-pointer hover:bg-[#2D2118] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};