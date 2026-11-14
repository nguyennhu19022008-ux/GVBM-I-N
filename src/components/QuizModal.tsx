import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Award, CheckCircle, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Check, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { QuizExam, QuizQuestion, SelectedAnswersState, TrueFalseGroupAnswer } from '../data/quizData';
import { calculateExamScore, getQuestionCompletionStatus } from '../data/quizData';

interface QuizModalProps {
  exam: QuizExam | null;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ exam, onClose }) => {
  if (!exam) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswersState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.timeLimitMinutes * 60);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Targeted Mistake Drill Mode States
  const [isDrillMode, setIsDrillMode] = useState<boolean>(false);
  const [drillQuestionIds, setDrillQuestionIds] = useState<number[]>([]);
  const [initialExamScore, setInitialExamScore] = useState<string | null>(null);

  // Live Screen Reader Announce
  const [screenReaderAnnounce, setScreenReaderAnnounce] = useState<string>('');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Active question pool based on drill mode
  const activeQuestions = isDrillMode
    ? exam.questions.filter((q) => drillQuestionIds.includes(q.id))
    : exam.questions;

  const currentQuestion: QuizQuestion = activeQuestions[currentIndex] || activeQuestions[0] || exam.questions[0];
  const totalQuestions = activeQuestions.length;

  // Count answered questions
  const answeredCount = exam.questions.filter((q) => {
    const status = getQuestionCompletionStatus(q, selectedAnswers[q.id]);
    return status === 'fully_answered' || status === 'partially_answered';
  }).length;

  // Lock background body scroll while exam studio is active
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

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

  const handleSelectSingleOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSelectStatement = (
    questionId: number,
    statementId: 'a' | 'b' | 'c' | 'd',
    value: boolean
  ) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => {
      const currentGroup = (prev[questionId] as TrueFalseGroupAnswer) || {};
      return {
        ...prev,
        [questionId]: {
          ...currentGroup,
          [statementId]: value,
        },
      };
    });
    setScreenReaderAnnounce(`Mệnh đề ${statementId.toUpperCase()}: Đã chọn ${value ? 'ĐÚNG' : 'SAI'}`);
  };

  // Check if a question is answered correctly
  const isQuestionFullyCorrect = (q: QuizQuestion, answers: SelectedAnswersState): boolean => {
    if (q.type === 'true_false_group') {
      const userGroup = (answers[q.id] as TrueFalseGroupAnswer) || {};
      const statements = q.statements || [];
      if (statements.length === 0) return false;
      return statements.every((st) => userGroup[st.id] === st.isCorrect);
    } else {
      const userAns = answers[q.id] as number | undefined;
      return userAns === q.correctAnswer;
    }
  };

  // Find all mistake questions
  const getWrongQuestions = (questions: QuizQuestion[], answers: SelectedAnswersState): QuizQuestion[] => {
    return questions.filter((q) => !isQuestionFullyCorrect(q, answers));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowConfirmSubmit(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const scoreResult = calculateExamScore(exam.questions, selectedAnswers);
    const scoreNum = parseFloat(scoreResult.normalizedScore);

    // Save to localStorage history
    const historyItem = {
      examTitle: exam.title,
      score: scoreResult.normalizedScore,
      correctCount: scoreResult.fullyCorrectQuestionsCount,
      totalQuestions: exam.questions.length,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    try {
      const prevHistory = JSON.parse(localStorage.getItem('dam_me_lich_su_scores') || '[]');
      localStorage.setItem('dam_me_lich_su_scores', JSON.stringify([historyItem, ...prevHistory]));
    } catch (e) {
      console.warn(e);
    }

    // Confetti on high score
    if (scoreNum >= 8.0) {
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

  const examScoreResult = calculateExamScore(exam.questions, selectedAnswers);
  const finalScore = examScoreResult.normalizedScore;
  const wrongQuestions = getWrongQuestions(exam.questions, selectedAnswers);

  // Start targeted mistake drill mode
  const handleStartMistakeDrill = () => {
    if (wrongQuestions.length === 0) return;

    const wrongIds = wrongQuestions.map((q) => q.id);
    setDrillQuestionIds(wrongIds);
    setIsDrillMode(true);
    setIsSubmitted(false);
    setCurrentIndex(0);

    if (!initialExamScore) {
      setInitialExamScore(finalScore);
    }

    // Clear answers for the wrong questions so student can re-think
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      wrongIds.forEach((id) => delete updated[id]);
      return updated;
    });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(exam.timeLimitMinutes * 60);
    setIsDrillMode(false);
    setDrillQuestionIds([]);
    setInitialExamScore(null);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeUp text-left">
      <div className="relative w-full max-w-7xl bg-[#FAF8F1] border-2 border-[#0A1418] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[94vh]">
        
        {/* Exam Header */}
        <div className="bg-[#0A1418] text-[#FAF8F1] px-5 sm:px-8 py-4 flex items-center justify-between border-b border-[#0A1418]/30 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#E5C985]">
              <span>PHÒNG KHẢO THÍ SỐ HÓA • THPT QUỐC GIA 2026</span>
              {isDrillMode && (
                <span className="px-2 py-0.5 bg-[#9C3B32] text-white">
                  ⚡ CHẾ ĐỘ RÈN LUYỆN CÂU SAI
                </span>
              )}
            </div>
            <h2 className="font-playfair text-base sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
              {exam.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            {!isSubmitted && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#9C3B32] text-white font-mono text-sm sm:text-base font-black shadow-xs">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#FAF8F1] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Thoát phòng thi"
              aria-label="Thoát phòng thi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User bar */}
        <div className="bg-[#F3EFE5] px-5 sm:px-8 py-2.5 border-b border-[#0A1418]/15 flex items-center justify-between text-xs font-mono text-[#0A1418]">
          <div>
            Thí sinh: <strong>Học sinh Khối {exam.gradeLevel}</strong>
          </div>
          <div>
            Tiến độ hoàn thành: <strong className="text-[#9C3B32] text-sm">{answeredCount}/{exam.questions.length}</strong> câu
          </div>
        </div>

        {/* Screen Reader Live Status Announcer */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {screenReaderAnnounce}
        </div>

        {/* Main Testing Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
          
          {!isSubmitted ? (
            /* ================= TESTING IN PROGRESS ================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Examination Navigator & Controls */}
              <div className="order-2 lg:order-1 lg:col-span-4 bg-white border border-[#0A1418]/15 p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between text-xs font-bold text-[#0A1418]">
                  <span className="font-mono uppercase tracking-wider">
                    {isDrillMode ? 'CÁC CÂU CẦN ÔN LẠI' : 'MA TRẬN CÂU HỎI'}
                  </span>
                  <span className="font-mono text-[#687477]">
                    {answeredCount}/{exam.questions.length} câu
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {activeQuestions.map((q, idx) => {
                    const status = getQuestionCompletionStatus(q, selectedAnswers[q.id]);
                    const isCurrent = currentIndex === idx;

                    let bgClass = 'bg-[#F3EFE5] text-[#0A1418] border-[#0A1418]/20 hover:bg-white';
                    if (status === 'fully_answered') {
                      bgClass = 'bg-[#9C3B32] text-white border-[#9C3B32]';
                    } else if (status === 'partially_answered') {
                      bgClass = 'bg-[#FAF8F1] text-[#9C3B32] border-2 border-dashed border-[#9C3B32] font-black';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-10 font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                          isCurrent ? 'ring-2 ring-[#0A1418]' : ''
                        } ${bgClass}`}
                        title={`Câu ${idx + 1}: ${status === 'fully_answered' ? 'Đã xong' : status === 'partially_answered' ? 'Mới chọn một phần' : 'Chưa làm'}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[#0A1418]/15 space-y-1.5 text-[11px] text-[#687477] font-mono">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 bg-[#9C3B32]"></span>
                      <span>Đã hoàn thành</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 bg-[#FAF8F1] border border-dashed border-[#9C3B32]"></span>
                      <span>Chưa xong các ý</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 bg-[#F3EFE5] border border-[#0A1418]/20"></span>
                    <span>Chưa làm</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="w-full mt-4 py-3 bg-[#9C3B32] hover:bg-[#7e2e26] text-white font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer active:scale-95"
                >
                  NỘP BÀI THI & CHẤM ĐIỂM
                </button>
              </div>

              {/* Question & Interactive Options Reading Zone */}
              <div className="order-1 lg:order-2 lg:col-span-8 space-y-6">
                
                {/* Question Box */}
                <div className="p-6 sm:p-7 bg-white border border-[#0A1418]/15 shadow-xs space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9C3B32] font-bold">
                    <span>
                      CÂU HỎI {currentIndex + 1} / {totalQuestions}
                      {currentQuestion.type === 'true_false_group' && (
                        <span className="ml-2 px-2 py-0.5 bg-[#0A1418] text-[#FAF8F1] text-[10px]">
                          PHẦN II: ĐÚNG / SAI ĐA MỆNH ĐỀ
                        </span>
                      )}
                    </span>
                    <span className="bg-[#F3EFE5] text-[#0A1418] px-2.5 py-0.5 text-xs font-mono font-semibold">
                      {currentQuestion.topic}
                    </span>
                  </div>

                  {/* Stimulus Historical Text for True/False Questions */}
                  {currentQuestion.stimulus && (
                    <div className="p-4 bg-[#F3EFE5]/70 border-l-4 border-[#9C3B32] font-serif text-sm leading-relaxed text-[#0A1418] italic">
                      "{currentQuestion.stimulus}"
                    </div>
                  )}

                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#0A1418] leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Options Rendering: Branch between single_choice and true_false_group */}
                {currentQuestion.type === 'true_false_group' ? (
                  /* True/False Statements Table */
                  <div className="bg-white border border-[#0A1418]/15 divide-y divide-[#0A1418]/15">
                    {(currentQuestion.statements || []).map((st) => {
                      const userGroup = (selectedAnswers[currentQuestion.id] as TrueFalseGroupAnswer) || {};
                      const userVal = userGroup[st.id];

                      return (
                        <div
                          key={st.id}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F1]"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span className="font-mono font-bold text-sm text-[#9C3B32] shrink-0 mt-0.5">
                              {st.id.toUpperCase()})
                            </span>
                            <span className="font-sans text-sm sm:text-base text-[#0A1418] leading-relaxed">
                              {st.statement}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => handleSelectStatement(currentQuestion.id, st.id, true)}
                              className={`px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer border ${
                                userVal === true
                                  ? 'bg-[#1B4931] text-white border-[#1B4931] shadow-xs'
                                  : 'bg-transparent text-[#1B4931] border-[#1B4931]/40 hover:bg-[#1B4931]/10'
                              }`}
                            >
                              ✓ ĐÚNG
                            </button>
                            <button
                              onClick={() => handleSelectStatement(currentQuestion.id, st.id, false)}
                              className={`px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer border ${
                                userVal === false
                                  ? 'bg-[#9C3B32] text-white border-[#9C3B32] shadow-xs'
                                  : 'bg-transparent text-[#9C3B32] border-[#9C3B32]/40 hover:bg-[#9C3B32]/10'
                              }`}
                            >
                              ✗ SAI
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Single Choice Options List */
                  <div className="space-y-3.5">
                    {(currentQuestion.options || []).map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectSingleOption(currentQuestion.id, optIdx)}
                          className={`p-4 sm:p-5 border-2 transition-all cursor-pointer flex items-start gap-4 select-none ${
                            isSelected
                              ? 'bg-[#F3EFE5] border-[#9C3B32] text-[#0A1418] shadow-sm font-semibold'
                              : 'bg-white border-[#0A1418]/15 hover:border-[#0A1418] text-[#0A1418] hover:bg-[#FAF8F1]'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'bg-[#9C3B32] text-white border-[#9C3B32]'
                                : 'bg-[#F3EFE5] text-[#0A1418] border-[#0A1418]/20'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span className="text-sm sm:text-base leading-snug">{option.slice(3)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="px-5 py-2.5 border border-[#0A1418]/20 text-[#0A1418] font-medium text-xs sm:text-sm hover:bg-[#F3EFE5] disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer font-mono uppercase"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                      className="px-6 py-2.5 bg-[#0A1418] hover:bg-[#1B2931] text-[#FAF8F1] font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs font-mono uppercase"
                    >
                      <span>Câu tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="px-7 py-2.5 bg-[#9C3B32] hover:bg-[#7e2e26] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-1.5 font-mono uppercase"
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
              <div className="p-8 sm:p-10 bg-white border-2 border-[#0A1418]/20 shadow-md text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 bg-[#9C3B32] text-[#FAF8F1] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Award className="w-9 h-9" />
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#0A1418]">
                  KẾT QUẢ BÀI THI LỊCH SỬ THPT
                </h3>
                <p className="text-xs font-mono text-[#687477] mt-1">
                  Đề: {exam.title}
                </p>

                {/* Score vs Initial Score comparison */}
                {initialExamScore && (
                  <div className="mt-2 text-xs font-mono font-bold text-[#1B4931] bg-[#1B4931]/10 px-3 py-1 inline-block">
                    ⚡ Điểm trước khi ôn lại: {initialExamScore} → Điểm hiện tại: {finalScore}
                  </div>
                )}

                <div className="my-6 flex items-center justify-center gap-8">
                  <div>
                    <span className="font-mono text-6xl sm:text-7xl font-black text-[#9C3B32]">
                      {finalScore}
                    </span>
                    <span className="text-xs font-mono text-[#687477] block">Thang điểm 10.0</span>
                  </div>

                  <div className="h-14 w-px bg-[#0A1418]/15"></div>

                  <div className="text-left font-mono text-sm sm:text-base space-y-1">
                    <div className="text-[#1B4931] font-bold">
                      ✓ Đúng hoàn toàn: {examScoreResult.fullyCorrectQuestionsCount}/{exam.questions.length} câu
                    </div>
                    <div className="text-[#9C3B32] font-medium">
                      ✗ Cần củng cố: {wrongQuestions.length}/{exam.questions.length} câu
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#F3EFE5] text-sm text-[#0A1418] font-medium max-w-lg mx-auto">
                  {wrongQuestions.length === 0 ? (
                    '🌟 Xuất sắc tuyệt đối! Em đã làm chủ 100% câu hỏi trong đề thi này và sẵn sàng bứt phá điểm 10 kỳ thi THPT!'
                  ) : Number(finalScore) >= 8.0 ? (
                    '🌟 Điểm giỏi xuất sắc! Em hãy nhấn nút "Ôn Lại Câu Sai" để khắc phục nốt các câu bẫy còn thiếu.'
                  ) : Number(finalScore) >= 6.5 ? (
                    '👍 Kết quả Khá! Em hãy đọc kỹ bảng đối chiếu giải thích bên dưới hoặc bấm ôn luyện lại riêng các câu làm sai.'
                  ) : (
                    '📖 Em cần củng cố lại các mốc lịch sử then chốt và tận dụng tính năng ôn luyện câu sai ngay dưới đây nhé!'
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                  {wrongQuestions.length > 0 ? (
                    <button
                      onClick={handleStartMistakeDrill}
                      className="px-6 py-3 bg-[#9C3B32] hover:bg-[#7e2e26] text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md font-mono uppercase active:scale-95"
                    >
                      <Zap className="w-4 h-4 text-[#E5C985]" />
                      <span>Ôn Lại {wrongQuestions.length} Câu Sai Ngay</span>
                    </button>
                  ) : (
                    <div className="px-5 py-2.5 bg-[#1B4931] text-white text-xs font-mono font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>ĐÃ NẮM VỮNG TOÀN BỘ ĐỀ THI</span>
                    </div>
                  )}

                  <button
                    onClick={handleRetake}
                    className="px-6 py-3 bg-[#0A1418] hover:bg-[#1B2931] text-[#FAF8F1] font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs font-mono uppercase"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Thi Lại Toàn Đề</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-[#0A1418]/30 text-[#0A1418] hover:bg-[#F3EFE5] font-semibold text-xs sm:text-sm transition-all cursor-pointer font-mono uppercase"
                  >
                    Trở Về Giảng Đường
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown for each question */}
              <div className="space-y-6 pt-4">
                <div className="border-b border-[#0A1418]/20 pb-3 flex items-center justify-between">
                  <h4 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
                    BẢNG ĐỐI CHIẾU & GIẢI THÍCH CHI TIẾT
                  </h4>
                  <span className="text-xs font-mono text-[#687477]">Chuẩn SGK & Đáp Án Bộ GD&ĐT</span>
                </div>

                {exam.questions.map((q, idx) => {
                  const isCorrect = isQuestionFullyCorrect(q, selectedAnswers);

                  return (
                    <div
                      key={q.id}
                      className={`p-6 sm:p-7 border-2 transition-all ${
                        isCorrect
                          ? 'bg-[#1B4931]/5 border-[#1B4931]/30'
                          : 'bg-[#9C3B32]/5 border-[#9C3B32]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-2.5">
                        <span className="text-[#0A1418]">CÂU HỎI {idx + 1} • {q.topic}</span>
                        {isCorrect ? (
                          <span className="text-[#1B4931] bg-[#1B4931]/15 px-2.5 py-0.5 flex items-center gap-1 font-bold">
                            <CheckCircle className="w-3.5 h-3.5" /> CHÍNH XÁC
                          </span>
                        ) : (
                          <span className="text-[#9C3B32] bg-[#9C3B32]/15 px-2.5 py-0.5 flex items-center gap-1 font-bold">
                            <AlertCircle className="w-3.5 h-3.5" /> CẦN ÔN LẠI
                          </span>
                        )}
                      </div>

                      {q.stimulus && (
                        <div className="p-3 bg-[#FAF8F1] border-l-3 border-[#9C3B32] font-serif text-xs italic text-[#0A1418] mb-3">
                          "{q.stimulus}"
                        </div>
                      )}

                      <p className="font-playfair text-base sm:text-lg font-bold text-[#0A1418] mb-4">
                        {q.question}
                      </p>

                      {/* Review Display: Branch between true_false_group and single_choice */}
                      {q.type === 'true_false_group' ? (
                        <div className="bg-white border border-[#0A1418]/15 divide-y divide-[#0A1418]/15 mb-4">
                          {(q.statements || []).map((st) => {
                            const userGroup = (selectedAnswers[q.id] as TrueFalseGroupAnswer) || {};
                            const userPick = userGroup[st.id];
                            const isMatch = userPick === st.isCorrect;

                            return (
                              <div key={st.id} className="p-3 text-xs sm:text-sm font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-start gap-2">
                                  <strong className="font-mono text-[#9C3B32]">{st.id.toUpperCase()})</strong>
                                  <span className="text-[#0A1418]">{st.statement}</span>
                                </div>
                                <div className="flex items-center gap-3 font-mono text-xs shrink-0 self-end sm:self-center">
                                  <span>Đáp án: <strong className="text-[#1B4931]">{st.isCorrect ? 'ĐÚNG' : 'SAI'}</strong></span>
                                  <span>Bạn chọn: <strong className={isMatch ? 'text-[#1B4931]' : 'text-[#9C3B32]'}>
                                    {userPick === true ? 'ĐÚNG' : userPick === false ? 'SAI' : 'CHƯA CHỌN'}
                                  </strong></span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm mb-4">
                          {(q.options || []).map((opt, optIndex) => {
                            const isRightAnswer = optIndex === q.correctAnswer;
                            const isStudentPick = selectedAnswers[q.id] === optIndex;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 border text-xs sm:text-sm font-sans flex items-start gap-2.5 ${
                                  isRightAnswer
                                    ? 'bg-[#1B4931]/20 border-[#1B4931] font-bold text-[#0A1418]'
                                    : isStudentPick
                                    ? 'bg-[#9C3B32]/20 border-[#9C3B32] font-bold text-[#0A1418]'
                                    : 'bg-white border-[#0A1418]/15 text-[#0A1418]'
                                }`}
                              >
                                <span className="font-mono font-bold shrink-0">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span>{opt.slice(3)}</span>
                                {isRightAnswer && <span className="ml-auto text-[#1B4931] font-mono text-xs">(ĐÁP ÁN ĐÚNG)</span>}
                                {isStudentPick && !isRightAnswer && <span className="ml-auto text-[#9C3B32] font-mono text-xs">(BẠN CHỌN)</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation Callout */}
                      <div className="p-4 bg-white border border-[#0A1418]/15 text-xs sm:text-sm text-[#0A1418]">
                        <strong className="text-[#9C3B32] block mb-1 font-mono uppercase text-xs">
                          💡 Căn Cứ Lịch Sử & Lời Giải Chuẩn SGK:
                        </strong>
                        <p className="leading-relaxed text-[#0A1418]/90">
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
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F1] p-7 border-2 border-[#9C3B32] shadow-2xl max-w-sm w-full text-center space-y-4">
            <h4 className="font-playfair text-lg font-bold text-[#0A1418]">
              Xác Nhận Nộp Bài Thi?
            </h4>
            <p className="text-sm text-[#0A1418]/80 font-sans">
              Bạn đã chọn <strong>{answeredCount}/{exam.questions.length}</strong> câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm số và lời giải chi tiết?
            </p>
            <div className="flex items-center gap-3 justify-center pt-2 font-mono uppercase">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-[#0A1418]/30 text-[#687477] text-xs font-semibold hover:bg-[#F3EFE5] cursor-pointer"
              >
                Làm Tiếp
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-[#9C3B32] hover:bg-[#7e2e26] text-white text-xs font-bold shadow cursor-pointer"
              >
                Đồng Ý Nộp Bài
              </button>
            </div>
          </div>
        </div>
      )}

    </div>,
    document.body
  );
};
