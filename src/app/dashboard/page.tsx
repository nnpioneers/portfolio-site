"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/features/authentication/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Briefcase, FolderKanban, LogOut, Settings, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  // Middleware handles real protection, but this prevents flashing unauthenticated content
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-t-2 border-secondary animate-spin mb-4"></div>
          <p className="text-gray-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-gray-400 text-lg">Here is an overview of your enterprise ecosystem.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/business-partner" className="bg-secondary text-black px-6 py-2.5 rounded-xl font-medium hover:scale-105 transition-all flex items-center gap-2">
            Open Business Partner
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Profile Card */}
        <div className="glass-card p-8 rounded-3xl md:col-span-1">
          <div className="w-20 h-20 bg-secondary/10 text-secondary border border-secondary/20 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
            {user.avatar ? <img src={user.avatar} alt="Avatar" className="rounded-2xl w-full h-full object-cover" /> : user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400 mb-4">{user.email}</p>
          
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-wider uppercase mb-6 text-white/70">
            {user.role.replace('_', ' ')}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button className="w-full text-left flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <UserIcon className="w-4 h-4" /> Edit Profile
            </button>
            <button className="w-full text-left flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <Settings className="w-4 h-4" /> Preferences
            </button>
            <button onClick={() => logout()} className="w-full text-left flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/10">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats & Activity */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2 text-gray-400">
                <Briefcase className="w-5 h-5 text-secondary" /> Businesses
              </div>
              <div className="text-4xl font-bold">{user.businessCount}</div>
            </div>
            <div className="glass-card p-6 rounded-3xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2 text-gray-400">
                <FolderKanban className="w-5 h-5 text-accent" /> Active Projects
              </div>
              <div className="text-4xl font-bold">{user.projectCount}</div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-3xl flex-grow">
            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <span className="icon-placeholder-activity text-gray-400"></span>
              </div>
              <p className="text-gray-400">No recent activity found.</p>
              <p className="text-sm text-gray-500 mt-2">Activity tracking will be implemented in V3.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
