import React, { useState, useMemo } from 'react';
import { Search, Calendar, ChevronRight, Filter, ExternalLink, Download, Maximize2, Flag, BookOpen, Lightbulb, User } from 'lucide-react';
import { TIMELINE_EVENTS, PERIOD_FILTERS } from '../data/historyData';
import type { TimelineEvent } from '../data/historyData';

interface TimelineSectionProps {
  onSelectEventDetail: (event: TimelineEvent) => void;
  onGoToQuiz: (quizId?: string) => void;
  onGoToDownload: (resourceId?: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  onSelectEventDetail,
  onGoToQuiz,
  onGoToDownload,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEventId, setActiveEventId] = useState<string>(TIMELINE_EVENTS[0].id);

  // Filter events
  const filteredEvents = useMemo(() => {
    return TIMELINE_EVENTS.filter((event) => {
      const matchPeriod = selectedPeriod === 'all' || event.period === selectedPeriod;
      const matchSearch =
        searchQuery.trim() === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchPeriod && matchSearch;
    });
  }, [selectedPeriod, searchQuery]);

  // Current active event for reading stage
  const activeEvent = useMemo(() => {
    const found = filteredEvents.find((e) => e.id === activeEventId);
    return found || filteredEvents[0] || TIMELINE_EVENTS[0];
  }, [filteredEvents, activeEventId]);

  return (
    <section id="timeline-section" className="py-14 lg:py-20 bg-[#FAF8F1] hairline-b text-left">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Section Header: Broadsheet Double Rule Masthead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 broadsheet-double-b">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9C3B32]">
              <Calendar className="w-4 h-4" />
              <span>CHƯƠNG II • TRỤC THỜI GIAN LỊCH SỬ KHỔ RỘNG</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A1418] tracking-tight">
              Dòng Chảy Lịch Sử Theo Tiến Trình
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#687477] max-w-2xl font-serif italic">
              "Khám phá các phân kỳ lịch sử lớn của Việt Nam và Thế giới. Nhấp vào mốc năm để đọc ngay hồ sơ tư liệu trực tiếp trên mặt báo."
            </p>
          </div>

