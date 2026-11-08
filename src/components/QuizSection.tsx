import React, { useState, useEffect } from 'react';
import { Award, Clock, HelpCircle, ArrowRight, CheckCircle2, History } from 'lucide-react';
import { QUIZ_EXAMS } from '../data/quizData';
import type { QuizExam } from '../data/quizData';

interface QuizSectionProps {
  user: { name: string; email?: string } | null;
  onOpenAuth: () => void;
  onSelectExam: (exam: QuizExam) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  user,
  onOpenAuth,
  onSelectExam,
}) => {
  const [scoresHistory, setScoresHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dam_me_lich_su_scores');
      if (stored) {
        setScoresHistory(JSON.parse(stored).slice(0, 6));
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleStartExam = (exam: QuizExam) => {
    if (!user) {
      onOpenAuth();
    } else {
      onSelectExam(exam);
    }
  };

  return (
    <section id="quiz-section" className="py-16 lg:py-24 bg-[#FAF3E0] hairline-b text-left">
      <div className="w-full px-6 md:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 hairline-b">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[#780000]">
              <Award className="w-4 h-4" />
              <span>CHƯƠNG IV • PHÒNG LUYỆN THI TRẮC NGHIỆM PHÂN HÓA 16:9</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[#4A2508] tracking-tight">
              Luyện Đề Trắc Nghiệm Tốt Nghiệp THPT
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#18120E]/80 max-w-2xl font-sans">
              Bộ đề kiểm tra nhanh từ 10 đến 15 câu theo từng chuyên đề lịch sử. Có đồng hồ đếm ngược, chấm điểm tức thì và bảng giải thích tường tận vì sao đúng/sai chuẩn kiến thức SGK.
            </p>
          </div>

          {/* User Status Badge */}
          <div className="bg-white border border-[#D4A373]/60 px-5 py-3 rounded-sm text-xs font-mono text-[#4A2508] flex items-center gap-3 self-start lg:self-auto shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-[#780000] shrink-0" />
            <div>
              <span className="block text-stone-500 text-[10px] uppercase font-bold">Trạng Thái Sĩ Tử:</span>
              <span className="font-bold text-sm">
                {user ? user.name : 'Yêu cầu đăng nhập trước khi làm bài'}
              </span>
            </div>
          </div>
        </div>

        {/* 16:9 Widescreen Exam Strips (Open Editorial Layout) */}
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZ_EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="bg-white border-2 border-[#D4A373]/40 hover:border-[#780000] rounded-sm p-6 sm:p-8 transition-all shadow-xs hover:shadow-md flex flex-col justify-between text-left group"
            >
              <div>
                
                {/* Meta Badges */}
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="px-2.5 py-1 rounded-2xs bg-[#F2E4C6] text-[#4A2508] font-bold border border-[#D4A373]/50">
                    {exam.topicLabel}
                  </span>

                  <span className="text-[#780000] font-bold uppercase tracking-wider">
                    {exam.difficulty}
                  </span>
                </div>

                {/* Exam Title */}
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#4A2508] group-hover:text-[#780000] transition-colors leading-snug">
                  {exam.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-[#18120E]/80 leading-relaxed font-sans">
                  {exam.description}
                </p>

                {/* Stats */}
                <div className="mt-6 pt-4 hairline-t grid grid-cols-2 gap-3 text-xs font-mono text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#780000]" />
                    <span><strong>{exam.questionsCount}</strong> Câu hỏi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#780000]" />
                    <span><strong>{exam.timeLimitMinutes}</strong> Phút làm bài</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 hairline-t">
                <button
                  onClick={() => handleStartExam(exam)}
                  className="w-full py-3.5 rounded-sm bg-[#780000] hover:bg-[#580000] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{user ? 'Vào Thi Ngay (16:9 Studio)' : 'Đăng Nhập 1 Chạm & Vào Thi'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Scores History Section (If available) */}
        {scoresHistory.length > 0 && (
          <div className="mt-12 p-6 sm:p-8 bg-white border border-[#D4A373]/40 rounded-sm text-left shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#4A2508] mb-4">
              <History className="w-4 h-4 text-[#780000]" />
              <span>BẢNG THEO DÕI TIẾN BỘ ĐIỂM SỐ GẦN ĐÂY CỦA BẠN</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scoresHistory.map((item, idx) => (
                <div key={idx} className="p-4 rounded-sm bg-[#FAF3E0] border border-[#D4A373]/40 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block font-bold text-[#4A2508] truncate max-w-[200px] text-sm">{item.examTitle}</span>
                    <span className="text-stone-500 text-[11px]">{item.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xl text-[#780000] block">{item.score}đ</span>
                    <span className="text-[11px] text-stone-500 font-medium">({item.correctCount}/{item.totalQuestions} câu)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
