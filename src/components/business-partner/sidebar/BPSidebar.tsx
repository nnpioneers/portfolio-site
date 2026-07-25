'use client';

import { BrainCircuit, MessageSquare, Pin, Briefcase, Rocket, FolderOpen, GraduationCap, FileText, Bookmark, Archive, Trash2, Cloud } from 'lucide-react';
import BPNewChatBtn from './BPNewChatBtn';
import BPSearch from './BPSearch';
import BPCategoryBtn from './BPCategoryBtn';
import BPSidebarFooter from './BPSidebarFooter';

interface BPSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onLogout: () => void;
  onNewChat: () => void;
}

export default function BPSidebar({ 
  isOpen, 
  onClose, 
  activeCategory, 
  setActiveCategory, 
  onLogout,
  onNewChat
}: BPSidebarProps) {
  return (
    <>
      <div 
        className={`bp-sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      ></div>

      <aside className={`bp-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="bp-sidebar-header">
          <div className="flex items-center gap-3 mb-4 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}>
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-violet-300">Business Partner</span>
          </div>
          <BPNewChatBtn onClick={onNewChat} />
          <BPSearch />
        </div>

        <div className="bp-sidebar-body">
          {/* RECENT CHATS */}
          <div className="bp-section-label">Recent Chats</div>
          <div className="flex flex-col gap-1 mb-4">
            <div className="text-center py-5 px-4 hidden">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
                   style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <MessageSquare className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600 font-body leading-relaxed">
                Every successful business<br/>begins with one conversation.
                <span className="text-violet-500/70 font-medium mt-1 block">Start yours today.</span>
              </p>
            </div>
            {/* Real implementation would map chats here */}
          </div>

          {/* PINNED */}
          <div className="bp-section-label mt-1">Pinned</div>
          <div className="flex flex-col gap-1 mb-4">
            <div className="bp-placeholder-row">
              <Pin className="w-3 h-3 opacity-40 shrink-0" />
              <span>No pinned chats yet</span>
            </div>
          </div>

          <div className="bp-sec-divider"></div>

          {/* CATEGORIES */}
          <div className="bp-section-label mt-1">Categories</div>
          <BPCategoryBtn 
            active={activeCategory === 'business'} onClick={() => setActiveCategory('business')}
            icon={<Briefcase className="w-3.5 h-3.5 text-violet-400" />} label="Business"
            iconBg="rgba(139,92,246,0.15)" iconBorder="rgba(139,92,246,0.2)"
          />
          <BPCategoryBtn 
            active={activeCategory === 'startup'} onClick={() => setActiveCategory('startup')}
            icon={<Rocket className="w-3.5 h-3.5 text-blue-400" />} label="Startup"
            iconBg="rgba(59,130,246,0.1)" iconBorder="rgba(59,130,246,0.15)"
          />
          <BPCategoryBtn 
            active={activeCategory === 'projects'} onClick={() => setActiveCategory('projects')}
            icon={<FolderOpen className="w-3.5 h-3.5 text-emerald-400" />} label="Projects"
            iconBg="rgba(16,185,129,0.1)" iconBorder="rgba(16,185,129,0.15)"
          />
          <BPCategoryBtn 
            active={activeCategory === 'students'} onClick={() => setActiveCategory('students')}
            icon={<GraduationCap className="w-3.5 h-3.5 text-amber-400" />} label="Students"
            iconBg="rgba(245,158,11,0.1)" iconBorder="rgba(245,158,11,0.15)"
          />
          <BPCategoryBtn 
            active={activeCategory === 'documents'} onClick={() => setActiveCategory('documents')}
            icon={<FileText className="w-3.5 h-3.5 text-indigo-400" />} label="Documents"
            iconBg="rgba(99,102,241,0.1)" iconBorder="rgba(99,102,241,0.15)"
          />

          <div className="bp-sec-divider"></div>

          {/* LIBRARY */}
          <div className="bp-section-label mt-1">Library</div>
          <BPCategoryBtn icon={<Bookmark className="w-3.5 h-3.5 text-gray-400" />} label="Saved" />
          <BPCategoryBtn icon={<Pin className="w-3.5 h-3.5 text-gray-400" />} label="Pinned" />
          <BPCategoryBtn icon={<Archive className="w-3.5 h-3.5 text-gray-400" />} label="Archive" />
          <BPCategoryBtn 
            icon={<Trash2 className="w-3.5 h-3.5 text-red-400 opacity-60" />} 
            label={<span className="text-gray-600">Trash</span>}
            iconBg="rgba(239,68,68,0.07)" iconBorder="rgba(239,68,68,0.1)"
          />

          <div className="mt-5 mx-1 px-2 py-3 rounded-xl text-center" style={{ border: '1px dashed rgba(255,255,255,0.07)' }}>
            <Cloud className="w-4 h-4 text-gray-700 mx-auto mb-1.5" />
            <p className="text-gray-700 font-body text-[10px]">Cloud Sync &middot; Coming Soon</p>
          </div>
        </div>

        <BPSidebarFooter onLogout={onLogout} />
      </aside>
    </>
  );
}
