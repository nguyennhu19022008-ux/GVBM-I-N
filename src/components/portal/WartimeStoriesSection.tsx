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
    <section className="w-full py-16 lg:py-24 bg-[#0A1418] text-[#FAF8F1] text-left relative overflow-hidden">
      {/* Prominent Battlefield Night Sky & Artillery Smoke Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none filter contrast-125 brightness-90 mix-blend-luminosity"
        style={{ backgroundImage: `url('/images/ha-noi-1972.jpg')` }}
      />
      
      {/* Dramatic Vignette Scrim */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A1418]/60 to-[#0A1418]/95 pointer-events-none" />

      {/* Large Battle History Typographic Watermark */}
      <div className="absolute left-6 top-8 font-mono text-8xl sm:text-9xl font-black text-[#C69A47]/5 select-none pointer-events-none tracking-widest uppercase">
        1954 · 1975
      </div>

      <div className="w-full px-6 md:px-12 xl:px-16 text-left relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E5C985] uppercase mb-1.5">
              <Flame className="w-4 h-4 text-[#9C3B32]" />
              <span>BÁO ẢNH CHIẾN TRƯỜNG • KÝ ỨC BẤT TỬ</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
              Khói Lửa Chiến Tranh & Bản Hùng Ca Độc Lập
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#FAF8F1]/80 max-w-md italic">
            "Không nhốt lịch sử vào những chiếc hộp khuôn mẫu. Hãy nhìn thẳng vào ánh mắt người lính, vạt rừng Trường Sơn và giờ phút thiêng liêng giành lại non sông."
          </p>
        </div>

        {/* ============================================================== */}
        {/* PHOTOJOURNALISM FEATURE (BÁO ẢNH KHỔ LỚN 7:5 HÒA VÀO BACKGROUND) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center mb-16">
          
          {/* Left Column (7 Cols): Giant Authentic Wartime Photograph - Standout with Soft Background Merge */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group rounded-2xl overflow-hidden image-standout bg-[#14242A] shadow-2xl">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                className="w-full aspect-16/10 object-cover contrast-110 brightness-95 hover:scale-102 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#0A1418]/90 text-[#E5C985] font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-sm rounded-md shadow-xs">
                NĂM {currentStory.year} • {currentStory.period}
              </div>
            </div>

            {/* Photo Caption Strip */}
            <div className="p-4 rounded-xl bg-[#14242A]/85 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#FAF8F1]/80 shadow-xs">
              <span className="italic font-sans text-sm text-[#FAF8F1]">
                {currentStory.imageCaption}
              </span>
              <span className="shrink-0 text-[11px] font-bold text-[#E5C985] uppercase">
                TƯ LIỆU BẢO TÀNG LỊCH SỬ
              </span>
            </div>
          </div>

          {/* Right Column (5 Cols): Clean Open Narrative */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tagline & Headline */}
            <div>
              <span className="text-xs font-mono font-bold text-[#E5C985] uppercase tracking-widest block mb-2">
                {currentStory.tagline}
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-xs">
                {currentStory.title}
              </h3>
            </div>

            {/* Witness Pull Quote with Crimson Accent */}
            <div className="py-3 pl-4 border-l-4 border-[#9C3B32] bg-[#14242A]/70 backdrop-blur-sm rounded-r-xl">
              <p className="font-serif italic text-base sm:text-lg text-[#E5C985] leading-snug">
                "{currentStory.quote}"
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="font-sans text-sm sm:text-base text-[#FAF8F1]/85 leading-relaxed">
              {currentStory.excerpt}
            </p>

            {/* Heroes List */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E5C985] block">
                Những Người Con Bất Tử:
              </span>
              <div className="space-y-1.5 text-xs sm:text-sm font-sans text-[#FAF8F1]">
                {currentStory.heroes.map((hero, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#14242A]/60 hover:bg-[#1E353D] transition-colors">
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
                className="px-6 py-3.5 bg-[#9C3B32] hover:bg-[#7A2820] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg rounded-xl"
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
            <span className="text-xs font-mono font-bold uppercase text-[#E5C985] tracking-wider">
              CHỌN CUỘC KHÁNG CHIẾN / CHIẾN DỊCH ĐỂ XEM BÁO ẢNH:
            </span>
            <span className="text-[11px] font-mono text-[#FAF8F1]/70 font-bold">
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
                  className={`p-4 text-left transition-all cursor-pointer rounded-2xl ${
                    isActive
                      ? 'bg-[#1E353D] ring-2 ring-[#E5C985] shadow-lg scale-102'
                      : 'bg-[#14242A]/70 hover:bg-[#1E353D]/90'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#E5C985]' : 'text-[#FAF8F1]/80'}`}>
                      0{idx + 1}. MỐC NĂM {story.year}
                    </span>
                    <span className="text-[10px] font-mono text-[#FAF8F1]/50">TƯ LIỆU</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden mb-3 rounded-xl bg-stone-900 shadow-xs">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'contrast-115 scale-104' : 'contrast-95 opacity-80 hover:opacity-100'}`}
                    />
                  </div>
                  <h5 className={`font-playfair text-sm font-bold line-clamp-1 ${isActive ? 'text-[#E5C985]' : 'text-white'}`}>
                    {story.title}
                  </h5>
                  <p className="text-[10px] font-mono text-[#FAF8F1]/60 truncate mt-1">
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
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E5C985] uppercase mb-1">
                <Shield className="w-4 h-4 text-[#C69A47]" />
                <span>CHÂN DUNG LÃNH TỤ & KIẾN TRÚC SƯ ĐỘC LẬP</span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-white">
                Những Người Đặt Nền Móng Cho Độc Lập Dân Tộc
              </h3>
            </div>
            <p className="text-xs font-mono text-[#FAF8F1]/70 italic">
              Bấm vào ảnh chân dung để đọc toàn văn cống hiến lịch sử
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HISTORICAL_LEADERS.map((leader) => (
              <div
                key={leader.id}
                onClick={() => setSelectedLeader(leader)}
                className="group cursor-pointer text-left p-5 rounded-2xl bg-[#14242A]/85 hover:bg-[#1E353D] transition-all space-y-4 image-standout shadow-xl"
              >
                {/* Standout Prominent Portrait */}
                <div className="overflow-hidden rounded-xl bg-stone-900 shadow-md">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full aspect-4/5 object-cover object-top contrast-110 group-hover:scale-104 transition-all duration-500"
                  />
                  <div className="p-2 text-center bg-[#0A1418] text-[#E5C985] text-[10px] font-mono font-bold">
                    NIÊN ĐẠI: {leader.lifespan}
                  </div>
                </div>

                {/* Text information */}
                <div>
                  <h4 className="font-playfair text-lg sm:text-xl font-bold text-white group-hover:text-[#E5C985] transition-colors leading-snug">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-[#E5C985] font-mono mt-1 font-semibold line-clamp-1">
                    {leader.historicalMilestone}
                  </p>
                  <p className="text-xs text-[#FAF8F1]/80 font-serif italic mt-2.5 line-clamp-2 leading-relaxed">
                    "{leader.quote}"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono font-bold text-[#E5C985]">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeSlideUp"
          onClick={() => setSelectedStoryModal(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF8F1] rounded-2xl shadow-2xl p-6 sm:p-8 text-left text-[#0A1418]"
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
                className="px-6 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer rounded-xl"
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
