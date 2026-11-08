import React from 'react';
import { X, Calendar, Flag, BookOpen, User, Lightbulb, ExternalLink, Download } from 'lucide-react';
import type { TimelineEvent } from '../data/historyData';

interface TimelineDetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onGoToQuiz: (quizId?: string) => void;
  onGoToDownload: (resourceId?: string) => void;
}

export const TimelineDetailModal: React.FC<TimelineDetailModalProps> = ({
  event,
  onClose,
  onGoToQuiz,
  onGoToDownload,
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeUp">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF3E0] border-2 border-[#D4A373] rounded-sm shadow-2xl overflow-hidden my-6 text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#4A2508] text-[#FAF3E0] px-6 py-4 flex items-center justify-between hairline-b">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#780000] text-white font-mono text-xs font-black rounded-xs">
              NĂM {event.year}
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#D4A373] font-bold">
              {event.periodLabel}
            </span>
            <span className="text-xs font-mono text-stone-300">
              • Thời gian: {event.exactDate || event.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#FAF3E0] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title="Đóng hồ sơ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Main Title & Tag */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#780000] font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Thời Gian Chính Xác: {event.exactDate || event.year}</span>
              <span className="mx-1">•</span>
              <span>Khối Lớp {event.gradeLevel === 'all' ? '11 & 12' : event.gradeLevel}</span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#4A2508] leading-tight">
              {event.title}
            </h2>
            <p className="mt-3 text-base text-[#18120E]/85 font-sans leading-relaxed">
              {event.summary}
            </p>
          </div>

          {/* Archival Media Frame */}
          <div className="archival-frame shadow-xs">
            <div className="relative aspect-21/9 w-full bg-stone-900 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>
            <div className="p-3 text-xs text-[#4A2508] font-sans italic border-t border-[#D4A373]/30 bg-[#F2E4C6]/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#780000] shrink-0"></span>
              <span>{event.imageCaption}</span>
            </div>
          </div>

          {/* Content Columns: Context & Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* Column 1: Context & Key Points */}
            <div className="space-y-4">
              <div className="p-5 rounded-xs bg-[#FAF3E0] border-l-4 border-[#4A2508] border border-[#D4A373]/30">
                <h3 className="font-playfair font-bold text-base text-[#4A2508] mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#780000]" />
                  <span>Bối Cảnh Lịch Sử</span>
                </h3>
                <p className="text-sm text-[#18120E]/90 leading-relaxed">
                  {event.context}
                </p>
              </div>

              <div>
                <h3 className="font-playfair font-bold text-base text-[#4A2508] mb-3 flex items-center gap-2">
                  <Flag className="w-4 h-4 text-[#780000]" />
                  <span>Diễn Biến & Quyết Sách Then Chốt</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-[#18120E]/90">
                  {event.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#780000] shrink-0 mt-0.5">
                        [{idx + 1}]
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Significance & Exam Tips */}
            <div className="space-y-4">
              <div className="p-5 rounded-xs bg-[#FAF3E0] border-l-4 border-[#780000] border border-[#D4A373]/30">
                <h3 className="font-playfair font-bold text-base text-[#780000] mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#780000]" />
                  <span>Ý Nghĩa Lịch Sử To Lớn</span>
                </h3>
                <p className="text-sm text-[#18120E]/90 leading-relaxed">
                  {event.significance}
                </p>
              </div>

              {/* Crucial Exam Tips */}
              <div className="p-5 rounded-xs bg-[#780000]/10 border border-[#780000]/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#780000] mb-1.5">
                  <span>★ TRỌNG TÂM THI TỐT NGHIỆP THPT (TỪ KHÓA ĂN ĐIỂM)</span>
                </div>
                <p className="text-sm text-[#4A2508] font-medium leading-relaxed">
                  {event.examTips}
                </p>
              </div>

              {/* Key Figures */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-[#4A2508]/70 mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Nhân Vật Lịch Sử Gắn Liền:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.keyFigures.map((fig, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-2xs bg-white text-[#4A2508] text-xs font-medium border border-[#D4A373]/50 shadow-2xs"
                    >
                      {fig}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-6 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-mono text-[#4A2508]/70 bg-stone-100 px-2.5 py-0.5">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onGoToDownload(event.relatedResourceId);
                }}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-sm border border-[#4A2508]/40 text-[#4A2508] hover:bg-[#F2E4C6] text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#780000]" />
                <span>Tài Liệu Mốc Này</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onGoToQuiz(event.relatedQuizId);
                }}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-sm bg-[#780000] hover:bg-[#580000] text-white text-xs sm:text-sm font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Luyện Trắc Nghiệm Ngay</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
