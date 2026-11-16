import React, { useState, useEffect } from 'react';
import { Newspaper, GraduationCap, Shield, Menu, X } from 'lucide-react';

export type PortalView = 'portal' | 'learning' | 'admin';

interface NavbarProps {
  currentView: PortalView;
  onChangeView: (view: PortalView) => void;
  isAdminAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  isAdminAuthenticated = false,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0A1418]/92 backdrop-blur-md text-white border-b border-[#E5C985]/20 transition-all">
      {/* Scroll Reading Progress Bar (Thước đo cuộn điện ảnh ánh vàng) */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#9C3B32] via-[#E5C985] to-[#9C3B32] transition-all duration-75 z-50 pointer-events-none" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className="w-full px-6 md:px-12 xl:px-16 h-16 flex items-center justify-between">
        
        {/* Brand Medallion & Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => onChangeView('portal')}
        >
          <div className="brand-mark group-hover:scale-105 transition-transform shrink-0">
            <span>ĐS</span>
          </div>
          <div className="text-left">
            <span className="font-playfair text-base sm:text-lg font-black text-white tracking-tight group-hover:text-[#E5C985] transition-colors uppercase block leading-none">
              ĐAM MÊ LỊCH SỬ
            </span>
            <span className="text-[9px] font-mono text-[#E5C985]/80 tracking-widest uppercase block mt-1">
              CỔNG DI SẢN SỬ HỌC SỐ & KHẢO THÍ SƯ PHẠM
            </span>
          </div>
        </div>

        {/* 3 Core Zone Navigation Tabs (Harmonious Typographic Underline Tabs) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-16">
          
          {/* Tab 1: Cổng Kết Nối */}
          <button
            onClick={() => onChangeView('portal')}
            className={`h-16 px-1 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer relative ${
              currentView === 'portal'
                ? 'text-[#E5C985] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E5C985]'
                : 'text-white/70 hover:text-white font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-transparent hover:after:bg-white/30'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-[#E5C985]" />
            <span>01. Cổng Ký Ức</span>
          </button>

          {/* Tab 2: Giảng Đường */}
          <button
            onClick={() => onChangeView('learning')}
            className={`h-16 px-1 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer relative ${
              currentView === 'learning'
                ? 'text-[#E5C985] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E5C985]'
                : 'text-white/75 hover:text-white font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-transparent hover:after:bg-white/30'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#E5C985]" />
            <span>02. Giảng Đường 10-11-12</span>
          </button>

          {/* Tab 3: Khu Vực Quản Trị */}
          <button
            onClick={() => onChangeView('admin')}
            className={`h-16 px-1 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer relative ${
              currentView === 'admin'
                ? 'text-[#E5C985] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E5C985]'
                : 'text-white/75 hover:text-white font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-transparent hover:after:bg-white/30'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#E5C985]" />
            <span>03. Bàn Quản Trị</span>
          </button>

        </nav>

        {/* Right Teacher / Admin Auth Status & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onChangeView('admin');
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isAdminAuthenticated
                ? 'bg-[#E5C985] text-[#0A1418] shadow-xs'
                : 'bg-white/10 hover:bg-[#E5C985]/20 text-[#E5C985]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdminAuthenticated ? 'Giáo Viên (Đã Đăng Nhập)' : 'Giáo Viên'}</span>
            <span className="sm:hidden">GV</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 rounded-full text-[#E5C985] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A1418] border-t border-[#E5C985]/20 px-6 py-4 space-y-2 animate-fadeSlideUp shadow-2xl">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onChangeView('portal');
            }}
            className={`w-full py-2.5 px-3 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-3 cursor-pointer border-l-2 ${
              currentView === 'portal'
                ? 'border-[#E5C985] text-[#E5C985] bg-[#E5C985]/10 font-bold'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4 text-[#E5C985]" />
            <span>01. Cổng Ký Ức</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onChangeView('learning');
            }}
            className={`w-full py-2.5 px-3 text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer border-l-2 ${
              currentView === 'learning'
                ? 'border-[#E5C985] text-[#E5C985] bg-[#E5C985]/10 font-bold'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-[#E5C985]" />
              <span>02. Giảng Đường 10-11-12</span>
            </div>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold border border-[#E5C985]/40 text-[#E5C985]">
              HỌC TẬP
            </span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onChangeView('admin');
            }}
            className={`w-full py-2.5 px-3 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-3 cursor-pointer border-l-2 ${
              currentView === 'admin'
                ? 'border-[#E5C985] text-[#E5C985] bg-[#E5C985]/10 font-bold'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-[#E5C985]" />
            <span>03. Bàn Quản Trị</span>
          </button>
        </div>
      )}
    </header>
  );
};
