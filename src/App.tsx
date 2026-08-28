/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { AmbianceSection } from './components/home/AmbianceSection';
import { FeaturedSection } from './components/home/FeaturedSection';
import { ShopTeaser } from './components/home/ShopTeaser';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { LocationSection } from './components/home/LocationSection';
import { AboutUsSection } from './components/about/AboutUsSection';
import { MenuCatalog } from './components/menu/MenuCatalog';
import { GallerySection } from './components/gallery/GallerySection';
import { ReservationSection } from './components/reservation/ReservationSection';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderTrackerView } from './components/orders/OrderTrackerView';
import { BlogSection } from './components/blog/BlogSection';
import { ContactSection } from './components/contact/ContactSection';
import { AiSommelierSection } from './components/ai/AiSommelierSection';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/menu/ProductDetailModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LiveChatWidget } from './components/common/LiveChatWidget';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { BackgroundArt } from './components/layout/BackgroundArt';

const MainContent: React.FC = () => {
  const { activePage } = useShop();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2118] font-sans antialiased selection:bg-[#432E20] selection:text-[#FFFDF9]">
      {/* Artisanal Background Elements: Corner Line Art, Dots & Graffiti Accents */}
      <BackgroundArt />

      {/* Global Top Navbar */}
      <Navbar />

      {/* Main Page Routing with Elegant Fade & Slide Animations */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePage === 'home' && (
              <div className="space-y-0">
                <HeroSection />
                <AmbianceSection />
                <FeaturedSection />
                <ShopTeaser />
                <TestimonialsSection />
                <LocationSection />
              </div>
            )}

            {activePage === 'about' && <AboutUsSection />}
            {activePage === 'menu' && <MenuCatalog />}
            {activePage === 'gallery' && <GallerySection />}
            {activePage === 'reservation' && <ReservationSection />}
            {activePage === 'checkout' && <CheckoutView />}
            {activePage === 'order_tracking' && <OrderTrackerView />}
            {activePage === 'blog' && <BlogSection />}
            {activePage === 'contact' && <ContactSection />}
            {activePage === 'ai_sommelier' && <AiSommelierSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals, Drawers & Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <AdminDashboard />
      <LiveChatWidget />
      <AuthModal />
      <ToastContainer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
