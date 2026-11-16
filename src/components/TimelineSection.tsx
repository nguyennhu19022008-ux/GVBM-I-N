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
    <section id="timeline-section" className="py-14 lg:py-20 bg-[#FAF8F1] text-left relative overflow-hidden">
      {/* Subtle archival atmosphere restricted away from text readability */}
      <div
        className="archival-parallax-bg will-change-transform absolute inset-x-0 top-0 h-[360px] pointer-events-none opacity-[0.07] select-none image-blend-fade-bottom"
        style={{
          backgroundImage: 'url(/images/duong-truong-son.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F1]/60 via-[#FAF8F1]/92 to-[#FAF8F1] pointer-events-none" />

      <div className="w-full max-w-[1680px] mx-auto px-5 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header: Clean High-Contrast Editorial Masthead */}
        <div className="cinematic-scroll-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9C3B32]">
              <Calendar className="w-4 h-4" />
              <span>CHƯƠNG II • TRỤC THỜI GIAN LỊCH SỬ KHỔ RỘNG</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A1418] tracking-tight">
              Dòng Chảy Lịch Sử Theo Tiến Trình
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#3F4B4E] max-w-2xl font-sans leading-relaxed">
              Khám phá các phân kỳ lịch sử lớn của Việt Nam và Thế giới. Nhấp vào mốc năm để đọc ngay hồ sơ tư liệu trực quan.
            </p>
          </div>

          {/* Quick Search: Smooth Pill Input */}
          <div className="relative w-full lg:w-96">
            <input
              id="timeline-search"
              name="timelineSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mốc năm, chiến dịch, nhân vật..."
              className="w-full pl-10 pr-14 py-2.5 rounded-full bg-white border border-[#0A1418]/18 focus:border-[#9C3B32] text-sm outline-none font-sans placeholder-[#4A5558]/75 text-[#0A1418] transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#3F4B4E] absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-2.5 text-xs text-[#9C3B32] hover:text-[#0A1418] font-mono font-semibold cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Year Scrubber: Crisp High-Contrast Underline Strip */}
        <div className="my-5 border-b border-[#0A1418]/15 overflow-x-auto scrollbar-none flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9C3B32] shrink-0 uppercase pb-2.5">
            <span>Niên đại:</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-7 flex-1 overflow-x-auto scrollbar-none">
            {TIMELINE_EVENTS.map((item) => {
              const isActive = activeEvent?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveEventId(item.id)}
                  className={`pb-2.5 text-xs sm:text-sm font-mono transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#9C3B32] text-[#9C3B32] font-black'
                      : 'border-transparent text-[#3F4B4E] hover:text-[#0A1418] font-semibold'
                  }`}
                >
                  {item.year}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0 pb-2.5">
            <span className="text-xs font-mono font-semibold text-[#3F4B4E]">1858 — 1986</span>
          </div>
        </div>

        {/* Period Filter Tabs: Soft Pill Strip with Readable Text */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs font-sans scrollbar-none">
          <div className="flex items-center gap-1.5 text-[#0A1418] font-semibold shrink-0 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#9C3B32]" />
            <span>Phân kỳ:</span>
          </div>

          {PERIOD_FILTERS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPeriod(tab.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                selectedPeriod === tab.id
                  ? 'bg-[#0A1418] text-[#FAF8F1] font-semibold shadow-2xs'
                  : 'bg-white/75 text-[#2E383B] hover:text-[#0A1418] hover:bg-white border border-[#0A1418]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CARDLESS ASYMMETRICAL EDITORIAL SPREAD (4 COLS STREAM : 8 COLS READING DESK) */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white border border-[#0A1418]/10 p-8">
            <p className="text-sm font-sans text-[#3F4B4E]">
              Không tìm thấy sự kiện phù hợp với từ khóa "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedPeriod('all'); setSearchQuery(''); }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase cursor-pointer"
            >
              Xem tất cả sự kiện
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            
            {/* Left 4 Columns: Open Chronological Ledger Stream (Cardless & Crisp) */}
            <div className="lg:col-span-4 space-y-2 max-h-[850px] overflow-y-auto pr-2 scrollbar-none">
              <div className="text-[11px] font-mono font-bold text-[#9C3B32] uppercase tracking-wider mb-3 pb-1 flex items-center justify-between">
                <span>DANH SÁCH MỐC SỰ KIỆN ({filteredEvents.length})</span>
                <span>CHỌN ĐỂ ĐỌC</span>
              </div>

              {filteredEvents.map((evt) => {
                const isSelected = activeEvent?.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setActiveEventId(evt.id)}
                    className={`p-4 rounded-2xl transition-all cursor-pointer text-left relative group border ${
                      isSelected 
                        ? 'bg-white border-[#9C3B32]/30 shadow-xs' 
                        : 'bg-white/60 border-transparent hover:bg-white hover:border-[#0A1418]/10'
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <span className={`font-mono text-2xl font-black ${isSelected ? 'text-[#9C3B32]' : 'text-[#0A1418] group-hover:text-[#9C3B32]'}`}>
                        {evt.year}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-[#3F4B4E] uppercase">
                        Khối {evt.gradeLevel === 'all' ? '11 & 12' : evt.gradeLevel}
                      </span>
                    </div>

                    <h4 className={`font-playfair text-sm sm:text-base font-bold leading-snug ${isSelected ? 'text-[#9C3B32]' : 'text-[#0A1418] group-hover:text-[#9C3B32]'}`}>
                      {evt.title}
                    </h4>

                    <p className="mt-1 text-xs text-[#3F4B4E] line-clamp-2 font-sans leading-relaxed">
                      {evt.summary}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#4A5558]">
                      <span>{evt.periodLabel}</span>
                      <span className={`flex items-center gap-0.5 font-bold uppercase ${isSelected ? 'text-[#9C3B32]' : 'text-[#0A1418] group-hover:text-[#9C3B32]'}`}>
                        {isSelected ? 'Đang đọc' : 'Chi tiết'} <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 8 Columns: Clean High-Contrast Broadsheet Reading Desk */}
            {activeEvent && (
              <div key={`desk-${activeEvent.id}`} className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#0A1418]/10 shadow-xs space-y-6 text-left relative animate-fadeSlideUp">
                
                {/* Desk Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#0A1418]/10">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#9C3B32] text-white font-mono text-xs font-bold uppercase tracking-wider">
                      Hồ sơ năm {activeEvent.year}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0A1418] uppercase">
                      {activeEvent.periodLabel}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#3F4B4E] hidden sm:inline">
                      • Thời gian: {activeEvent.exactDate || activeEvent.year}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectEventDetail(activeEvent)}
                    className="px-4 py-1.5 rounded-full bg-[#9C3B32]/12 hover:bg-[#9C3B32] text-xs font-mono font-bold text-[#9C3B32] hover:text-white transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
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
                  <p className="text-sm sm:text-base text-[#1E292D] font-sans leading-relaxed">
                    "{activeEvent.summary}"
                  </p>
                </div>

                {/* Authentic Documentary Photograph */}
                <div className="space-y-2">
                  <div className="relative aspect-21/9 rounded-2xl overflow-hidden bg-stone-900 shadow-md">
                    <img
                      src={activeEvent.imageUrl}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover grayscale contrast-110 hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <span className="italic font-sans text-xs text-white/95 drop-shadow">{activeEvent.imageCaption}</span>
                      <span className="shrink-0 text-[10px] font-bold text-[#E5C985] uppercase tracking-wider bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                        Ảnh tư liệu gốc
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deep Historical Analysis: Open Editorial Columns (No Boxed Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  
                  {/* Left Column: Context & Decisions */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <h4 className="font-playfair text-base font-bold text-[#9C3B32] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#9C3B32]" />
                        <span>Bối Cảnh Lịch Sử:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0A1418]/80 leading-relaxed font-sans">
                        {activeEvent.context}
                      </p>
                    </div>

                    <div className="space-y-2">
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
                    <div className="space-y-2">
                      <h4 className="font-playfair text-base font-bold text-[#9C3B32] flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-[#C69A47]" />
                        <span>Ý Nghĩa Lịch Sử & Bài Học:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0A1418]/80 leading-relaxed font-sans">
                        {activeEvent.significance}
                      </p>
                    </div>

                    {/* Exam Focus Callout: Open Left-Border Strip */}
                    <div className="py-2.5 pl-4 border-l-3 border-[#9C3B32] space-y-1">
                      <span className="font-mono text-xs font-bold uppercase text-[#9C3B32] block">
                        ★ TRỌNG TÂM THI TỐT NGHIỆP THPT (ĂN ĐIỂM 8 - 9 - 10):
                      </span>
                      <p className="text-xs sm:text-sm text-[#0A1418] font-serif italic">
                        {activeEvent.examTips}
                      </p>
                    </div>

                    {/* Key Historical Figures: Open Row */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-[#0A1418] uppercase flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#486D5D]" />
                        <span>Nhân vật lịch sử gắn liền:</span>
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeEvent.keyFigures.map((fig, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-[#0A1418]/8 text-[#0A1418] text-xs font-sans font-medium">
                            {fig}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Action Bar */}
                <div className="pt-6 border-t border-[#0A1418]/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#3F4B4E]">
                    {activeEvent.tags.map((t, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#F3EFE5] text-[11px]">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onGoToDownload(activeEvent.relatedResourceId)}
                      className="px-4 py-2 rounded-full bg-[#0A1418]/6 hover:bg-[#0A1418]/12 text-[#0A1418] hover:text-[#9C3B32] text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#9C3B32]" />
                      <span>Tải Đề Cương Phân Kỳ Này</span>
                    </button>

                    <button
                      onClick={() => onGoToQuiz(activeEvent.relatedQuizId)}
                      className="px-6 py-2.5 rounded-full bg-[#9C3B32] hover:bg-[#7A2820] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:-translate-y-0.5"
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
