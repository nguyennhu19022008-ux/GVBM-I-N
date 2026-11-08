import React from 'react';
import { BookOpen, ShieldCheck, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onOpenCopyright: () => void;
  onNavigateTab: (tab: 'timeline' | 'downloads' | 'quiz' | 'all') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCopyright, onNavigateTab, onScrollToSection }) => {
  return (
    <footer className="bg-[#4A2508] text-[#FAF3E0] pt-16 pb-12 border-t-2 border-[#D4A373] text-left w-full">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Quote Banner */}
        <div className="mb-14 p-8 sm:p-10 rounded-sm bg-[#321905]/85 border border-[#D4A373]/40 text-center relative overflow-hidden shadow-md">
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="font-playfair text-2xl sm:text-3xl md:text-4xl italic text-[#FAF3E0] leading-relaxed">
              "Dân ta phải biết sử ta, <br className="sm:hidden" />
              Cho tường gốc tích nước nhà Việt Nam"
            </p>
            <span className="block mt-4 text-xs sm:text-sm font-mono text-[#D4A373] uppercase tracking-widest font-bold">
              — CHỦ TỊCH HỒ CHÍ MINH (TÁC PHẨM "LỊCH SỬ NƯỚC TA", NĂM 1942)
            </span>
          </div>
        </div>

        {/* 16:9 Full-Bleed Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 hairline-b">
          
          {/* Col 1 (5 Columns): Brand Info & Value */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-sm bg-[#780000] border border-[#D4A373] flex items-center justify-center text-[#FAF3E0] shadow">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-cinzel text-2xl font-black text-white tracking-tight">
                ĐAM MÊ LỊCH SỬ
              </span>
            </div>

            <p className="text-sm text-[#FAF3E0]/85 leading-relaxed font-sans max-w-md">
              Kho tri thức số hóa, bài giảng điện tử và nền tảng trắc nghiệm trực quan phục vụ học tập, bồi dưỡng lòng yêu nước và chinh phục kỳ thi Tốt nghiệp THPT Quốc gia cho học sinh Khối 11 & Khối 12.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenCopyright}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-black/70 hover:bg-black border border-white/60 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span>GIẤY CHỨNG NHẬN BẢN QUYỀN (PAGE 0)</span>
              </button>
            </div>
          </div>

          {/* Col 2 (3 Columns): Navigation Links */}
          <div className="md:col-span-3 space-y-3.5 font-sans text-sm">
            <h4 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">
              Chuyên Mục Cốt Lõi
            </h4>
            <ul className="space-y-2.5 text-[#FAF3E0]/85">
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('timeline');
                    onScrollToSection('timeline-section');
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  01. Trục Thời Gian Tương Tác 16:9
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('downloads');
                    onScrollToSection('downloads-section');
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  02. Kho Slide PowerPoint & Đề Cương FREE
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('quiz');
                    onScrollToSection('quiz-section');
                  }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  03. Luyện Thi Trắc Nghiệm THPT 11 & 12
                </button>
              </li>
              <li>
                <span className="text-[#D4A373] text-xs font-mono">
                  Định hướng tên miền: dammelichsu.*
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3 (4 Columns): Contact & Non-commercial notice */}
          <div className="md:col-span-4 space-y-3.5 text-sm">
            <h4 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">
              Thông Tin Liên Hệ & Sở Hữu
            </h4>
            
            <div className="space-y-2.5 text-xs font-mono text-[#FAF3E0]/90">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="mailto:nguyennhu19022008@gmail.com" className="hover:underline text-white font-medium">
                  nguyennhu19022008@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="tel:0876637806" className="hover:underline text-white font-bold text-base">
                  0876637806
                </a>
              </div>

              <div className="pt-2 text-[11px] text-[#FAF3E0]/75 leading-relaxed font-sans">
                Dự án phát triển với tinh thần phi thương mại, phụng sự cộng đồng giáo dục và các thế hệ học sinh Việt Nam.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#FAF3E0]/70 gap-4">
          <div>
            © 2026 ĐAM MÊ LỊCH SỬ. TẤT CẢ CÁC QUYỀN ĐƯỢC BẢO LƯU.
          </div>

          <div className="flex items-center gap-2.5 font-mono">
            <span>THIẾT KẾ ĐỘC BẢN:</span>
            <span className="px-2.5 py-0.5 bg-white text-black font-black uppercase text-[11px] shadow">
              DESIGN BY VUONGGIA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
