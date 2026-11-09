import React from 'react';
import { Search } from 'lucide-react';
import type { GradeLevel, ResourceCategory } from '../../data/curriculumData';

interface GradeFilterBarProps {
  activeGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  activeCategory: ResourceCategory | 'all';
  onSelectCategory: (cat: ResourceCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const GradeFilterBar: React.FC<GradeFilterBarProps> = ({
  activeGrade,
  onSelectGrade,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="w-full space-y-6 pb-6 hairline-b text-left">
      
      {/* 3 Main Grade Columns (Open Broadsheet Masthead Tri-Band - No Card Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1A1615]/20 border-y-2 border-[#1A1615]">
        
        {/* Grade 10 Column */}
        <button
          onClick={() => onSelectGrade('10')}
          className={`p-5 text-left transition-all cursor-pointer relative ${
            activeGrade === '10'
              ? 'bg-[#ECE3D0]/70'
              : 'hover:bg-[#ECE3D0]/30'
          }`}
        >
          {activeGrade === '10' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B0000]" />
          )}
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className={`font-bold uppercase tracking-wider ${activeGrade === '10' ? 'text-[#8B0000]' : 'text-[#4A3E3D]'}`}>
              CHƯƠNG TRÌNH MỚI
            </span>
            <span className="text-[10px] font-mono font-bold text-[#1A1615]">GDPT 2018</span>
          </div>
          <h3 className={`font-playfair text-2xl sm:text-3xl font-black ${activeGrade === '10' ? 'text-[#8B0000]' : 'text-[#1A1615]'}`}>
            Khối 10
          </h3>
          <p className="text-xs text-[#4A3E3D] font-sans mt-1">
            Lịch Sử & Văn Minh Nhân Loại · Đất Nước
          </p>
        </button>

        {/* Grade 11 Column */}
        <button
          onClick={() => onSelectGrade('11')}
          className={`p-5 text-left transition-all cursor-pointer relative ${
            activeGrade === '11'
              ? 'bg-[#ECE3D0]/70'
              : 'hover:bg-[#ECE3D0]/30'
          }`}
        >
          {activeGrade === '11' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B0000]" />
          )}
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className={`font-bold uppercase tracking-wider ${activeGrade === '11' ? 'text-[#8B0000]' : 'text-[#4A3E3D]'}`}>
              CẬN - HIỆN ĐẠI
            </span>
            <span className="text-[10px] font-mono font-bold text-[#1A1615]">1858 - 1945</span>
          </div>
          <h3 className={`font-playfair text-2xl sm:text-3xl font-black ${activeGrade === '11' ? 'text-[#8B0000]' : 'text-[#1A1615]'}`}>
            Khối 11
          </h3>
          <p className="text-xs text-[#4A3E3D] font-sans mt-1">
            Kháng Pháp · Cần Vương · Thế Chiến II
          </p>
        </button>

        {/* Grade 12 Column (Special Focus) */}
        <button
          onClick={() => onSelectGrade('12')}
          className={`p-5 text-left transition-all cursor-pointer relative ${
            activeGrade === '12'
              ? 'bg-[#ECE3D0]/70'
              : 'hover:bg-[#ECE3D0]/30'
          }`}
        >
          {activeGrade === '12' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B0000]" />
          )}
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[#8B0000]">
              ★ TRỌNG TÂM ÔN THI
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#8B0000] text-white px-1.5 py-0.2">
              THPT 2026
            </span>
          </div>
          <h3 className={`font-playfair text-2xl sm:text-3xl font-black ${activeGrade === '12' ? 'text-[#8B0000]' : 'text-[#1A1615]'}`}>
            Khối 12 ★
          </h3>
          <p className="text-xs text-[#4A3E3D] font-sans mt-1">
            1919 - Độc Lập · Kháng Chiến & Đổi Mới
          </p>
        </button>

      </div>

      {/* Category Editorial Tabs & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        
        {/* Category Editorial Tabs (No Pills) */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer border-b-2 ${
              activeCategory === 'all'
                ? 'border-[#8B0000] text-[#8B0000]'
                : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
            }`}
          >
            [Tất Cả Học Liệu]
          </button>

          <button
            onClick={() => onSelectCategory('homework')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer border-b-2 ${
              activeCategory === 'homework'
                ? 'border-[#8B0000] text-[#8B0000]'
                : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
            }`}
          >
            [Bài Tập Về Nhà]
          </button>

          <button
            onClick={() => onSelectCategory('exam')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer border-b-2 ${
              activeCategory === 'exam'
                ? 'border-[#8B0000] text-[#8B0000]'
                : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
            }`}
          >
            [Đề Ôn Tập & Đề Thi]
          </button>

          <button
            onClick={() => onSelectCategory('quiz')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all cursor-pointer border-b-2 ${
              activeCategory === 'quiz'
                ? 'border-[#8B0000] text-[#8B0000]'
                : 'border-transparent text-[#4A3E3D] hover:text-[#1A1615]'
            }`}
          >
            [Phòng Khảo Thí Trắc Nghiệm]
          </button>
        </div>

        {/* Quick Search: Open Underline Input */}
        <div className="relative w-full md:w-80">
          <input
            id="hub-search"
            name="hubSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo từ khóa, chiến dịch, dạng bài..."
            className="w-full pl-8 pr-10 py-1.5 bg-transparent border-b-2 border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-sans outline-none placeholder-[#4A3E3D]/60"
          />
          <Search className="w-3.5 h-3.5 text-[#1A1615]/60 absolute left-1 top-2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-1 top-1.5 text-[10px] text-[#8B0000] font-mono font-bold uppercase cursor-pointer"
            >
              XÓA
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
