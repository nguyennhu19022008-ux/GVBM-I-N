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
    <section className="w-full py-14 lg:py-20 hairline-b bg-[#F6F0E4]">
      <div className="w-full px-6 md:px-12 xl:px-16 text-left">
        
        {/* Section Header: Pure Editorial Broadsheet Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 broadsheet-double-b">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1.5">
              <Flame className="w-4 h-4 text-[#8B0000]" />
              <span>BÁO ẢNH CHIẾN TRƯỜNG • KÝ ỨC BẤT TỬ</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
              Khói Lửa Chiến Tranh & Bản Hùng Ca Độc Lập
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#4A3E3D] max-w-md italic">
            "Không nhốt lịch sử vào những chiếc hộp khuôn mẫu. Hãy nhìn thẳng vào ánh mắt người lính, vạt rừng Trường Sơn và giờ phút thiêng liêng giành lại non sông."
          </p>
        </div>

        {/* ============================================================== */}
        {/* CARDLESS PHOTOJOURNALISM FEATURE (BÁO ẢNH KHỔ LỚN 7:5)         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start mb-12">
          
          {/* Left Column (7 Cols): Giant Authentic Wartime Photograph */}
          <div className="lg:col-span-7 space-y-4">
            <div className="archival-newspaper-frame relative group overflow-hidden">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                className="w-full aspect-16/10 object-cover grayscale contrast-110 brightness-95 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#1A1615]/90 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/20">
                NĂM {currentStory.year} • {currentStory.period}
              </div>
            </div>

            {/* Photo Caption Ledger Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#ECE3D0]/60 border-l-3 border-[#8B0000] text-xs font-mono text-[#4A3E3D]">
              <span className="italic font-sans text-sm text-[#1A1615]">
                {currentStory.imageCaption}
              </span>
              <span className="shrink-0 text-[11px] font-bold text-[#8B0000] uppercase">
                TƯ LIỆU BẢO TÀNG LỊCH SỬ
              </span>
            </div>
          </div>

          {/* Right Column (5 Cols): Cardless Open Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tagline & Headline */}
            <div>
              <span className="text-xs font-mono font-bold text-[#C59B27] uppercase tracking-widest block mb-2">
                {currentStory.tagline}
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1615] leading-tight tracking-tight">
                {currentStory.title}
              </h3>
            </div>

            {/* Witness Pull Quote */}
            <div className="py-3 border-y border-[#1A1615]/20">
              <p className="font-serif italic text-base sm:text-lg text-[#8B0000] leading-snug">
                {currentStory.quote}
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="font-sans text-sm sm:text-base text-[#4A3E3D] leading-relaxed">
              {currentStory.excerpt}
            </p>

            {/* Heroes List: Cardless Hairline List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615] block">
                Những Người Con Bất Tử:
              </span>
              <div className="space-y-1.5 text-xs sm:text-sm font-sans text-[#1A1615]">
                {currentStory.heroes.map((hero, idx) => (
                  <div key={idx} className="flex items-center gap-2 pb-1.5 hairline-b">
                    <span className="w-1.5 h-1.5 bg-[#8B0000] rounded-full shrink-0"></span>
                    <span className="font-medium">{hero}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedStoryModal(currentStory)}
                className="px-6 py-3 bg-[#1A1615] hover:bg-[#8B0000] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Đọc Trọn Vẹn Diễn Biến & Ý Nghĩa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* ARCHIVAL FILMSTRIP: OPEN BROADSHEET INDEX (NO CARD BOXES)      */}
        {/* ============================================================== */}
        <div className="pt-6 pb-12 broadsheet-double-b">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold uppercase text-[#4A3E3D] tracking-wider">
              CHỌN CUỘC KHÁNG CHIẾN / CHIẾN DỊCH ĐỂ XEM BÁO ẢNH:
            </span>
            <span className="text-[11px] font-mono text-[#8B0000] font-bold">
              [4 MỐC LỊCH SỬ TIÊU BIỂU]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1615]/20 border-y border-[#1A1615]/25">
            {WARTIME_STORIES.map((story, idx) => {
              const isActive = idx === activeStoryIndex;
              return (
                <button
                  key={story.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`p-4 text-left transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-[#ECE3D0]/70'
                      : 'hover:bg-[#ECE3D0]/30'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B0000]" />
                  )}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#8B0000]">
                      0{idx + 1}. MỐC NĂM {story.year}
                    </span>
                    <span className="text-[10px] font-mono text-[#4A3E3D]">TƯ LIỆU</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden mb-2.5 relative border border-[#1A1615]/30">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className={`w-full h-full object-cover grayscale ${isActive ? 'contrast-125' : 'contrast-90'}`}
                    />
                  </div>
                  <h5 className={`font-playfair text-sm font-bold line-clamp-1 ${isActive ? 'text-[#8B0000]' : 'text-[#1A1615]'}`}>
                    {story.title}
                  </h5>
                  <p className="text-[10px] font-mono text-[#4A3E3D] truncate mt-1">
                    {story.period}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* LEADERS GALLERY: OPEN BROADSHEET PORTRAIT STRIP (CARDLESS)     */}
        {/* ============================================================== */}
        <div className="pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-3 hairline-b">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1">
                <Shield className="w-4 h-4 text-[#C59B27]" />
                <span>CHÂN DUNG LÃNH TỤ & KIẾN TRÚC SƯ ĐỘC LẬP</span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#1A1615]">
                Những Người Đặt Nền Móng Cho Độc Lập Dân Tộc
              </h3>
            </div>
            <p className="text-xs font-mono text-[#4A3E3D] italic">
              Bấm vào ảnh chân dung để đọc toàn văn cống hiến lịch sử
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1615]/20 border-y border-[#1A1615]/25">
            {HISTORICAL_LEADERS.map((leader) => (
              <div
                key={leader.id}
                onClick={() => setSelectedLeader(leader)}
                className="group cursor-pointer text-left p-4 sm:p-5 space-y-3 hover:bg-[#ECE3D0]/30 transition-colors"
              >
                {/* Archival framed portrait */}
                <div className="archival-newspaper-frame overflow-hidden">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full aspect-4/5 object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                  />
                  <div className="p-1.5 text-center bg-[#ECE3D0]/60 text-[10px] font-mono text-[#4A3E3D]">
                    {leader.lifespan}
                  </div>
                </div>

                {/* Open text (Cardless) */}
                <div>
                  <h4 className="font-playfair text-lg font-bold text-[#1A1615] group-hover:text-[#8B0000] transition-colors leading-snug">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-[#8B0000] font-mono mt-0.5 line-clamp-1">
                    {leader.historicalMilestone}
                  </p>
                  <p className="text-xs text-[#4A3E3D] font-serif italic mt-2 line-clamp-2">
                    "{leader.quote}"
                  </p>
                </div>

                <div className="pt-2 hairline-t flex items-center justify-between text-[11px] font-mono text-[#8B0000]">
                  <span>XEM HỒ SƠ</span>
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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F6F0E4] border-2 border-[#1A1615] shadow-2xl p-6 sm:p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 broadsheet-double-b">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase">
                <span>HỒ SƠ CHIẾN DỊCH • NĂM {selectedStoryModal.year}</span>
              </div>
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="w-8 h-8 rounded-full border border-[#1A1615]/30 hover:border-[#1A1615] hover:bg-[#8B0000] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <span className="text-xs font-mono font-bold text-[#C59B27] uppercase tracking-wider block mb-1">
              {selectedStoryModal.tagline}
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#1A1615] mb-2">
              {selectedStoryModal.title}
            </h3>
            <p className="font-serif italic text-sm text-[#8B0000] mb-6">
              {selectedStoryModal.quote}
            </p>

            <div className="archival-newspaper-frame mb-6">
              <img
                src={selectedStoryModal.imageUrl}
                alt={selectedStoryModal.title}
                className="w-full aspect-16/9 object-cover grayscale contrast-105"
              />
              <p className="text-xs font-mono text-[#4A3E3D] mt-2 italic px-1">
                {selectedStoryModal.imageCaption}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#1A1615] leading-relaxed mb-6 font-serif">
              {selectedStoryModal.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="p-4 bg-[#ECE3D0]/60 border-l-4 border-[#8B0000] mb-6 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#8B0000] block">
                NHỮNG TẤM GƯƠNG ANH DŨNG GẮN LIỀN:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStoryModal.heroes.map((hero, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#F6F0E4] border border-[#1A1615]/30 text-xs font-mono text-[#1A1615]">
                    {hero}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#ECE3D0]/50 border-l-4 border-[#1A1615] text-xs font-sans text-[#4A3E3D] mb-6">
              <span className="font-bold text-[#1A1615] uppercase block mb-1 font-mono">Ý NGHĨA LỊCH SỬ SÂU SẮC:</span>
              <p>{selectedStoryModal.significance}</p>
            </div>

            <div className="flex justify-end pt-4 hairline-t">
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="px-5 py-2 bg-[#1A1615] hover:bg-[#8B0000] text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
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
