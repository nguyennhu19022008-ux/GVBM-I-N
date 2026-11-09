import React from 'react';
import { BookOpen, FileText, Presentation } from 'lucide-react';
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
    <div className="w-full space-y-6 pb-6 hairline-b">
      
      {/* 3 Main Grade Tabs (Prominent Asymmetrical Navigation) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Grade 10 */}
        <button
          onClick={() => onSelectGrade('10')}
          className={`p-4 border text-left transition-all cursor-pointer relative ${
            activeGrade === '10'
              ? 'bg-[#1A1615] text-[#F6F0E4] border-[#1A1615] shadow-md'
              : 'bg-white hover:bg-[#ECE3D0]/60 text-[#1A1615] border-[#1A1615]/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span className={activeGrade === '10' ? 'text-[#C59B27]' : 'text-[#3D4A3E]'}>
              CHƯƠNG TRÌNH MỚI
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-white/20 font-mono">GDPT 2018</span>
          </div>
          <h3 className="font-playfair text-xl font-black">Khối 10</h3>
          <p className={`text-xs mt-0.5 line-clamp-1 ${activeGrade === '10' ? 'text-[#ECE3D0]' : 'text-[#4A3E3D]'}`}>
            Sử học, Văn minh nhân loại & Đất nước
          </p>
        </button>

        {/* Grade 11 */}
        <button
          onClick={() => onSelectGrade('11')}
          className={`p-4 border text-left transition-all cursor-pointer relative ${
            activeGrade === '11'
              ? 'bg-[#1A1615] text-[#F6F0E4] border-[#1A1615] shadow-md'
              : 'bg-white hover:bg-[#ECE3D0]/60 text-[#1A1615] border-[#1A1615]/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span className={activeGrade === '11' ? 'text-[#C59B27]' : 'text-[#3D4A3E]'}>
              CẬN - HIỆN ĐẠI
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-white/20 font-mono">1858 - 1945</span>
          </div>
          <h3 className="font-playfair text-xl font-black">Khối 11</h3>
          <p className={`text-xs mt-0.5 line-clamp-1 ${activeGrade === '11' ? 'text-[#ECE3D0]' : 'text-[#4A3E3D]'}`}>
            Kháng Pháp, Cần Vương & Thế chiến II
          </p>
        </button>

        {/* Grade 12 (Special Highlight) */}
        <button
          onClick={() => onSelectGrade('12')}
          className={`p-4 border text-left transition-all cursor-pointer relative ${
            activeGrade === '12'
              ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md'
              : 'bg-white hover:bg-red-50/50 text-[#8B0000] border-[#8B0000]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span className={activeGrade === '12' ? 'text-white' : 'text-[#8B0000] font-bold'}>
              ★ TRỌNG TÂM ÔN THI
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-white text-[#8B0000] font-mono font-bold">
              THPT 2026
            </span>
          </div>
          <h3 className="font-playfair text-xl font-black">Khối 12</h3>
          <p className={`text-xs mt-0.5 line-clamp-1 ${activeGrade === '12' ? 'text-white/90' : 'text-[#4A3E3D]'}`}>
            1919 - Độc lập, Kháng chiến & Đổi mới
          </p>
        </button>

      </div>

      {/* Category Pills & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-[#1A1615] text-white border-[#1A1615]'
                : 'bg-white text-[#4A3E3D] border-[#1A1615]/20 hover:border-[#1A1615]'
            }`}
          >
            Tất Cả Học Liệu
          </button>

          <button
            onClick={() => onSelectCategory('homework')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeCategory === 'homework'
                ? 'bg-[#1A1615] text-white border-[#1A1615]'
                : 'bg-white text-[#4A3E3D] border-[#1A1615]/20 hover:border-[#1A1615]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bài Tập Về Nhà</span>
          </button>

          <button
            onClick={() => onSelectCategory('exam')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeCategory === 'exam'
                ? 'bg-[#1A1615] text-white border-[#1A1615]'
                : 'bg-white text-[#4A3E3D] border-[#1A1615]/20 hover:border-[#1A1615]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Đề Ôn Tập & Đề Thi</span>
          </button>

          <button
            onClick={() => onSelectCategory('slide')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeCategory === 'slide'
                ? 'bg-[#1A1615] text-white border-[#1A1615]'
                : 'bg-white text-[#4A3E3D] border-[#1A1615]/20 hover:border-[#1A1615]'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Slide Bài Giảng</span>
          </button>
        </div>

        {/* Search Field */}
        <div className="w-full md:w-80">
          <input
            id="learning-search"
            name="learningSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo từ khóa, chiến dịch, dạng bài..."
            className="w-full px-3.5 py-2 bg-white border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-sans outline-none"
          />
        </div>

      </div>

    </div>
  );
};
