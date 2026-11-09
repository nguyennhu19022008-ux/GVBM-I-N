import React from 'react';
import { Award, Clock, Play, AlertTriangle } from 'lucide-react';
import { QUIZ_EXAMS } from '../../data/quizData';
import type { QuizExam } from '../../data/quizData';
import type { GradeLevel } from '../../data/curriculumData';

interface QuizStudioSectionProps {
  grade: GradeLevel;
  onSelectExam: (exam: QuizExam) => void;
  onOpenReport: (title: string) => void;
}

export const QuizStudioSection: React.FC<QuizStudioSectionProps> = ({
  grade,
  onSelectExam,
  onOpenReport,
}) => {
  return (
    <div className="space-y-6 text-left">
      
      {/* Section Sub-Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#9C3B32]" />
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Bảng Khảo Thí Trắc Nghiệm Trực Tuyến — Khối {grade}
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#9C3B32]">
          BẤM GIỜ & CHẤM ĐIỂM TỨC THÌ
        </span>
      </div>

      {/* Modern Elevated Rows (Zero Dividing Lines) */}
      <div className="space-y-3">
        {QUIZ_EXAMS.map((exam, idx) => (
          <div
            key={exam.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#F3EFE5]/50 hover:bg-[#F3EFE5] transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left: Index & Exam Info */}
            <div className="flex items-start gap-5 max-w-4xl">
              <span className="font-playfair text-3xl sm:text-4xl font-black text-[#9C3B32]/60 shrink-0 w-12 text-right">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#9C3B32] text-white font-bold text-[10px] rounded">
                    {exam.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-[#0A1418] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#C69A47]" />
                    <span>{exam.timeLimitMinutes} Phút Làm Bài</span>
                  </span>
                  <span className="text-[#9C3B32] font-bold">
                    • {exam.questionsCount} CÂU TRẮC NGHIỆM
                  </span>
                </div>

                <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#0A1418] leading-snug">
                  {exam.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-[#687477] leading-relaxed max-w-3xl">
                  {exam.description}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
              <button
                onClick={() => onOpenReport(exam.title)}
                className="px-3.5 py-2 bg-white/70 hover:bg-white text-xs font-mono uppercase transition-colors cursor-pointer rounded-xl flex items-center gap-1.5 shadow-2xs hover:text-[#9C3B32]"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span className="hidden sm:inline">Báo Lỗi Đề</span>
              </button>

              <button
                onClick={() => onSelectExam(exam)}
                className="px-6 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 rounded-xl"
              >
                <Play className="w-4 h-4 text-[#E5C985]" />
                <span>Vào Phòng Thi Ngay</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
