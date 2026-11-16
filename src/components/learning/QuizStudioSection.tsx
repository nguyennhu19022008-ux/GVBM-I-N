import React from 'react';
import { Clock, Play, AlertTriangle } from 'lucide-react';
import { QUIZ_EXAMS } from '../../data/quizData';
import type { QuizExam } from '../../data/quizData';
import type { GradeLevel } from '../../data/curriculumData';

export interface QuizStudioSectionProps {
  grade: GradeLevel;
  onSelectExam: (exam: QuizExam) => void;
  onOpenReport: (title: string) => void;
}

export const QuizStudioSection: React.FC<QuizStudioSectionProps> = ({
  grade,
  onSelectExam,
  onOpenReport,
}) => {
  const gradeExams = QUIZ_EXAMS.filter((exam) => exam.gradeLevel === grade);

  if (gradeExams.length === 0) {
    return (
      <div className="py-10 text-left text-[#687477] font-mono text-xs bg-[#F3EFE5]/40 border-l-3 border-[#B47818] p-6">
        Hiện chưa có đề thi trắc nghiệm trực tuyến cho Khối {grade}. Thầy sẽ cập nhật thêm sớm!
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Section Sub-Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#0A1418]/12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#B47818]/15 text-[#9A6210] text-xs font-mono font-bold tracking-wider">
            Khảo thí trực tuyến
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Phòng Khảo Thí Trắc Nghiệm Trực Tuyến — Khối {grade}
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#9A6210]">
          {gradeExams.length} đề thi • Bấm giờ & chấm điểm
        </span>
      </div>

      {/* Harmonious Open Editorial Rows */}
      <div className="divide-y divide-[#0A1418]/10">
        {gradeExams.map((exam, idx) => (
          <div
            key={exam.id}
            className="py-6 px-4 rounded-2xl hover:bg-white/75 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left: Index & Exam Info */}
            <div className="flex items-start gap-4 max-w-4xl">
              <span className="font-playfair text-3xl sm:text-4xl font-black text-[#B47818]/65 shrink-0 w-10 text-right">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <span className="px-3 py-0.5 rounded-full bg-[#B47818]/15 text-[#9A6210] font-bold text-[11px]">
                    {exam.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-[#0A1418] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#B47818]" />
                    <span>{exam.timeLimitMinutes} phút làm bài</span>
                  </span>
                  <span className="text-[#9C3B32] font-bold">
                    • {exam.questionsCount} câu trắc nghiệm
                  </span>
                  <span className="text-[#687477]">
                    • {exam.topicLabel}
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

            {/* Right: Actions (Borderless ghost button + Pill CTA) */}
            <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
              <button
                onClick={() => onOpenReport(exam.title)}
                className="px-3.5 py-2 rounded-full text-xs font-sans font-medium text-[#687477] hover:bg-[#9C3B32]/10 hover:text-[#9C3B32] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span>Báo lỗi đề</span>
              </button>

              <button
                onClick={() => onSelectExam(exam)}
                className="px-6 py-2.5 rounded-full bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-[#E5C985]" />
                <span>Vào Phòng Thi Ngay</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
