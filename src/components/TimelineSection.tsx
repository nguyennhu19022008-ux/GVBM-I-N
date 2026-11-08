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

  // Current active event for 16:9 reading stage
  const activeEvent = useMemo(() => {
    const found = filteredEvents.find((e) => e.id === activeEventId);
    return found || filteredEvents[0] || TIMELINE_EVENTS[0];
  }, [filteredEvents, activeEventId]);

  return (
    <section id="timeline-section" className="py-16 lg:py-24 bg-[#FAF3E0] hairline-b text-left">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 hairline-b">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[#780000]">
              <Calendar className="w-4 h-4" />
              <span>CHƯƠNG II • TRỤC THỜI GIAN LỊCH SỬ TƯƠNG TÁC 16:9</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[#4A2508] tracking-tight">
              Dòng Chảy Lịch Sử Theo Tiến Trình
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#18120E]/80 max-w-2xl font-sans">
              Khám phá các phân kỳ lịch sử lớn của Việt Nam và Thế giới. Nhấp vào mốc năm để mở hồ sơ tư liệu trực tiếp trên bàn đọc 16:9.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mốc năm, chiến dịch, nhân vật..."
              className="w-full pl-10 pr-4 py-3 rounded-sm bg-white border border-[#D4A373]/60 focus:border-[#780000] text-sm outline-none font-sans"
            />
            <Search className="w-4 h-4 text-[#4A2508]/60 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-stone-400 hover:text-stone-700 font-mono cursor-pointer"
              >
                XÓA
              </button>
            )}
          </div>
        </div>

        {/* 16:9 Horizontal Year Rail (Scrubber Bar) */}
        <div className="my-8 pb-4 hairline-b overflow-x-auto scrollbar-none flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4A2508] shrink-0 mr-2">
            <span>NIÊN ĐẠI:</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-1 overflow-x-auto scrollbar-none">
            {TIMELINE_EVENTS.map((item) => {
              const isActive = activeEvent?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveEventId(item.id)}
                  className={`px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-mono font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'bg-[#780000] text-white border-[#780000] shadow-sm scale-105'
                      : 'bg-white text-[#4A2508] border-[#D4A373]/50 hover:bg-[#F2E4C6] hover:border-[#4A2508]'
                  }`}
                >
                  {item.year}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-[#4A2508]/60">1858 — 1986</span>
          </div>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium scrollbar-none">
          <div className="flex items-center gap-1.5 text-[#4A2508] font-bold shrink-0 mr-2">
            <Filter className="w-4 h-4" />
            <span>Phân kỳ:</span>
          </div>

          {PERIOD_FILTERS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPeriod(tab.id)}
              className={`px-3.5 py-2 rounded-sm whitespace-nowrap transition-all cursor-pointer border ${
                selectedPeriod === tab.id
                  ? 'bg-[#4A2508] text-[#FAF3E0] border-[#4A2508] font-bold shadow-xs'
                  : 'bg-white text-[#4A2508]/80 border-[#D4A373]/40 hover:bg-[#F2E4C6] hover:text-[#4A2508]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 16:9 Widescreen Split-Stage Architecture (4 Cols List : 8 Cols Live Reading Stage) */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white/70 border border-dashed border-[#D4A373] rounded-sm">
            <p className="text-base font-medium text-[#4A2508]">Không tìm thấy sự kiện phù hợp với từ khóa "{searchQuery}".</p>
            <button
              onClick={() => { setSelectedPeriod('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 bg-[#780000] text-white text-xs font-bold rounded-sm cursor-pointer"
            >
              Xem tất cả sự kiện
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 4 Columns: Chronological Stream List (Cardless Open Ledger) */}
            <div className="lg:col-span-4 space-y-3 max-h-[820px] overflow-y-auto pr-2">
              <div className="text-xs font-mono font-bold text-[#4A2508]/70 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>DANH SÁCH MỐC SỰ KIỆN ({filteredEvents.length})</span>
                <span>NHẤP ĐỂ ĐỌC TRỰC TIẾP</span>
              </div>

              {filteredEvents.map((evt) => {
                const isSelected = activeEvent?.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setActiveEventId(evt.id)}
                    className={`p-4 sm:p-5 rounded-sm transition-all cursor-pointer border text-left ${
                      isSelected
                        ? 'bg-white border-l-4 border-l-[#780000] border-t border-r border-b border-[#D4A373] shadow-md scale-[1.01]'
                        : 'bg-white/60 hover:bg-white border-[#D4A373]/30 hover:border-[#D4A373]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#780000]">
                        {evt.year}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500">
                        Lớp {evt.gradeLevel === 'all' ? '11 & 12' : evt.gradeLevel}
                      </span>
                    </div>

                    <h4 className="font-playfair text-base font-bold text-[#4A2508] line-clamp-2 leading-snug">
                      {evt.title}
                    </h4>

                    <p className="mt-1.5 text-xs text-[#18120E]/75 line-clamp-2 font-sans">
                      {evt.summary}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-[#D4A373]/20 flex items-center justify-between text-[11px] font-mono text-[#4A2508]/70">
                      <span>{evt.periodLabel}</span>
                      <span className="text-[#780000] font-bold flex items-center gap-0.5">
                        {isSelected ? 'Đang đọc' : 'Xem'} <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 8 Columns: Live Archival Reading Stage (Bàn Đọc Hồ Sơ Tư Liệu 16:9) */}
            {activeEvent && (
              <div className="lg:col-span-8 bg-white border border-[#D4A373]/60 p-6 sm:p-8 lg:p-10 shadow-sm relative animate-fadeUp">
                
                {/* Stage Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 hairline-b">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 bg-[#780000] text-white font-mono text-sm font-black rounded-xs">
                      NĂM {activeEvent.year}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#4A2508] font-bold">
                      {activeEvent.periodLabel}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      • Thời gian: {activeEvent.exactDate || activeEvent.year}
                    </span>
                  </div>

                  {/* Expand Modal Trigger */}
                  <button
                    onClick={() => onSelectEventDetail(activeEvent)}
                    className="p-1.5 hover:bg-[#F2E4C6] rounded-sm text-[#4A2508] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold"
                    title="Mở toàn màn hình"
                  >
                    <Maximize2 className="w-4 h-4 text-[#780000]" />
                    <span className="hidden sm:inline">Phóng to</span>
                  </button>
                </div>

                {/* Monumental Event Title */}
                <div className="my-5">
                  <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A2508] leading-tight">
                    {activeEvent.title}
                  </h3>
                  <p className="mt-3 text-base text-[#18120E]/90 leading-relaxed font-sans">
                    {activeEvent.summary}
                  </p>
                </div>

                {/* Archival Media Frame */}
                <div className="archival-frame my-6 p-2 shadow-xs">
                  <div className="relative aspect-21/9 w-full bg-stone-900 overflow-hidden">
                    <img
                      src={activeEvent.imageUrl}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover filter contrast-105"
                    />
                  </div>
                  <div className="p-3 text-xs text-[#4A2508] font-sans italic bg-[#F2E4C6]/70 border-t border-[#D4A373]/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#780000] shrink-0"></span>
                    <span>{activeEvent.imageCaption}</span>
                  </div>
                </div>

                {/* Deep Analysis Columns: Context & Significance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  
                  {/* Context & Key decisions */}
                  <div className="space-y-4">
                    <div className="p-4 bg-[#FAF3E0] border-l-4 border-l-[#4A2508]">
                      <h4 className="font-playfair text-base font-bold text-[#4A2508] mb-1.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#780000]" />
                        <span>Bối Cảnh Lịch Sử</span>
                      </h4>
                      <p className="text-sm text-[#18120E]/85 leading-relaxed">
                        {activeEvent.context}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-playfair text-base font-bold text-[#4A2508] mb-2 flex items-center gap-2">
                        <Flag className="w-4 h-4 text-[#780000]" />
                        <span>Diễn Biến & Quyết Sách Then Chốt</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-[#18120E]/85">
                        {activeEvent.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono text-xs font-bold text-[#780000] mt-0.5 shrink-0">
                              [{i + 1}]
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Significance & Exam Focus */}
                  <div className="space-y-4">
                    <div className="p-4 bg-[#FAF3E0] border-l-4 border-l-[#780000]">
                      <h4 className="font-playfair text-base font-bold text-[#780000] mb-1.5 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-[#780000]" />
                        <span>Ý Nghĩa Lịch Sử & Bài Học</span>
                      </h4>
                      <p className="text-sm text-[#18120E]/85 leading-relaxed">
                        {activeEvent.significance}
                      </p>
                    </div>

                    {/* Crucial THPT Exam Tips */}
                    <div className="p-4 bg-[#780000]/10 border border-[#780000]/30 rounded-xs">
                      <span className="font-mono text-xs font-bold uppercase text-[#780000] block mb-1">
                        ★ TRỌNG TÂM THI TỐT NGHIỆP THPT (ĂN ĐIỂM 8 - 9 - 10)
                      </span>
                      <p className="text-sm text-[#4A2508] font-medium leading-relaxed">
                        {activeEvent.examTips}
                      </p>
                    </div>

                    {/* Key Historical Figures */}
                    <div>
                      <span className="text-xs font-mono font-bold text-[#4A2508]/70 uppercase block mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Nhân vật lịch sử gắn liền:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeEvent.keyFigures.map((fig, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 bg-[#FAF3E0] border border-[#D4A373]/50 text-[#4A2508] text-xs font-medium rounded-xs">
                            {fig}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Contextual Action Bar: Jump directly to Quiz or Downloads */}
                <div className="mt-8 pt-5 hairline-t flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeEvent.tags.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono text-[#4A2508]/60 bg-stone-100 px-2 py-0.5">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onGoToDownload(activeEvent.relatedResourceId)}
                      className="px-4 py-2.5 rounded-sm border border-[#4A2508]/40 hover:border-[#4A2508] text-[#4A2508] hover:bg-[#F2E4C6] text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#780000]" />
                      <span>Tải Đề Cương Phân Kỳ Này</span>
                    </button>

                    <button
                      onClick={() => onGoToQuiz(activeEvent.relatedQuizId)}
                      className="px-5 py-2.5 rounded-sm bg-[#780000] hover:bg-[#580000] text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Luyện Trắc Nghiệm Mốc Này</span>
                      <ExternalLink className="w-4 h-4" />
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
