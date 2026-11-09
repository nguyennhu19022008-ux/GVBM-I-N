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
      <div className="flex items-center justify-between pb-3 hairline-b">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#8B0000]" />
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1A1615]">
            Phòng Thi Trắc Nghiệm Trực Tuyến — Khối {grade}
          </h3>
        </div>
        <span className="text-xs font-mono text-[#8B0000] font-bold">
          BẤM GIỜ & CHẤM ĐIỂM TỨC THÌ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {QUIZ_EXAMS.map((exam) => (
          <div
            key={exam.id}
            className="p-6 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] transition-all paper-lift flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-[#8B0000] text-white font-bold">
                  {exam.difficulty}
                </span>
                <span className="flex items-center gap-1 text-[#4A3E3D]">
                  <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{exam.timeLimitMinutes} Phút</span>
                </span>
              </div>

              <h4 className="font-playfair text-lg font-bold text-[#1A1615] leading-snug">
                {exam.title}
              </h4>

              <p className="font-sans text-xs text-[#4A3E3D] leading-relaxed line-clamp-3">
                {exam.description}
              </p>

              <div className="p-3 bg-[#ECE3D0]/60 border border-[#1A1615]/10 text-xs font-mono flex items-center justify-between">
                <span>SỐ CÂU HỎI:</span>
                <span className="font-bold text-[#8B0000]">{exam.questionsCount} CÂU TRẮC NGHIỆM</span>
              </div>
            </div>

            <div className="pt-5 mt-4 hairline-t flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenReport(exam.title)}
                className="text-[11px] font-mono text-[#4A3E3D] hover:text-[#8B0000] flex items-center gap-1 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Báo Lỗi Đề</span>
              </button>

              <button
                onClick={() => onSelectExam(exam)}
                className="px-4 py-2 bg-[#8B0000] hover:bg-[#5E0000] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Vào Thi Thử</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
