import React from 'react';
import { BookOpen, Mail, Phone } from 'lucide-react';
import type { PortalView } from './Navbar';
import { TEACHER_DATA } from '../data/teacherData';

interface FooterProps {
  onNavigateView: (view: PortalView) => void;
  onSelectGrade?: (grade: '10' | '11' | '12') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateView, onSelectGrade }) => {
  return (
    <footer className="bg-[#1A1615] text-[#F6F0E4] pt-14 pb-12 broadsheet-double-t text-left w-full">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Quote Banner: Bác Hồ */}
        <div className="mb-12 p-8 sm:p-10 bg-[#251F1D] border border-[#C59B27]/40 text-center relative overflow-hidden shadow-md">
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="font-playfair text-2xl sm:text-3xl md:text-4xl italic text-[#F6F0E4] leading-relaxed">
              "Dân ta phải biết sử ta, <br className="sm:hidden" />
              Cho tường gốc tích nước nhà Việt Nam"
            </p>
            <span className="block mt-4 text-xs sm:text-sm font-mono text-[#C59B27] uppercase tracking-widest font-bold">
              — CHỦ TỊCH HỒ CHÍ MINH (TÁC PHẨM "LỊCH SỬ NƯỚC TA", NĂM 1942)
            </span>
          </div>
        </div>

        {/* 16:9 Broadsheet Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 hairline-b">
          
          {/* Col 1 (5 Columns): Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#8B0000] border border-[#C59B27] flex items-center justify-center text-[#F6F0E4] shadow">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-playfair text-2xl font-black text-white tracking-tight uppercase">
                ĐAM MÊ LỊCH SỬ
              </span>
            </div>

            <p className="text-sm text-[#F6F0E4]/85 leading-relaxed font-sans max-w-md">
              Cổng thông tin số hóa bài giảng, tư liệu kháng chiến và hệ thống luyện thi trắc nghiệm trực quan phục vụ học tập, bồi dưỡng lòng yêu nước và chinh phục kỳ thi Tốt nghiệp THPT Quốc gia cho học sinh Khối 10, Khối 11 & Khối 12.
            </p>

            <div className="p-3 bg-[#251F1D] border border-white/10 text-xs font-mono text-[#C59B27]">
              <span>CHỦ NHIỆM: {TEACHER_DATA.name.toUpperCase()}</span>
              <span className="block text-white/70 text-[11px] mt-0.5">{TEACHER_DATA.school}</span>
            </div>
          </div>

          {/* Col 2 (3 Columns): Direct Navigation */}
          <div className="md:col-span-3 space-y-3.5 font-sans text-sm">
            <h4 className="font-mono text-xs font-bold text-[#C59B27] uppercase tracking-wider">
              3 Phân Hệ Chính
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigateView('portal')}
                  className="text-[#F6F0E4]/80 hover:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                >
                  <span>01. Cổng Kết Nối & Ký Ức</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('learning')}
                  className="text-[#F6F0E4]/80 hover:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                >
                  <span>02. Giảng Đường Khối 10 - 11 - 12</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('admin')}
                  className="text-[#F6F0E4]/80 hover:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                >
                  <span>03. Bàn Quản Trị Giáo Viên</span>
                </button>
              </li>
              {onSelectGrade && (
                <li className="pt-2 flex items-center gap-2 text-[11px] text-[#C59B27]">
                  <span>Vào lớp:</span>
                  <button onClick={() => onSelectGrade('10')} className="hover:underline cursor-pointer">Khối 10</button>
                  <span>•</span>
                  <button onClick={() => onSelectGrade('11')} className="hover:underline cursor-pointer">Khối 11</button>
                  <span>•</span>
                  <button onClick={() => onSelectGrade('12')} className="hover:underline cursor-pointer font-bold">Khối 12</button>
                </li>
              )}
              <li className="pt-1 text-[11px] text-[#F6F0E4]/50">
                Tên miền dự kiến: dammelichsu.*
              </li>
            </ul>
          </div>

          {/* Col 3 (4 Columns): Contact & Pedagogy */}
          <div className="md:col-span-4 space-y-3.5 font-sans text-sm">
            <h4 className="font-mono text-xs font-bold text-[#C59B27] uppercase tracking-wider">
              Thông Tin Liên Hệ & Tư Vấn
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${TEACHER_DATA.email}`}
                className="flex items-center gap-2 text-[#F6F0E4]/80 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span className="truncate">{TEACHER_DATA.email}</span>
              </a>
              <a
                href={`tel:${TEACHER_DATA.phone}`}
                className="flex items-center gap-2 text-[#F6F0E4]/80 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span>{TEACHER_DATA.phone} (Hotline / Zalo)</span>
              </a>
            </div>
            <p className="text-[11px] text-[#F6F0E4]/60 leading-relaxed pt-2">
              Dự án giáo dục phát triển với tinh thần phi thương mại, phụng sự cộng đồng học sinh và giáo viên Lịch sử trên toàn quốc.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F6F0E4]/60 text-center sm:text-left">
          <p>© 2026 ĐAM MÊ LỊCH SỬ. TẤT CẢ CÁC QUYỀN ĐƯỢC BẢO LƯU.</p>
          <div className="flex items-center gap-2">
            <span>THIẾT KẾ & VẬN HÀNH:</span>
            <span className="px-2 py-0.5 bg-[#251F1D] text-[#C59B27] border border-[#C59B27]/40 font-bold">
              NGUYỄN VƯƠNG GIA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
