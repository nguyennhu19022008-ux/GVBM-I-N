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
    <header className="sticky top-0 z-40 bg-[#0a1418]/95 backdrop-blur-md border-b border-[#e5c985]/20 text-white transition-all">
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
              <span className="hidden sm:inline-block px-2 py-0.2 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#14242a] text-[#e5c985] border border-[#e5c985]/30">
                KHỐI 10 · 11 · 12
              </span>
            </div>
            <p className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
              DI SẢN SỬ HỌC SỐ & KHẢO THÍ SƯ PHẠM
            </p>
          </div>
        </div>

        {/* 3 Core Zone Tabs (Matching Dien Bien Di San So navigation) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          
          {/* Tab 1: Cổng Kết Nối */}
          <button
            onClick={() => onChangeView('portal')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border-b-2 ${
              currentView === 'portal'
                ? 'border-[#e5c985] text-[#e5c985] bg-white/5'
                : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-[#e5c985]" />
            <span>01. Cổng Ký Ức</span>
          </button>

          {/* Tab 2: Giảng Đường */}
          <button
            onClick={() => onChangeView('learning')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border-b-2 ${
              currentView === 'learning'
                ? 'border-[#e5c985] text-[#e5c985] bg-white/5'
                : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#9c3b32]" />
            <span>02. Giảng Đường 10-11-12</span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-[#9c3b32] text-white">
              HỌC TẬP
            </span>
          </button>

          {/* Tab 3: Khu Vực Quản Trị */}
          <button
            onClick={() => onChangeView('admin')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border-b-2 ${
              currentView === 'admin'
                ? 'border-[#e5c985] text-[#e5c985] bg-white/5'
                : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#c69a47]" />
            <span>03. Bàn Quản Trị</span>
          </button>

        </nav>

        {/* Right Student Auth Status */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/20">
              <div className="w-8 h-8 bg-[#14242a] text-[#e5c985] flex items-center justify-center font-bold text-xs uppercase border border-[#c69a47]">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <span className="block text-xs font-bold text-white max-w-[120px] truncate">{user.name}</span>
                <span className="block text-[10px] text-[#e5c985] font-mono font-semibold">Sĩ Tử Đang Ôn Thi</span>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 bg-[#9c3b32] hover:bg-[#7a2820] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs cursor-pointer border border-[#e5c985]/30 active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-[#e5c985]" />
              <span>Đăng Nhập Sĩ Tử</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 bg-[#14242a] py-2 px-3 text-xs font-mono">
        <button
          onClick={() => onChangeView('portal')}
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer ${
            currentView === 'portal' ? 'text-[#e5c985] font-bold border-b-2 border-[#e5c985]' : 'text-white/70'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>Ký Ức</span>
        </button>

        <button
          onClick={() => onChangeView('learning')}
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer ${
            currentView === 'learning' ? 'text-[#e5c985] font-bold border-b-2 border-[#e5c985]' : 'text-white/70'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Học Tập</span>
        </button>

        <button
          onClick={() => onChangeView('admin')}
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer ${
            currentView === 'admin' ? 'text-[#e5c985] font-bold border-b-2 border-[#e5c985]' : 'text-white/70'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Quản Trị</span>
        </button>
      </div>

    </header>
  );
};
