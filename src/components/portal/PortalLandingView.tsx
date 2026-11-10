import React from 'react';
import { GraduationCap, ArrowRight, Flame, Clock } from 'lucide-react';
import { TeacherProfileSection } from './TeacherProfileSection';
import { WartimeStoriesSection } from './WartimeStoriesSection';
import { TimelineSection } from '../TimelineSection';
import type { TimelineEvent } from '../../data/historyData';

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
      {/* PAGE 1: REFINED UNIFIED HERO EDITORIAL SECTION (GỌN GÀNG, ĐĨNH ĐẠC, MẠCH LẠC) */}
      {/* ========================================================================= */}
      <section className="w-full pt-10 pb-16 lg:pt-14 lg:pb-22 relative overflow-hidden text-left">
        {/* Prominent Historical Rally Photo in Background */}
        <div 
          className="absolute inset-0 bg-cover bg-right lg:bg-center opacity-25 lg:opacity-30 mix-blend-multiply pointer-events-none select-none filter contrast-120"
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A1418] text-[#E5C985] text-xs font-mono font-bold uppercase tracking-wider rounded-md shadow-2xs">
                  <Flame className="w-3.5 h-3.5 text-[#9C3B32]" />
                  <span>NHẬT BÁO SỬ HỌC VIỆT NAM</span>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 bg-[#F3EFE5] text-[#9C3B32] text-xs font-mono font-bold uppercase rounded-md">
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

              {/* 3 Horizontal Gateways (Bộ 3 Cổng Khối Lớp Nằm Ngang Gọn Gàng) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0A1418] uppercase tracking-wider">
                    CHỌN KHỐI HỌC TẬP ĐỂ VÀO BÀI GIẢNG & ĐỀ THI:
                  </span>
                  <span className="text-[11px] font-mono text-[#9C3B32] font-semibold hidden sm:inline">
                    1 CHẠM VÀO LỚP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Khối 10 */}
                  <button
                    onClick={() => onGoToGrade('10')}
                    className="p-3.5 rounded-xl bg-[#F3EFE5]/75 hover:bg-[#F3EFE5] text-left transition-all cursor-pointer group shadow-2xs hover:shadow-xs border border-transparent hover:border-[#0A1418]/10"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-[#9C3B32]">KHỐI 10</span>
                      <span className="text-[10px] text-[#687477]">GDPT 2018</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0A1418] group-hover:text-[#9C3B32] transition-colors leading-tight">
                      Văn Minh Nhân Loại
                    </h3>
                    <p className="text-[11px] text-[#687477] mt-1 line-clamp-1">
                      Nhập môn & Nền văn minh
                    </p>
                  </button>

                  {/* Khối 11 */}
                  <button
                    onClick={() => onGoToGrade('11')}
                    className="p-3.5 rounded-xl bg-[#F3EFE5]/75 hover:bg-[#F3EFE5] text-left transition-all cursor-pointer group shadow-2xs hover:shadow-xs border border-transparent hover:border-[#0A1418]/10"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-[#9C3B32]">KHỐI 11</span>
                      <span className="text-[10px] text-[#687477]">1858 — 1945</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0A1418] group-hover:text-[#9C3B32] transition-colors leading-tight">
                      Cận Đại & Thế Chiến II
                    </h3>
                    <p className="text-[11px] text-[#687477] mt-1 line-clamp-1">
                      Kháng Pháp & Cần Vương
                    </p>
                  </button>

                  {/* Khối 12 ★ */}
                  <button
                    onClick={() => onGoToGrade('12')}
                    className="p-3.5 rounded-xl bg-[#F3EFE5] hover:bg-[#EAE4D5] text-left transition-all cursor-pointer group shadow-xs hover:shadow-md ring-1 ring-[#9C3B32]/30 relative"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-[#9C3B32]">KHỐI 12 ★</span>
                      <span className="text-[9px] font-bold bg-[#9C3B32] text-white px-1.5 py-0.2 rounded">ÔN THI</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#9C3B32] transition-colors leading-tight">
                      Trọng Tâm THPT 2026
                    </h3>
                    <p className="text-[11px] text-[#0A1418]/70 mt-1 line-clamp-1">
                      1919 — Độc Lập & Đổi Mới
                    </p>
                  </button>
                </div>
              </div>

              {/* Action Buttons Group */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onGoToLearning}
                  className="px-6 py-3.5 bg-[#9C3B32] hover:bg-[#7A2820] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 rounded-xl active:scale-98"
                >
                  <GraduationCap className="w-4 h-4 text-[#E5C985]" />
                  <span>Vào Giảng Đường Khối 10 · 11 · 12</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5C985]" />
                </button>

                <button
                  onClick={scrollToTimeline}
                  className="px-5 py-3.5 bg-[#F3EFE5]/80 hover:bg-[#F3EFE5] text-[#0A1418] hover:text-[#9C3B32] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 rounded-xl shadow-2xs"
                >
                  <Clock className="w-4 h-4 text-[#9C3B32]" />
                  <span>Khám Phá Dòng Lịch Sử</span>
                </button>
              </div>

            </div>

            {/* Right 5 Columns: Archival Plate & 4 Balanced Key Stats */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Archival Plate (16:10 Ratio, Sleek & Elevated) */}
              <div className="rounded-2xl overflow-hidden image-standout bg-[#F3EFE5] shadow-xl group">
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src="/images/ba-dinh-1945.jpg"
                    alt="Quảng trường Ba Đình lịch sử năm 1945"
                    className="w-full h-full object-cover contrast-110 group-hover:scale-102 transition-all duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A1418]/85 text-[#E5C985] text-[10px] font-mono font-bold uppercase rounded-md backdrop-blur-xs">
                    MỐC SON 2/9/1945
                  </div>
                </div>

                <div className="p-4 bg-[#F3EFE5] text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#9C3B32] uppercase mb-1">
                    <span>KHAI SINH NƯỚC VNDCCH</span>
                    <span className="text-[#687477]">[ẢNH TƯ LIỆU GỐC]</span>
                  </div>
                  <p className="text-xs text-[#0A1418] leading-relaxed">
                    Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình chiều ngày 2/9/1945.
                  </p>
                </div>
              </div>

              {/* 4 Balanced Key Stats (Clean 2x2 Grid with Crisp Typography) */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-[#F3EFE5]/80 shadow-2xs">
                  <span className="block font-mono text-2xl lg:text-3xl font-black text-[#9C3B32]">03 KHỐI</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-0.5">10 · 11 · 12 Chuẩn SGK</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F3EFE5]/80 shadow-2xs">
                  <span className="block font-mono text-2xl lg:text-3xl font-black text-[#C69A47]">150+ MỐC</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-0.5">Niên Đại & Sự Kiện</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F3EFE5]/80 shadow-2xs">
                  <span className="block font-mono text-2xl lg:text-3xl font-black text-[#0A1418]">100% FREE</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-0.5">Mở Tự Do Toàn Dân</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F3EFE5]/80 shadow-2xs">
                  <span className="block font-mono text-2xl lg:text-3xl font-black text-[#486D5D]">ĂN ĐIỂM 8-10</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase block mt-0.5">Chuẩn Ma Trận Đề Thi</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Part 1.1: Teacher Profile Section */}
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
