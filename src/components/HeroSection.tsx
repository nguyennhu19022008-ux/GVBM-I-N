import React from 'react';
import { ArrowRight, Compass, BookOpenCheck, Download, Award, Shield } from 'lucide-react';

interface HeroSectionProps {
  onExploreTimeline: () => void;
  onExploreDownloads: () => void;
  onStartQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTimeline,
  onExploreDownloads,
  onStartQuiz,
}) => {
  return (
    <section className="relative overflow-hidden hairline-b bg-[#FAF3E0] min-h-[calc(100dvh-5rem)] flex flex-col justify-between">
      
      {/* 16:9 Full-Bleed Main Container */}
      <div className="w-full px-6 md:px-12 xl:px-16 pt-10 pb-12 flex-1 flex flex-col justify-center">
        
        {/* Top Micro Historical Ribbon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-0.5 w-12 bg-[#780000]"></div>
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#780000]">
            NỀN TẢNG SỬ HỌC SỐ HÓA • LUYỆN THI THPT QUỐC GIA 2026
          </span>
          <div className="hidden lg:block h-px flex-1 bg-[#D4A373]/30"></div>
          <span className="hidden lg:inline-block font-mono text-xs text-[#4A2508]/70">
            DÀNH CHO HỌC SINH KHỐI 11 & KHỐI 12
          </span>
        </div>

        {/* 16:9 Asymmetrical Editorial Grid (7 : 5 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-18 items-center text-left">
          
          {/* Left Column (7 Columns): Monumental Typography & Vision */}
          <div className="lg:col-span-7">
            
            <h1 className="font-cinzel text-4xl sm:text-6xl xl:text-[4.75rem] font-black text-[#4A2508] leading-[1.08] tracking-tight">
              Khắc Ghi Sử Việt, <br />
              <span className="text-[#780000] italic font-playfair font-black">Chinh Phục Điểm 10</span> <br />
              Kỳ Thi THPT Quốc Gia.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#18120E]/85 font-sans leading-relaxed max-w-2xl">
              Không gian học tập lịch sử trực quan theo <strong className="text-[#4A2508] font-bold">tiến trình dòng thời gian tự nhiên</strong>. Tra cứu ngay bối cảnh - diễn biến - ý nghĩa từng mốc sự kiện, tải trọn bộ giáo án PowerPoint, đề cương và luyện đề trắc nghiệm phân hóa có giải thích chuyên sâu chuẩn ma trận Bộ Giáo dục & Đào tạo.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={onExploreTimeline}
                className="px-7 py-3.5 rounded-sm bg-[#4A2508] hover:bg-[#321905] text-[#FAF3E0] font-sans font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Compass className="w-5 h-5 text-[#D4A373]" />
                <span>Khám Phá Trục Thời Gian 16:9</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartQuiz}
                className="px-7 py-3.5 rounded-sm bg-[#780000] hover:bg-[#580000] text-white font-sans font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <BookOpenCheck className="w-5 h-5 text-[#F2E4C6]" />
                <span>Vào Phòng Luyện Thi Ngay</span>
              </button>

              <button
                onClick={onExploreDownloads}
                className="px-5 py-3.5 rounded-sm border border-[#4A2508]/40 hover:border-[#4A2508] text-[#4A2508] hover:bg-[#F2E4C6]/80 font-sans font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#780000]" />
                <span>Tài Liệu Mở 100% Free</span>
              </button>
            </div>

            {/* Micro Key Feature Badges */}
            <div className="mt-8 pt-6 border-t border-[#D4A373]/30 flex flex-wrap items-center gap-6 text-xs font-mono text-[#4A2508]/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#780000]" />
                <span>Học liệu chuẩn hóa SGK mới</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#780000]" />
                <span>Bộ câu hỏi phân hóa 8 - 9 - 10</span>
              </div>
            </div>

          </div>

          {/* Right Column (5 Columns): Archival Frame - Authentic Historical Image */}
          <div className="lg:col-span-5">
            <div className="archival-frame p-2.5 sm:p-3 shadow-md">
              <div className="relative aspect-4/3 w-full bg-stone-900 overflow-hidden">
                <img
                  src="/images/ba-dinh-1945.jpg"
                  alt="Quảng trường Ba Đình lịch sử năm 1945"
                  className="w-full h-full object-cover filter contrast-110 brightness-95"
                />
                
                {/* Year Badge on Archival Frame */}
                <div className="absolute top-3 left-3 bg-[#780000] text-white px-3 py-1 font-mono text-xs font-bold tracking-wider uppercase shadow-md">
                  TƯ LIỆU LỊCH SỬ VIỆT NAM
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-left">
                  <span className="font-mono text-xs text-[#D4A373] block mb-0.5">MỐC SON DÂN TỘC</span>
                  <p className="font-playfair text-sm sm:text-base font-bold leading-tight">
                    Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2/9/1945
                  </p>
                </div>
              </div>

              {/* Epoch Indicator Rail */}
              <div className="mt-2.5 px-3 py-2 bg-[#FAF3E0] border border-[#D4A373]/30 flex items-center justify-between text-[11px] font-mono text-[#4A2508]">
                <span>1858 • ĐẤU TRANH</span>
                <span className="text-[#D4A373]">→</span>
                <span className="font-bold text-[#780000]">1945 • ĐỘC LẬP</span>
                <span className="text-[#D4A373]">→</span>
                <span>1954 • ĐIỆN BIÊN PHỦ</span>
                <span className="text-[#D4A373]">→</span>
                <span>1975 • THỐNG NHẤT</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom 16:9 Full-Bleed Metrics Strip (Cardless Hairline Dividers) */}
      <div className="w-full hairline-t bg-[#F2E4C6]/60 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#4A2508]/15 text-left">
        
        <div className="px-6 md:px-12 py-5 sm:py-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-4xl sm:text-5xl font-black text-[#780000] leading-none">05</span>
            <span className="text-xs font-mono uppercase text-[#4A2508]/70 tracking-wider">Đại Phân Kỳ</span>
          </div>
          <span className="text-xs sm:text-sm text-[#18120E]/80 mt-1.5 block font-medium">
            Tiến trình lịch sử từ 1858 đến thời kỳ Đổi Mới & Quốc tế
          </span>
        </div>

        <div className="px-6 md:px-12 py-5 sm:py-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-4xl sm:text-5xl font-black text-[#4A2508] leading-none">150+</span>
            <span className="text-xs font-mono uppercase text-[#4A2508]/70 tracking-wider">Mốc Lịch Sử</span>
          </div>
          <span className="text-xs sm:text-sm text-[#18120E]/80 mt-1.5 block font-medium">
            Đầy đủ bối cảnh, diễn biến, ý nghĩa & mẹo thi THPT
          </span>
        </div>

        <div className="px-6 md:px-12 py-5 sm:py-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-4xl sm:text-5xl font-black text-[#780000] leading-none">100%</span>
            <span className="text-xs font-mono uppercase text-[#4A2508]/70 tracking-wider">Mở Công Khai</span>
          </div>
          <span className="text-xs sm:text-sm text-[#18120E]/80 mt-1.5 block font-medium">
            Tải trực tiếp giáo án Slide PPTX, đề cương Word & Mindmap
          </span>
        </div>

        <div className="px-6 md:px-12 py-5 sm:py-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-4xl sm:text-5xl font-black text-[#4A2508] leading-none">40+</span>
            <span className="text-xs font-mono uppercase text-[#4A2508]/70 tracking-wider">Đề Trắc Nghiệm</span>
          </div>
          <span className="text-xs sm:text-sm text-[#18120E]/80 mt-1.5 block font-medium">
            Có chấm điểm tự động & bảng giải thích chi tiết đúng/sai
          </span>
        </div>

      </div>

    </section>
  );
};
