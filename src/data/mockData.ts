import {
  Product,
  TeamMember,
  GalleryItem,
  Testimonial,
  BlogPost,
  BlogArticle,
  FAQItem,
  BranchLocation,
  Reservation,
  Order
} from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  
  {
    id: 'kopi-susu-gula-aren',
    name: 'Kopi Susu Gula Aren Ambus',
    category: 'signature',
    categoryLabel: 'Signature Ambus',
    price: 28000,
    description: 'Menu favorit terlaris Ambus Coffee. Double shot espresso house blend dipadukan dengan gula aren organik murni dan susu segar dingin yang creamy serta harum.',
    shortDesc: 'Double espresso mantap dengan gula aren asli dan susu segar creamy.',
    image: '/aren.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 382,
    inStock: true,
    isSeasonal: false,
    tastingNotes: ['Brown Sugar Aren', 'Creamy Milk', 'Caramelized Sweetness', 'Bold Coffee'],
    origin: 'Ambus House Blend',
    roastLevel: 'Medium-Dark',
    calories: 175
  },
  {
    id: 'iced-caramel-macchiato',
    name: 'Iced Caramel Macchiato',
    category: 'signature',
    categoryLabel: 'Signature Ambus',
    price: 36000,
    description: 'Espresso aromatik dituangkan di atas susu segar dingin dengan sirup vanilla lembut, diakhiri siraman saus karamel manis gurih di atasnya.',
    shortDesc: 'Espresso susu vanilla dengan topping saus karamel leleh manis gurih.',
    image: '/caramel.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 265,
    inStock: true,
    isSeasonal: false,
    tastingNotes: ['Salted Caramel', 'Madagascar Vanilla', 'Rich Espresso', 'Silky Milk'],
    origin: 'Ambus Espresso Blend',
    roastLevel: 'Medium',
    calories: 210
  },
  {
    id: 'avocado-coffee-float',
    name: 'Avocado Coffee Float',
    category: 'signature',
    categoryLabel: 'Signature Ambus',
    price: 38000,
    description: 'Jus buah alpukat mentega segar kental berpadu dengan espresso shot pekat dan topping 1 scoop es krim vanilla lembut.',
    shortDesc: 'Jus alpukat mentega segar berpadu espresso pekat dan es krim vanila.',
    image: '/avocado.png',
    badge: 'Signature',
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    isSeasonal: false,
    tastingNotes: ['Fresh Butter Avocado', 'Vanilla Ice Cream', 'Dark Roast Cocoa', 'Creamy'],
    origin: 'House Espresso Blend',
    roastLevel: 'Medium-Dark',
    calories: 260
  },
  {
    id: 'pandan-iced-latte',
    name: 'Pandan Latte Ambus',
    category: 'signature',
    categoryLabel: 'Signature Ambus',
    price: 32000,
    description: 'Espresso aromatik dipadukan dengan susu segar dingin dan ekstrak daun pandan wangi alami buatan in-house setiap hari.',
    shortDesc: 'Espresso lembut dengan harum pandan wangi alami dan susu segar.',
    image: '/pandan.png',
    badge: 'New',
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    isSeasonal: false,
    tastingNotes: ['Fresh Pandan Aroma', 'Sweet Cream', 'Smooth Espresso', 'Velvety'],
    origin: 'Ambus House Blend',
    roastLevel: 'Medium',
    calories: 145
  },

  // --- ESPRESSO & CLASSIC COFFEE ---
  {
    id: 'caffe-americano',
    name: 'Caffe Americano',
    category: 'espresso',
    categoryLabel: 'Espresso & Classic Coffee',
    price: 26000,
    description: 'Double shot espresso klasik yang disajikan dengan air murni, menghasilkan karakter kopi hitam yang bold, bersih, dan segar. Tersedia pilihan panas atau dingin.',
    shortDesc: 'Double espresso murni dengan air segar, bersih dan menyegarkan (Hot/Iced).',
    image: '/americano.png',
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 320,
    inStock: true,
    tastingNotes: ['Dark Cocoa', 'Toasted Nut', 'Crisp Clean Finish'],
    origin: 'Ambus Blend Arabica-Robusta',
    roastLevel: 'Medium-Dark',
    calories: 5
  },
  {
    id: 'caffe-latte',
    name: 'Caffe Latte',
    category: 'espresso',
    categoryLabel: 'Espresso & Classic Coffee',
    price: 32000,
    description: 'Espresso lembut yang dipadukan dengan steamed fresh milk bertekstur creamy dan lapisan microfoam tipis halus. Sangat nyaman dinikmati kapan saja.',
    shortDesc: 'Espresso lembut dengan susu segar creamy dan microfoam halus.',
    image: '/latte.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 410,
    inStock: true,
    tastingNotes: ['Silky Milk', 'Mild Sweet Cocoa', 'Toffee Nut'],
    origin: 'Ambus Espresso Blend',
    roastLevel: 'Medium',
    calories: 140
  },
  {
    id: 'cappuccino-klasik',
    name: 'Cappuccino Klasik',
    category: 'espresso',
    categoryLabel: 'Espresso & Classic Coffee',
    price: 32000,
    description: 'Keseimbangan klasik 1/3 espresso mantap, 1/3 steamed milk hangat, dan 1/3 busa susu (thick foam) tebal dengan taburan bubuk cokelat di atasnya.',
    shortDesc: 'Kopi susu busa tebal lembut dengan taburan bubuk cokelat nikmat.',
    image: '/capucino.png',
    rating: 4.8,
    reviewCount: 220,
    inStock: true,
    tastingNotes: ['Dark Chocolate Dust', 'Roasted Almond', 'Thick Velvety Foam'],
    origin: 'Ambus House Blend',
    roastLevel: 'Medium',
    calories: 130
  },
  {
    id: 'caffe-mocha',
    name: 'Caffe Mocha',
    category: 'espresso',
    categoryLabel: 'Espresso & Classic Coffee',
    price: 35000,
    description: 'Perpaduan sempurna antara double shot espresso pekat, saus cokelat hitam premium leleh, dan susu segar hangat atau dingin.',
    shortDesc: 'Espresso pekat berpadu cokelat hitam premium dan susu segar.',
    image: '/mocha.png',
    rating: 4.8,
    reviewCount: 185,
    inStock: true,
    tastingNotes: ['Rich Dark Cocoa', 'Sweet Chocolate', 'Bold Espresso'],
    origin: 'Ambus Espresso Blend',
    roastLevel: 'Medium-Dark',
    calories: 225
  },
  {
    id: 'vanilla-latte',
    name: 'Vanilla Latte',
    category: 'espresso',
    categoryLabel: 'Espresso & Classic Coffee',
    price: 35000,
    description: 'Caffe latte lembut yang diperkaya pilihan sirup hazelnut panggang harum atau sirup madagascar vanilla manis yang memanjakan lidah.',
    shortDesc: 'Latte susu lembut dengan pilihan sirup hazelnut atau vanila aromatik.',
    image: '/vanilla.png',
    rating: 4.8,
    reviewCount: 160,
    inStock: true,
    tastingNotes: ['Roasted Hazelnut', 'Vanilla Cream', 'Smooth Coffee'],
    origin: 'Ambus Espresso Blend',
    roastLevel: 'Medium',
    calories: 180
  },
  {
    id: 'espresso-double-shot',
    name: 'Espresso Double Shot',
    category: 'espresso',
    categoryLabel: 'Espresso & Classic Coffee',
    price: 22000,
    description: 'Ekstraksi kopi murni 100% Arabica pilihan dengan crema tebal keemasan, rasa yang intens, mantap, dan beraroma semerbak.',
    shortDesc: 'Ekstraksi murni 2 shot espresso dengan golden crema tebal.',
    image: '/esspreso.png',
    rating: 4.9,
    reviewCount: 110,
    inStock: true,
    tastingNotes: ['Rich Crema', 'Dark Cacao', 'Sweet Molasses'],
    origin: '100% Arabica Pilihan',
    roastLevel: 'Medium-Dark',
    calories: 4
  },

  // --- MANUAL BREW & FILTER ---
  {
    id: 'v60-arabica-gayo',
    name: 'Kopi Filter V60 (Arabica Gayo)',
    category: 'manual_brew',
    categoryLabel: 'Manual Brew & Filter',
    price: 32000,
    description: 'Seduhan manual metode pour over V60 menggunakan biji kopi Arabica Gayo pilihan. Menghasilkan secangkir kopi dengan rasa jernih, aroma buah segar, dan tingkat keasaman yang lembut.',
    shortDesc: 'Seduhan manual V60 Arabica Gayo dengan karakter bersih dan aroma buah segar.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    badge: 'Single Origin',
    rating: 4.9,
    reviewCount: 198,
    inStock: true,
    tastingNotes: ['Sweet Floral', 'Brown Sugar', 'Crisp Citrus', 'Black Tea'],
    origin: 'Aceh Gayo, Sumatera',
    process: 'Washed Process',
    roastLevel: 'Medium-Light',
    calories: 4
  },
  {
    id: 'classic-cold-brew',
    name: 'Classic Cold Brew Coffee',
    category: 'manual_brew',
    categoryLabel: 'Manual Brew & Filter',
    price: 30000,
    description: 'Kopi yang diseduh dingin perlahan selama 16 jam dengan air es. Menghasilkan rasa kopi yang sangat halus, minim rasa pahit tajam, rendah asam, dan menyegarkan saat disajikan dingin.',
    shortDesc: 'Ekstraksi dingin 16 jam, rasa sangat halus, segar dan rendah keasaman.',
    image: '/brew.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 175,
    inStock: true,
    tastingNotes: ['Smooth Chocolate', 'Caramel', 'Low Acidity'],
    origin: 'Ambus Cold Brew Blend',
    roastLevel: 'Medium',
    calories: 5
  },
  {
    id: 'kopi-tubruk-nusantara',
    name: 'Kopi Tubruk Tradisional',
    category: 'manual_brew',
    categoryLabel: 'Manual Brew & Filter',
    price: 24000,
    description: 'Kopi tubruk khas tradisional Nusantara dengan gilingan segar biji kopi pilihan yang diseduh air mendidih. Aroma harum semerbak dengan rasa mantap dan nikmat.',
    shortDesc: 'Kopi tubruk tradisional dengan aroma harum dan rasa kopi pekat mantap.',
    image: '/tubruk.png',
    rating: 4.8,
    reviewCount: 130,
    inStock: true,
    tastingNotes: ['Bold Earthy', 'Dark Roasted Cocoa', 'Warm Spice'],
    origin: 'Nusantara Blend',
    roastLevel: 'Dark',
    calories: 4
  },

  // --- NON-COFFEE ---
  {
    id: 'matcha-latte-creamy',
    name: 'Matcha Latte Creamy',
    category: 'non_coffee',
    categoryLabel: 'Non-Coffee & Artisan Tea',
    price: 34000,
    description: 'Bubuk green tea matcha asli berkualitas tinggi dikocok lembut dan dipadukan dengan susu segar manis gurih yang creamy.',
    shortDesc: 'Matcha otentik berpadu susu segar creamy yang harum dan nikmat.',
    image: '/matcha.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 240,
    inStock: true,
    tastingNotes: ['Rich Matcha', 'Sweet Cream', 'Smooth Vanilla'],
    origin: 'Kyoto Matcha Blend',
    calories: 160
  },
  {
    id: 'dark-chocolate-klasik',
    name: 'Dark Chocolate Klasik',
    category: 'non_coffee',
    categoryLabel: 'Non-Coffee & Artisan Tea',
    price: 32000,
    description: 'Cokelat pekat pilihan yang dilelehkan bersama susu segar creamy, menghasilkan minuman cokelat kaya rasa yang memanjakan lidah.',
    shortDesc: 'Cokelat hitam pekat leleh dengan susu creamy yang nikmat disajikan dingin/panas.',
    image: '/dark.png',
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    tastingNotes: ['Rich Cocoa', 'Creamy Milk', 'Warm Sweetness'],
    origin: 'Kakao Nusantara',
    calories: 210
  },
  {
    id: 'iced-lemon-tea-segar',
    name: 'Iced Lemon Tea Segar',
    category: 'non_coffee',
    categoryLabel: 'Non-Coffee & Artisan Tea',
    price: 25000,
    description: 'Seduhan teh hitam aromatik dengan perasan sari lemon asli dan es batu yang memberikan kesegaran instan di setiap tegukan.',
    shortDesc: 'Teh hitam segar dengan perasan sari lemon asli yang menyegarkan dahaga.',
    image: '/lemon.png',
    rating: 4.7,
    reviewCount: 115,
    inStock: true,
    tastingNotes: ['Fresh Lemon Zest', 'Black Tea Aroma', 'Crisp Refreshing'],
    calories: 70
  },

  // --- FOOD & PASTRY ---
  {
    id: 'butter-croissant',
    name: 'Butter Croissant Klasik',
    category: 'food_pastry',
    categoryLabel: 'Pastry & Kitchen',
    price: 28000,
    description: 'Croissant mentega klasik dengan lapisan berlapis renyah (*flaky*) di luar dan tekstur lembut wangi butter di dalam.',
    shortDesc: 'Croissant mentega Prancis renyah di luar, lembut berlapis di dalam.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 310,
    inStock: true,
    calories: 280
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat (Croissant Cokelat)',
    category: 'food_pastry',
    categoryLabel: 'Pastry & Kitchen',
    price: 32000,
    description: 'Croissant renyah berlapis dengan isian stik cokelat leleh berkualitas tinggi yang manis nikmat saat dipanaskan.',
    shortDesc: 'Pastry renyah berlapis dengan isian cokelat leleh manis nikmat.',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 220,
    inStock: true,
    calories: 340
  },
  {
    id: 'roti-bakar-kaya-butter',
    name: 'Roti Bakar Kaya Butter Toast',
    category: 'food_pastry',
    categoryLabel: 'Pastry & Kitchen',
    price: 26000,
    description: 'Roti tebal dipanggang renyah dengan olesan selai srikaya wangi manis dan potongan mentega dingin gurih.',
    shortDesc: 'Roti bakar panggang garing dengan selai srikaya legit dan butter gurih.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 155,
    inStock: true,
    calories: 290
  },
  {
    id: 'smoked-beef-cheese-croissant',
    name: 'Smoked Beef & Cheese Croissant',
    category: 'food_pastry',
    categoryLabel: 'Pastry & Kitchen',
    price: 38000,
    description: 'Croissant mentega gurih berisi potongan daging sapi asap beraroma lezat dan lelehan keju cheddar gurih.',
    shortDesc: 'Croissant gurih berisi irisan daging sapi asap lezat dan keju lumer.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 190,
    inStock: true,
    calories: 380
  },

  // --- WHOLE BEANS ---
  {
    id: 'ambus-house-blend-beans',
    name: 'Ambus House Blend (250g)',
    category: 'beans',
    categoryLabel: 'Biji Kopi Kemasan (Beans)',
    price: 85000,
    description: 'Perpaduan seimbang biji kopi Arabica dan Robusta pilihan. Sangat pas untuk diseduh sebagai kopi susu harian, espresso, maupun kopi tubruk di rumah.',
    shortDesc: 'House blend 250g: Arabica + Robusta seimbang untuk kopi susu & espresso.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature',
    rating: 5.0,
    reviewCount: 380,
    inStock: true,
    tastingNotes: ['Nutty & Bold', 'Dark Chocolate Richness', 'Brown Sugar Sweetness'],
    origin: 'Nusantara Blend',
    roastLevel: 'Medium-Dark',
    weightGrams: 250
  },
  {
    id: 'arabica-gayo-beans',
    name: 'Single Origin Arabica Gayo (250g)',
    category: 'beans',
    categoryLabel: 'Biji Kopi Kemasan (Beans)',
    price: 95000,
    description: 'Biji kopi 100% Arabica Aceh Gayo pilihan yang disangrai medium dalam jumlah kecil (small batch). Memiliki rasa manis rempah karamel dan keasaman sitrus yang bersih.',
    shortDesc: 'Single origin Arabica Gayo 250g. Rasa manis karamel dan aroma buah lembut.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    badge: 'Single Origin',
    rating: 4.9,
    reviewCount: 160,
    inStock: true,
    tastingNotes: ['Sweet Caramel', 'Spiced Cocoa', 'Crisp Citrus'],
    origin: 'Takengon, Aceh Gayo',
    process: 'Semi-Washed',
    roastLevel: 'Medium',
    weightGrams: 250
  },
  {
    id: 'arabica-flores-beans',
    name: 'Single Origin Arabica Flores (250g)',
    category: 'beans',
    categoryLabel: 'Biji Kopi Kemasan (Beans)',
    price: 95000,
    description: 'Biji kopi 100% Arabica Flores Bajawa dengan karakter rasa manis kacang panggang, cokelat susu lembut, dan aroma semerbak.',
    shortDesc: 'Biji kopi 250g dari Flores Bajawa. Karakter cokelat susu dan kacang manis.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 120,
    inStock: true,
    tastingNotes: ['Milk Chocolate', 'Roasted Nut', 'Floral Sweetness'],
    origin: 'Bajawa, Flores',
    process: 'Full Washed',
    roastLevel: 'Medium',
    weightGrams: 250
  },

  // --- MERCHANDISE ---
  {
    id: 'ambus-matte-black-tumbler',
    name: 'Ambus Thermal Hydro Tumbler 500ml',
    category: 'merchandise',
    categoryLabel: 'Merchandise & Gift Card',
    price: 245000,
    description: 'Tumbler stainless steel 304 food-grade ganda dengan lapisan matte black anti gores dan logo Ambus terukir laser presisi. Menjaga kopi dingin 24 jam dan panas 12 jam.',
    shortDesc: 'Tumbler stainless steel matte black 500ml menjaga suhu 24 jam.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 88,
    inStock: true
  },
  {
    id: 'ambus-ceramic-dripper-set',
    name: 'Artisan Matte Ceramic Dripper & Server Set',
    category: 'merchandise',
    categoryLabel: 'Merchandise & Gift Card',
    price: 320000,
    description: 'Dripper keramik handmade dengan alur spiral presisi untuk ekstraksi V60 sempurna, dilengkapi server kaca borosilikat tahan panas 600ml.',
    shortDesc: 'Set dripper keramik buatan tangan dan coffee server kaca 600ml.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 52,
    inStock: true
  },
  {
    id: 'ambus-digital-gift-card',
    name: 'Ambus Digital Gift Card (Rp 100.000 - Rp 500.000)',
    category: 'merchandise',
    categoryLabel: 'Merchandise & Gift Card',
    price: 100000,
    description: 'Kirimkan voucher digital instan untuk sahabat atau kolega. Bisa digunakan untuk dine-in di semua cabang maupun pesanan web online.',
    shortDesc: 'Kartu hadiah digital fleksibel untuk dine-in atau pembelian online.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    rating: 4.9,
    reviewCount: 41,
    inStock: true
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'reza-aditya',
    name: 'Reza Aditya, Q-Grader',
    role: 'Head of Coffee & Co-Founder',
    credential: 'Licensed CQI Arabica Q-Grader & 2x National Cup Tasters Finalist',
    bio: 'Menyeleksi langsung biji kopi terbaik dari perkebunan Aceh Gayo, Flores Bajawa, hingga lereng Jawa dengan standar cupping ketat.',
    favoriteBrew: 'Arabica Gayo V60 (Rasio 1:15, Suhu 92°C)',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    instagram: '@reza.roaster'
  },
  {
    id: 'sarah-clarissa',
    name: 'Sarah Clarissa',
    role: 'Head Barista & Quality Control',
    credential: 'Indonesia Barista Championship Top 6 & Latte Art Specialist',
    bio: 'Menjaga konsistensi ekstraksi setiap cangkir kopi di Ambus. Memadukan presisi variabel suhu, grind size mikron, dan keramahan pelayanan.',
    favoriteBrew: 'Artisan Flat White with Double Ristretto',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    instagram: '@sarah.ambus'
  },
  {
    id: 'bima-nugraha',
    name: 'Bima Nugraha',
    role: 'Lead Roaster & Green Buyer',
    credential: 'SCA Roasting Certified Professional (Small-Batch Roasting Specialist)',
    bio: 'Bertanggung jawab atas profil kurva sangrai harian menggunakan mesin sangrai Giesen W6A untuk mengeluarkan potensi rasa unik tanpa cacat roasting.',
    favoriteBrew: 'Arabica Gayo V60',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    instagram: '@bima.roasting'
  },
  {
    id: 'nadia-utami',
    name: 'Nadia Utami',
    role: 'Pastry Chef & Culinary Creator',
    credential: 'Le Cordon Bleu Alumna (French Viennoiserie & Sourdough Specialist)',
    bio: 'Menciptakan pastry artisanal setiap pagi dengan mentega murni yang dirancang khusus untuk melengkapi profil rasa cangkir kopi Ambus.',
    favoriteBrew: 'Cold Brew with Butter Croissant',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    instagram: '@nadia.bakes'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Symphony of Extraction',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    caption: 'Aliran ekstraksi double espresso dengan crema emas pekat bertekanan 9 bar presisi.'
  },
  {
    id: 'gal-2',
    title: 'Senopati Sanctuary Space',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    caption: 'Kombinasi pencahayaan natural hangat, kayu ek, dan tanaman tropis untuk kenyamanan bekerja & bersantai.'
  },
  {
    id: 'gal-3',
    title: 'Small Batch Artisan Roasting',
    category: 'roasting',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=80',
    caption: 'Pengawasan kurva profil sangrai real-time untuk memastikan perkembangan gula alami biji kopi optimal.'
  },
  {
    id: 'gal-4',
    title: 'Morning Ritual & Community',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
    caption: 'Ruang temu para kreator, profesional, dan pecinta kopi menyambut inspirasi pagi hari.'
  },
  {
    id: 'gal-5',
    title: 'Slow Drip Bar Tower',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    caption: 'Menara ekstraksi dingin perlahan dengan kecepatan 1 tetes per detik selama 16 jam.'
  },
  {
    id: 'gal-6',
    title: 'Artisan Pastry Baked Daily',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
    caption: 'Croissant mentega berlapis renyah yang baru keluar dari oven pada pukul 07.30 setiap pagi.'
  },
  {
    id: 'gal-7',
    title: 'Outdoor Garden & Zen Deck',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    caption: 'Area luar ruangan yang teduh dikelilingi pepohonan rindang dan semilir angin segar.'
  },
  {
    id: 'gal-8',
    title: 'Coffee Cupping & Public Workshop',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    caption: 'Sesi cupping publik rutin setiap Sabtu untuk mengedukasi aroma & rasa specialty coffee.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dimas Wicaksono',
    role: 'Creative Director & Coffee Enthusiast',
    rating: 5,
    comment: 'Kopi Susu Gula Aren Ambus adalah salah satu racikan kopi susu terbaik yang pernah saya coba. Perpaduan espresso pekat dan gula aren murninya pas banget!',
    date: '3 hari yang lalu',
    favoriteItem: 'Kopi Susu Gula Aren Ambus',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    verifiedOrder: true
  },
  {
    id: 'test-2',
    name: 'Anindya Putri',
    role: 'Architect & Remote Worker',
    rating: 5,
    comment: 'Tempat favorit untuk WFC! Suasananya tenang, colokan listrik banyak dan rapi, koneksi WiFi 150 Mbps kencang, plus Butter Croissant dan Caffe Latte-nya selalu konsisten nikmat setiap hari.',
    date: '1 minggu yang lalu',
    favoriteItem: 'Caffe Latte',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    verifiedOrder: true
  },
  {
    id: 'test-3',
    name: 'Kevin Santoso',
    role: 'Software Engineer',
    rating: 5,
    comment: 'Selalu pesan Ambus House Blend Whole Beans untuk stok seduh di rumah. Roasting-nya sangat bersih, nggak ada rasa gosong sama sekali, notes cokelat dan karamelnya keluar maksimal.',
    date: '2 minggu yang lalu',
    favoriteItem: 'Ambus House Blend (250g)',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    verifiedOrder: true
  },
  {
    id: 'test-4',
    name: 'Vania Lestari',
    role: 'Brand Consultant',
    rating: 5,
    comment: 'Pelayanan baristanya luar biasa ramah dan berwawasan tinggi. Saat bingung memilih biji kopi manual brew, mereka menjelaskan detail tasting notes tanpa kesan menggurui. 10/10 recommended!',
    date: '1 bulan yang lalu',
    favoriteItem: 'Kopi Filter V60 (Arabica Gayo)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verifiedOrder: true
  }
];

