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
      
      {/* Active Grade Strip (Strict Single-Grade Isolation + Switch Grade Button) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 bg-[#F3EFE5]/80 border-t-3 border-b border-[#9C3B32] border-b-[#0A1418]/15">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#9C3B32] uppercase tracking-wider">
            <span>ĐANG HIỂN THỊ DỮ LIỆU RIÊNG BIỆT:</span>
            <span className="px-2 py-0.5 bg-[#0A1418] text-[#FAF8F1] text-[10px]">
              {gradeInfo.badge}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#0A1418]">
              Giảng Đường Khối {activeGrade}
            </h3>
            <span className="text-xs sm:text-sm font-sans text-[#687477]">
              — {gradeInfo.desc}
            </span>
          </div>
        </div>

        <button
          onClick={onRequestChangeGrade}
          className="px-4 py-2.5 bg-transparent border border-[#0A1418]/30 hover:border-[#9C3B32] hover:bg-[#9C3B32] hover:text-white text-[#0A1418] text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Đổi Khối Lớp</span>
        </button>
      </div>

      {/* Row 2: Category Tabs & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        
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
            placeholder={`Tìm bài tập, đề thi Khối ${activeGrade}...`}
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

      {/* Row 3: Period Facets & Status Filter */}
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
