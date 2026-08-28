import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, ProductOption } from '../../types';
import {
  X,
  Plus,
  Minus,
  Star,
  ShoppingBag,
  Sparkles,
  Mountain,
  Flame,
  Check,
  Coffee,
  Heart,
  Droplet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalContentProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, options: ProductOption, specialNotes: string) => void;
}

const ProductDetailModalContent: React.FC<ModalContentProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [iceLevel, setIceLevel] = useState<ProductOption['iceLevel']>('Normal Ice');
  const [sweetness, setSweetness] = useState<ProductOption['sweetness']>('Normal (100%)');
  const [milkType, setMilkType] = useState<ProductOption['milkType']>('Fresh Milk');
  const [extraShot, setExtraShot] = useState(false);
  const [grindSize, setGrindSize] = useState<ProductOption['grindSize']>('Medium (V60/Aeropress)');
  const [specialNotes, setSpecialNotes] = useState('');

  // Calculate dynamic unit price
  let additionalCost = 0;
  if (milkType?.includes('+Rp 8.000')) additionalCost += 8000;
  if (milkType?.includes('+Rp 10.000')) additionalCost += 10000;
  if (milkType?.includes('+Rp 6.000')) additionalCost += 6000;
  if (extraShot) additionalCost += 8000;

  const singlePrice = product.price + additionalCost;
  const totalPrice = singlePrice * quantity;

  const isBeverage =
    product.category === 'signature' ||
    product.category === 'espresso' ||
    product.category === 'non_coffee' ||
    product.category === 'manual_brew';
  const isBean = product.category === 'beans';

  const handleConfirmAddToCart = () => {
    const options: ProductOption = {};
    if (isBeverage && product.category !== 'manual_brew') {
      options.iceLevel = iceLevel;
      options.sweetness = sweetness;
    }
    if (product.category === 'espresso' || product.category === 'signature') {
      options.milkType = milkType;
      options.extraShot = extraShot;
    }
    if (isBean) {
      options.grindSize = grindSize;
    }

    onAddToCart(product, quantity, options, specialNotes);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-lg w-full bg-[#FFFFFF] rounded-2xl border border-[#EFE8DE] shadow-xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#2D2118] hover:text-[#8C5E3C] flex items-center justify-center border border-[#EFE8DE] shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-[#FAF7F2]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div className="space-y-0.5 min-w-0">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-white/90 text-[#63432C] shadow-xs">
                {product.categoryLabel}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white truncate drop-shadow-xs">
                {product.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[50vh] overflow-y-auto">
          {/* Rating & Description */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#2D2118]">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-[#857161]">({product.reviewCount} ulasan)</span>
              {product.calories && (
                <>
                  <span className="text-[#E5D7C5]">•</span>
                  <span className="text-[#756457] text-[11px] font-medium">{product.calories} kkal</span>
                </>
              )}
            </div>
            <p className="text-xs text-[#6B5A4D] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tasting Notes & Origin Specs */}
          {(product.tastingNotes || product.origin) && (
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-2">
              {product.tastingNotes && (
                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-[#7A5236] tracking-wider font-semibold">
                    Tasting Notes
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#FFFFFF] text-[#63432C] text-[11px] border border-[#E8DACB] font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.origin && (
                <div className="pt-2 border-t border-[#EFE8DE] grid grid-cols-2 gap-2 text-[11px] text-[#756457]">
                  <div>
                    <span className="text-[#857161] block text-[9px] uppercase font-medium">Origin:</span>
                    <span className="text-[#2D2118] font-semibold">{product.origin}</span>
                  </div>
                  {product.roastLevel && (
                    <div>
                      <span className="text-[#857161] block text-[9px] uppercase font-medium">Roast Level:</span>
                      <span className="text-[#2D2118] font-semibold">{product.roastLevel}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Customization Section for Drinks */}
          {isBeverage && product.category !== 'manual_brew' && (
            <div className="space-y-3 pt-1 border-t border-[#EFE8DE]">
              <h4 className="text-xs font-bold text-[#2D2118] uppercase tracking-wide">
                Kustomisasi Minuman
              </h4>

              {/* Ice Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#756457] font-medium">Ice Level:</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Normal Ice', 'Less Ice', 'No Ice', 'Hot'] as ProductOption['iceLevel'][]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setIceLevel(level)}
                      className={`py-1.5 px-1 text-center rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        iceLevel === level
                          ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                          : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#756457] font-medium">Tingkat Manis Sweetness:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Normal 100%', 'Less Sweet 50%', 'No Sugar 0%'] as unknown as ProductOption['sweetness'][]).map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSweetness(sw)}
                      className={`py-1.5 px-1 text-center rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        sweetness === sw
                          ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                          : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk selection (if milk based) */}
              {(product.category === 'espresso' || product.category === 'signature') && (
                <div className="space-y-1.5">
                  <label className="text-[11px] text-[#756457] font-medium">Pilihan Susu:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['Fresh Milk', 'Oat Milk +Rp 8.000', 'Almond Milk +Rp 10.000', 'Soy Milk +Rp 6.000'] as ProductOption['milkType'][]).map((milk) => (
                      <button
                        key={milk}
                        type="button"
                        onClick={() => setMilkType(milk)}
                        className={`p-2 text-left rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                          milkType === milk
                            ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                            : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                        }`}
                      >
                        {milk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Shot checkbox */}
              {(product.category === 'espresso' || product.category === 'signature') && (
                <div>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] cursor-pointer hover:border-[#8C5E3C]">
                    <input
                      type="checkbox"
                      checked={extraShot}
                      onChange={(e) => setExtraShot(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#433024] rounded"
                    />
                    <span className="text-[11px] text-[#2D2118] font-medium">Extra Shot Espresso +Rp 8.000</span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Customization for Whole Beans */}
          {isBean && (
            <div className="space-y-2 pt-1 border-t border-[#EFE8DE]">
              <h4 className="text-xs font-bold text-[#2D2118] uppercase tracking-wide">
                Pilihan Gilingan Biji Kopi
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {(['Whole Bean', 'Coarse', 'Medium', 'Fine'] as ProductOption['grindSize'][]).map((grind) => (
                  <button
                    key={grind}
                    type="button"
                    onClick={() => setGrindSize(grind)}
                    className={`p-2 text-left rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                      grindSize === grind
                        ? 'bg-[#433024] text-[#FFFDF8] border-[#433024] shadow-xs'
                        : 'bg-[#FFFFFF] text-[#756457] border-[#EFE8DE] hover:text-[#2D2118]'
                    }`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1 pt-1">
            <label className="text-[11px] text-[#756457] font-medium">Catatan Khusus:</label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#2D2118] focus:outline-none focus:border-[#8C5E3C]"
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF7F2] border-t border-[#EFE8DE] flex items-center justify-between gap-3">
          {/* Qty Modifier */}
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-xl border border-[#EFE8DE]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg bg-[#F4ECE1] hover:bg-[#E5D7C5] text-[#2D2118] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-xs w-6 text-center text-[#2D2118]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg bg-[#F4ECE1] hover:bg-[#E5D7C5] text-[#2D2118] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Total Price & Add to Cart CTA */}
          <button
            id="btn-confirm-add-cart"
            onClick={handleConfirmAddToCart}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#433024] hover:bg-[#302016] text-[#FFFDF8] font-bold text-xs sm:text-sm flex items-center justify-between gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Tambah ke Keranjang</span>
            </div>
            <span className="font-bold text-xs sm:text-sm">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useShop();

  return (
    <AnimatePresence>
      {selectedProduct && (
        <ProductDetailModalContent
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity, options, specialNotes) => {
            addToCart(product, quantity, options, specialNotes);
            setSelectedProduct(null);
            setIsCartOpen(true);
          }}
        />
      )}
    </AnimatePresence>
  );
};
