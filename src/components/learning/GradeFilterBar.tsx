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
    <div className="w-full space-y-6 pb-4 text-left">
      
      {/* 3 Main Grade Columns (Cardless Open Broadsheet Columns - No Rounded Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Grade 10 Column */}
        <button
          onClick={() => onSelectGrade('10')}
          className={`p-6 text-left transition-all cursor-pointer rounded-none relative border-t-3 ${
            activeGrade === '10'
              ? 'border-[#9C3B32] bg-[#F3EFE5]/70 translate-y-[-2px]'
              : 'border-[#0A1418]/20 bg-transparent hover:bg-[#F3EFE5]/30'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className={`font-bold uppercase tracking-wider ${activeGrade === '10' ? 'text-[#9C3B32]' : 'text-[#687477]'}`}>
              CHƯƠNG TRÌNH MỚI
            </span>
            <span className="text-[10px] font-mono font-bold text-[#0A1418] bg-black/5 px-2 py-0.5">GDPT 2018</span>
          </div>
          <h3 className={`font-playfair text-2xl sm:text-3xl font-black ${activeGrade === '10' ? 'text-[#9C3B32]' : 'text-[#0A1418]'}`}>
            Khối 10
          </h3>
          <p className="text-xs text-[#687477] font-sans mt-1.5 leading-relaxed">
            Lịch Sử & Văn Minh Nhân Loại · Dân Tộc & Đất Nước
          </p>
        </button>

        {/* Grade 11 Column */}
        <button
          onClick={() => onSelectGrade('11')}
          className={`p-6 text-left transition-all cursor-pointer rounded-none relative border-t-3 ${
            activeGrade === '11'
              ? 'border-[#9C3B32] bg-[#F3EFE5]/70 translate-y-[-2px]'
              : 'border-[#0A1418]/20 bg-transparent hover:bg-[#F3EFE5]/30'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className={`font-bold uppercase tracking-wider ${activeGrade === '11' ? 'text-[#9C3B32]' : 'text-[#687477]'}`}>
              CẬN - HIỆN ĐẠI
            </span>
            <span className="text-[10px] font-mono font-bold text-[#0A1418] bg-black/5 px-2 py-0.5">1858 - 1945</span>
          </div>
          <h3 className={`font-playfair text-2xl sm:text-3xl font-black ${activeGrade === '11' ? 'text-[#9C3B32]' : 'text-[#0A1418]'}`}>
            Khối 11
          </h3>
          <p className="text-xs text-[#687477] font-sans mt-1.5 leading-relaxed">
            Kháng Pháp · Phong Trào Cần Vương · Thế Chiến II
          </p>
        </button>

        {/* Grade 12 Column (Special Focus) */}
        <button
          onClick={() => onSelectGrade('12')}
          className={`p-6 text-left transition-all cursor-pointer rounded-none relative border-t-3 ${
            activeGrade === '12'
              ? 'border-[#9C3B32] bg-[#F3EFE5]/70 translate-y-[-2px]'
              : 'border-[#0A1418]/20 bg-transparent hover:bg-[#F3EFE5]/30'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="font-bold uppercase tracking-wider text-[#9C3B32]">
              ★ TRỌNG TÂM ÔN THI
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#9C3B32] text-white px-2 py-0.5">
              THPT 2026
            </span>
          </div>
          <h3 className={`font-playfair text-2xl sm:text-3xl font-black ${activeGrade === '12' ? 'text-[#9C3B32]' : 'text-[#0A1418]'}`}>
            Khối 12 ★
          </h3>
          <p className="text-xs text-[#687477] font-sans mt-1.5 leading-relaxed">
            1919 - Độc Lập · Hai Cuộc Kháng Chiến & Thời Kỳ Đổi Mới
          </p>
        </button>

      </div>

      {/* Category Editorial Tabs & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        
        {/* Category Square Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'all'
                ? 'bg-[#9C3B32] text-white border-[#9C3B32]'
                : 'bg-transparent text-[#687477] border-[#0A1418]/20 hover:text-[#0A1418] hover:border-[#0A1418]'
            }`}
          >
            Tất Cả Học Liệu
          </button>

          <button
            onClick={() => onSelectCategory('homework')}
            className={`px-4 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'homework'
                ? 'bg-[#9C3B32] text-white border-[#9C3B32]'
                : 'bg-transparent text-[#687477] border-[#0A1418]/20 hover:text-[#0A1418] hover:border-[#0A1418]'
            }`}
          >
            Bài Tập Về Nhà
          </button>

          <button
            onClick={() => onSelectCategory('exam')}
            className={`px-4 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'exam'
                ? 'bg-[#9C3B32] text-white border-[#9C3B32]'
                : 'bg-transparent text-[#687477] border-[#0A1418]/20 hover:text-[#0A1418] hover:border-[#0A1418]'
            }`}
          >
            Đề Ôn Tập & Đề Thi
          </button>

          <button
            onClick={() => onSelectCategory('quiz')}
            className={`px-4 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'quiz'
                ? 'bg-[#9C3B32] text-white border-[#9C3B32]'
                : 'bg-transparent text-[#687477] border-[#0A1418]/20 hover:text-[#0A1418] hover:border-[#0A1418]'
            }`}
          >
            Phòng Khảo Thí Trắc Nghiệm
          </button>
        </div>

        {/* Quick Search: Crisp Broadsheet Input */}
        <div className="relative w-full md:w-80">
          <input
            id="hub-search"
            name="hubSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo từ khóa, chiến dịch, dạng bài..."
            className="w-full pl-9 pr-10 py-2.5 bg-transparent border border-[#0A1418]/30 focus:border-[#9C3B32] rounded-none text-xs font-sans outline-none placeholder-[#687477]/70 text-[#0A1418] transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-[#0A1418]/60 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-[10px] text-[#9C3B32] font-mono font-bold uppercase cursor-pointer"
            >
              XÓA
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
