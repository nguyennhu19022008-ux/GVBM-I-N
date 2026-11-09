import React from 'react';
import { GraduationCap, ArrowRight, Flame } from 'lucide-react';
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
  return (
    <div className="w-full flex flex-col bg-[#FAF8F1] text-[#0A1418] animate-fadeSlideUp">
      
      {/* Top Heritage Edition Publication Banner */}
      <div className="w-full py-2.5 px-6 md:px-12 xl:px-16 bg-[#F3EFE5]/70 text-xs font-mono text-[#687477] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#9C3B32] uppercase">SỐ XUÂN ĐỘC LẬP • 2026</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">CỔNG DI SẢN SỬ HỌC SỐ HÓA TOÀN DÂN</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>LƯU CHIỂU: THPT QUỐC GIA 2026</span>
          <span>•</span>
          <span className="text-[#9C3B32] font-bold">GIÁO DỤC PHI THƯƠNG MẠI</span>
        </div>
      </div>

      {/* Main Masthead Headline */}
      <section className="w-full pt-12 pb-8 px-6 md:px-12 xl:px-16 text-center relative overflow-hidden">
        {/* Subtle atmospheric background blend */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-8 mix-blend-multiply pointer-events-none image-blend-radial"
          style={{ backgroundImage: `url('/images/quang-truong-ba-dinh.jpg')` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 bg-[#0A1418] text-[#E5C985] text-xs font-mono font-bold uppercase tracking-widest rounded-xs">
            NHẬT BÁO SỬ HỌC VIỆT NAM • KHƠI NGUỒN YÊU NƯỚC
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-black text-[#0A1418] tracking-tight leading-none uppercase">
            ĐAM MÊ LỊCH SỬ
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-[#687477] max-w-3xl mx-auto">
            "Không gian số hóa bài giảng, tư liệu kháng chiến và hệ thống ôn luyện trắc nghiệm phân hóa bám sát chương trình Giáo dục Phổ thông mới."
          </p>
        </div>
      </section>

      {/* 7:5 Asymmetrical Hero Editorial Section with Organic Image Background Blend */}
      <section className="w-full py-12 lg:py-16 relative overflow-hidden">
        {/* Subtle ambient image blend in hero background */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none image-blend-hero hidden lg:block"
          style={{ backgroundImage: `url('/images/ba-dinh-1945.jpg')` }}
        />

        <div className="w-full px-6 md:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* Left 7 Columns: Declaration & Action Portal */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9C3B32] uppercase">
                <Flame className="w-4 h-4 text-[#9C3B32]" />
                <span>HÀO KHÍ NON SÔNG • ĐỘC LẬP TỰ DO</span>
              </div>

              <h2 className="font-playfair text-3xl sm:text-5xl font-black text-[#0A1418] leading-tight">
                Khắc Ghi Sử Việt, <br className="hidden sm:inline" />
                Vững Vàng Chinh Phục Điểm 10 THPT Quốc Gia.
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#687477] leading-relaxed">
                Đưa lịch sử vượt khỏi những trang vở khô khan. Hệ thống liên kết chặt chẽ giữa <strong>tiến trình thời gian</strong>, <strong>kho bài tập về nhà</strong>, <strong>đề thi chuẩn ma trận</strong> và <strong>phòng thi trắc nghiệm có giải thích tường tận</strong> cho từng phương án gây nhiễu.
              </p>

              {/* Grade Gateways: Open Organic Rows (No Hard Lines) */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-[#0A1418] uppercase tracking-wider block mb-2">
                  CHỌN KHỐI HỌC TẬP ĐỂ VÀO BÀI GIẢNG & ĐỀ THI:
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => onGoToGrade('10')}
                    className="w-full py-3 px-4 rounded-lg flex items-center justify-between text-left hover:bg-[#F3EFE5] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#9C3B32] w-16">KHỐI 10</span>
                      <span className="font-playfair text-base font-bold text-[#0A1418] group-hover:text-[#9C3B32] transition-colors">Lịch Sử & Văn Minh Nhân Loại (GDPT 2018)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9C3B32] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => onGoToGrade('11')}
                    className="w-full py-3 px-4 rounded-lg flex items-center justify-between text-left hover:bg-[#F3EFE5] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#9C3B32] w-16">KHỐI 11</span>
                      <span className="font-playfair text-base font-bold text-[#0A1418] group-hover:text-[#9C3B32] transition-colors">Việt Nam Cận Đại (1858 - 1918) & Thế Chiến II</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9C3B32] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => onGoToGrade('12')}
                    className="w-full py-3 px-4 rounded-lg bg-[#F3EFE5]/60 hover:bg-[#F3EFE5] flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#9C3B32] w-16">KHỐI 12 ★</span>
                      <span className="font-playfair text-base font-bold text-[#9C3B32]">Trọng Tâm Ôn Thi Tốt Nghiệp THPT Quốc Gia 2026</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9C3B32] opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>

              {/* Direct CTA Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onGoToLearning}
                  className="px-6 py-3.5 bg-[#9C3B32] hover:bg-[#7A2820] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-2 rounded-xs"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Vào Giảng Đường Học Tập & Tương Tác</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Iconic Archival Plate (Blending into Background, yet Standing Out) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative group">
                <div className="overflow-hidden rounded-xl image-standout bg-[#F3EFE5]">
                  <img
                    src="/images/ba-dinh-1945.jpg"
                    alt="Quảng trường Ba Đình lịch sử năm 1945"
                    className="w-full aspect-4/3 object-cover contrast-105 hover:scale-102 transition-all duration-700"
                  />
                  <div className="p-4 bg-[#F3EFE5] text-left">
                    <span className="block text-[11px] font-mono font-bold text-[#9C3B32] uppercase">MỐC SON KHAI SINH NƯỚC VNDCCH</span>
                    <p className="text-xs sm:text-sm text-[#0A1418] font-serif italic mt-1 leading-relaxed">
                      Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình chiều ngày 2/9/1945.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Quick Metrics (No Harsh Border Lines, Pure Air and Clarity) */}
              <div className="grid grid-cols-2 gap-6 text-left pt-2">
                <div>
                  <span className="block font-mono text-3xl font-black text-[#9C3B32]">03 KHỐI</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase">10 · 11 · 12 Chuẩn SGK</span>
                </div>
                <div>
                  <span className="block font-mono text-3xl font-black text-[#C69A47]">150+ MỐC</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase">Niên đại & Sự kiện</span>
                </div>
                <div>
                  <span className="block font-mono text-3xl font-black text-[#0A1418]">100% FREE</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase">Tải file mở tự do</span>
                </div>
                <div>
                  <span className="block font-mono text-3xl font-black text-[#486D5D]">GIẢI THÍCH</span>
                  <span className="text-[11px] text-[#687477] font-mono uppercase">Chuẩn ma trận đề thi</span>
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
