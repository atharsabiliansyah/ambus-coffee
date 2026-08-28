import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Reservation,
  ActivePage,
  BlogPost,
  BlogArticle,
  OrderType,
  OrderCustomerInfo,
  PaymentMethod,
  ProductOption,
  SeatingArea,
  UserProfile
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS,
  BLOG_ARTICLES
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface ShopContextType {
  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedBlogPost: BlogArticle | null;
  setSelectedBlogPost: (post: BlogArticle | null) => void;
  activeOrderId: string | null;
  setActiveOrderId: (orderId: string | null) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: ProductOption, specialInstructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Cart calculations & state
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  customerInfo: OrderCustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<OrderCustomerInfo>>;
  cartSubtotal: number;
  cartTax: number;
  cartServiceFee: number;
  cartDeliveryFee: number;
  cartDiscount: number;
  cartTotal: number;

  // Orders
  orders: Order[];
  createOrder: (paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Reservations
  reservations: Reservation[];
  createReservation: (resData: Omit<Reservation, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => Reservation;
  addReservation: (resData: Omit<Reservation, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => Reservation;
  updateReservationStatus: (resId: string, status: Reservation['status']) => void;

  // Live Chat & Admin
  isLiveChatOpen: boolean;
  setIsLiveChatOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Newsletter Subscriptions
  subscribers: string[];
  subscribeNewsletter: (email: string) => boolean;

  // User Authentication & Modal
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'ambus_coffee_products_v5',
  ORDERS: 'ambus_coffee_orders_v5',
  RESERVATIONS: 'ambus_coffee_reservations_v5',
  SUBSCRIBERS: 'ambus_coffee_subscribers_v5',
  CART: 'ambus_coffee_cart_v5'
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogArticle | null>(BLOG_ARTICLES[0]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy storage keys
      ['ambush_products_v2', 'ambush_products_v1', 'ambush_cart_v2', 'ambush_orders_v2'].forEach((k) => {
        try { localStorage.removeItem(k); } catch { /* ignore */ }
      });

      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((p: Product) => p.id === 'kopi-susu-gula-aren')) {
          return parsed;
        }
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>({
    code: 'FIRSTSIP',
    discountPercent: 15
  });
  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>({
    name: 'Budi Hartanto',
    phone: 'Meja 04 (Bar Area)',
    email: 'Less sugar, es batu dipisah',
    tableNumber: 'Meja 04 (Bar Area)',
    deliveryAddress: 'Jl. Senopati No. 12, Kebayoran Baru, Jakarta Selatan',
    notes: 'Less sugar, es batu dipisah.'
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'res-101',
          bookingCode: 'RSV-0825-99',
          name: 'Arya Wirawan',
          email: 'arya.w@studio.id',
          phone: '081122334455',
          date: '2026-08-26',
          time: '14:00',
          guests: 4,
          seatingArea: 'indoor_ac',
          specialRequest: 'Dekat colokan listrik untuk workshop kerja laptop.',
          status: 'confirmed',
          createdAt: '2026-08-25T15:30:00Z'
        },
        {
          id: 'res-102',
          bookingCode: 'RSV-0826-12',
          name: 'Maya Kusuma',
          email: 'maya.k@gmail.com',
          phone: '081899001122',
          date: '2026-08-27',
          time: '19:30',
          guests: 2,
          seatingArea: 'outdoor_garden',
          specialRequest: 'Ulang tahun pasangan, mohon siapkan lilin kecil jika memungkinkan.',
          status: 'confirmed',
          createdAt: '2026-08-25T18:00:00Z'
        }
      ];
    } catch {
      return [];
    }
  });

  // Subscribers
  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
      return saved ? JSON.parse(saved) : ['reza.coffee@gmail.com', 'anindya.w@arch.com'];
    } catch {
      return [];
    }
  });

  // UI helpers
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ambus_current_user_v5');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const login = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ambus_current_user_v5', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ambus_current_user_v5');
    } catch {
      // ignore
    }
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [subscribers]);

  // Toasts
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    options: ProductOption = {},
    specialInstructions: string = ''
  ) => {
    let extraPrice = 0;
    if (options.milkType?.includes('+Rp 8.000')) extraPrice += 8000;
    if (options.milkType?.includes('+Rp 10.000')) extraPrice += 10000;
    if (options.milkType?.includes('+Rp 6.000')) extraPrice += 6000;
    if (options.size?.includes('+Rp 6.000')) extraPrice += 6000;
    if (options.extraShot) extraPrice += 8000;

    const singleItemPrice = product.price + extraPrice;
    const optionKey = JSON.stringify(options) + (specialInstructions || '');
    const customId = `${product.id}-${btoa(unescape(encodeURIComponent(optionKey))).substring(0, 10)}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === customId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: customId,
            productId: product.id,
            product,
            quantity,
            selectedOptions: options,
            itemPrice: singleItemPrice,
            specialInstructions
          }
        ];
      }
    });

    showToast(`"${product.name}" ditambahkan ke keranjang`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item dihapus dari keranjang', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo code validation
  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FIRSTSIP' || clean === 'AMBUS10' || clean === 'AMBUSH10' || clean === 'SPECIALTY15') {
      const discount = clean === 'AMBUS10' || clean === 'AMBUSH10' ? 10 : 15;
      setAppliedPromo({ code: clean, discountPercent: discount });
      showToast(`Promo ${clean} berhasil digunakan! Diskon ${discount}% diterapkan.`, 'success');
      return true;
    } else {
      showToast('Kode promo tidak valid atau sudah kedaluwarsa', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    showToast('Kode promo dihapus', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  const cartDiscount = appliedPromo ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
  const taxableSubtotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Math.round(taxableSubtotal * 0.11); // 11% PPN
  const cartServiceFee = cart.length > 0 ? 3000 : 0;
  const cartDeliveryFee = orderType === 'delivery' && cart.length > 0 ? 15000 : 0;
  const cartTotal = cart.length > 0 ? taxableSubtotal + cartTax + cartServiceFee + cartDeliveryFee : 0;

  // Order operations
  const createOrder = (paymentMethod: PaymentMethod): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `AMB-${randomNum}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      serviceFee: cartServiceFee,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      orderType,
      customerInfo: { ...customerInfo },
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_cashier' ? 'unpaid' : 'paid',
      status: 'preparing',
      estimatedMinutes: orderType === 'delivery' ? 25 : orderType === 'pickup' ? 12 : 8
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    showToast(`Pesanan #${newOrder.orderNumber} berhasil dibuat!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Status pesanan diperbarui menjadi "${status}"`, 'info');
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  // Reservation operations
  const createReservation = (
    resData: Omit<Reservation, 'id' | 'bookingCode' | 'createdAt' | 'status'>
  ): Reservation => {
    const dateFormatted = resData.date.replace(/-/g, '').slice(4);
    const randomSuffix = Math.floor(10 + Math.random() * 89);
    const newRes: Reservation = {
      ...resData,
      id: `res-${Date.now()}`,
      bookingCode: `RSV-${dateFormatted}-${randomSuffix}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setReservations((prev) => [newRes, ...prev]);
    showToast(`Reservasi Meja Kode: ${newRes.bookingCode} berhasil dikonfirmasi!`, 'success');
    return newRes;
  };

  const addReservation = createReservation;

  const updateReservationStatus = (resId: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status } : r))
    );
    showToast(`Status reservasi diperbarui`, 'info');
  };

  // Product Admin Operations
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Produk "${newProduct.name}" berhasil ditambahkan ke menu`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast(`Produk berhasil diperbarui`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produk dihapus dari menu', 'info');
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStock = !(p.inStock ?? p.isAvailable ?? true);
          showToast(`Stok ${p.name}: ${nextStock ? 'Tersedia' : 'Habis'}`, 'info');
          return { ...p, inStock: nextStock, isAvailable: nextStock };
        }
        return p;
      })
    );
  };

  // Newsletter
  const subscribeNewsletter = (email: string): boolean => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      showToast('Mohon masukkan alamat email yang valid', 'error');
      return false;
    }
    if (subscribers.includes(clean)) {
      showToast('Email ini sudah terdaftar sebelumnya!', 'info');
      return true;
    }
    setSubscribers((prev) => [clean, ...prev]);
    showToast('Terima kasih! Kode voucher FIRSTSIP (Diskon 15%) siap Anda gunakan.', 'success');
    return true;
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        selectedBlogPost,
        setSelectedBlogPost,
        activeOrderId,
        setActiveOrderId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        customerInfo,
        setCustomerInfo,
        cartSubtotal,
        cartTax,
        cartServiceFee,
        cartDeliveryFee,
        cartDiscount,
        cartTotal,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        reservations,
        createReservation,
        addReservation,
        updateReservationStatus,
        isLiveChatOpen,
        setIsLiveChatOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        toasts,
        showToast,
        removeToast,
        subscribers,
        subscribeNewsletter,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
