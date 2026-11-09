import React, { useState } from 'react';
import { Flame, ChevronRight, X, Shield } from 'lucide-react';
import { WARTIME_STORIES, HISTORICAL_LEADERS } from '../../data/storiesData';
import type { WartimeStory, LeaderProfile } from '../../data/storiesData';
import { LeadersGalleryModal } from './LeadersGalleryModal';

export const WartimeStoriesSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<WartimeStory | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  const leadStory = WARTIME_STORIES[0]; // Điện Biên Phủ
  const otherStories = WARTIME_STORIES.slice(1);

  return (
    <section className="w-full py-12 lg:py-16 hairline-b bg-[#F6F0E4]">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 broadsheet-double-b text-left">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1.5">
              <Flame className="w-4 h-4 text-[#8B0000]" />
              <span>KÝ ỨC CHIẾN TRƯỜNG & KHÚC HÙNG CA DÂN TỘC</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
              Những Mẩu Chuyện Kháng Chiến Bất Tử
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#4A3E3D] max-w-md italic">
            "Mỗi tấc đất của dải đất hình chữ S hôm nay đều thấm đượm mồ hôi, nước mắt và máu của những thế hệ cha ông đã ngã xuống vì nền độc lập."
          </p>
        </div>

        {/* 7:5 Asymmetrical Broadsheet Layout for Wartime Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start mb-16 text-left">
          
          {/* Left Lead Feature Story (7 Columns) */}
          <div 
            onClick={() => setSelectedStory(leadStory)}
            className="lg:col-span-7 p-6 sm:p-8 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] transition-all cursor-pointer paper-lift relative group"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-4 pb-2 hairline-b">
              <span className="font-bold text-[#8B0000] uppercase">TIN TIÊU ĐIỂM SỐ 01 • NĂM {leadStory.year}</span>
              <span className="text-[#4A3E3D]">{leadStory.period}</span>
            </div>

            <div className="archival-newspaper-frame mb-6">
              <img
                src={leadStory.imageUrl}
                alt={leadStory.title}
                className="w-full aspect-16/9 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <p className="text-[11px] font-mono text-[#4A3E3D] mt-2 italic px-1">
                {leadStory.imageCaption}
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-[#C59B27] uppercase tracking-wider block mb-1">
              {leadStory.tagline}
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#1A1615] group-hover:text-[#8B0000] transition-colors leading-tight mb-3">
              {leadStory.title}
            </h3>

            <p className="font-serif italic text-sm text-[#8B0000] mb-3">
              {leadStory.quote}
            </p>

            <p className="font-sans text-sm text-[#4A3E3D] leading-relaxed line-clamp-3 mb-4">
              {leadStory.excerpt}
            </p>

            <div className="flex items-center justify-between pt-3 hairline-t text-xs font-mono">
              <span className="text-[#4A3E3D]">BẤM ĐỂ ĐỌC TRỌN VẸN HỒ SƠ CHIẾN DỊCH</span>
              <span className="font-bold text-[#8B0000] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>ĐỌC BÁO</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Right Column: 3 Stories in Vertical Broadsheet Strip (5 Columns) */}
          <div className="lg:col-span-5 space-y-5">
            {otherStories.map((story, idx) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="p-5 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] transition-all cursor-pointer paper-lift group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="font-bold text-[#8B0000]">MẨU CHUYỆN SỐ 0{idx + 2} • {story.year}</span>
                  <span className="text-[#4A3E3D] truncate max-w-[160px]">{story.period}</span>
                </div>

                <h4 className="font-playfair text-lg font-bold text-[#1A1615] group-hover:text-[#8B0000] transition-colors leading-snug mb-2">
                  {story.title}
                </h4>

                <p className="font-sans text-xs text-[#4A3E3D] line-clamp-2 leading-relaxed mb-3">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 hairline-t text-[11px] font-mono text-[#8B0000]">
                  <span className="font-semibold">{story.heroes[0]}</span>
                  <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>XEM CHI TIẾT</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Leaders Section: Chân Dung Lãnh Tụ & Người Lãnh Đạo Tiền Bối */}
        <div className="pt-10 hairline-t text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1">
                <Shield className="w-4 h-4 text-[#C59B27]" />
                <span>CHÂN DUNG LÃNH TỤ & KIẾN TRÚC SƯ ĐỘC LẬP</span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#1A1615]">
                Những Người Con Ưu Tú Của Dân Tộc
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-[#4A3E3D]">
              NHẤP ĐỂ XEM HỒ SƠ DANH NHÂN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HISTORICAL_LEADERS.map((leader) => (
              <div
                key={leader.id}
                onClick={() => setSelectedLeader(leader)}
                className="p-4 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] transition-all cursor-pointer paper-lift group"
              >
                <div className="archival-newspaper-frame mb-3.5">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full aspect-4/5 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <span className="block text-[10px] font-mono font-bold text-[#8B0000] uppercase tracking-wider mb-1">
                  {leader.lifespan}
                </span>

                <h4 className="font-playfair text-base font-bold text-[#1A1615] group-hover:text-[#8B0000] transition-colors leading-snug mb-1">
                  {leader.name}
                </h4>

                <p className="text-xs text-[#4A3E3D] line-clamp-2 font-serif italic mb-3">
                  "{leader.quote}"
                </p>

                <div className="pt-2 hairline-t flex items-center justify-between text-[11px] font-mono text-[#8B0000]">
                  <span>HỒ SƠ CỐNG HIẾN</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal 1: Full-Screen Wartime Story Reader */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-fadeSlideUp"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F6F0E4] border-2 border-[#1A1615] shadow-2xl p-6 sm:p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 broadsheet-double-b">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase">
                <span>KÝ ỨC CHIẾN TRANH • NĂM {selectedStory.year}</span>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="w-8 h-8 rounded-full border border-[#1A1615]/30 hover:border-[#1A1615] hover:bg-[#8B0000] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Đóng mẩu chuyện"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <span className="text-xs font-mono font-bold text-[#C59B27] uppercase tracking-wider block mb-1">
              {selectedStory.tagline}
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#1A1615] mb-2">
              {selectedStory.title}
            </h3>
            <p className="font-serif italic text-sm text-[#8B0000] mb-6">
              {selectedStory.quote}
            </p>

            <div className="archival-newspaper-frame mb-6">
              <img
                src={selectedStory.imageUrl}
                alt={selectedStory.title}
                className="w-full aspect-16/9 object-cover grayscale"
              />
              <p className="text-xs font-mono text-[#4A3E3D] mt-2 italic px-1">
                {selectedStory.imageCaption}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#1A1615] leading-relaxed mb-6 font-serif">
              {selectedStory.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Heroes */}
            <div className="p-4 bg-[#ECE3D0]/60 border border-[#1A1615]/20 mb-6 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#8B0000] block">
                NHỮNG TẤM GƯƠNG ANH DŨNG GẮN LIỀN:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStory.heroes.map((hero, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white border border-[#1A1615]/20 text-xs font-mono text-[#1A1615]">
                    {hero}
                  </span>
                ))}
              </div>
            </div>

            {/* Significance */}
            <div className="p-4 bg-white border border-[#1A1615]/20 text-xs font-sans text-[#4A3E3D] mb-6">
              <span className="font-bold text-[#1A1615] uppercase block mb-1 font-mono">Ý NGHĨA LỊCH SỬ SÂU SẮC:</span>
              <p>{selectedStory.significance}</p>
            </div>

            <div className="flex justify-end pt-4 hairline-t">
              <button
                onClick={() => setSelectedStory(null)}
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
