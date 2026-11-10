import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  useEffect(() => {
    if (event) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [event]);

  if (!event) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeUp"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#FAF8F1] rounded-none border border-[#0A1418] shadow-2xl overflow-hidden my-6 text-left"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A1418] text-[#FAF8F1] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#9C3B32] text-white font-mono text-xs font-black rounded-none">
              NĂM {event.year}
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#E5C985] font-bold">
              {event.periodLabel}
            </span>
            <span className="text-xs font-mono text-[#FAF8F1]/70">
              • Thời gian: {event.exactDate || event.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none bg-white/10 hover:bg-[#9C3B32] text-[#FAF8F1] hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            title="Đóng hồ sơ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Main Title & Tag */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9C3B32] font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Thời Gian Chính Xác: {event.exactDate || event.year}</span>
              <span className="mx-1">•</span>
              <span>Khối Lớp {event.gradeLevel === 'all' ? '11 & 12' : event.gradeLevel}</span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-[#0A1418] leading-tight">
              {event.title}
            </h2>
            <p className="mt-3 text-base text-[#0A1418]/85 font-sans leading-relaxed">
              {event.summary}
            </p>
          </div>

          {/* Archival Media: Standout Photo with Soft Vignette (Crisp Square Edge) */}
          <div className="rounded-none overflow-hidden image-standout bg-[#F3EFE5] group border border-[#0A1418]/20">
            <div className="relative aspect-21/9 w-full bg-stone-900 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white font-sans italic flex items-center justify-between">
                <span className="drop-shadow">{event.imageCaption}</span>
                <span className="shrink-0 text-[10px] font-mono font-bold text-[#E5C985] uppercase bg-black/40 px-2 py-0.5 rounded-none">
                  [ẢNH GỐC]
                </span>
              </div>
            </div>
          </div>

          {/* Content Columns: Context & Significance (Cardless Open Broadsheet Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* Column 1: Context & Key Points */}
            <div className="space-y-6">
              <div className="border-l-2 border-[#0A1418]/30 pl-4 space-y-2">
                <h3 className="font-playfair font-bold text-base text-[#0A1418] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#9C3B32]" />
                  <span>Bối Cảnh Lịch Sử</span>
                </h3>
                <p className="text-sm text-[#0A1418]/90 leading-relaxed font-sans">
                  {event.context}
                </p>
              </div>

              <div className="border-l-2 border-[#0A1418]/30 pl-4 space-y-3">
                <h3 className="font-playfair font-bold text-base text-[#0A1418] flex items-center gap-2">
                  <Flag className="w-4 h-4 text-[#9C3B32]" />
                  <span>Diễn Biến & Quyết Sách Then Chốt</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-[#0A1418]/90 font-sans">
                  {event.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#9C3B32] shrink-0 mt-0.5">
                        [{idx + 1}]
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Significance & Exam Tips */}
            <div className="space-y-6">
              <div className="border-l-2 border-[#0A1418]/30 pl-4 space-y-2">
                <h3 className="font-playfair font-bold text-base text-[#9C3B32] flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#9C3B32]" />
                  <span>Ý Nghĩa Lịch Sử To Lớn</span>
                </h3>
                <p className="text-sm text-[#0A1418]/90 leading-relaxed font-sans">
                  {event.significance}
                </p>
              </div>

              {/* Crucial Exam Tips */}
              <div className="border-l-3 border-[#9C3B32] bg-[#9C3B32]/5 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#9C3B32]">
                  <span>★ TRỌNG TÂM THI TỐT NGHIỆP THPT (TỪ KHÓA ĂN ĐIỂM)</span>
                </div>
                <p className="text-sm text-[#0A1418] font-medium leading-relaxed font-sans">
                  {event.examTips}
                </p>
              </div>

              {/* Key Figures */}
              <div className="border-l-2 border-[#0A1418]/30 pl-4 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-[#687477] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#486D5D]" />
                  <span>Nhân Vật Lịch Sử Gắn Liền:</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {event.keyFigures.map((fig, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#F3EFE5] text-[#0A1418] text-xs font-medium rounded-none font-mono border border-[#0A1418]/15"
                    >
                      {fig}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono uppercase border-t border-[#0A1418]/15">
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-mono text-[#687477] bg-[#F3EFE5] px-2.5 py-1 rounded-none border border-[#0A1418]/10">
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
                className="w-1/2 sm:w-auto px-4 py-2.5 bg-transparent border border-[#0A1418]/30 hover:border-[#0A1418] text-[#0A1418] text-xs sm:text-sm font-semibold transition-colors cursor-pointer rounded-none flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#9C3B32]" />
                <span>Tài Liệu Mốc Này</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onGoToQuiz(event.relatedQuizId);
                }}
                className="w-1/2 sm:w-auto px-5 py-2.5 bg-[#9C3B32] hover:bg-[#7e2e26] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer rounded-none"
              >
                <span>Luyện Trắc Nghiệm Ngay</span>
                <ExternalLink className="w-4 h-4 text-[#E5C985]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};
