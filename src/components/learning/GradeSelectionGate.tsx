import React from 'react';
import { ArrowRight, BookOpen, FileText, Award } from 'lucide-react';
import type { GradeLevel } from '../../data/curriculumData';
import { INITIAL_CURRICULUM_RESOURCES } from '../../data/curriculumData';
import { QUIZ_EXAMS } from '../../data/quizData';

interface GradeSelectionGateProps {
  onSelectGrade: (grade: GradeLevel) => void;
  customResourcesCountByGrade: Record<GradeLevel, number>;
}

export const GradeSelectionGate: React.FC<GradeSelectionGateProps> = ({
  onSelectGrade,
  customResourcesCountByGrade,
}) => {
  const grades: {
    grade: GradeLevel;
    tag: string;
    badge: string;
    title: string;
    subtitle: string;
    highlights: string[];
    accentColor: string;
  }[] = [
    {
      grade: '10',
      tag: 'CHƯƠNG TRÌNH MỚI',
      badge: 'GDPT 2018',
      title: 'Khối 10',
      subtitle: 'Lịch Sử & Văn Minh Nhân Loại · Dân Tộc & Đất Nước',
      highlights: [
        'Hiện thực lịch sử & Sử học',
        'Văn minh cổ - trung đại phương Đông & Tây',
        'Văn minh trên đất nước Việt Nam',
      ],
      accentColor: '#1B4931',
    },
    {
      grade: '11',
      tag: 'CẬN - HIỆN ĐẠI',
      badge: '1858 - 1945',
      title: 'Khối 11',
      subtitle: 'Kháng Pháp · Phong Trào Cần Vương · Thế Chiến II',
      highlights: [
        'Cuộc kháng chiến chống Pháp (1858 - 1884)',
        'Cần Vương, Yên Thế & Xu hướng đầu TK XX',
        'Lịch sử Thế giới Cận - Hiện đại',
      ],
      accentColor: '#1E3A5F',
    },
    {
      grade: '12',
      tag: '★ TRỌNG TÂM ÔN THI',
      badge: 'THPT 2026',
      title: 'Khối 12 ★',
      subtitle: '1919 - Độc Lập · Hai Cuộc Kháng Chiến & Đổi Mới',
      highlights: [
        'Kháng chiến chống Pháp & Điện Biên Phủ 1954',
        'Kháng chiến chống Mỹ & Đại thắng 1975',
        'Đề thi thử chuẩn cấu trúc Bộ GD&ĐT 2026',
      ],
      accentColor: '#9C3B32',
    },
  ];

  const getCountsForGrade = (g: GradeLevel) => {
    const hwCount =
      INITIAL_CURRICULUM_RESOURCES.filter((r) => r.grade === g && r.category === 'homework').length +
      (customResourcesCountByGrade[g] || 0);
    const examCount = INITIAL_CURRICULUM_RESOURCES.filter(
      (r) => r.grade === g && r.category === 'exam'
    ).length;
    const quizCount = QUIZ_EXAMS.filter((q) => q.gradeLevel === g).length;
    return { hwCount, examCount, quizCount };
  };

  return (
    <div className="w-full py-12 lg:py-16 px-6 md:px-12 xl:px-16 bg-[#FAF8F1] animate-fadeSlideUp relative overflow-hidden min-h-[75vh] flex flex-col justify-center">
      {/* Subtle Historical Background */}
      <div
        className="absolute top-0 right-0 w-full sm:w-2/3 h-[500px] bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none select-none"
        style={{ backgroundImage: `url('/images/hoi-nghi-ianta.jpg')` }}
      />
      <div className="absolute inset-0 bg-radial from-transparent via-[#FAF8F1]/70 to-[#FAF8F1] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10 text-left">
        {/* Header */}
        <div className="space-y-3 pb-4 border-b border-[#0A1418]/12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9C3B32]/10 text-xs font-mono font-bold tracking-wider text-[#9C3B32] uppercase">
            <span>Bước 1 • Chọn khối lớp học tập</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1418] tracking-tight">
            Em Đang Theo Học Khối Lớp Nào?
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#687477] max-w-2xl leading-relaxed">
            Chọn đúng khối lớp của mình trước khi vào Giảng Đường. Hệ thống sẽ hiển thị riêng bài tập, đề ôn tập và phòng khảo thí trực tuyến thuộc khối lớp em đã chọn.
          </p>
        </div>

        {/* 3 Harmonious Soft Rounded Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {grades.map((item) => {
            const { hwCount, examCount, quizCount } = getCountsForGrade(item.grade);
            return (
              <div
                key={item.grade}
                onClick={() => onSelectGrade(item.grade)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectGrade(item.grade);
                  }
                }}
                className="group rounded-3xl bg-white/80 backdrop-blur-xs border border-[#0A1418]/10 hover:border-[#9C3B32]/35 shadow-xs hover:shadow-lg transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between gap-6 cursor-pointer text-left hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span
                      className="font-bold uppercase tracking-wider"
                      style={{ color: item.accentColor }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-sans font-semibold px-3 py-0.5 rounded-full bg-[#0A1418]/8 text-[#0A1418]">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-playfair text-3xl sm:text-4xl font-black text-[#0A1418] group-hover:text-[#9C3B32] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#687477] mt-1.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 text-xs font-sans text-[#0A1418]/85 border-t border-[#0A1418]/8">
                    {item.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono font-bold text-[#9C3B32]">—</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-5 pt-4 border-t border-[#0A1418]/8">
                  <div className="flex flex-wrap items-center gap-3.5 text-xs font-sans text-[#0A1418]/80">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#1B4931]" />
                      <strong>{hwCount}</strong> Bài tập
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#9C3B32]" />
                      <strong>{examCount}</strong> Đề ôn
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#B47818]" />
                      <strong>{quizCount}</strong> Đề thi thử
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white transition-all group-hover:shadow-md"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <span>Vào Khối {item.grade}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
