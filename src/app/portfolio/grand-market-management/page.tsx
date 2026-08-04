'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, ShoppingBag, 
  Search, ShoppingCart, CreditCard, LayoutDashboard, Database, 
  PackageCheck, LineChart, Lock, Sparkles, Server, Cloud, Cpu, 
  Store, Zap, Rocket, Layers, Check, CheckCircle, X, ChevronLeft, 
  ChevronRight, ZoomIn, Eye, Maximize2
} from 'lucide-react';

const FEATURE_CARDS = [
  {
    title: 'Product Catalogue',
    icon: ShoppingBag,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    description: 'Comprehensive multi-category inventory showcase designed for fast customer discovery and smooth browsing.',
    items: ['Fruits', 'Vegetables', 'Grocery Items', 'Snacks', 'Dairy', 'Beverages', 'Bakery', 'Household Products', 'Personal Care', 'Cleaning Essentials']
  },
  {
    title: 'Smart Search & Filtering',
    icon: Search,
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    description: 'Instant search engine powering sub-millisecond product retrieval across large product databases.',
    items: ['Autocomplete Suggestions', 'Category Filters', 'Brand Filters', 'Price Filters']
  },
  {
    title: 'Shopping Cart',
    icon: ShoppingCart,
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    description: 'Dynamic cart management with real-time price updates, coupon applications, and item persistence.',
    items: ['Add to Cart', 'Remove Items', 'Wishlist', 'Quantity Update', 'Instant Price Calculation']
  },
  {
    title: 'Secure Checkout',
    icon: CreditCard,
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    description: 'Frictionless checkout experience supporting multi-payment gateway integration and flexible delivery options.',
    items: ['Address Management', 'Delivery Slot Selection', 'Coupon System', 'Tax Calculation', 'Online Payment', 'Cash on Delivery']
  },
  {
    title: 'Customer Dashboard',
    icon: LayoutDashboard,
    color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400',
    description: 'Personalized customer portal for tracking live orders, viewing invoices, and managing profile preferences.',
    items: ['Order History', 'Saved Addresses', 'Wishlist', 'Track Orders', 'Invoices', 'Notifications']
  },
  {
    title: 'Admin Command Dashboard',
    icon: Store,
    color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
    description: 'Central management center giving store owners 360-degree control over all marketplace operations.',
    items: ['Manage Products', 'Manage Categories', 'Inventory', 'Orders', 'Customers', 'Discount Coupons', 'Delivery Partners', 'Reports', 'Revenue Analytics']
  },
  {
    title: 'Inventory Management',
    icon: Database,
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
    description: 'Automated stock monitoring system with low-stock triggers and purchase order tracking.',
    items: ['Real-time Stock Monitoring', 'Low Stock Alerts', 'Product Expiry Tracking', 'Supplier Management', 'Purchase Records']
  },
  {
    title: 'Order Management',
    icon: PackageCheck,
    color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    description: 'End-to-end fulfillment tracking from order placement to doorstep delivery.',
    items: ['Pending Orders', 'Processing', 'Packed', 'Out For Delivery', 'Delivered', 'Cancelled', 'Refund Requests']
  },
  {
    title: 'Analytics Dashboard',
    icon: LineChart,
    color: 'from-cyan-500/20 to-emerald-500/10 border-cyan-500/30 text-cyan-400',
    description: 'Real-time sales intelligence and revenue forecasting for data-driven business decisions.',
    items: ['Daily Sales', 'Monthly Revenue', 'Best Selling Products', 'Top Customers', 'Order Statistics', 'Inventory Reports', 'Business Growth Charts']
  }
];

const GALLERY_CATEGORIES = [
  'All',
  'Customer App',
  'Shopping',
  'Products',
  'Checkout',
  'Orders',
  'Admin Dashboard',
  'Inventory'
];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Homepage',
    category: 'Customer App',
    description: 'Customer landing page with featured products and categories.',
    image: '/images/grand-market-hero.jpg'
  },
  {
    id: 2,
    title: 'Product Listing',
    category: 'Products',
    description: 'Browse fruits, vegetables, groceries, snacks, beverages, and household essentials.',
    image: '/images/grand-market-hero.jpg'
  },
  {
    id: 3,
    title: 'Product Details',
    category: 'Shopping',
    description: 'Complete product page with images, price, stock, reviews, and add-to-cart.',
    image: '/images/grand-market-hero.jpg'
  },
  {
    id: 4,
    title: 'Shopping Cart',
    category: 'Shopping',
    description: 'Customer shopping cart with quantity management and order summary.',
    image: '/images/grand-market-hero.jpg'
  },
  {
    id: 5,
    title: 'Checkout',
    category: 'Checkout',
    description: 'Secure checkout with address, payment, coupons, and delivery options.',
    image: '/images/grand-market-hero.jpg'
  },
  {
    id: 6,
    title: 'Order Tracking',
    category: 'Orders',
    description: 'Live order tracking with order status timeline.',
    image: '/images/grand-market-hero.jpg'
  },
  {
    id: 7,
    title: 'Customer Dashboard',
    category: 'Customer App',
    description: 'Orders, wishlist, saved addresses, notifications, and profile.',
    image: '/images/grand-market-customer-dashboard.png'
  },
  {
    id: 8,
    title: 'Admin Dashboard',
    category: 'Admin Dashboard',
    description: 'Business analytics, revenue, customer statistics, and sales overview.',
    image: '/images/grand-market-admin-dashboard.png'
  },
  {
    id: 9,
    title: 'Product Management',
    category: 'Admin Dashboard',
    description: 'Admin panel for adding, editing, deleting, and organizing products.',
    image: '/images/grand-market-product-management.png'
  },
  {
    id: 10,
    title: 'Inventory Management',
    category: 'Inventory',
    description: 'Real-time stock monitoring with low-stock alerts and supplier information.',
    image: '/images/grand-market-inventory-management.png'
  },
  {
    id: 11,
    title: 'Order Management',
    category: 'Orders',
    description: 'Pending, Processing, Packed, Delivered, Cancelled, and Refund management.',
    image: '/images/grand-market-order-management.png'
  },
  {
    id: 12,
    title: 'Sales Analytics',
    category: 'Admin Dashboard',
    description: 'Revenue charts, best-selling products, customer insights, and monthly reports.',
    image: '/images/grand-market-sales-analysis.png'
  }
];

