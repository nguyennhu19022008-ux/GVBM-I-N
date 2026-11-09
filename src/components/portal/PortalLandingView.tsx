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
    <div className="w-full flex flex-col bg-[#F6F0E4] text-[#1A1615] animate-fadeSlideUp">
      
      {/* Broadsheet Newspaper Top Publication Banner */}
      <div className="w-full py-2.5 px-6 md:px-12 xl:px-16 bg-[#ECE3D0] hairline-b text-xs font-mono text-[#4A3E3D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#8B0000] uppercase">SỐ XUÂN ĐỘC LẬP • 2026</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">CỔNG THÔNG TIN SỬ HỌC SỐ HÓA TOÀN DÂN</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>LƯU CHIỂU: THPT QUỐC GIA 2026</span>
          <span>•</span>
          <span className="text-[#8B0000] font-bold">GIÁO DỤC PHI THƯƠNG MẠI</span>
        </div>
      </div>

      {/* Main Newspaper Masthead Headline */}
      <section className="w-full pt-10 pb-8 px-6 md:px-12 xl:px-16 text-center broadsheet-double-b">
        <div className="max-w-5xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 bg-[#8B0000] text-white text-xs font-mono font-bold uppercase tracking-widest">
            NHẬT BÁO SỬ HỌC VIỆT NAM • KHƠI NGUỒN YÊU NƯỚC
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-black text-[#1A1615] tracking-tight leading-none uppercase">
            ĐAM MÊ LỊCH SỬ
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-[#4A3E3D] max-w-3xl mx-auto">
            "Không gian số hóa bài giảng, tư liệu kháng chiến và hệ thống ôn luyện trắc nghiệm phân hóa bám sát chương trình Giáo dục Phổ thông mới."
          </p>
        </div>
      </section>

      {/* 7:5 Asymmetrical Hero Editorial Section */}
      <section className="w-full py-12 lg:py-16 hairline-b">
        <div className="w-full px-6 md:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* Left 7 Columns: Declaration & Action Portal */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8B0000] uppercase">
                <Flame className="w-4 h-4 text-[#8B0000]" />
                <span>HÀO KHÍ NON SÔNG • ĐỘC LẬP TỰ DO</span>
              </div>

              <h2 className="font-playfair text-3xl sm:text-5xl font-black text-[#1A1615] leading-tight">
                Khắc Ghi Sử Việt, <br className="hidden sm:inline" />
                Vững Vàng Chinh Phục Điểm 10 THPT Quốc Gia.
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#4A3E3D] leading-relaxed">
                Đưa lịch sử vượt khỏi những trang vở khô khan. Hệ thống liên kết chặt chẽ giữa <strong>tiến trình thời gian</strong>, <strong>kho bài tập về nhà</strong>, <strong>đề thi chuẩn ma trận</strong> và <strong>phòng thi trắc nghiệm có giải thích tường tận</strong> cho từng phương án gây nhiễu.
              </p>

              {/* Grade Gateways: 3 Quick Jumps */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-[#1A1615] uppercase tracking-wider block">
                  CHỌN KHỐI HỌC TẬP ĐỂ VÀO BÀI GIẢNG & ĐỀ THI:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => onGoToGrade('10')}
                    className="p-3.5 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] text-left transition-all paper-lift cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#3D4A3E] uppercase block">GDPT 2018</span>
                    <h4 className="font-playfair text-base font-bold text-[#1A1615] group-hover:text-[#8B0000]">Khối 10</h4>
                    <p className="text-[11px] text-[#4A3E3D] mt-1 line-clamp-1">Văn minh Cổ - Trung đại</p>
                  </button>

                  <button
                    onClick={() => onGoToGrade('11')}
                    className="p-3.5 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] text-left transition-all paper-lift cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#3D4A3E] uppercase block">CẬN - HIỆN ĐẠI</span>
                    <h4 className="font-playfair text-base font-bold text-[#1A1615] group-hover:text-[#8B0000]">Khối 11</h4>
                    <p className="text-[11px] text-[#4A3E3D] mt-1 line-clamp-1">1858 - Thế chiến II</p>
                  </button>

                  <button
                    onClick={() => onGoToGrade('12')}
                    className="p-3.5 bg-white border-2 border-[#8B0000] bg-red-50/30 text-left transition-all paper-lift cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#8B0000] uppercase block">ÔN THI TN THPT</span>
                    <h4 className="font-playfair text-base font-bold text-[#8B0000]">Khối 12 ★</h4>
                    <p className="text-[11px] text-[#4A3E3D] mt-1 line-clamp-1">1919 - Đổi Mới 1986</p>
                  </button>
                </div>
              </div>

              {/* Direct CTA Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onGoToLearning}
                  className="px-6 py-3.5 bg-[#8B0000] hover:bg-[#5E0000] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Vào Giảng Đường Học Tập & Tương Tác</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Iconic Archival Frame (Ba Đình 1945) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="archival-newspaper-frame">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"
                  alt="Quảng trường Ba Đình lịch sử năm 1945"
                  className="w-full aspect-4/3 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="p-3 bg-[#ECE3D0]/60 text-left">
                  <span className="block text-[11px] font-mono font-bold text-[#8B0000] uppercase">MỐC SON KHAI SINH NƯỚC VNDCCH</span>
                  <p className="text-xs text-[#1A1615] font-serif italic mt-0.5">
                    Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2/9/1945.
                  </p>
                </div>
              </div>

              {/* 4 Quick Metrics in Broadsheet Style */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-white border border-[#1A1615]/20">
                  <span className="block font-mono text-2xl font-black text-[#8B0000]">03 KHỐI</span>
                  <span className="text-[11px] text-[#4A3E3D] font-mono uppercase">10 · 11 · 12 Chuẩn SGK</span>
                </div>
                <div className="p-3 bg-white border border-[#1A1615]/20">
                  <span className="block font-mono text-2xl font-black text-[#C59B27]">150+ MỐC</span>
                  <span className="text-[11px] text-[#4A3E3D] font-mono uppercase">Niên đại & Sự kiện</span>
                </div>
                <div className="p-3 bg-white border border-[#1A1615]/20">
                  <span className="block font-mono text-2xl font-black text-[#1A1615]">100% FREE</span>
                  <span className="text-[11px] text-[#4A3E3D] font-mono uppercase">Tải file mở tự do</span>
                </div>
                <div className="p-3 bg-white border border-[#1A1615]/20">
                  <span className="block font-mono text-2xl font-black text-[#8B0000]">GIẢI THÍCH</span>
                  <span className="text-[11px] text-[#4A3E3D] font-mono uppercase">Chuẩn ma trận đề thi</span>
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
