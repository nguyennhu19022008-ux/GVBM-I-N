import React from 'react';
import { Search, Star, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import type { GradeLevel, ResourceCategory } from '../../data/curriculumData';
import { PERIOD_FACETS_BY_GRADE } from '../../data/curriculumData';

export interface GradeFilterBarProps {
  activeGrade: GradeLevel;
  onRequestChangeGrade: () => void;
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

const GRADE_META: Record<GradeLevel, { badge: string; desc: string }> = {
  '10': {
    badge: 'CHƯƠNG TRÌNH MỚI • GDPT 2018',
    desc: 'Lịch Sử & Văn Minh Nhân Loại · Dân Tộc & Đất Nước',
  },
  '11': {
    badge: 'CẬN - HIỆN ĐẠI • 1858 - 1945',
    desc: 'Kháng Pháp · Phong Trào Cần Vương · Thế Chiến II',
  },
  '12': {
    badge: '★ TRỌNG TÂM ÔN THI • THPT 2026',
    desc: '1919 - Độc Lập · Hai Cuộc Kháng Chiến & Thời Kỳ Đổi Mới',
  },
};

export const GradeFilterBar: React.FC<GradeFilterBarProps> = ({
  activeGrade,
  onRequestChangeGrade,
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
  const gradeInfo = GRADE_META[activeGrade];

  return (
    <div className="w-full space-y-5 pb-2 text-left">
      
      {/* Row 1: Calm Active Grade Strip + Borderless Switch Link + Pill Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#0A1418]/12">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans">
            <span className="px-3 py-0.5 rounded-full bg-[#9C3B32]/10 text-[#9C3B32] font-semibold">
              {gradeInfo.badge}
            </span>
            <button
              onClick={onRequestChangeGrade}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#687477] hover:text-[#9C3B32] transition-colors cursor-pointer underline underline-offset-4 decoration-[#0A1418]/20 hover:decoration-[#9C3B32]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Đổi khối lớp</span>
            </button>
          </div>
          <div className="flex flex-wrap items-baseline gap-2.5 pt-0.5">
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#0A1418]">
              Giảng Đường Khối {activeGrade}
            </h3>
            <span className="text-xs sm:text-sm font-sans text-[#687477]">
              — {gradeInfo.desc}
            </span>
          </div>
        </div>

        {/* Quick Search: Smooth Pill Input */}
        <div className="relative w-full lg:w-80 shrink-0">
          <input
            id="hub-search"
            name="hubSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Tìm bài tập, đề thi Khối ${activeGrade}...`}
            className="w-full pl-10 pr-14 py-2.5 rounded-full bg-white/85 border border-[#0A1418]/12 focus:border-[#9C3B32] text-xs sm:text-sm font-sans outline-none placeholder-[#687477]/70 text-[#0A1418] transition-colors shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#0A1418]/50 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-2.5 text-xs text-[#9C3B32] font-mono font-semibold cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Single-Line Borderless Underline Navigation Tabs (Clean on Mobile & Desktop) */}
      <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar border-b border-[#0A1418]/12">
        <button
          onClick={() => onSelectCategory('all')}
          className={`pb-3 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 -mb-[1px] ${
            activeCategory === 'all'
              ? 'border-[#0A1418] text-[#0A1418] font-bold'
              : 'border-transparent text-[#687477] hover:text-[#0A1418] font-medium'
          }`}
        >
          Tất cả
        </button>

        <button
          onClick={() => onSelectCategory('homework')}
          className={`pb-3 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 -mb-[1px] ${
            activeCategory === 'homework'
              ? 'border-[#1B4931] text-[#1B4931] font-bold'
              : 'border-transparent text-[#687477] hover:text-[#1B4931] font-medium'
          }`}
        >
          Bài tập tuần
        </button>

        <button
          onClick={() => onSelectCategory('exam')}
          className={`pb-3 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 -mb-[1px] ${
            activeCategory === 'exam'
              ? 'border-[#9C3B32] text-[#9C3B32] font-bold'
              : 'border-transparent text-[#687477] hover:text-[#9C3B32] font-medium'
          }`}
        >
          Đề thi & Ma trận
        </button>

        <button
          onClick={() => onSelectCategory('quiz')}
          className={`pb-3 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 -mb-[1px] ${
            activeCategory === 'quiz'
              ? 'border-[#B47818] text-[#B47818] font-bold'
              : 'border-transparent text-[#687477] hover:text-[#B47818] font-medium'
          }`}
        >
          Khảo thí Online
        </button>
      </div>

      {/* Row 3: Streamlined Chuyên Đề Pills (No Borders) + Inline Status Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        
        {/* Period Facets as Clean Borderless Text / Pill Links */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
          <span className="text-[#687477] font-medium mr-1">Chuyên đề:</span>
          {currentFacets.map((facet) => (
            <button
              key={facet.id}
              onClick={() => onSelectPeriodFacet(facet.id)}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activePeriodFacet === facet.id
                  ? 'bg-[#0A1418] text-white font-semibold'
                  : 'bg-transparent text-[#687477] hover:text-[#0A1418] hover:bg-[#0A1418]/6 font-medium'
              }`}
            >
              {facet.label}
            </button>
          ))}
        </div>

        {/* Status Filters as Quiet Borderless Text Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-sans shrink-0">
          <span className="text-[#687477] font-medium">Trạng thái:</span>

          <button
            onClick={() => onSelectStatusFilter('all')}
            className={`transition-colors cursor-pointer ${
              activeStatusFilter === 'all'
                ? 'text-[#0A1418] font-bold underline underline-offset-4 decoration-[#0A1418]'
                : 'text-[#687477] hover:text-[#0A1418]'
            }`}
          >
            Tất cả
          </button>

          <button
            onClick={() => onSelectStatusFilter('bookmarked')}
            className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
              activeStatusFilter === 'bookmarked'
                ? 'text-[#B47818] font-bold underline underline-offset-4'
                : 'text-[#687477] hover:text-[#B47818]'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Đã lưu ({bookmarkedCount})</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('completed')}
            className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
              activeStatusFilter === 'completed'
                ? 'text-[#1B4931] font-bold underline underline-offset-4'
                : 'text-[#687477] hover:text-[#1B4931]'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            <span>Đã làm ({completedCount})</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('unattempted')}
            className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
              activeStatusFilter === 'unattempted'
                ? 'text-[#0A1418] font-bold underline underline-offset-4'
                : 'text-[#687477] hover:text-[#0A1418]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Chưa làm ({unattemptedCount})</span>
          </button>
        </div>

      </div>

    </div>
  );
};
