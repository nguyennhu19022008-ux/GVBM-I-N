import React, { useState } from 'react';
import { Flame, ChevronRight, X, Shield, ArrowRight } from 'lucide-react';
import { WARTIME_STORIES, HISTORICAL_LEADERS } from '../../data/storiesData';
import type { WartimeStory, LeaderProfile } from '../../data/storiesData';
import { LeadersGalleryModal } from './LeadersGalleryModal';

export const WartimeStoriesSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [selectedStoryModal, setSelectedStoryModal] = useState<WartimeStory | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  const currentStory = WARTIME_STORIES[activeStoryIndex];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF8F1] text-left">
      <div className="w-full px-6 md:px-12 xl:px-16 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase mb-1.5">
              <Flame className="w-4 h-4 text-[#9C3B32]" />
              <span>BÁO ẢNH CHIẾN TRƯỜNG • KÝ ỨC BẤT TỬ</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1418] tracking-tight">
              Khói Lửa Chiến Tranh & Bản Hùng Ca Độc Lập
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#687477] max-w-md italic">
            "Không nhốt lịch sử vào những chiếc hộp khuôn mẫu. Hãy nhìn thẳng vào ánh mắt người lính, vạt rừng Trường Sơn và giờ phút thiêng liêng giành lại non sông."
          </p>
        </div>

        {/* ============================================================== */}
        {/* PHOTOJOURNALISM FEATURE (BÁO ẢNH KHỔ LỚN 7:5 HÒA VÀO BACKGROUND) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center mb-16">
          
          {/* Left Column (7 Cols): Giant Authentic Wartime Photograph - Standout with Soft Background Merge */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group rounded-xl overflow-hidden image-standout bg-[#F3EFE5]">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                className="w-full aspect-16/10 object-cover contrast-110 brightness-95 hover:scale-102 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A1418]/85 text-[#E5C985] font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-sm rounded-xs">
                NĂM {currentStory.year} • {currentStory.period}
              </div>
            </div>

            {/* Photo Caption Strip without harsh borders */}
            <div className="p-4 rounded-lg bg-[#F3EFE5]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#687477]">
              <span className="italic font-sans text-sm text-[#0A1418]">
                {currentStory.imageCaption}
              </span>
              <span className="shrink-0 text-[11px] font-bold text-[#9C3B32] uppercase">
                TƯ LIỆU BẢO TÀNG LỊCH SỬ
              </span>
            </div>
          </div>

          {/* Right Column (5 Cols): Clean Open Narrative */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tagline & Headline */}
            <div>
              <span className="text-xs font-mono font-bold text-[#C69A47] uppercase tracking-widest block mb-2">
                {currentStory.tagline}
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-[#0A1418] leading-tight tracking-tight">
                {currentStory.title}
              </h3>
            </div>

            {/* Witness Pull Quote with Soft Accent */}
            <div className="py-2 pl-4 border-l-4 border-[#9C3B32] bg-[#F3EFE5]/40 rounded-r-lg">
              <p className="font-serif italic text-base sm:text-lg text-[#9C3B32] leading-snug">
                {currentStory.quote}
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="font-sans text-sm sm:text-base text-[#687477] leading-relaxed">
              {currentStory.excerpt}
            </p>

            {/* Heroes List */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1418] block">
                Những Người Con Bất Tử:
              </span>
              <div className="space-y-1.5 text-xs sm:text-sm font-sans text-[#0A1418]">
                {currentStory.heroes.map((hero, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1 rounded-sm hover:bg-[#F3EFE5]/50 transition-colors">
                    <span className="w-1.5 h-1.5 bg-[#9C3B32] rounded-full shrink-0"></span>
                    <span className="font-medium">{hero}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedStoryModal(currentStory)}
                className="px-6 py-3 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-xs rounded-xs"
              >
                <span>Đọc Trọn Vẹn Diễn Biến & Ý Nghĩa</span>
                <ArrowRight className="w-4 h-4 text-[#E5C985]" />
              </button>
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* 4 MỐC LỊCH SỬ TIÊU BIỂU: CLEAN CAROUSEL/GRID (NO HARSH LINES) */}
        {/* ============================================================== */}
        <div className="pt-4 pb-16">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-mono font-bold uppercase text-[#687477] tracking-wider">
              CHỌN CUỘC KHÁNG CHIẾN / CHIẾN DỊCH ĐỂ XEM BÁO ẢNH:
            </span>
            <span className="text-[11px] font-mono text-[#9C3B32] font-bold">
              [4 MỐC LỊCH SỬ TIÊU BIỂU]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WARTIME_STORIES.map((story, idx) => {
              const isActive = idx === activeStoryIndex;
              return (
                <button
                  key={story.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`p-4 text-left transition-all cursor-pointer rounded-xl ${
                    isActive
                      ? 'bg-[#F3EFE5] ring-2 ring-[#9C3B32] shadow-sm'
                      : 'bg-[#F3EFE5]/40 hover:bg-[#F3EFE5]/80'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#9C3B32]">
                      0{idx + 1}. MỐC NĂM {story.year}
                    </span>
                    <span className="text-[10px] font-mono text-[#687477]">TƯ LIỆU</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden mb-3 rounded-lg bg-stone-900">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'contrast-115 scale-103' : 'contrast-95 opacity-85 hover:opacity-100'}`}
                    />
                  </div>
                  <h5 className={`font-playfair text-sm font-bold line-clamp-1 ${isActive ? 'text-[#9C3B32]' : 'text-[#0A1418]'}`}>
                    {story.title}
                  </h5>
                  <p className="text-[10px] font-mono text-[#687477] truncate mt-1">
                    {story.period}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* LEADERS GALLERY: STANDOUT PORTRAITS (PROMINENT & ELEVATED)     */}
        {/* ============================================================== */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase mb-1">
                <Shield className="w-4 h-4 text-[#C69A47]" />
                <span>CHÂN DUNG LÃNH TỤ & KIẾN TRÚC SƯ ĐỘC LẬP</span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-[#0A1418]">
                Những Người Đặt Nền Móng Cho Độc Lập Dân Tộc
              </h3>
            </div>
            <p className="text-xs font-mono text-[#687477] italic">
              Bấm vào ảnh chân dung để đọc toàn văn cống hiến lịch sử
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HISTORICAL_LEADERS.map((leader) => (
              <div
                key={leader.id}
                onClick={() => setSelectedLeader(leader)}
                className="group cursor-pointer text-left p-5 rounded-2xl bg-[#F3EFE5]/50 hover:bg-[#F3EFE5] transition-all space-y-4 image-standout"
              >
                {/* Standout Prominent Portrait without ugly border lines */}
                <div className="overflow-hidden rounded-xl bg-stone-900 shadow-sm">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full aspect-4/5 object-cover object-top contrast-110 group-hover:scale-104 transition-all duration-500"
                  />
                  <div className="p-2 text-center bg-[#0A1418] text-[#E5C985] text-[10px] font-mono font-bold">
                    NIÊN ĐẠI: {leader.lifespan}
                  </div>
                </div>

                {/* Open text */}
                <div>
                  <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#0A1418] group-hover:text-[#9C3B32] transition-colors leading-snug">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-[#9C3B32] font-mono mt-1 font-semibold line-clamp-1">
                    {leader.historicalMilestone}
                  </p>
                  <p className="text-xs text-[#687477] font-serif italic mt-2.5 line-clamp-2 leading-relaxed">
                    "{leader.quote}"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono font-bold text-[#9C3B32]">
                  <span>XEM TIỂU SỬ & CỐNG HIẾN</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal 1: Full-Screen Wartime Story Reader */}
      {selectedStoryModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-fadeSlideUp"
          onClick={() => setSelectedStoryModal(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF8F1] rounded-2xl shadow-2xl p-6 sm:p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase">
                <span>HỒ SƠ CHIẾN DỊCH • NĂM {selectedStoryModal.year}</span>
              </div>
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="w-8 h-8 rounded-full bg-[#F3EFE5] hover:bg-[#9C3B32] hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[#0A1418]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <span className="text-xs font-mono font-bold text-[#C69A47] uppercase tracking-wider block mb-1">
              {selectedStoryModal.tagline}
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#0A1418] mb-2">
              {selectedStoryModal.title}
            </h3>
            <p className="font-serif italic text-sm text-[#9C3B32] mb-6">
              {selectedStoryModal.quote}
            </p>

            <div className="rounded-xl overflow-hidden mb-6 image-standout">
              <img
                src={selectedStoryModal.imageUrl}
                alt={selectedStoryModal.title}
                className="w-full aspect-16/9 object-cover contrast-105"
              />
              <p className="text-xs font-mono text-[#687477] p-3 bg-[#F3EFE5] italic">
                {selectedStoryModal.imageCaption}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#0A1418] leading-relaxed mb-6 font-serif">
              {selectedStoryModal.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="p-5 bg-[#F3EFE5] rounded-xl mb-6 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#9C3B32] block">
                NHỮNG TẤM GƯƠNG ANH DŨNG GẮN LIỀN:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedStoryModal.heroes.map((hero, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white rounded-lg text-xs font-mono text-[#0A1418] shadow-2xs">
                    {hero}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 bg-[#F3EFE5] rounded-xl text-xs font-sans text-[#687477] mb-6">
              <span className="font-bold text-[#0A1418] uppercase block mb-1 font-mono">Ý NGHĨA LỊCH SỬ SÂU SẮC:</span>
              <p className="leading-relaxed">{selectedStoryModal.significance}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="px-6 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer rounded-xs"
              >
                Đóng Câu Chuyện
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal 2: Leaders Gallery */}
      <LeadersGalleryModal
        leader={selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />

    </section>
  );
};