export const BRANCH_LOCATIONS: BranchLocation[] = [
  {
    id: 'loc-senopati',
    name: 'Ambus Senopati Flagship Store',
    city: 'Jakarta Selatan',
    address: 'Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190',
    operatingHours: 'Setiap Hari: 07.00 - 23.00 WIB',
    phone: '+62 812-8899-7721',
    isOpenNow: true,
    mapsUrl: 'https://maps.google.com/?q=Senopati+Jakarta',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    features: ['Indoor AC Work Lounge', 'Zen Smoking Garden', 'Meeting Pod (6 Pax)', 'Dedicated Roastery Bar', 'Valet Parking']
  },
  {
    id: 'loc-braga',
    name: 'Ambus Braga Heritage',
    city: 'Bandung',
    address: 'Jl. Braga No. 88, Sumur Bandung, Kota Bandung 40111',
    operatingHours: 'Setiap Hari: 07.30 - 23.00 WIB',
    phone: '+62 813-4455-8812',
    isOpenNow: true,
    mapsUrl: 'https://maps.google.com/?q=Braga+Bandung',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    features: ['Heritage Architecture', 'Rooftop Sunset Lounge', 'Live Slow Drip Bar', 'Artisan Bakery Kitchen']
  },
  {
    id: 'loc-canggu',
    name: 'Ambus Canggu Lab & Roastery',
    city: 'Bali',
    address: 'Jl. Pantai Batu Bolong No. 19B, Canggu, Kuta Utara, Bali 80361',
    operatingHours: 'Setiap Hari: 06.30 - 22.00 WITA',
    phone: '+62 811-9988-3344',
    isOpenNow: true,
    mapsUrl: 'https://maps.google.com/?q=Batu+Bolong+Canggu',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    features: ['Tropical Open Air', 'Specialty Cupping Room', 'Direct Green Bean Retail', 'Sunset Terrace']
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'Filosofi Racikan Kopi: Mengapa Kopi Pilihan Nusantara Begitu Nikmat?',
    excerpt: 'Membongkar rahasia ilmiah di balik pemilihan biji kopi berkualitas Nusantara yang menghasilkan aroma semerbak, manis alami, dan aftertaste yang bersih.',
    content: `
# Filosofi Racikan Kopi: Harmoni Rasa Biji Kopi Nusantara

Bagi kami di **Ambus Coffee**, secangkir kopi bukan sekadar asupan kafein di pagi hari. Kopi adalah simfoni rasa yang mampu membangkitkan panca indra saat partikel rasa pertama menyentuh langit-langit mulut Anda.

## Pemilihan Biji Kopi Berkualitas
Tanaman kopi dari berbagai pelosok Nusantara seperti Aceh Gayo, Flores Bajawa, dan Toraja memiliki karakter iklim tropis yang unik:
1. **Pemetikan Ceri Merah Matang Sempurna**: Hanya ceri merah terbaik yang dipetik untuk menjamin kadar gula alami maksimal.
2. **Pengolahan Pasca Panen Teliti**: Memaksimalkan transfer glukosa dan aroma harum alami ke dalam biji kopi.
3. **Karakter Kopi Bersih**: Menghasilkan profil rasa yang jernih (*clarity*), manis alami karamel, dan kedalaman cokelat yang kaya.

## Pendekatan Sangrai "Small Batch"
Kami menyangrai kopi dalam kelompok kecil secara presisi di Roastery kami. Dengan cara ini, roaster kami memantau laju pemanggangan dengan teliti untuk mencegah biji gosong dan menjaga keaslian rasa.

Hasilnya? Secangkir kopi yang kaya akan aroma, berpadu sempurna dengan susu segar creamy maupun diseduh hitam murni.
    `,
    author: 'Reza Aditya (Roaster)',
    authorAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
    date: '20 Agustus 2026',
    readTime: '4 menit baca',
    category: 'Coffee Science',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    tags: ['Specialty Coffee', 'Origin Story', 'Brewing Tips', 'Kopi Nusantara']
  },
  {
    id: 'blog-2',
    title: 'Panduan Praktis Menyeduh Kopi Filter V60 di Rumah',
    excerpt: 'Langkah demi langkah menyeduh kopi filter V60 dengan rasio presisi untuk mendapatkan rasa yang bersih dan aroma manis seperti di kedai Ambus.',
    content: `
# Panduan Menyeduh V60 dengan Rasio Sederhana

Menyeduh kopi filter V60 di rumah sangatlah mudah dengan panduan rasio yang tepat.

### Parameter yang Dibutuhkan:
- **Biji Kopi**: 15 gram Ambus Arabica Gayo (gilingan Medium)
- **Air Bersih**: 225 ml suhu 92°C (Rasio 1:15)
- **Waktu Total Seduh**: 2 menit 30 detik

### Tahapan Menuang:
1. **Tuangan 1 (40 ml)**: Blooming selama 30 detik untuk melepaskan gas CO2.
2. **Tuangan 2 (100 ml)**: Tuang perlahan memutar searah jarum jam untuk melarutkan rasa manis.
3. **Tuangan 3 (85 ml)**: Tuang sisa air hingga batas 225 ml dan biarkan menetes tuntas.

Nikmati kopi selagi hangat untuk merasakan aroma buah dan kelembutan rasa manis karamel alami.
    `,
    author: 'Sarah Clarissa (Barista)',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: '15 Agustus 2026',
    readTime: '4 menit baca',
    category: 'Tips Seduh',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    tags: ['V60 Guide', 'Manual Brew', 'Home Barista', 'Coffee Recipes']
  },
  {
    id: 'blog-3',
    title: 'Perbedaan Cold Brew vs Iced Americano: Mana yang Cocok Untukmu?',
    excerpt: 'Memahami proses ekstraksi dingin perlahan pada Cold Brew dibanding espresso segar dingin pada Iced Americano.',
    content: `
# Cold Brew vs Iced Americano: Karakter Rasa & Kesegaran

Banyak pencinta kopi menyukai kopi dingin saat cuaca panas. Dua pilihan paling populer adalah **Cold Brew** dan **Iced Americano**.

### 1. Cold Brew Coffee
- Diekstraksi dengan air dingin selama 16 jam.
- Karakter: Tekstur sangat halus (*smooth*), rasa manis alami, dan tingkat keasaman sangat rendah sehingga sangat ramah di lambung.

### 2. Iced Americano
- Double shot espresso segar panas yang langsung dituangkan ke atas air es dingin.
- Karakter: Rasa kopi lebih tajam dan tegas (*bold*), wangi espresso langsung terasa, dan sangat menyegarkan dahaga.

Keduanya selalu tersedia segar setiap hari di seluruh kedai Ambus Coffee!
    `,
    author: 'Bima Nugraha (Head Barista)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: '08 Agustus 2026',
    readTime: '3 menit baca',
    category: 'Coffee Knowledge',
    coverImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    tags: ['Cold Brew', 'Americano', 'Iced Coffee', 'Menu Favorit']
  }
];

