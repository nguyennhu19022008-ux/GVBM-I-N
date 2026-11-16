import React, { useMemo } from 'react';
import { Bookmark, CheckCircle2, Award, BookCheck } from 'lucide-react';
import type { GradeLevel } from '../../data/curriculumData';
import { safeStorage } from '../../data/curriculumData';

export interface StudentProgressStripProps {
  activeGrade: GradeLevel;
  totalExamsCount: number;
  bookmarkedCount: number;
  completedResourcesCount: number;
  onQuickFilterBookmarked: () => void;
  onQuickFilterCompleted: () => void;
}

interface ScoreHistoryItem {
  examTitle: string;
  score: string;
  correctCount: number;
  totalQuestions: number;
  date: string;
}

export const StudentProgressStrip: React.FC<StudentProgressStripProps> = ({
  activeGrade,
  totalExamsCount,
  bookmarkedCount,
  completedResourcesCount,
  onQuickFilterBookmarked,
  onQuickFilterCompleted,
}) => {
  // Read quiz score history
  const quizScores = useMemo(() => {
    return safeStorage.get<ScoreHistoryItem[]>('dam_me_lich_su_scores', []);
  }, []);

  const averageScore = useMemo(() => {
    if (quizScores.length === 0) return null;
    const sum = quizScores.reduce((acc, cur) => acc + (parseFloat(cur.score) || 0), 0);
    return (sum / quizScores.length).toFixed(1);
  }, [quizScores]);

  return (
    <div className="w-full rounded-2xl bg-white/75 backdrop-blur-xs border border-[#0A1418]/10 py-4 px-5 sm:px-7 mb-7 text-left shadow-2xs">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        
        {/* Metric 1: Completed Resources */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#1B4931]/10 text-[#1B4931] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-playfair text-2xl font-black text-[#0A1418]">
                  {completedResourcesCount}
                </span>
                <span className="text-xs font-sans text-[#687477]">bài</span>
              </div>
              {completedResourcesCount > 0 && (
                <button
                  onClick={onQuickFilterCompleted}
                  className="text-[11px] font-sans font-semibold text-[#1B4931] hover:underline cursor-pointer"
                >
                  Xem →
                </button>
              )}
            </div>
            <p className="text-xs font-sans text-[#687477]">
              Hoàn thành Khối {activeGrade}
            </p>
          </div>
        </div>

        {/* Metric 2: Bookmarked Resources */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#B47818]/12 text-[#B47818] flex items-center justify-center shrink-0">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-playfair text-2xl font-black text-[#0A1418]">
                  {bookmarkedCount}
                </span>
                <span className="text-xs font-sans text-[#687477]">mục</span>
              </div>
              {bookmarkedCount > 0 && (
                <button
                  onClick={onQuickFilterBookmarked}
                  className="text-[11px] font-sans font-semibold text-[#9C3B32] hover:underline cursor-pointer"
                >
                  Xem →
                </button>
              )}
            </div>
            <p className="text-xs font-sans text-[#687477] truncate">
              Đã lưu sao ôn tập
            </p>
          </div>
        </div>

        {/* Metric 3: Online Quizzes Taken */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#9C3B32]/10 text-[#9C3B32] flex items-center justify-center shrink-0">
            <BookCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-playfair text-2xl font-black text-[#0A1418]">
                {quizScores.length}
              </span>
              <span className="text-xs font-mono text-[#687477]">/ {totalExamsCount} đề</span>
            </div>
            <p className="text-xs font-sans text-[#687477] truncate">
              Lượt thi trực tuyến
            </p>
          </div>
        </div>

        {/* Metric 4: Average Score */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#0A1418]/8 text-[#C69A47] flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-playfair text-2xl font-black text-[#9C3B32]">
                {averageScore ? `${averageScore}/10` : '—'}
              </span>
              <span className="text-xs font-sans text-[#687477]">điểm</span>
            </div>
            <p className="text-xs font-sans text-[#687477] truncate">
              Điểm trung bình thi thử
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
