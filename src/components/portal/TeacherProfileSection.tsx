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
    <section className="w-full py-16 lg:py-24 bg-[#F3EFE5] text-left relative overflow-hidden">
      {/* Prominent Architectural & Flag Tower Background Blend */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply pointer-events-none image-blend-radial select-none filter contrast-110"
        style={{ backgroundImage: `url('/images/cot-co-ha-noi.jpg')` }}
      />
      {/* Soft warm paper vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#F3EFE5]/50 to-[#F3EFE5]/90 pointer-events-none" />

      {/* Heritage Watermark Text */}
      <div className="absolute right-6 top-8 font-mono text-8xl sm:text-9xl font-black text-[#9C3B32]/5 select-none pointer-events-none tracking-widest uppercase">
        SƯ PHẠM
      </div>

      <div className="w-full px-6 md:px-12 xl:px-16 text-left relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase mb-1.5">
              <span>HỒ SƠ SƯ PHẠM</span>
              <span>•</span>
              <span>NGƯỜI TRUYỀN LỬA SỬ VIỆT</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1418] tracking-tight">
              Người Đồng Hành Cùng Bạn Qua Từng Mốc Son
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#687477] max-w-md italic">
            "Dạy Sử bằng trái tim người lính, truyền lửa bằng niềm tự hào của một người con đất Việt."
          </p>
        </div>

        {/* 4:8 Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column (4 Cols): Large Portrait & Open Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="image-standout rounded-xl overflow-hidden bg-[#FAF8F1]">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-full aspect-4/5 object-cover object-center contrast-105 hover:scale-102 transition-all duration-700"
              />
              <div className="p-3 bg-[#FAF8F1] flex items-center justify-between text-xs font-mono text-[#687477]">
                <span>ẢNH LƯU CHIỂU SƯ PHẠM</span>
                <span className="font-bold text-[#9C3B32]">NIÊN KHÓA 2025 - 2026</span>
              </div>
            </div>

            {/* Open Contact Strip (No Card Boxes, Clean Airy Spacing) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1418] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9C3B32]" />
                <span>Liên Hệ Trực Tiếp Trao Đổi Bài Học:</span>
              </h4>

              {/* Email Row */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F1] text-xs font-mono">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 text-[#9C3B32] shrink-0" />
                  <span className="text-[#0A1418] truncate font-sans">{TEACHER_DATA.email}</span>
                </div>
                <button
                  onClick={() => handleCopy(TEACHER_DATA.email, 'email')}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-[#0A1418] text-[#FAF8F1] hover:bg-[#9C3B32] transition-colors cursor-pointer shrink-0 rounded-xs"
                >
                  {copiedType === 'email' ? 'ĐÃ CHÉP' : 'CHÉP'}
                </button>
              </div>

              {/* Phone / Zalo Row */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F1] text-xs font-mono">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="w-4 h-4 text-[#C69A47] shrink-0" />
                  <span className="text-[#0A1418] font-bold">{TEACHER_DATA.phone}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#0A1418] text-[#FAF8F1] rounded-2xs">Zalo</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(TEACHER_DATA.phone, 'phone')}
                    className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-[#0A1418] text-[#FAF8F1] hover:bg-[#9C3B32] transition-colors cursor-pointer rounded-xs"
                  >
                    {copiedType === 'phone' ? 'ĐÃ CHÉP' : 'CHÉP'}
                  </button>
                  <a
                    href={TEACHER_DATA.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-[#9C3B32] text-white hover:bg-[#7A2820] transition-colors flex items-center gap-1 cursor-pointer rounded-xs"
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
              <div className="inline-block px-3 py-1 bg-[#9C3B32] text-white text-[11px] font-mono font-bold uppercase tracking-wider mb-2 rounded-xs">
                {TEACHER_DATA.school}
              </div>
              <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1418] tracking-tight">
                {TEACHER_DATA.name}
              </h3>
              <p className="text-sm sm:text-base font-serif italic text-[#9C3B32] mt-1 font-semibold">
                {TEACHER_DATA.title}
              </p>
            </div>

            {/* Editorial Pull Quote with Soft Accent */}
            <div className="pl-6 py-4 border-l-4 border-[#9C3B32] bg-[#FAF8F1]/50 rounded-r-lg">
              <p className="font-serif italic text-lg sm:text-xl text-[#0A1418] leading-relaxed">
                "{TEACHER_DATA.quote}"
              </p>
            </div>

            {/* Bio text */}
            <p className="font-sans text-sm sm:text-base text-[#687477] leading-relaxed">
              {TEACHER_DATA.bio}
            </p>

            {/* Principles of Teaching */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1418]">
                Nguyên Tắc Giảng Dạy & Đồng Hành Sĩ Tử:
              </h4>
              <div className="space-y-2 text-sm text-[#0A1418]">
                {TEACHER_DATA.teachingPhilosophy.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#FAF8F1]/60 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#486D5D] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Achievements: Clean Open Rows (No Dividing Lines) */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1418] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C69A47]" />
                <span>Thành Tích & Dấu Ấn Sư Phạm Nổi Bật:</span>
              </h4>

              <div className="space-y-2.5">
                {TEACHER_DATA.achievements.map((ach, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#FAF8F1] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:bg-white transition-colors">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-[#9C3B32] shrink-0">
                        [{ach.year}]
                      </span>
                      <h5 className="font-bold text-sm text-[#0A1418]">
                        {ach.title}
                      </h5>
                    </div>
                    <p className="text-xs text-[#687477] font-sans sm:max-w-md sm:text-right">
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