export const BLOG_POSTS = BLOG_ARTICLES;

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'pemesanan',
    question: 'Bagaimana alur pemesanan online di website Ambus Coffee?',
    answer: 'Anda dapat memilih menu favorit, menyesuaikan tingkat es/gula/opsi susu nabati, lalu memilih tipe pesanan: Dine-In (pesan langsung ke meja Anda), Pick-Up (siap diambil saat tiba di kedai), atau Delivery (diantar kurir instan ke lokasi Anda).'
  },
  {
    id: 'faq-2',
    category: 'pemesanan',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung QRIS instan (GoPay, OVO, ShopeePay, Dana, LinkAja, BCA Mobile), Virtual Account BCA & Mandiri, serta Kartu Kredit/Debit. Untuk pesanan Dine-In, Anda juga dapat memilih opsi Bayar di Kasir.'
  },
  {
    id: 'faq-3',
    category: 'reservasi',
    question: 'Apakah bisa memesan meja atau ruang meeting sebelumnya?',
    answer: 'Ya! Anda dapat menggunakan fitur "Reservasi Meja" di website ini. Pilih cabang, tanggal, jam kedatangan, jumlah tamu, serta area yang diinginkan (Indoor AC, Zen Smoking Garden, Bar Counter, atau Private Meeting Pod).'
  },
  {
    id: 'faq-4',
    category: 'kopi',
    question: 'Apa keunggulan racikan kopi di Ambus Coffee?',
    answer: 'Kami menggunakan biji kopi pilihan nusantara berkualitas tinggi yang disangrai segar (freshly roasted). Dipadukan dengan susu segar berkualitas dan gula aren murni untuk menghasilkan cita rasa kopi yang seimbang, mantap, dan nikmat di setiap cangkir.'
  },
  {
    id: 'faq-5',
    category: 'kopi',
    question: 'Dari mana biji kopi Ambus berasal dan bagaimana proses roasting-nya?',
    answer: 'Biji kopi kami berasal dari perkebunan pilihan terbaik di Indonesia seperti Aceh Gayo, Flores Bajawa, dan Jawa. Seluruh biji disangrai secara mandiri dalam kelompok kecil (small batches) di Roastery Lab kami untuk menjamin kesegaran dan profil rasa optimal.'
  },
  {
    id: 'faq-6',
    category: 'pengiriman',
    question: 'Apakah biji kopi kemasan bisa dikirim ke seluruh Indonesia?',
    answer: 'Tentu saja! Kami mengirimkan Whole Beans dan Merchandise ke seluruh kota di Indonesia menggunakan ekspedisi kilat (JNE, SiCepat, Paxel). Khusus kemasan biji kopi, kami juga menyediakan opsi gilingan gratis sesuai alat seduh Anda.'
  },
  {
    id: 'faq-7',
    category: 'membership',
    question: 'Apakah ada voucher diskon untuk pelanggan pertama?',
    answer: 'Daftarkan email Anda di form Newsletter kami di bagian bawah halaman untuk mendapatkan kode promo instan diskon 15% pada pesanan pertama Anda!'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8812',
    orderNumber: 'AMB-8812',
    createdAt: '2026-08-25T19:45:00.000Z',
    items: [
      {
        id: 'item-1',
        productId: INITIAL_PRODUCTS[0]?.id || 'kopi-susu-gula-aren',
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        selectedOptions: {
          iceLevel: 'Normal Ice',
          sweetness: 'Normal (100%)'
        },
        itemPrice: 24000
      },
      {
        id: 'item-2',
        productId: INITIAL_PRODUCTS[10]?.id || 'butter-croissant',
        product: INITIAL_PRODUCTS[10],
        quantity: 1,
        selectedOptions: {},
        itemPrice: 28000
      }
    ],
    subtotal: 76000,
    tax: 8360,
    serviceFee: 3000,
    discount: 10000,
    deliveryFee: 0,
    total: 77360,
    orderType: 'dine_in',
    customerInfo: {
      name: 'Rian Pratama',
      phone: '081299887766',
      email: 'rian.pratama@gmail.com',
      tableNumber: 'Meja 08 (Indoor)'
    },
    paymentMethod: 'qris',
    paymentStatus: 'paid',
    status: 'preparing',
    estimatedMinutes: 8
  },
  {
    id: 'ord-8811',
    orderNumber: 'AMB-8811',
    createdAt: '2026-08-25T19:15:00.000Z',
    items: [
      {
        id: 'item-3',
        productId: INITIAL_PRODUCTS[1]?.id || 'iced-caramel-macchiato',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedOptions: {
          milkType: 'Oat Milk (+Rp 8.000)',
          iceLevel: 'Less Ice',
          sweetness: 'Less Sweet (50%)'
        },
        itemPrice: 38000
      },
      {
        id: 'item-4',
        productId: INITIAL_PRODUCTS[14]?.id || 'ambus-house-blend-250g',
        product: INITIAL_PRODUCTS[14],
        quantity: 1,
        selectedOptions: {
          grindSize: 'Medium (V60/Aeropress)'
        },
        itemPrice: 95000
      }
    ],
    subtotal: 133000,
    tax: 14630,
    serviceFee: 3000,
    discount: 0,
    deliveryFee: 12000,
    total: 162630,
    orderType: 'delivery',
    customerInfo: {
      name: 'Dewi Lestari',
      phone: '081377665544',
      email: 'dewi.lestari@office.com',
      deliveryAddress: 'Gedung Cyber 2 Lt. 14, Jl. HR Rasuna Said Blok X-5, Kuningan, Jakarta Selatan'
    },
    paymentMethod: 'gopay',
    paymentStatus: 'paid',
    status: 'ready',
    estimatedMinutes: 15
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
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
