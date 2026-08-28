export type ProductCategory =
  | 'all'
  | 'signature'
  | 'espresso'
  | 'manual_brew'
  | 'non_coffee'
  | 'food_pastry'
  | 'beans'
  | 'merchandise';

export interface ProductOption {
  iceLevel?: 'Normal Ice' | 'Less Ice' | 'No Ice' | 'Hot';
  sweetness?: 'Normal (100%)' | 'Less Sweet (50%)' | 'No Sugar (0%)';
  milkType?: 'Fresh Milk' | 'Oat Milk (+Rp 8.000)' | 'Almond Milk (+Rp 10.000)' | 'Soy Milk (+Rp 6.000)';
  extraShot?: boolean;
  grindSize?: 'Whole Bean' | 'Coarse (French Press/Cold Brew)' | 'Medium (V60/Aeropress)' | 'Fine (Espresso/Moka Pot)';
  size?: 'Regular (12oz)' | 'Large (16oz) (+Rp 6.000)';
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  description: string;
  shortDesc: string;
  image: string;
  badge?: 'Best Seller' | 'Seasonal' | 'Signature' | 'New' | 'Single Origin' | 'Limited Batch' | string;
  rating: number;
  reviewCount: number;
  inStock?: boolean;
  isAvailable?: boolean;
  isSeasonal?: boolean;
  tastingNotes?: string[];
  origin?: string;
  altitude?: string;
  process?: string;
  roastLevel?: 'Light' | 'Light-Medium' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  calories?: number;
  weightGrams?: number;
}

export interface CartItem {
  id: string; // unique item id based on product + custom options
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions: ProductOption;
  itemPrice: number;
  specialInstructions?: string;
}

export type OrderType = 'dine_in' | 'pickup' | 'delivery';
export type OrderStatus = 'pending_payment' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type PaymentMethod = 'qris' | 'bca_va' | 'mandiri_va' | 'gopay' | 'credit_card' | 'cash_cashier';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  email: string;
  tableNumber?: string;
  deliveryAddress?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tax: number; // 11% PPN
  serviceFee: number;
  discount: number;
  deliveryFee: number;
  total: number;
  orderType: OrderType;
  customerInfo: OrderCustomerInfo;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'unpaid';
  status: OrderStatus;
  estimatedMinutes?: number;
}

export type SeatingArea = 'indoor_ac' | 'outdoor_garden' | 'bar_counter' | 'private_meeting_pod' | 'private_pod';

export interface Reservation {
  id: string;
  bookingCode: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  specialRequest?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'seated' | 'checked_in';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  points?: number;
  memberTier?: 'Bronze Member' | 'Silver Explorer' | 'Gold Roaster' | 'Platinum Connoisseur' | string;
  voucherCount?: number;
  avatar: string;
  role?: 'customer' | 'admin' | 'barista';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credential: string;
  bio: string;
  favoriteBrew: string;
  image: string;
  instagram?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambiance' | 'coffee' | 'community' | 'roasting';
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  favoriteItem: string;
  avatar: string;
  verifiedOrder: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  tags: string[];
}

export type BlogPost = BlogArticle;

export interface FAQItem {
  id: string;
  category: 'pemesanan' | 'kopi' | 'reservasi' | 'pengiriman' | 'membership' | string;
  question: string;
  answer: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  operatingHours: string;
  phone: string;
  isOpenNow: boolean;
  mapsUrl: string;
  image: string;
  features: string[];
}

export type ActivePage =
  | 'home'
  | 'about'
  | 'menu'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'order_tracking'
  | 'reservation'
  | 'gallery'
  | 'blog'
  | 'blog_detail'
  | 'faq'
  | 'contact'
  | 'coffee_quiz'
  | 'ai_sommelier'
  | 'ai_info'
  | 'admin';
