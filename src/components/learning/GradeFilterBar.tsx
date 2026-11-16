import React from 'react';
import { Search } from 'lucide-react';
import type { GradeLevel, ResourceCategory } from '../../data/curriculumData';
import { PERIOD_FACETS_BY_GRADE } from '../../data/curriculumData';

export interface GradeFilterBarProps {
  activeGrade: GradeLevel;
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
    <div className="w-full text-left border-b border-[#0A1418]/12 pb-3 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      {/* Clean Underline Tabs */}
      <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`pb-2 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 ${
            activeCategory === 'all'
              ? 'border-[#0A1418] text-[#0A1418] font-bold'
              : 'border-transparent text-[#4A5558] hover:text-[#0A1418] font-medium'
          }`}
        >
          Tất cả
        </button>

        <button
          onClick={() => onSelectCategory('homework')}
          className={`pb-2 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 ${
            activeCategory === 'homework'
              ? 'border-[#1B4931] text-[#1B4931] font-bold'
              : 'border-transparent text-[#4A5558] hover:text-[#1B4931] font-medium'
          }`}
        >
          Bài tập tuần
        </button>

        <button
          onClick={() => onSelectCategory('exam')}
          className={`pb-2 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 ${
            activeCategory === 'exam'
              ? 'border-[#9C3B32] text-[#9C3B32] font-bold'
              : 'border-transparent text-[#4A5558] hover:text-[#9C3B32] font-medium'
          }`}
        >
          Đề thi & Ma trận
        </button>

        <button
          onClick={() => onSelectCategory('quiz')}
          className={`pb-2 text-xs sm:text-sm font-sans whitespace-nowrap shrink-0 transition-all cursor-pointer border-b-2 ${
            activeCategory === 'quiz'
              ? 'border-[#B47818] text-[#B47818] font-bold'
              : 'border-transparent text-[#4A5558] hover:text-[#B47818] font-medium'
          }`}
        >
          Khảo thí Online
        </button>
      </div>

      {/* Compact Inline Search & Dropdowns */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans">
        <div className="relative flex-1 sm:w-64 sm:flex-none">
          <input
            id="hub-search"
            name="hubSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Tìm bài Khối ${activeGrade}...`}
            className="w-full pl-9 pr-12 py-2 rounded-full bg-white border border-[#0A1418]/12 focus:border-[#9C3B32] text-xs font-sans outline-none placeholder-[#4A5558]/70 text-[#0A1418]"
          />
          <Search className="w-3.5 h-3.5 text-[#4A5558] absolute left-3.5 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-2 text-xs text-[#9C3B32] font-semibold cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>

        <select
          aria-label="Lọc theo chuyên đề"
          value={activePeriodFacet}
          onChange={(e) => onSelectPeriodFacet(e.target.value)}
          className="px-3.5 py-2 rounded-full bg-white border border-[#0A1418]/12 focus:border-[#9C3B32] text-xs text-[#0A1418] outline-none cursor-pointer"
        >
          {currentFacets.map((facet) => (
            <option key={facet.id} value={facet.id}>
              {facet.label}
            </option>
          ))}
        </select>

        <select
          aria-label="Lọc theo tiến độ"
          value={activeStatusFilter}
          onChange={(e) =>
            onSelectStatusFilter(e.target.value as 'all' | 'bookmarked' | 'completed' | 'unattempted')
          }
          className="px-3.5 py-2 rounded-full bg-white border border-[#0A1418]/12 focus:border-[#9C3B32] text-xs text-[#0A1418] outline-none cursor-pointer"
        >
          <option value="all">Trạng thái: Tất cả</option>
          <option value="bookmarked">Đã lưu ({bookmarkedCount})</option>
          <option value="completed">Đã làm ({completedCount})</option>
          <option value="unattempted">Chưa làm ({unattemptedCount})</option>
        </select>
      </div>
    </div>
  );
};