          {/* Quick Search: Open Underline Input (No Box) */}
          <div className="relative w-full lg:w-96">
            <input
              id="timeline-search"
              name="timelineSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mốc năm, chiến dịch, nhân vật..."
              className="w-full pl-9 pr-12 py-2.5 bg-transparent border-b-2 border-[#0A1418] focus:border-[#9C3B32] text-sm outline-none font-sans placeholder-[#687477]/60"
            />
            <Search className="w-4 h-4 text-[#0A1418]/60 absolute left-1 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-2.5 text-xs text-[#9C3B32] hover:text-[#0A1418] font-mono font-bold uppercase cursor-pointer"
              >
                XÓA
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Year Scrubber (Open Broadsheet Strip - No Boxes) */}
        <div className="my-6 pb-4 hairline-b overflow-x-auto scrollbar-none flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9C3B32] shrink-0 mr-2 uppercase">
            <span>NIÊN ĐẠI:</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-1 overflow-x-auto scrollbar-none">
            {TIMELINE_EVENTS.map((item) => {
              const isActive = activeEvent?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveEventId(item.id)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-mono font-bold transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#9C3B32] text-[#9C3B32] bg-[#F3EFE5]'
                      : 'border-transparent text-[#0A1418] hover:border-[#0A1418]/40 hover:text-[#9C3B32]'
                  }`}
                >
                  {item.year}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-[#687477]">1858 — 1986</span>
          </div>
        </div>

        {/* Period Filter Tabs: Open Text Tabs (No Pill Cards) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono scrollbar-none hairline-b">
          <div className="flex items-center gap-1.5 text-[#0A1418] font-bold shrink-0 mr-2 uppercase">
            <Filter className="w-3.5 h-3.5 text-[#9C3B32]" />
            <span>Phân kỳ:</span>
          </div>

          {PERIOD_FILTERS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPeriod(tab.id)}
              className={`px-3 py-1.5 whitespace-nowrap transition-all cursor-pointer uppercase ${
                selectedPeriod === tab.id
                  ? 'bg-[#0A1418] text-[#FAF8F1] font-bold'
                  : 'text-[#687477] hover:text-[#0A1418] hover:bg-[#F3EFE5]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CARDLESS ASYMMETRICAL EDITORIAL SPREAD (4 COLS STREAM : 8 COLS READING DESK) */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 border-y border-dashed border-[#0A1418]/30">
            <p className="text-sm font-serif italic text-[#687477]">
              Không tìm thấy sự kiện phù hợp với từ khóa "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedPeriod('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase cursor-pointer"
            >
              Xem tất cả sự kiện
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            
            {/* Left 4 Columns: Open Chronological Ledger Stream (No Card Boxes) */}
            <div className="lg:col-span-4 border-l-2 border-[#0A1418] pl-5 space-y-2 max-h-[850px] overflow-y-auto pr-2">
              <div className="text-[11px] font-mono font-bold text-[#9C3B32] uppercase tracking-wider mb-4 pb-2 hairline-b flex items-center justify-between">
                <span>DANH SÁCH MỐC SỰ KIỆN ({filteredEvents.length})</span>
                <span>CHỌN ĐỂ ĐỌC</span>
              </div>

              {filteredEvents.map((evt) => {
                const isSelected = activeEvent?.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setActiveEventId(evt.id)}
                    className={`py-3.5 pr-2 transition-all cursor-pointer text-left hairline-b relative group ${
                      isSelected ? 'pl-3 bg-[#F3EFE5] -ml-3' : 'hover:pl-2'
                    }`}
                  >
                    {/* Active Notch Indicator */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9C3B32]" />
                    )}

                    <div className="flex items-baseline justify-between mb-1">
                      <span className={`font-mono text-2xl font-black ${isSelected ? 'text-[#9C3B32]' : 'text-[#0A1418] group-hover:text-[#9C3B32]'}`}>
                        {evt.year}
                      </span>
                      <span className="text-[10px] font-mono text-[#687477] uppercase">
                        Khối {evt.gradeLevel === 'all' ? '11 & 12' : evt.gradeLevel}
                      </span>
                    </div>

                    <h4 className={`font-playfair text-sm sm:text-base font-bold leading-snug ${isSelected ? 'text-[#9C3B32]' : 'text-[#0A1418] group-hover:text-[#9C3B32]'}`}>
                      {evt.title}
                    </h4>

                    <p className="mt-1 text-xs text-[#687477] line-clamp-2 font-sans">
                      {evt.summary}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#687477]">
                      <span>{evt.periodLabel}</span>
                      <span className={`flex items-center gap-0.5 font-bold uppercase ${isSelected ? 'text-[#9C3B32]' : 'text-[#0A1418] group-hover:text-[#9C3B32]'}`}>
                        {isSelected ? 'Đang đọc' : 'Chi tiết'} <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 8 Columns: Open Broadsheet Reading Desk (Zero Card Boxes) */}
            {activeEvent && (
              <div className="lg:col-span-8 space-y-6 text-left relative">
                
                {/* Huge Watermark Year in Background */}
                <div className="absolute -top-10 -right-6 font-mono text-7xl sm:text-9xl font-black text-[#0A1418]/5 select-none pointer-events-none">
                  {activeEvent.year}
                </div>

                {/* Desk Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 hairline-b">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 bg-[#9C3B32] text-white font-mono text-xs font-bold uppercase tracking-wider">
                      HỒ SƠ TƯ LIỆU: NĂM {activeEvent.year}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0A1418] uppercase">
                      {activeEvent.periodLabel}
                    </span>
                    <span className="text-xs font-mono text-[#687477] hidden sm:inline">
                      • Thời gian: {activeEvent.exactDate || activeEvent.year}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectEventDetail(activeEvent)}
                    className="text-xs font-mono font-bold text-[#9C3B32] hover:text-[#0A1418] uppercase flex items-center gap-1 cursor-pointer"
                    title="Mở toàn màn hình"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Toàn văn hồ sơ</span>
                  </button>
                </div>

                {/* Event Monumental Title & Summary */}
                <div className="space-y-3">
                  <h3 className="font-playfair text-2xl sm:text-4xl font-black text-[#0A1418] leading-tight">
                    {activeEvent.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0A1418] font-serif italic leading-relaxed">
                    "{activeEvent.summary}"
                  </p>
                </div>

                {/* Documentary Photograph (Archival Newspaper Frame - Zero Shadow Card) */}
                <div className="archival-newspaper-frame space-y-0">
                  <img
                    src={activeEvent.imageUrl}
                    alt={activeEvent.title}
                    className="w-full aspect-21/9 object-cover grayscale contrast-110"
                  />
                  <div className="p-3 bg-[#F3EFE5] text-xs text-[#0A1418] font-mono flex items-center justify-between gap-2 border-t border-[#10252B]/15">
                    <span className="italic font-sans text-xs">{activeEvent.imageCaption}</span>
                    <span className="shrink-0 text-[10px] font-bold text-[#9C3B32] uppercase">[ẢNH TƯ LIỆU GỐC]</span>
                  </div>
                </div>

                {/* Deep Historical Analysis: Open Editorial Columns (Divided by Line) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#10252B]/20">
                  
                  {/* Left Column: Context & Decisions */}
                  <div className="space-y-5 md:pr-4 md:border-r md:border-[#10252B]/20">
                    <div className="space-y-1.5">
                      <h4 className="font-playfair text-base font-bold text-[#9C3B32] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#9C3B32]" />
                        <span>Bối Cảnh Lịch Sử:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#687477] leading-relaxed font-sans">
                        {activeEvent.context}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 hairline-t">
                      <h4 className="font-playfair text-base font-bold text-[#0A1418] flex items-center gap-2">
                        <Flag className="w-4 h-4 text-[#9C3B32]" />
                        <span>Diễn Biến & Quyết Sách Then Chốt:</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#0A1418]">
                        {activeEvent.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="font-mono text-xs font-bold text-[#9C3B32] shrink-0 mt-0.5">
                              0{i + 1}.
                            </span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Significance, Exam Focus & Key Figures */}
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <h4 className="font-playfair text-base font-bold text-[#9C3B32] flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-[#C69A47]" />
                        <span>Ý Nghĩa Lịch Sử & Bài Học:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#687477] leading-relaxed font-sans">
                        {activeEvent.significance}
                      </p>
                    </div>

                    {/* Exam Focus Callout: Open Hairline Strip */}
                    <div className="p-3.5 bg-[#F3EFE5] border-l-4 border-[#9C3B32] space-y-1">
                      <span className="font-mono text-xs font-bold uppercase text-[#9C3B32] block">
                        ★ TRỌNG TÂM THI TỐT NGHIỆP THPT (ĂN ĐIỂM 8 - 9 - 10):
                      </span>
                      <p className="text-xs sm:text-sm text-[#0A1418] font-serif italic">
                        {activeEvent.examTips}
                      </p>
                    </div>

                    {/* Key Historical Figures: Open Row */}
                    <div className="pt-2 hairline-t space-y-1.5">
                      <span className="text-xs font-mono font-bold text-[#0A1418] uppercase flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#486D5D]" />
                        <span>Nhân vật lịch sử gắn liền:</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeEvent.keyFigures.map((fig, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#0A1418] text-[#FAF8F1] text-xs font-mono">
                            {fig}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Action Bar: Open Solid Ink Press Buttons */}
                <div className="pt-6 hairline-t flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#687477]">
                    {activeEvent.tags.map((t, i) => (
                      <span key={i} className="underline">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onGoToDownload(activeEvent.relatedResourceId)}
                      className="px-4 py-2.5 bg-transparent border border-[#0A1418] hover:border-[#9C3B32] hover:text-[#9C3B32] text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#9C3B32]" />
                      <span>Tải Đề Cương Phân Kỳ Này</span>
                    </button>

                    <button
                      onClick={() => onGoToQuiz(activeEvent.relatedQuizId)}
                      className="px-5 py-2.5 bg-[#9C3B32] hover:bg-[#7A2820] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#E5C985]/30"
                    >
                      <span>Luyện Trắc Nghiệm Mốc Này</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#E5C985]" />
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
