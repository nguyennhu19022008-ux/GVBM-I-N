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
    <div className="w-full bg-[#F3EFE5]/60 border-t border-b border-[#0A1418]/15 py-4 px-4 sm:px-6 mb-6 text-left">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x divide-[#0A1418]/15">
        
        {/* Metric 1: Completed Resources */}
        <div className="flex items-center gap-3 pr-2">
          <div className="p-2 bg-[#1B4931]/10 text-[#1B4931] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
                  {completedResourcesCount}
                </span>
                <span className="text-[10px] font-mono text-[#687477]">MỤC</span>
              </div>
              {completedResourcesCount > 0 && (
                <button
                  onClick={onQuickFilterCompleted}
                  className="text-[10px] font-mono font-bold text-[#1B4931] hover:underline cursor-pointer"
                >
                  XEM LỌC →
                </button>
              )}
            </div>
            <p className="text-[11px] font-mono text-[#687477] uppercase tracking-wider">
              HOÀN THÀNH (KHỐI {activeGrade})
            </p>
          </div>
        </div>

        {/* Metric 2: Bookmarked Resources */}
        <div className="flex items-center gap-3 md:px-4">
          <div className="p-2 bg-[#B47818]/10 text-[#B47818] shrink-0">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
                  {bookmarkedCount}
                </span>
                <span className="text-[10px] font-mono text-[#687477]">MỤC</span>
              </div>
              {bookmarkedCount > 0 && (
                <button
                  onClick={onQuickFilterBookmarked}
                  className="text-[10px] font-mono font-bold text-[#9C3B32] hover:underline cursor-pointer"
                >
                  XEM LỌC →
                </button>
              )}
            </div>
            <p className="text-[11px] font-mono text-[#687477] uppercase tracking-wider">
              ĐÃ GẮN SAO ÔN TẬP
            </p>
          </div>
        </div>

        {/* Metric 3: Online Quizzes Taken */}
        <div className="flex items-center gap-3 md:px-4">
          <div className="p-2 bg-[#9C3B32]/10 text-[#9C3B32] shrink-0">
            <BookCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
                {quizScores.length}
              </span>
              <span className="text-[10px] font-mono text-[#687477]">/ {totalExamsCount} ĐỀ</span>
            </div>
            <p className="text-[11px] font-mono text-[#687477] uppercase tracking-wider">
              LƯỢT KHẢO THÍ ONLINE
            </p>
          </div>
        </div>

        {/* Metric 4: Average Score */}
        <div className="flex items-center gap-3 md:pl-4">
          <div className="p-2 bg-[#0A1418]/10 text-[#0A1418] shrink-0">
            <Award className="w-4 h-4 text-[#C69A47]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-playfair text-xl sm:text-2xl font-black text-[#9C3B32]">
                {averageScore ? `${averageScore}/10` : '—'}
              </span>
              <span className="text-[10px] font-mono text-[#687477]">ĐIỂM</span>
            </div>
            <p className="text-[11px] font-mono text-[#687477] uppercase tracking-wider">
              ĐIỂM TRUNG BÌNH THI THỬ
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
