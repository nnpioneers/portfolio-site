"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, User, Rocket, Briefcase, Lightbulb, BrainCircuit, FileEdit, Phone, Moon, Sun, Lock, Menu, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/features/authentication/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-6 px-6 md:px-12" id="navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-nav rounded-2xl px-6 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/assets/images/logo-transparent.png" 
            alt="NNP Logo" 
            className="h-8 w-auto filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
          />
          <span className="text-xl font-bold tracking-tight">NNP</span>
        </Link>
        
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
        
        <div className="hidden lg:flex items-center gap-4 relative">
          <button id="theme-toggle" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-400">
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
                  {user?.name.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                    <div className="mt-2 inline-block px-2 py-0.5 bg-secondary/10 border border-secondary/30 rounded text-[10px] text-secondary font-bold tracking-wider uppercase">
                      {user?.role.replace('_', ' ')}
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
        
        <button className="md:hidden text-white" id="mobile-menu-btn">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
