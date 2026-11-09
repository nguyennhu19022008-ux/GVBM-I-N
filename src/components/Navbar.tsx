import React from 'react';
import { Newspaper, GraduationCap, Shield, LogIn, BookOpen } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#F6F0E4]/95 backdrop-blur-md hairline-b broadsheet-double-b transition-all">
      <div className="w-full px-6 md:px-12 xl:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Masthead Logo */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none group" 
          onClick={() => onChangeView('portal')}
        >
          <div className="w-11 h-11 bg-[#1A1615] border border-[#C59B27] flex items-center justify-center text-[#F6F0E4] shadow-sm transform group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-[#C59B27]" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-playfair text-xl sm:text-2xl font-black text-[#1A1615] tracking-tight group-hover:text-[#8B0000] transition-colors uppercase">
                ĐAM MÊ LỊCH SỬ
              </span>
              <span className="hidden sm:inline-block px-2 py-0.2 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#ECE3D0] text-[#8B0000] border border-[#1A1615]/20">
                KHỐI 10 · 11 · 12
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#4A3E3D] tracking-wide">
              Nhật Báo & Cổng Học Tập Lịch Sử Trực Quan
            </p>
          </div>
        </div>

        {/* 3 Core Zone Tabs (Broadsheet Style) */}
        <nav className="hidden md:flex items-center gap-2">
          
          {/* Tab 1: Cổng Kết Nối */}
          <button
            onClick={() => onChangeView('portal')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer border ${
              currentView === 'portal'
                ? 'bg-[#1A1615] text-[#F6F0E4] border-[#1A1615] shadow-xs'
                : 'bg-transparent text-[#4A3E3D] border-transparent hover:border-[#1A1615]/30 hover:bg-[#ECE3D0]/60'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>01. Cổng Kết Nối & Ký Ức</span>
          </button>

          {/* Tab 2: Giảng Đường */}
          <button
            onClick={() => onChangeView('learning')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer border ${
              currentView === 'learning'
                ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                : 'bg-transparent text-[#4A3E3D] border-transparent hover:border-[#8B0000]/40 hover:bg-[#ECE3D0]/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>02. Giảng Đường 10-11-12</span>
            <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-[#C59B27] text-black">
              HỌC TẬP
            </span>
          </button>

          {/* Tab 3: Khu Vực Giáo Viên */}
          <button
            onClick={() => onChangeView('admin')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer border ${
              currentView === 'admin'
                ? 'bg-[#1A1615] text-[#F6F0E4] border-[#1A1615] shadow-xs'
                : 'bg-transparent text-[#4A3E3D] border-transparent hover:border-[#1A1615]/30 hover:bg-[#ECE3D0]/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>03. Bàn Quản Trị Giáo Viên</span>
          </button>

        </nav>

        {/* Right Student Auth Status */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#1A1615]/20">
              <div className="w-8 h-8 bg-[#1A1615] text-[#F6F0E4] flex items-center justify-center font-bold text-xs uppercase border border-[#C59B27]">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <span className="block text-xs font-bold text-[#1A1615] max-w-[120px] truncate">{user.name}</span>
                <span className="block text-[10px] text-[#8B0000] font-mono font-semibold">Sĩ Tử Đang Ôn Thi</span>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-2 bg-[#1A1615] hover:bg-[#8B0000] text-[#F6F0E4] font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Đăng Nhập Sĩ Tử</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around hairline-t bg-[#ECE3D0]/80 py-2 px-3 text-xs font-mono">
        <button
          onClick={() => onChangeView('portal')}
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer ${
            currentView === 'portal' ? 'text-[#8B0000] font-bold border-b-2 border-[#8B0000]' : 'text-[#4A3E3D]'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>Ký Ức</span>
        </button>

        <button
          onClick={() => onChangeView('learning')}
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer ${
            currentView === 'learning' ? 'text-[#8B0000] font-bold border-b-2 border-[#8B0000]' : 'text-[#4A3E3D]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Học Tập</span>
        </button>

        <button
          onClick={() => onChangeView('admin')}
          className={`flex items-center gap-1 py-1 px-2 cursor-pointer ${
            currentView === 'admin' ? 'text-[#8B0000] font-bold border-b-2 border-[#8B0000]' : 'text-[#4A3E3D]'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Quản Trị</span>
        </button>
      </div>

    </header>
  );
};
