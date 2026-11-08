import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, Award, CheckCircle, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { QuizExam } from '../data/quizData';

interface QuizModalProps {
  exam: QuizExam | null;
  onClose: () => void;
  user: { name: string; email?: string } | null;
}

export const QuizModal: React.FC<QuizModalProps> = ({ exam, onClose, user }) => {
  if (!exam) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.timeLimitMinutes * 60);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const currentQuestion = exam.questions[currentIndex];
  const totalQuestions = exam.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowConfirmSubmit(false);
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let correctCount = 0;
    exam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = (correctCount / totalQuestions) * 10;
    
    // Save to localStorage history
    const historyItem = {
      examTitle: exam.title,
      score: score.toFixed(1),
      correctCount,
      totalQuestions,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    try {
      const prevHistory = JSON.parse(localStorage.getItem('dam_me_lich_su_scores') || '[]');
      localStorage.setItem('dam_me_lich_su_scores', JSON.stringify([historyItem, ...prevHistory]));
    } catch (e) {
      console.warn(e);
    }

    // Confetti on high score
    if (score >= 8.0) {
      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }
  };

  // Score calculation for results view
  let correctCount = 0;
  if (isSubmitted) {
    exam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
  }
  const finalScore = ((correctCount / totalQuestions) * 10).toFixed(1);

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(exam.timeLimitMinutes * 60);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeUp text-left">
      <div className="relative w-full max-w-7xl bg-[#FAF3E0] border-2 border-[#D4A373] rounded-sm shadow-2xl overflow-hidden my-4 flex flex-col max-h-[94vh]">
        
        {/* Exam Header */}
        <div className="bg-[#4A2508] text-[#FAF3E0] px-5 sm:px-8 py-4 flex items-center justify-between hairline-b shrink-0">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#D4A373] block">
              16:9 WIDESCREEN EXAM STUDIO • THPT QUỐC GIA
            </span>
            <h2 className="font-cinzel text-base sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
              {exam.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            {!isSubmitted && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#780000] text-white font-mono text-sm sm:text-base font-black shadow-xs">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#FAF3E0] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Thoát phòng thi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User bar */}
        <div className="bg-[#F2E4C6] px-5 sm:px-8 py-2.5 border-b border-[#D4A373]/40 flex items-center justify-between text-xs font-mono text-[#4A2508]">
          <div>
            Thí sinh: <strong>{user?.name || 'Học sinh Khách'}</strong>
          </div>
          <div>
            Tiến độ hoàn thành: <strong className="text-[#780000] text-sm">{answeredCount}/{totalQuestions}</strong> câu
          </div>
        </div>

        {/* Main 16:9 Testing Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
          
          {!isSubmitted ? (
            /* ================= TESTING IN PROGRESS ================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left 4 Columns: Examination Navigator & Controls */}
              <div className="lg:col-span-4 bg-white border border-[#D4A373]/60 p-5 sm:p-6 rounded-sm shadow-xs space-y-5">
                <div className="flex items-center justify-between text-xs font-bold text-[#4A2508]">
                  <span>MA TRẬN CÂU HỎI</span>
                  <span className="font-mono text-stone-500">{answeredCount}/{totalQuestions} đã chọn</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {exam.questions.map((q, idx) => {
                    const isDone = selectedAnswers[q.id] !== undefined;
                    const isCurrent = currentIndex === idx;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-10 rounded-sm font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                          isCurrent
                            ? 'ring-2 ring-[#780000] border-[#780000]'
                            : ''
                        } ${
                          isDone
                            ? 'bg-[#780000] text-white border-[#780000]'
                            : 'bg-[#FAF3E0] text-[#4A2508] border-[#D4A373]/50 hover:bg-[#F2E4C6]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[#D4A373]/30 flex items-center justify-between text-[11px] text-stone-600 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 bg-[#780000] rounded-xs"></span>
                    <span>Đã chọn</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 bg-[#FAF3E0] border border-[#D4A373]/50 rounded-xs"></span>
                    <span>Chưa chọn</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="w-full mt-4 py-3 bg-[#780000] hover:bg-[#580000] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow cursor-pointer active:scale-95"
                >
                  NỘP BÀI THI & CHẤM ĐIỂM
                </button>
              </div>

              {/* Right 8 Columns: Question & Interactive Options Reading Zone */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Question Box */}
                <div className="p-6 sm:p-7 bg-white border border-[#D4A373]/60 rounded-sm shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono text-[#780000] font-bold mb-3">
                    <span>CÂU HỎI {currentIndex + 1} / {totalQuestions}</span>
                    <span className="bg-[#F2E4C6] text-[#4A2508] px-2.5 py-0.5 rounded-xs text-xs font-mono font-semibold">
                      {currentQuestion.topic}
                    </span>
                  </div>

                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#18120E] leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-3.5">
                  {currentQuestion.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                        className={`p-4 sm:p-5 rounded-sm border-2 transition-all cursor-pointer flex items-start gap-4 select-none ${
                          isSelected
                            ? 'bg-[#F2E4C6] border-[#780000] text-[#4A2508] shadow-sm font-semibold'
                            : 'bg-white border-[#D4A373]/40 hover:border-[#4A2508] text-[#18120E] hover:bg-[#FAF3E0]'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-sm flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border ${
                            isSelected
                              ? 'bg-[#780000] text-white border-[#780000]'
                              : 'bg-stone-100 text-[#4A2508] border-stone-300'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="text-sm sm:text-base leading-snug">{option.slice(3)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="px-5 py-2.5 rounded-sm border border-[#D4A373] text-[#4A2508] font-medium text-xs sm:text-sm hover:bg-[#F2E4C6] disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                      className="px-6 py-2.5 rounded-sm bg-[#4A2508] hover:bg-[#321905] text-[#FAF3E0] font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Câu tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="px-7 py-2.5 rounded-sm bg-[#780000] hover:bg-[#580000] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Nộp Bài Thi</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          ) : (
            /* ================= SCORE & EXPLANATION REPORT ================= */
            <div className="space-y-8 animate-fadeUp">
              
              {/* Score Summary Banner */}
              <div className="p-8 sm:p-10 bg-white border-2 border-[#D4A373] rounded-sm shadow-md text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 rounded-sm bg-[#780000] text-[#FAF3E0] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Award className="w-9 h-9" />
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#4A2508]">
                  KẾT QUẢ BÀI THI LỊCH SỬ THPT
                </h3>
                <p className="text-xs font-mono text-stone-500 mt-1">
                  Đề: {exam.title}
                </p>

                <div className="my-6 flex items-center justify-center gap-8">
                  <div>
                    <span className="font-mono text-6xl sm:text-7xl font-black text-[#780000]">
                      {finalScore}
                    </span>
                    <span className="text-xs font-mono text-stone-500 block">Thang điểm 10.0</span>
                  </div>

                  <div className="h-14 w-px bg-[#D4A373]/40"></div>

                  <div className="text-left font-mono text-sm sm:text-base space-y-1">
                    <div className="text-emerald-700 font-bold">
                      ✓ Đúng: {correctCount}/{totalQuestions} câu
                    </div>
                    <div className="text-rose-700 font-medium">
                      ✗ Chưa đúng: {totalQuestions - correctCount}/{totalQuestions} câu
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#F2E4C6] rounded-sm text-sm text-[#4A2508] font-medium max-w-lg mx-auto">
                  {Number(finalScore) >= 8.5
                    ? '🌟 Xuất sắc! Em đã nắm rất vững kiến thức và sẵn sàng đạt điểm 9-10 THPT Quốc gia!'
                    : Number(finalScore) >= 6.5
                    ? '👍 Kết quả Khá! Em hãy đọc kỹ bảng đối chiếu giải thích bên dưới để nắm chắc các câu hỏi bẫy.'
                    : '📖 Em cần ôn lại kỹ hơn các mốc lịch sử then chốt và thử luyện lại đề nhé!'}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                  <button
                    onClick={handleRetake}
                    className="px-6 py-3 rounded-sm bg-[#4A2508] hover:bg-[#321905] text-[#FAF3E0] font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Làm Lại Đề Này</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-sm border border-[#4A2508]/40 text-[#4A2508] hover:bg-[#F2E4C6] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Trở Về Danh Sách Đề
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown for each question */}
              <div className="space-y-6 pt-4">
                <div className="hairline-b pb-3 flex items-center justify-between">
                  <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#4A2508]">
                    BẢNG ĐỐI CHIẾU & GIẢI THÍCH CHI TIẾT
                  </h4>
                  <span className="text-xs font-mono text-stone-500">Chuẩn SGK & Đáp Án Bộ GD&ĐT</span>
                </div>

                {exam.questions.map((q, idx) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-6 sm:p-7 rounded-sm border-2 transition-all ${
                        isCorrect
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-rose-50/60 border-rose-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-2.5">
                        <span className="text-[#4A2508]">CÂU HỎI {idx + 1} • {q.topic}</span>
                        {isCorrect ? (
                          <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-xs flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> CHÍNH XÁC
                          </span>
                        ) : (
                          <span className="text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-xs flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> CHƯA ĐÚNG
                          </span>
                        )}
                      </div>

                      <p className="font-playfair text-base sm:text-lg font-bold text-[#18120E] mb-4">
                        {q.question}
                      </p>

                      {/* Options Review */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm mb-4">
                        {q.options.map((opt, optIndex) => {
                          const isRightAnswer = optIndex === q.correctAnswer;
                          const isStudentPick = studentAns === optIndex;

                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-sm border text-xs sm:text-sm font-sans flex items-start gap-2.5 ${
                                isRightAnswer
                                  ? 'bg-emerald-100/90 border-emerald-500 font-bold text-emerald-950'
                                  : isStudentPick
                                  ? 'bg-rose-100 border-rose-400 font-bold text-rose-950'
                                  : 'bg-white border-stone-200 text-stone-700'
                              }`}
                            >
                              <span className="font-mono font-bold shrink-0">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span>{opt.slice(3)}</span>
                              {isRightAnswer && <span className="ml-auto text-emerald-800 font-mono text-xs">(ĐÁP ÁN ĐÚNG)</span>}
                              {isStudentPick && !isRightAnswer && <span className="ml-auto text-rose-700 font-mono text-xs">(BẠN CHỌN)</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Callout */}
                      <div className="p-4 bg-white border border-[#D4A373]/40 rounded-sm text-xs sm:text-sm text-[#4A2508]">
                        <strong className="text-[#780000] block mb-1 font-mono uppercase text-xs">
                          💡 Căn Cứ Lịch Sử & Lời Giải Chuẩn SGK:
                        </strong>
                        <p className="leading-relaxed text-[#18120E]/90">
                          {q.explanation}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Confirm Submit Dialog */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FAF3E0] p-7 rounded-sm border-2 border-[#780000] shadow-2xl max-w-sm w-full text-center space-y-4">
            <h4 className="font-cinzel text-lg font-bold text-[#4A2508]">
              Xác Nhận Nộp Bài Thi?
            </h4>
            <p className="text-sm text-stone-700">
              Bạn đã chọn <strong>{answeredCount}/{totalQuestions}</strong> câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm số và lời giải chi tiết?
            </p>
            <div className="flex items-center gap-3 justify-center pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 rounded-sm border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
              >
                Làm Tiếp
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-sm bg-[#780000] hover:bg-[#580000] text-white text-xs font-bold shadow cursor-pointer"
              >
                Đồng Ý Nộp Bài
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
