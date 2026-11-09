import React, { useState } from 'react';
import { Mail, Phone, Award, CheckCircle2, ExternalLink, BookOpen } from 'lucide-react';
import { TEACHER_DATA } from '../../data/teacherData';

export const TeacherProfileSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section className="w-full py-14 lg:py-20 hairline-b bg-[#F0E9DA]">
      <div className="w-full px-6 md:px-12 xl:px-16 text-left">
        
        {/* Section Header: Broadsheet Feature Column */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 broadsheet-double-b">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1.5">
              <span>HỒ SƠ SƯ PHẠM</span>
              <span>•</span>
              <span>NGƯỜI TRUYỀN LỬA SỬ VIỆT</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
              Người Đồng Hành Cùng Bạn Qua Từng Mốc Son
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#4A3E3D] max-w-md italic">
            "Dạy Sử bằng trái tim người lính, truyền lửa bằng niềm tự hào của một người con đất Việt."
          </p>
        </div>

        {/* 4:8 Asymmetrical Editorial Grid (Cardless) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column (4 Cols): Large Portrait & Open Contact Lines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="archival-newspaper-frame relative group">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-full aspect-4/5 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="mt-2.5 pt-2 hairline-t flex items-center justify-between text-xs font-mono text-[#4A3E3D]">
                <span>ẢNH LƯU CHIỂU SƯ PHẠM</span>
                <span className="font-bold text-[#8B0000]">NIÊN KHÓA 2025 - 2026</span>
              </div>
            </div>

            {/* Open Contact Strip (No Card Box) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8B0000]" />
                <span>Liên Hệ Trực Tiếp Trao Đổi Bài Học:</span>
              </h4>

              {/* Email Row */}
              <div className="flex items-center justify-between py-2.5 hairline-b text-xs font-mono">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 text-[#8B0000] shrink-0" />
                  <span className="text-[#1A1615] truncate font-sans">{TEACHER_DATA.email}</span>
                </div>
                <button
                  onClick={() => handleCopy(TEACHER_DATA.email, 'email')}
                  className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-[#1A1615]/30 hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedType === 'email' ? 'ĐÃ CHÉP' : 'CHÉP'}
                </button>
              </div>

              {/* Phone / Zalo Row */}
              <div className="flex items-center justify-between py-2.5 hairline-b text-xs font-mono">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <span className="text-[#1A1615] font-bold">{TEACHER_DATA.phone}</span>
                  <span className="text-[10px] px-1 bg-[#1A1615] text-[#F6F0E4]">Zalo</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(TEACHER_DATA.phone, 'phone')}
                    className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-[#1A1615]/30 hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedType === 'phone' ? 'ĐÃ CHÉP' : 'CHÉP'}
                  </button>
                  <a
                    href={TEACHER_DATA.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#8B0000] text-white hover:bg-[#5E0000] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>NHẮN</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (8 Cols): Open Typography, Pullquote, Philosophy & Achievements */}
          <div className="lg:col-span-8 space-y-7">
            
            {/* Identity */}
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-[#8B0000] text-white text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                {TEACHER_DATA.school}
              </div>
              <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
                {TEACHER_DATA.name}
              </h3>
              <p className="text-sm sm:text-base font-serif italic text-[#8B0000] mt-1 font-semibold">
                {TEACHER_DATA.title}
              </p>
            </div>

            {/* Editorial Pull Quote */}
            <div className="pl-6 py-3 border-l-4 border-[#8B0000]">
              <p className="font-serif italic text-lg sm:text-xl text-[#1A1615] leading-relaxed">
                "{TEACHER_DATA.quote}"
              </p>
            </div>

            {/* Bio text */}
            <p className="font-sans text-sm sm:text-base text-[#4A3E3D] leading-relaxed">
              {TEACHER_DATA.bio}
            </p>

            {/* Principles of Teaching: Open rows with hairlines */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615]">
                Nguyên Tắc Giảng Dạy & Đồng Hành Sĩ Tử:
              </h4>
              <div className="space-y-2 text-sm text-[#1A1615]">
                {TEACHER_DATA.teachingPhilosophy.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-1.5 hairline-b">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Achievements: Open Ledger List (No Card Boxes) */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C59B27]" />
                <span>Thành Tích & Dấu Ấn Sư Phạm Nổi Bật:</span>
              </h4>

              <div className="divide-y divide-[#1A1615]/15 border-y border-[#1A1615]/20">
                {TEACHER_DATA.achievements.map((ach, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-[#8B0000] shrink-0">
                        [{ach.year}]
                      </span>
                      <h5 className="font-bold text-sm text-[#1A1615]">
                        {ach.title}
                      </h5>
                    </div>
                    <p className="text-xs text-[#4A3E3D] font-sans sm:max-w-md sm:text-right">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
