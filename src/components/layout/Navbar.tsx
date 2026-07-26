"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, User, Rocket, Briefcase, Lightbulb, BrainCircuit, FileEdit, Phone, Moon, Sun, Lock, Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/features/authentication/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileMenuOpen(false);
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on pathname change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-4 px-4 sm:py-6 sm:px-6 md:px-12" id="navbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-nav rounded-2xl px-4 sm:px-6 py-3">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
            <img 
              src="/assets/images/logo-transparent.png" 
              alt="NNP Logo" 
              className="h-8 w-auto filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
            />
            <span className="text-xl font-bold tracking-tight">NNP</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/') ? 'nav-active' : ''}`}><Home className="w-3.5 h-3.5" />Home</Link>
            <Link href="/about" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/about') ? 'nav-active' : ''}`}><User className="w-3.5 h-3.5" />About</Link>
            <Link href="/services" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/services') ? 'nav-active' : ''}`}><Rocket className="w-3.5 h-3.5" />Services</Link>
            <Link href="/portfolio" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/portfolio') ? 'nav-active' : ''}`}><Briefcase className="w-3.5 h-3.5" />Portfolio</Link>
            <Link href="/startup-hub" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/startup-hub') ? 'nav-active' : ''}`}><Lightbulb className="w-3.5 h-3.5" />Startup Hub</Link>
            <Link href="/business-partner" className={`nav-bp-glow flex items-center gap-1.5 ${isActive('/business-partner') ? 'nav-active' : ''}`}><BrainCircuit className="w-3.5 h-3.5" />Business Partner</Link>
            {!isAuthenticated && <Link href="/registration" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/registration') ? 'nav-active' : ''}`}><FileEdit className="w-3.5 h-3.5" />Registration</Link>}
            <Link href="/contact" className={`link-hover transition-colors flex items-center gap-1.5 ${isActive('/contact') ? 'nav-active' : ''}`}><Phone className="w-3.5 h-3.5" />Contact</Link>
          </div>
          
          {/* Desktop User / Auth / Theme Actions */}
          <div className="hidden lg:flex items-center gap-4 relative">
            <button id="theme-toggle" aria-label="Toggle dark/light theme" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-400">
              <Moon className="w-5 h-5 hidden dark:block" />
              <Sun className="w-5 h-5 block dark:hidden" />
            </button>
            
            {!isAuthenticated ? (
              <Link href="/login" className="btn-magnetic group relative overflow-hidden rounded-full bg-white text-black px-6 py-2 font-medium transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">Login <Lock className="w-4 h-4" /></span>
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full pl-2 pr-4 py-1.5 hover:bg-white/20 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center text-xs font-bold text-secondary">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                    <div className="p-4 border-b border-white/10 bg-white/5">
                      <p className="text-sm font-bold text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                      <div className="mt-2 inline-block px-2 py-0.5 bg-secondary/10 border border-secondary/30 rounded text-[10px] text-secondary font-bold tracking-wider uppercase">
                        {user?.role?.replace('_', ' ')}
                      </div>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Briefcase className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-white/10">
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Mobile Hamburger Toggle Button (lg:hidden fixes tablet bug) */}
          <button 
            className="lg:hidden p-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-xl transition-colors" 
            id="mobile-menu-btn"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sliding Navigation Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#08080c]/95 border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3">
              <img 
                src="/assets/images/logo-transparent.png" 
                alt="NNP Logo" 
                className="h-8 w-auto filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
              <span className="text-xl font-bold tracking-tight text-white">NNP</span>
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Links List */}
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive('/') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-5 h-5 text-secondary" /> Home
            </Link>

            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive('/about') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-5 h-5 text-secondary" /> About
            </Link>

            <Link 
              href="/services" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive('/services') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Rocket className="w-5 h-5 text-secondary" /> Services
            </Link>

            <Link 
              href="/portfolio" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive('/portfolio') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-5 h-5 text-secondary" /> Portfolio
            </Link>

            <Link 
              href="/startup-hub" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive('/startup-hub') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Lightbulb className="w-5 h-5 text-secondary" /> Startup Hub
            </Link>

            <Link 
              href="/business-partner" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                isActive('/business-partner') ? 'bg-purple-500/20 text-purple-300 border-l-4 border-purple-400' : 'text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              <BrainCircuit className="w-5 h-5 text-purple-400 animate-pulse" /> Business Partner
            </Link>

            {!isAuthenticated && (
              <Link 
                href="/registration" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive('/registration') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileEdit className="w-5 h-5 text-secondary" /> Registration
              </Link>
            )}

            <Link 
              href="/contact" 
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive('/contact') ? 'bg-white/10 text-white border-l-4 border-secondary font-semibold' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Phone className="w-5 h-5 text-secondary" /> Contact
            </Link>
          </div>
        </div>

        {/* Drawer Footer Actions (Login / Account & Theme) */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center text-xs font-bold text-secondary shrink-0">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>

              <Link 
                href="/dashboard" 
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Briefcase className="w-4 h-4 text-secondary" /> Dashboard
              </Link>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold text-base shadow-lg transition-transform active:scale-95"
            >
              <span>Login</span> <Lock className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

