import React from 'react';
import { BookOpen, Clock, Download, Award, LogIn, Sparkles, ChevronRight } from 'lucide-react';

interface NavbarProps {
  activeTab: 'timeline' | 'downloads' | 'quiz' | 'all';
  setActiveTab: (tab: 'timeline' | 'downloads' | 'quiz' | 'all') => void;
  user: { name: string; email: string; avatar?: string } | null;
  onOpenAuth: () => void;
  onOpenCopyright: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onOpenCopyright,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF3E0]/95 backdrop-blur-md hairline-b transition-all">
      <div className="w-full px-6 md:px-12 xl:px-16 h-20 flex items-center justify-between">
        
        {/* Brand & Editorial Masthead */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none group" 
          onClick={() => {
            setActiveTab('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-11 h-11 rounded-sm bg-[#780000] border border-[#D4A373] flex items-center justify-center text-[#FAF3E0] shadow-sm transform group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-cinzel text-xl sm:text-2xl font-black text-[#4A2508] tracking-tight group-hover:text-[#780000] transition-colors">
                ĐAM MÊ LỊCH SỬ
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F2E4C6] text-[#4A2508] border border-[#D4A373]/40 rounded-sm">
                THPT 11 & 12
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#4A2508]/75 font-sans tracking-wide">
              Không Gian Học Tập & Ôn Luyện Lịch Sử Trực Quan 16:9
            </p>
          </div>
        </div>

        {/* 16:9 Widescreen Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          <button
            onClick={() => {
              setActiveTab('timeline');
              onScrollToSection('timeline-section');
            }}
            className={`px-4 py-2 rounded-sm font-medium text-sm transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'timeline'
                ? 'bg-[#4A2508] text-[#FAF3E0] border-[#4A2508] font-bold shadow-xs'
                : 'bg-transparent text-[#4A2508]/85 border-transparent hover:border-[#D4A373]/50 hover:bg-[#F2E4C6]/60'
            }`}
          >
            <Clock className="w-4 h-4 text-[#D4A373]" />
            <span>01. Trục Thời Gian</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('downloads');
              onScrollToSection('downloads-section');
            }}
            className={`px-4 py-2 rounded-sm font-medium text-sm transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'downloads'
                ? 'bg-[#4A2508] text-[#FAF3E0] border-[#4A2508] font-bold shadow-xs'
                : 'bg-transparent text-[#4A2508]/85 border-transparent hover:border-[#D4A373]/50 hover:bg-[#F2E4C6]/60'
            }`}
          >
            <Download className="w-4 h-4 text-[#780000]" />
            <span>02. Kho Tài Nguyên</span>
            <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-[#780000] text-white rounded-xs">
              FREE
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('quiz');
              onScrollToSection('quiz-section');
            }}
            className={`px-4 py-2 rounded-sm font-medium text-sm transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'quiz'
                ? 'bg-[#780000] text-[#FAF3E0] border-[#780000] font-bold shadow-xs'
                : 'bg-transparent text-[#4A2508]/85 border-transparent hover:border-[#780000]/40 hover:bg-[#F2E4C6]/60'
            }`}
          >
            <Award className="w-4 h-4 text-[#D4A373]" />
            <span>03. Luyện Thi Trắc Nghiệm</span>
            <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-[#D4A373] text-[#4A2508] rounded-xs">
              HOT
            </span>
          </button>
        </nav>

        {/* Right Action Tools: Page 0 & User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Page 0 Copyright Trigger */}
          <button
            onClick={onOpenCopyright}
            className="px-3 py-1.5 rounded-sm border border-[#4A2508]/30 hover:border-[#4A2508] text-[#4A2508] hover:text-black hover:bg-[#F2E4C6] text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Mở Trang Bản Quyền Sở Hữu Trí Tuệ (Page 0)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#780000]" />
            <span className="hidden sm:inline">BẢN QUYỀN</span>
            <span className="text-[10px] bg-black text-white px-1 py-0.2 font-mono">P.0</span>
          </button>

          {/* User Sign-In / Profile */}
          {user ? (
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#D4A373]/40">
              <div className="w-8 h-8 rounded-sm bg-[#4A2508] text-[#FAF3E0] flex items-center justify-center font-bold text-xs uppercase border border-[#D4A373]">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-sm" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <span className="block text-xs font-bold text-[#4A2508] max-w-[130px] truncate">{user.name}</span>
                <span className="block text-[10px] text-[#780000] font-mono font-semibold">Sĩ Tử Đã Đăng Nhập</span>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-sm bg-[#4A2508] hover:bg-[#321905] text-[#FAF3E0] font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <LogIn className="w-4 h-4 text-[#D4A373]" />
              <span>Đăng Nhập</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          )}

        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around hairline-t bg-[#FAF3E0] py-2 px-3 text-xs font-medium">
        <button
          onClick={() => {
            setActiveTab('timeline');
            onScrollToSection('timeline-section');
          }}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-sm cursor-pointer ${
            activeTab === 'timeline' ? 'text-[#780000] font-bold bg-[#F2E4C6]' : 'text-[#4A2508]/80'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Timeline</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('downloads');
            onScrollToSection('downloads-section');
          }}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-sm cursor-pointer ${
            activeTab === 'downloads' ? 'text-[#780000] font-bold bg-[#F2E4C6]' : 'text-[#4A2508]/80'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tài Liệu</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            onScrollToSection('quiz-section');
          }}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-sm cursor-pointer ${
            activeTab === 'quiz' ? 'text-[#780000] font-bold bg-[#F2E4C6]' : 'text-[#4A2508]/80'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Luyện Thi</span>
        </button>
      </div>

    </header>
  );
};
