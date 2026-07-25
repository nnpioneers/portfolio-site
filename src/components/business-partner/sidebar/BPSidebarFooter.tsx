'use client';

import { Settings, User, LogOut } from 'lucide-react';
import BPCategoryBtn from './BPCategoryBtn';

interface BPSidebarFooterProps {
  onLogout?: () => void;
}

export default function BPSidebarFooter({ onLogout }: BPSidebarFooterProps) {
  return (
    <div className="bp-sidebar-footer">
      <BPCategoryBtn 
        icon={<Settings className="w-3.5 h-3.5 text-gray-400" />}
        label="Settings"
      />
      
      <BPCategoryBtn 
        icon={<User className="w-3.5 h-3.5 text-white" />}
        label={
          <>
            <span>Profile</span>
            <span className="ml-auto text-[10px] text-violet-400 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.2)' }}>
              Guest
            </span>
          </>
        }
        iconBg="linear-gradient(135deg,#7c3aed,#4f46e5)"
        iconBorder="transparent"
      />
      
      <BPCategoryBtn 
        id="bp-logout-btn"
        icon={<LogOut className="w-3.5 h-3.5 text-red-400 opacity-60" />}
        label="Logout"
        iconBg="rgba(239,68,68,0.07)"
        iconBorder="rgba(239,68,68,0.1)"
        textColor="rgba(239,68,68,0.6)"
        onClick={onLogout}
      />
    </div>
  );
}
