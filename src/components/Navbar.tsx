import React from 'react';
import { Newspaper, GraduationCap, Shield, LogIn } from 'lucide-react';

export type PortalView = 'portal' | 'learning' | 'admin';

interface NavbarProps {
  currentView: PortalView;
  onChangeView: (view: PortalView) => void;
  user: { name: string; email: string; avatar?: string } | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  user,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a1418]/95 backdrop-blur-md text-white transition-all shadow-md">
      <div className="w-full px-6 md:px-12 xl:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Circular Monogram Mark & Title */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none group" 
          onClick={() => onChangeView('portal')}
        >
          <div className="brand-mark group-hover:scale-105 transition-transform">
            <span>ĐS</span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-playfair text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#e5c985] transition-colors uppercase">
                ĐAM MÊ LỊCH SỬ
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#14242a] text-[#e5c985] rounded">
                KHỐI 10 · 11 · 12
              </span>
            </div>
            <p className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
              DI SẢN SỬ HỌC SỐ & KHẢO THÍ SƯ PHẠM
            </p>
          </div>
        </div>

        {/* 3 Core Zone Tabs (Matching Dien Bien Di San So navigation) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          
          {/* Tab 1: Cổng Kết Nối */}
          <button
            onClick={() => onChangeView('portal')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer rounded-xl ${
              currentView === 'portal'
                ? 'bg-[#9C3B32] text-white shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-[#e5c985]" />
            <span>01. Cổng Ký Ức</span>
          </button>

          {/* Tab 2: Giảng Đường */}
          <button
            onClick={() => onChangeView('learning')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer rounded-xl ${
              currentView === 'learning'
                ? 'bg-[#9C3B32] text-white shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#e5c985]" />
            <span>02. Giảng Đường 10-11-12</span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-[#E5C985] text-[#0A1418] rounded">
              HỌC TẬP
            </span>
          </button>

          {/* Tab 3: Khu Vực Quản Trị */}
          <button
            onClick={() => onChangeView('admin')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer rounded-xl ${
              currentView === 'admin'
                ? 'bg-[#9C3B32] text-white shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#c69a47]" />
            <span>03. Bàn Quản Trị</span>
          </button>

        </nav>

        {/* Right Student Auth Status */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5 pl-3">
              <div className="w-8 h-8 rounded-full bg-[#14242a] text-[#e5c985] flex items-center justify-center font-bold text-xs uppercase overflow-hidden shadow-xs">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-mono font-bold text-[#e5c985]">{user.name}</span>
                <span className="text-[10px] font-mono text-white/50">{user.email}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-[#e5c985]" />
              <span className="hidden sm:inline">Học Viên</span>
              <span>Đăng Nhập</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