const SECURITY_ITEMS = [
  'Role Based Authentication (RBAC)',
  'JWT Token Authentication',
  'Bcrypt Encrypted Passwords',
  'PCI-DSS Compliant Payment Gateways',
  'End-to-End HTTPS Encryption',
  'Protected Server API Endpoints',
  'Granular Admin Access Controls'
];

const TECH_GROUPS = [
  {
    category: 'Frontend',
    icon: Cpu,
    items: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3']
  },
  {
    category: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express.js', 'REST API Architecture']
  },
  {
    category: 'Database',
    icon: Database,
    items: ['MongoDB', 'Mongoose ODM']
  },
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    items: ['Cloudinary Image CDN', 'Firebase Push Notifications', 'AWS Production Ready']
  },
  {
    category: 'Payment Integrations',
    icon: CreditCard,
    items: ['Stripe', 'Razorpay', 'UPI', 'Cash on Delivery (COD)']
  }
];

const MODULES = [
  'Customer Module',
  'Admin Module',
  'Store Manager Module',
  'Inventory Module',
  'Order Module',
  'Delivery Module',
  'Analytics Module',
  'Payment Module',
  'Notification Module'
];

const BUSINESS_BENEFITS = [
  'Faster Shopping Experience',
  'Real-time Inventory Accuracy',
  '24/7 Online Store Ordering',
  'Effortless Store Operations Management',
  '100% Secure Multi-Gateway Payments',
  'Enhanced Customer Retention & Engagement',
  'Comprehensive Sales & Revenue Analytics',
  'Mobile-First Responsive Interface',
  'Cloud-Ready Infrastructure',
  'Highly Scalable Multi-Tenant Architecture'
];

const FUTURE_ENHANCEMENTS = [
  'AI Product Recommendation Engine',
  'Voice Search Shopping Assistant',
  'Mobile Barcode & QR Code Scanner',
  'Smart Predictive Inventory Restocking',
  'Live Delivery Driver GPS Tracking',
  'Loyalty Rewards & Points Program',
  '24/7 AI Customer Support Chatbot',
  'Multi-Store Chain Synchronization'
];

export default function GrandMarketCaseStudyPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const filteredGalleryItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredGalleryItems.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredGalleryItems]);

  // Prevent scroll when lightbox open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedIndex]);

  // Touch Swipe handlers for Mobile Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Back Navigation Button */}
      <div className="mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" /> Back to Portfolio
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="mb-16">
        {/* Full-width Hero Banner Image Showcase */}
        <div className="glass-card rounded-[2.5rem] p-4 md:p-6 border border-emerald-500/20 relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.2)] mb-12">
          <div className="relative w-full h-[320px] sm:h-[480px] md:h-[620px] rounded-2xl overflow-hidden group">
            <Image
              src="/images/grand-market-hero.jpg"
              alt="Grand Market Management System Banner"
              fill
              className="object-cover object-top group-hover:scale-102 transition-transform duration-700"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="bg-black/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-emerald-500/40">
                <span className="text-xs font-mono text-emerald-400 block font-semibold">RETAIL MARKETPLACE PLATFORM</span>
                <span className="text-sm font-bold text-white">Grand Market Management System</span>
              </div>
              
              <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Project Status: Completed Successfully
              </div>
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs md:text-sm mb-6 font-semibold uppercase tracking-widest">
            <Store className="w-4 h-4" /> Market Management System • Case Study
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            Grand Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Management System</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light font-body leading-relaxed max-w-3xl mx-auto">
            A complete smart digital shopping ecosystem for modern supermarkets, grocery chains, family stores and retail businesses.
          </p>
        </div>
      </div>

      {/* PROJECT OVERVIEW */}
      <section className="mb-20">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-white">Project Overview</h2>
          </div>
          
          <p className="text-gray-300 font-body text-base md:text-lg leading-relaxed mb-6">
            <strong className="text-white font-semibold">Grand Market Management System</strong> is a modern full-stack e-commerce solution developed to digitize grocery and supermarket operations.
          </p>
          <p className="text-gray-300 font-body text-base md:text-lg leading-relaxed">
            The platform allows customers to browse thousands of products, place orders online, make secure payments, and receive doorstep delivery while giving store owners complete control over inventory, billing, customers, orders, analytics and business operations. The system focuses on speed, convenience, inventory accuracy and customer satisfaction.
          </p>
        </div>
      </section>

      {/* PROJECT GALLERY SECTION */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Eye className="w-4 h-4" /> Screenshot Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Gallery</span>
          </h2>
          <p className="text-gray-400 text-base font-light leading-relaxed">
            Experience the complete Grand Market ecosystem through real application screenshots showcasing the customer experience, admin dashboard, shopping workflow, and business management system.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none flex-nowrap md:flex-wrap justify-start md:justify-center gap-2.5 mb-10 pb-2 px-1">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
              }}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-black border border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:border-emerald-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGalleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-500 group cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] flex flex-col justify-between"
            >
              {/* Image Container with Zoom hover */}
              <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top group-hover:scale-108 transition-transform duration-700"
                  unoptimized
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Hover Preview Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-emerald-500/90 text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-4 h-4" /> Preview Screenshot
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 bg-gradient-to-b from-white/[0.02] to-transparent border-t border-white/5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500">#{item.id}</span>
                </div>
                <p className="text-gray-400 text-xs font-body leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>

                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold tracking-wider uppercase group-hover:underline">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to Preview
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedIndex !== null && filteredGalleryItems[selectedIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Title & Close Button */}
          <div className="flex items-center justify-between z-20 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase">
                {filteredGalleryItems[selectedIndex].category}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {selectedIndex + 1} / {filteredGalleryItems.length}
              </span>
            </div>

            <button
              onClick={() => setSelectedIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image Container with Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-7xl mx-auto w-full">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/60 hover:bg-emerald-500 hover:text-black text-white border border-white/20 transition-all backdrop-blur-md"
              title="Previous Screenshot (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Preview Image */}
            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <img
                src={filteredGalleryItems[selectedIndex].image}
                alt={filteredGalleryItems[selectedIndex].title}
                className="max-h-full max-w-full object-contain rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-white/15"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/60 hover:bg-emerald-500 hover:text-black text-white border border-white/20 transition-all backdrop-blur-md"
              title="Next Screenshot (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="w-full max-w-4xl mx-auto text-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/15 z-20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {filteredGalleryItems[selectedIndex].title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-body max-w-2xl mx-auto">
              {filteredGalleryItems[selectedIndex].description}
            </p>
            <div className="mt-3 text-[10px] font-mono text-gray-500">
              Use ← → arrow keys to navigate • Esc to close • Swipe on mobile
            </div>
          </div>
        </div>
      )}

      {/* KEY FEATURES */}
      <section className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Features</span>
          </h2>
          <p className="text-gray-400 text-base font-light">
            Engineered with high-performance modules for both retail customers and store managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-8 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 font-body text-xs leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-xs text-gray-300 font-body">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="mb-20">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-900/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4" /> Security Architecture
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Enterprise Grade Protection</h2>
              <p className="text-gray-400 text-sm max-w-2xl font-body">
                Built with stringent web security practices protecting financial transactions, customer data, and administrative portals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {SECURITY_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Stack</span>
          </h2>
          <p className="text-gray-400 text-base font-light">
            Modern full-stack technologies powering the Grand Market platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-emerald-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODULES */}
      <section className="mb-20">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-white">System Modules</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {MODULES.map((mod, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs md:text-sm font-semibold text-gray-200">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS BENEFITS */}
      <section className="mb-20">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-transparent">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Business Benefits</h2>
            <p className="text-gray-400 text-sm">Quantifiable operational advantages delivered to retail store owners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {BUSINESS_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 font-bold" />
                <span className="text-sm font-medium text-gray-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE ENHANCEMENTS */}
      <section className="mb-20">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Rocket className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-white">Future Enhancements Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {FUTURE_ENHANCEMENTS.map((enhancement, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between h-28">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">PHASE 2.0</span>
                <span className="text-xs font-semibold text-gray-200 leading-snug">{enhancement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO FOOTER */}
      <footer className="glass-card p-8 md:p-12 rounded-3xl border border-emerald-500/30 bg-black/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">Developed By</span>
            <span className="text-sm font-bold text-white">NNP – Network Navigator Pioneers</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">Project Type</span>
            <span className="text-sm font-bold text-white">Retail Marketplace Management Platform</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">Industry</span>
            <span className="text-sm font-bold text-white">Retail • Supermarket • Grocery • E-Commerce</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">Project Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Completed Successfully
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500 font-mono">UI Theme:</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300">Apple-Level Premium Design</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300">Modern Glassmorphism</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300">Dark Theme</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300">Smooth Animations</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300">Responsive Layout</span>
          </div>

          <Link 
            href="/start-project" 
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all text-xs"
          >
            Build a Similar Solution →
          </Link>
        </div>
      </footer>

    </div>
  );
}
