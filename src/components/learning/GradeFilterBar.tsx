import React from 'react';
import { Search, Star, CheckCircle, Clock } from 'lucide-react';
import type { GradeLevel, ResourceCategory } from '../../data/curriculumData';
import { PERIOD_FACETS_BY_GRADE } from '../../data/curriculumData';

export interface GradeFilterBarProps {
  activeGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  activeCategory: ResourceCategory | 'all';
  onSelectCategory: (cat: ResourceCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activePeriodFacet: string;
  onSelectPeriodFacet: (facetId: string) => void;
  activeStatusFilter: 'all' | 'bookmarked' | 'completed' | 'unattempted';
  onSelectStatusFilter: (status: 'all' | 'bookmarked' | 'completed' | 'unattempted') => void;
  bookmarkedCount: number;
  completedCount: number;
  unattemptedCount: number;
}

export const GradeFilterBar: React.FC<GradeFilterBarProps> = ({
  activeGrade,
  onSelectGrade,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activePeriodFacet,
  onSelectPeriodFacet,
  activeStatusFilter,
  onSelectStatusFilter,
  bookmarkedCount,
  completedCount,
  unattemptedCount,
}) => {
  const currentFacets = PERIOD_FACETS_BY_GRADE[activeGrade] || [];

  return (
    <div className="w-full space-y-6 pb-2 text-left">
      
      {/* 3 Main Grade Columns (Cardless Open Broadsheet Columns - No Rounded Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Grade 10 Column */}
        <button
          onClick={() => {
            onSelectGrade('10');
            onSelectPeriodFacet('all');
          }}
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
          onClick={() => {
            onSelectGrade('11');
            onSelectPeriodFacet('all');
          }}
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
          onClick={() => {
            onSelectGrade('12');
            onSelectPeriodFacet('all');
          }}
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

      {/* Row 2: Category Tabs & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        
        {/* Category Square Tabs with Distinct Taxonomy Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'all'
                ? 'bg-[#0A1418] text-white border-[#0A1418]'
                : 'bg-transparent text-[#687477] border-[#0A1418]/20 hover:text-[#0A1418] hover:border-[#0A1418]'
            }`}
          >
            Tất Cả Thể Loại
          </button>

          <button
            onClick={() => onSelectCategory('homework')}
            className={`px-3.5 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'homework'
                ? 'bg-[#1B4931] text-white border-[#1B4931]'
                : 'bg-transparent text-[#1B4931] border-[#1B4931]/40 hover:bg-[#1B4931]/10'
            }`}
          >
            [ ✎ BÀI TẬP TUẦN ]
          </button>

          <button
            onClick={() => onSelectCategory('exam')}
            className={`px-3.5 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'exam'
                ? 'bg-[#9C3B32] text-white border-[#9C3B32]'
                : 'bg-transparent text-[#9C3B32] border-[#9C3B32]/40 hover:bg-[#9C3B32]/10'
            }`}
          >
            [ ✦ ĐỀ THI MA TRẬN ]
          </button>

          <button
            onClick={() => onSelectCategory('quiz')}
            className={`px-3.5 py-2 text-xs font-mono uppercase font-bold transition-all cursor-pointer rounded-none border ${
              activeCategory === 'quiz'
                ? 'bg-[#B47818] text-white border-[#B47818]'
                : 'bg-transparent text-[#B47818] border-[#B47818]/40 hover:bg-[#B47818]/10'
            }`}
          >
            [ ◈ KHẢO THÍ ONLINE ]
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
            className="w-full pl-9 pr-10 py-2 bg-transparent border border-[#0A1418]/30 focus:border-[#9C3B32] rounded-none text-xs font-sans outline-none placeholder-[#687477]/70 text-[#0A1418] transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-[#0A1418]/60 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2 text-[10px] text-[#9C3B32] font-mono font-bold uppercase cursor-pointer"
            >
              XÓA
            </button>
          )}
        </div>

      </div>

      {/* Row 3: Period Facets (Phân kỳ chuyên đề) & Status Filter (Đã lưu / Đã làm / Chưa làm) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-[#0A1418]/10">
        
        {/* Period Facets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-[#687477] uppercase text-[10px] font-bold mr-1">CHUYÊN ĐỀ:</span>
          {currentFacets.map((facet) => (
            <button
              key={facet.id}
              onClick={() => onSelectPeriodFacet(facet.id)}
              className={`px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer rounded-none border ${
                activePeriodFacet === facet.id
                  ? 'bg-[#0A1418] text-white border-[#0A1418] font-bold'
                  : 'bg-transparent text-[#687477] border-[#0A1418]/15 hover:text-[#0A1418] hover:border-[#0A1418]/40'
              }`}
            >
              {facet.label}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono shrink-0">
          <span className="text-[#687477] uppercase text-[10px] font-bold mr-1">TIẾN ĐỘ:</span>

          <button
            onClick={() => onSelectStatusFilter('all')}
            className={`px-2.5 py-1 text-[11px] transition-all cursor-pointer rounded-none border ${
              activeStatusFilter === 'all'
                ? 'bg-[#0A1418] text-white border-[#0A1418] font-bold'
                : 'bg-transparent text-[#687477] border-[#0A1418]/15 hover:text-[#0A1418]'
            }`}
          >
            Tất Cả
          </button>

          <button
            onClick={() => onSelectStatusFilter('bookmarked')}
            className={`px-2.5 py-1 text-[11px] flex items-center gap-1 transition-all cursor-pointer rounded-none border ${
              activeStatusFilter === 'bookmarked'
                ? 'bg-[#B47818] text-white border-[#B47818] font-bold'
                : 'bg-transparent text-[#B47818] border-[#B47818]/30 hover:bg-[#B47818]/10'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Đã Lưu ({bookmarkedCount})</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('completed')}
            className={`px-2.5 py-1 text-[11px] flex items-center gap-1 transition-all cursor-pointer rounded-none border ${
              activeStatusFilter === 'completed'
                ? 'bg-[#1B4931] text-white border-[#1B4931] font-bold'
                : 'bg-transparent text-[#1B4931] border-[#1B4931]/30 hover:bg-[#1B4931]/10'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            <span>Đã Làm ({completedCount})</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('unattempted')}
            className={`px-2.5 py-1 text-[11px] flex items-center gap-1 transition-all cursor-pointer rounded-none border ${
              activeStatusFilter === 'unattempted'
                ? 'bg-[#687477] text-white border-[#687477] font-bold'
                : 'bg-transparent text-[#687477] border-[#0A1418]/15 hover:text-[#0A1418]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Chưa Làm ({unattemptedCount})</span>
          </button>
        </div>

      </div>

    </div>
  );
};
