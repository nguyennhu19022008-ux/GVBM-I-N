import React from 'react';
import { GraduationCap, ArrowRight, Flame, Clock } from 'lucide-react';
import { CinematicFilmstripReel } from './CinematicFilmstripReel';
import { TeacherProfileSection } from './TeacherProfileSection';
import { WartimeStoriesSection } from './WartimeStoriesSection';
import { TimelineSection } from '../TimelineSection';
import type { TimelineEvent } from '../../data/historyData';
import { useCinematicScroll } from '../../utils/useCinematicScroll';

interface PortalLandingViewProps {
  onGoToGrade: (grade: '10' | '11' | '12') => void;
  onGoToLearning: () => void;
  onSelectTimelineEvent: (event: TimelineEvent) => void;
  onGoToQuizByTopic: (quizId?: string) => void;
  onGoToDownloadByTopic: (resourceId?: string) => void;
}

export const PortalLandingView: React.FC<PortalLandingViewProps> = ({
  onGoToGrade,
  onGoToLearning,
  onSelectTimelineEvent,
  onGoToQuizByTopic,
  onGoToDownloadByTopic,
}) => {
  // Activate cinematic scroll animations, parallax & counter reveals
  useCinematicScroll();

  const scrollToTimeline = () => {
    const el = document.getElementById('timeline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#FAF8F1] text-[#0A1418] animate-fadeSlideUp relative">
      
      {/* Top Heritage Edition Publication Banner */}
      <div className="w-full py-2.5 px-6 md:px-12 xl:px-16 bg-[#F3EFE5]/90 text-xs font-mono text-[#687477] flex flex-wrap items-center justify-between gap-3 relative z-20">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#9C3B32] uppercase">SỐ XUÂN ĐỘC LẬP • 2026</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">CỔNG DI SẢN SỬ HỌC SỐ TOÀN DÂN</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>LƯU CHIỂU: THPT QUỐC GIA 2026</span>
          <span>•</span>
          <span className="text-[#9C3B32] font-bold">GIÁO DỤC PHI THƯƠNG MẠI</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 1: CARDLESS OPEN BROADSHEET HERO (KHÔNG BỌC CARD, GÓC VUÔNG DỨT KHOÁT) */}
      {/* ========================================================================= */}
      <section className="w-full pt-10 pb-16 lg:pt-14 lg:pb-20 relative overflow-hidden text-left">
        {/* Prominent Historical Rally Photo in Background with Cinematic Parallax */}
        <div 
          className="hero-bg-parallax absolute inset-0 bg-cover bg-right lg:bg-center opacity-25 lg:opacity-30 mix-blend-multiply pointer-events-none select-none filter contrast-120 will-change-transform"
          style={{ backgroundImage: `url('/images/ba-dinh-1945.jpg')` }}
        />
        {/* Editorial gradient scrim: luminous solid ink readability on the left, clear historic visual on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F1] via-[#FAF8F1]/92 to-[#FAF8F1]/35 lg:via-[#FAF8F1]/88 lg:to-transparent pointer-events-none" />
        
        {/* Large artistic watermark in background */}
        <div className="absolute right-6 -bottom-6 font-mono text-8xl sm:text-9xl font-black text-[#9C3B32]/5 select-none pointer-events-none tracking-tighter">
          1945
        </div>

        <div className="w-full px-6 md:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            
            {/* Left 7 Columns: Core Identity, Statement, 3 Horizontal Gateways & Action */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A1418] text-[#E5C985] text-xs font-mono font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#9C3B32]" />
                  <span>NHẬT BÁO SỬ HỌC VIỆT NAM</span>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 bg-[#F3EFE5] text-[#9C3B32] text-xs font-mono font-bold uppercase">
                  GDPT 2018 · THPT 2026
                </span>
              </div>

              {/* Monumental Unified Title */}
              <div>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-[#0A1418] tracking-tight leading-[1.05] uppercase">
                  ĐAM MÊ LỊCH SỬ
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#9C3B32] tracking-tight mt-2.5 leading-snug">
                  Khắc Ghi Sử Việt · Vững Vàng Điểm 10 THPT Quốc Gia
                </p>
                <p className="text-sm sm:text-base text-[#0A1418]/80 leading-relaxed font-normal max-w-2xl mt-3">
                  Cổng thông tin số hóa bài giảng, tư liệu kháng chiến và hệ thống luyện đề chuẩn ma trận Bộ GD&ĐT bám sát chương trình Giáo dục Phổ thông mới cho học sinh Khối 10, 11 và 12.
                </p>
              </div>

              {/* Cardless Open Editorial Gateways (Bộ 3 Khối Lớp Mở Hoàn Toàn, Không Hộp Card, Không Bo Góc) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0A1418] uppercase tracking-wider">
                    CHỌN KHỐI HỌC TẬP ĐỂ VÀO BÀI GIẢNG & ĐỀ THI:
                  </span>
                  <span className="text-[11px] font-mono text-[#9C3B32] font-semibold hidden sm:inline">
                    1 CHẠM VÀO LỚP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 text-left">
                  {/* Khối 10 */}
                  <button
                    onClick={() => onGoToGrade('10')}
                    className="text-left group cursor-pointer transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono mb-1">
                      <span className="font-bold text-[#9C3B32]">KHỐI 10</span>
                      <span className="text-[10px] text-[#687477]">· GDPT 2018</span>
                    </div>
                    <h3 className="font-bold text-base text-[#0A1418] group-hover:text-[#9C3B32] transition-colors leading-snug">
                      Văn Minh Nhân Loại
                    </h3>
                    <p className="text-xs text-[#687477] mt-1 font-sans">
                      Khởi nguồn & Nền văn minh nhân loại
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9C3B32] mt-2 group-hover:translate-x-1 transition-transform">
                      VÀO HỌC →
                    </span>
                  </button>

                  {/* Khối 11 */}
                  <button
                    onClick={() => onGoToGrade('11')}
                    className="text-left group cursor-pointer transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono mb-1">
                      <span className="font-bold text-[#9C3B32]">KHỐI 11</span>
                      <span className="text-[10px] text-[#687477]">· 1858 — 1945</span>
                    </div>
                    <h3 className="font-bold text-base text-[#0A1418] group-hover:text-[#9C3B32] transition-colors leading-snug">
                      Cận Đại & Thế Chiến II
                    </h3>
                    <p className="text-xs text-[#687477] mt-1 font-sans">
                      Kháng Pháp, Cần Vương & Cứu nước
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9C3B32] mt-2 group-hover:translate-x-1 transition-transform">
                      VÀO HỌC →
                    </span>
                  </button>

                  {/* Khối 12 ★ */}
                  <button
                    onClick={() => onGoToGrade('12')}
                    className="text-left group cursor-pointer transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono mb-1">
                      <span className="font-bold text-[#9C3B32]">KHỐI 12 ★</span>
                      <span className="text-[10px] font-bold text-[#9C3B32] uppercase">· TRỌNG TÂM THPT</span>
                    </div>
                    <h3 className="font-bold text-base text-[#9C3B32] transition-colors leading-snug">
                      Độc Lập & Đổi Mới
                    </h3>
                    <p className="text-xs text-[#0A1418]/80 mt-1 font-sans">
                      1919 — Kháng chiến & Ôn thi Quốc gia
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9C3B32] mt-2 group-hover:translate-x-1 transition-transform">
                      VÀO HỌC →
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons Group (Phẳng, góc vuông dứt khoát) */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onGoToLearning}
                  className="px-6 py-3.5 bg-[#9C3B32] hover:bg-[#7A2820] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-2 active:scale-98"
                >
                  <GraduationCap className="w-4 h-4 text-[#E5C985]" />
                  <span>Vào Giảng Đường Khối 10 · 11 · 12</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5C985]" />
                </button>

                <button
                  onClick={scrollToTimeline}
                  className="px-5 py-3.5 bg-transparent hover:bg-[#0A1418]/5 text-[#0A1418] hover:text-[#9C3B32] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[#9C3B32]" />
                  <span>Khám Phá Dòng Lịch Sử</span>
                </button>
              </div>

            </div>

            {/* Right 5 Columns: Archival Plate & 4 Open Key Stats */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Archival Documentary Photo (Pure Broadsheet Photo, Sắc Cạnh Góc Vuông, Không Bọc Card) */}
              <div className="space-y-2 text-left">
                <div className="relative aspect-16/10 overflow-hidden bg-stone-900 shadow-sm">
                  <img
                    src="/images/ba-dinh-1945.jpg"
                    alt="Quảng trường Ba Đình lịch sử năm 1945"
                    className="w-full h-full object-cover contrast-110 hover:scale-101 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A1418] text-[#E5C985] text-[10px] font-mono font-bold uppercase">
                    MỐC SON 2/9/1945
                  </div>
                </div>

                <div className="pt-1 text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#9C3B32] uppercase mb-1">
                    <span>KHAI SINH NƯỚC VNDCCH</span>
                    <span className="text-[#687477] font-normal">[ẢNH TƯ LIỆU GỐC]</span>
                  </div>
                  <p className="text-xs text-[#687477] font-sans leading-relaxed">
                    Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình chiều ngày 2/9/1945.
                  </p>
                </div>
              </div>

              {/* 4 Open Stats (Không Nhốt Trong Hộp Card, Để Mở Tự Do Với Số Lớn & GSAP Counter) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-y-5 gap-x-6 text-left pt-2">
                <div>
                  <span
                    className="stat-counter block font-mono text-3xl xl:text-4xl font-black text-[#9C3B32] leading-none"
                    data-target="3"
                    data-prefix="0"
                    data-suffix=" KHỐI"
                  >
                    03 KHỐI
                  </span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-1.5">10 · 11 · 12 Chuẩn SGK</span>
                </div>

                <div>
                  <span
                    className="stat-counter block font-mono text-3xl xl:text-4xl font-black text-[#C69A47] leading-none"
                    data-target="150"
                    data-suffix="+ MỐC"
                  >
                    150+ MỐC
                  </span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-1.5">Niên Đại & Sự Kiện</span>
                </div>

                <div>
                  <span
                    className="stat-counter block font-mono text-3xl xl:text-4xl font-black text-[#0A1418] leading-none"
                    data-target="100"
                    data-suffix="% FREE"
                  >
                    100% FREE
                  </span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-1.5">Mở Tự Do Toàn Dân</span>
                </div>

                <div>
                  <span className="block font-mono text-3xl xl:text-4xl font-black text-[#486D5D] leading-none">
                    ĂN ĐIỂM 8-10
                  </span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-1.5">Chuẩn Ma Trận Đề Thi</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Part 1.1: Cinematic Archival Filmstrip Reel (Dải hình chuyển động tư liệu lịch sử 1945 - 1975) */}
      <CinematicFilmstripReel onSelectEvent={onSelectTimelineEvent} />

      {/* Part 1.2: Teacher Profile Section */}
      <TeacherProfileSection />

      {/* Part 1.2: Wartime Stories & Historical Leaders */}
      <WartimeStoriesSection />

      {/* Part 1.3: Interactive Timeline Experience */}
      <TimelineSection
        onSelectEventDetail={onSelectTimelineEvent}
        onGoToQuiz={onGoToQuizByTopic}
        onGoToDownload={onGoToDownloadByTopic}
      />

    </div>
  );
};
