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
      <div className="flex items-center justify-between pb-2 border-b border-[#0A1418]/15">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 bg-[#B47818] text-white text-xs font-mono font-bold tracking-wider">
            [ ◈ KHẢO THÍ ONLINE ]
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Phòng Khảo Thí Trắc Nghiệm Trực Tuyến — Khối {grade}
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#B47818]">
          {gradeExams.length} ĐỀ THI KHỐI {grade} • BẤM GIỜ & CHẤM ĐIỂM
        </span>
      </div>

      {/* Cardless Open Editorial Rows */}
      <div className="divide-y divide-[#0A1418]/15 border-b border-[#0A1418]/20">
        {gradeExams.map((exam, idx) => (
          <div
            key={exam.id}
            className="py-6 px-2 sm:px-4 hover:bg-[#F3EFE5]/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left: Index & Exam Info */}
            <div className="flex items-start gap-4 max-w-4xl">
              <span className="font-playfair text-3xl sm:text-4xl font-black text-[#B47818]/70 shrink-0 w-10 text-right">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#B47818] text-white font-bold text-[10px]">
                    {exam.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-[#0A1418] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#B47818]" />
                    <span>{exam.timeLimitMinutes} Phút Làm Bài</span>
                  </span>
                  <span className="text-[#9C3B32] font-bold">
                    • {exam.questionsCount} CÂU TRẮC NGHIỆM
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

            {/* Right: Actions */}
            <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
              <button
                onClick={() => onOpenReport(exam.title)}
                className="px-3.5 py-2.5 bg-transparent border border-[#0A1418]/25 hover:border-[#9C3B32] text-xs font-mono uppercase transition-colors cursor-pointer flex items-center gap-1.5 hover:text-[#9C3B32]"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span className="hidden sm:inline">Báo Lỗi Đề</span>
              </button>

              <button
                onClick={() => onSelectExam(exam)}
                className="px-6 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
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
