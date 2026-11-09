import React, { useState } from 'react';
import { Mail, Phone, Award, CheckCircle2, ExternalLink, BookOpen, Quote } from 'lucide-react';
import { TEACHER_DATA } from '../../data/teacherData';

export const TeacherProfileSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section className="w-full py-12 lg:py-16 hairline-b">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Section Header: Broadsheet Column Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 broadsheet-double-b">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1.5">
              <span>HỒ SƠ SƯ PHẠM</span>
              <span>•</span>
              <span>CHỦ NHIỆM BỘ MÔN</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
              Người Đồng Hành Cùng Bạn Qua Từng Trang Sử
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#4A3E3D] max-w-md italic">
            "Dạy Sử bằng trái tim người lính, truyền lửa bằng niềm tự hào của một người con đất Việt."
          </p>
        </div>

        {/* 5:7 Asymmetrical Broadsheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column (5 Cols): Portrait & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="archival-newspaper-frame relative group">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-full aspect-4/5 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="mt-3 pt-2 hairline-t flex items-center justify-between text-xs font-mono text-[#4A3E3D]">
                <span>ẢNH SƯ PHẠM LƯU CHIỂU</span>
                <span className="font-bold text-[#8B0000]">NIÊN KHÓA 2025 - 2026</span>
              </div>
            </div>

            {/* Direct Connect Box */}
            <div className="p-6 bg-[#ECE3D0]/60 border border-[#1A1615]/20 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8B0000]" />
                <span>Kênh Trao Đổi Chuyên Môn Trực Tiếp</span>
              </h3>

              <div className="space-y-2.5">
                {/* Email */}
                <div className="flex items-center justify-between p-3 bg-white border border-[#1A1615]/15 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-[#8B0000] shrink-0" />
                    <span className="font-mono text-[#1A1615] truncate">{TEACHER_DATA.email}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(TEACHER_DATA.email, 'email')}
                    className="ml-2 px-2.5 py-1 text-[11px] font-mono font-bold uppercase bg-[#ECE3D0] hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    {copiedType === 'email' ? 'ĐÃ CHÉP' : 'SAO CHÉP'}
                  </button>
                </div>

                {/* Hotline & Zalo */}
                <div className="flex items-center justify-between p-3 bg-white border border-[#1A1615]/15 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span className="font-mono text-[#1A1615] font-bold">{TEACHER_DATA.phone}</span>
                    <span className="text-[10px] px-1 bg-green-100 text-green-800 font-mono">Zalo</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(TEACHER_DATA.phone, 'phone')}
                      className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase bg-[#ECE3D0] hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedType === 'phone' ? 'ĐÃ CHÉP' : 'SAO CHÉP'}
                    </button>
                    <a
                      href={TEACHER_DATA.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase bg-[#1A1615] text-white hover:bg-[#8B0000] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>NHẮN</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Biography, Quote, Achievements & Philosophy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Identity & Title */}
            <div>
              <div className="inline-block px-2.5 py-1 bg-[#8B0000] text-white text-xs font-mono font-bold uppercase tracking-wider mb-3">
                {TEACHER_DATA.school}
              </div>
              <h3 className="font-playfair text-3xl sm:text-4xl font-black text-[#1A1615] tracking-tight">
                {TEACHER_DATA.name}
              </h3>
              <p className="text-sm sm:text-base font-serif italic text-[#8B0000] mt-1">
                {TEACHER_DATA.title}
              </p>
            </div>

            {/* Quote Banner */}
            <div className="relative pl-6 py-2 border-l-4 border-[#8B0000] bg-[#ECE3D0]/30 pr-4">
              <Quote className="w-6 h-6 text-[#8B0000]/40 absolute -top-3 left-2" />
              <p className="font-serif italic text-base sm:text-lg text-[#1A1615] leading-relaxed">
                "{TEACHER_DATA.quote}"
              </p>
            </div>

            {/* Bio text */}
            <p className="font-sans text-sm sm:text-base text-[#4A3E3D] leading-relaxed">
              {TEACHER_DATA.bio}
            </p>

            {/* Teaching Philosophy: 3 Pillars */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615]">
                Nguyên Tắc Giảng Dạy & Đồng Hành:
              </h4>
              <div className="space-y-2">
                {TEACHER_DATA.teachingPhilosophy.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#1A1615]">
                    <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Achievements */}
            <div className="space-y-3 pt-4 hairline-t">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1615] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C59B27]" />
                <span>Thành Tích & Đóng Góp Sư Phạm</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {TEACHER_DATA.achievements.map((ach, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-[#1A1615]/15 space-y-1">
                    <span className="block text-[11px] font-mono font-bold text-[#8B0000]">{ach.year}</span>
                    <h5 className="font-bold text-xs text-[#1A1615] line-clamp-2">{ach.title}</h5>
                    <p className="text-[11px] text-[#4A3E3D] leading-normal line-clamp-3">{ach.description}</p>
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
