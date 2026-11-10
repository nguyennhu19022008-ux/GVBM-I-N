import React, { useState, useRef } from 'react';
import { Film, Play, Pause, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import type { TimelineEvent } from '../../data/historyData';
import { TIMELINE_EVENTS } from '../../data/historyData';

interface FilmstripFrame {
  id: string;
  year: string;
  exactDate?: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  caption: string;
  eventRefId?: string;
}

const ARCHIVAL_FRAMES: FilmstripFrame[] = [
  {
    id: 'frame-1945',
    year: '1945',
    exactDate: '02/09/1945',
    title: 'Tuyên Ngôn Độc Lập',
    subtitle: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa',
    imageUrl: '/images/ba-dinh-1945.jpg',
    caption: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử.',
    eventRefId: 'cach-mang-thang-tam-1945',
  },
  {
    id: 'frame-1954',
    year: '1954',
    exactDate: '07/05/1954',
    title: 'Chiến Thắng Điện Biên Phủ',
    subtitle: 'Lừng lẫy năm châu, chấn động địa cầu',
    imageUrl: '/images/dien-bien-phu-1954.jpg',
    caption: 'Lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm De Castries chiều 7/5/1954.',
    eventRefId: 'dien-bien-phu-1954',
  },
  {
    id: 'frame-1959',
    year: '1959',
    exactDate: '19/05/1959',
    title: 'Mở Tuyến Đường Trường Sơn',
    subtitle: 'Đoàn 559 xẻ dọc Trường Sơn đi cứu nước',
    imageUrl: '/images/duong-truong-son.jpg',
    caption: 'Đoàn xe vận tải vượt mưa bom bão đạn chi viện sức người sức của cho tiền tuyến.',
    eventRefId: 'dong-khoi-1960',
  },
  {
    id: 'frame-1968',
    year: '1968',
    exactDate: '30/01/1968',
    title: 'Tổng Tiến Công Tết Mậu Thân',
    subtitle: 'Đòn sấm sét đánh sập ý chí xâm lược của đế quốc',
    imageUrl: '/images/tet-mau-than-1968.jpg',
    caption: 'Cuộc tổng tiến công và nổi dậy đồng loạt tại khắp các đô thị miền Nam.',
    eventRefId: 'mau-than-1968',
  },
  {
    id: 'frame-1972',
    year: '1972',
    exactDate: '18 - 30/12/1972',
    title: 'Điện Biên Phủ Trên Không',
    subtitle: '12 ngày đêm rực lửa bảo vệ bầu trời Thủ đô',
    imageUrl: '/images/ha-noi-1972.jpg',
    caption: 'Quân dân Hà Nội bắn rơi pháo đài bay B-52, buộc Mỹ ký kết Hiệp định Paris.',
    eventRefId: 'dien-bien-phu-tren-khong-1972',
  },
  {
    id: 'frame-1973',
    year: '1973',
    exactDate: '27/01/1973',
    title: 'Ký Kết Hiệp Định Paris',
    subtitle: 'Thắng lợi trên bàn đàm phán, Mỹ rút quân',
    imageUrl: '/images/hiep-dinh-paris-1973.jpg',
    caption: 'Ký kết hiệp định chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam.',
    eventRefId: 'dien-bien-phu-tren-khong-1972',
  },
  {
    id: 'frame-1975',
    year: '1975',
    exactDate: '30/04/1975',
    title: 'Đại Thắng Mùa Xuân 1975',
    subtitle: 'Chiến dịch Hồ Chí Minh giải phóng miền Nam',
    imageUrl: '/images/giai-phong-1975.jpg',
    caption: 'Xe tăng 390 húc đổ cổng Dinh Độc Lập trưa 30/4/1975, giang sơn thu về một mối.',
    eventRefId: 'dai-thang-mua-xuan-1975',
  },
  {
    id: 'frame-1976',
    year: '1976',
    exactDate: 'Tháng 7/1976',
    title: 'Cột Cờ Hà Nội Tung Bay',
    subtitle: 'Nước Cộng hòa XHCN Việt Nam thống nhất',
    imageUrl: '/images/cot-co-ha-noi.jpg',
    caption: 'Lá cờ đỏ sao vàng kiêu hãnh trên đỉnh Cột cờ Hà Nội chào đón kỷ nguyên hòa bình.',
    eventRefId: 'dai-thang-mua-xuan-1975',
  },
];

interface CinematicFilmstripReelProps {
  onSelectEvent?: (event: TimelineEvent) => void;
}

export const CinematicFilmstripReel: React.FC<CinematicFilmstripReelProps> = ({ onSelectEvent }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicate frames array to create continuous seamless infinite loop
  const duplicatedFrames = [...ARCHIVAL_FRAMES, ...ARCHIVAL_FRAMES];

  const handleFrameClick = (frame: FilmstripFrame) => {
    if (onSelectEvent && frame.eventRefId) {
      const match = TIMELINE_EVENTS.find((e) => e.id === frame.eventRefId);
      if (match) {
        onSelectEvent(match);
      }
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#071216] text-[#FAF8F1] py-8 lg:py-12 relative overflow-hidden border-t border-b border-[#E5C985]/20 select-none">
      
      {/* Cinematic Ambient Background Lighting */}
      <div className="absolute inset-0 bg-radial from-[#10252B] via-[#071216] to-[#040D11] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-cover bg-center filter contrast-125"
        style={{ backgroundImage: `url('/images/quang-truong-ba-dinh.jpg')` }}
      />

      <div className="w-full px-6 md:px-12 xl:px-16 relative z-10">
        
        {/* Top Header of the Filmstrip Reel */}
        <div className="cinematic-scroll-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#E5C985] uppercase mb-1">
              <Film className="w-4 h-4 text-[#C69A47]" />
              <span>DẢI PHIM TƯ LIỆU QUỐC GIA 1945 — 1975</span>
              <span className="hidden sm:inline text-white/40">• 35MM ARCHIVAL REEL</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-black text-white tracking-tight">
              Biên Niên Sử Hình Ảnh Chiến Đấu & Khát Vọng Độc Lập
            </h3>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto font-mono text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 bg-[#14242A] hover:bg-[#9C3B32] text-[#E5C985] hover:text-white border border-[#E5C985]/30 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              title={isPlaying ? 'Tạm dừng chuyển động' : 'Tiếp tục chuyển động'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="uppercase text-[11px] font-bold">{isPlaying ? 'TẠM DỪNG' : 'CHUYỂN ĐỘNG'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => handleScroll('left')}
                className="w-8 h-8 bg-[#14242A] hover:bg-[#9C3B32] text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                title="Tua về trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-8 h-8 bg-[#14242A] hover:bg-[#9C3B32] text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                title="Tua tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 35MM CONTINUOUS CINEMATIC FILMSTRIP REEL CONTAINER                        */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-3">
        
        {/* Top 35mm Sprocket Perforations Track */}
        <div className="w-full h-3 filmstrip-sprockets opacity-40 mb-2 pointer-events-none" />

        {/* Scrollable Marquee Window */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div
            className={`animate-filmstrip flex gap-6 px-4 ${!isPlaying ? 'is-paused' : ''}`}
          >
            {duplicatedFrames.map((frame, index) => (
              <div
                key={`${frame.id}-${index}`}
                onClick={() => handleFrameClick(frame)}
                className="group relative w-72 sm:w-80 shrink-0 cursor-pointer bg-[#0A1418] border border-[#E5C985]/20 hover:border-[#E5C985] transition-all duration-300 text-left shadow-lg hover:-translate-y-1"
              >
                {/* Vintage Frame Corner Stamps */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#E5C985]/60 z-20 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#E5C985]/60 z-20 pointer-events-none" />

                {/* Photo Viewport */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-950">
                  <img
                    src={frame.imageUrl}
                    alt={frame.title}
                    className="w-full h-full object-cover grayscale-25 contrast-110 group-hover:grayscale-0 group-hover:scale-104 transition-all duration-500"
                    loading="lazy"
                  />
                  
                  {/* Year Timestamp Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0A1418]/90 text-[#E5C985] text-xs font-mono font-bold tracking-wider border border-[#E5C985]/40">
                    NĂM {frame.year}
                  </div>

                  {/* Hover Quick-Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-mono uppercase text-white font-bold backdrop-blur-2xs">
                    <Eye className="w-4 h-4 text-[#E5C985]" />
                    <span>MỞ HỒ SƠ LỊCH SỬ</span>
                  </div>
                </div>

                {/* Caption & Metadata Beneath Photo */}
                <div className="p-3.5 space-y-1 bg-[#0A1418]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#E5C985] uppercase">
                    <span>{frame.exactDate || frame.year}</span>
                    <span className="text-[#687477] font-semibold group-hover:text-[#E5C985] transition-colors">
                      CHI TIẾT →
                    </span>
                  </div>

                  <h4 className="font-playfair text-base font-bold text-white group-hover:text-[#E5C985] transition-colors line-clamp-1">
                    {frame.title}
                  </h4>

                  <p className="text-[11px] text-[#FAF8F1]/70 font-sans line-clamp-2 leading-relaxed">
                    {frame.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 35mm Sprocket Perforations Track */}
        <div className="w-full h-3 filmstrip-sprockets opacity-40 mt-2 pointer-events-none" />

      </div>

      {/* Bottom Sub-Ticker Bar */}
      <div className="w-full px-6 md:px-12 xl:px-16 pt-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#FAF8F1]/60">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C985]" />
          <span>Rà chuột vào ảnh để tạm dừng • Bấm vào khung hình để đọc toàn văn sự kiện</span>
        </div>
        <div className="hidden md:block">
          <span>NGUỒN ẢNH: TTXVN · VIỆN LỊCH SỬ QUÂN SỰ · LƯU TRỮ QUỐC GIA</span>
        </div>
      </div>

    </section>
  );
};
