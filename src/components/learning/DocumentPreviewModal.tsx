import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, AlertTriangle, Copy, Check, BookOpen, Clock, FileText } from 'lucide-react';
import type { CurriculumResource } from '../../data/curriculumData';

export interface DocumentPreviewModalProps {
  isOpen: boolean;
  resource: CurriculumResource | null;
  onClose: () => void;
  onDownload: (res: CurriculumResource) => void;
  onOpenReport: (res: CurriculumResource) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  resource,
  onClose,
  onDownload,
  onOpenReport,
}) => {
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Focus lock and Escape key listener
  useEffect(() => {
    if (!isOpen || !resource) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, resource, onClose]);

  // Lock background body scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !resource) return null;

  const preview = resource.fullContentPreview;

  const handleCopySummary = () => {
    const text = `TÀI LIỆU LỊCH SỬ THPT • THẦY NGUYỄN VƯƠNG GIA
Tên: ${resource.title}
Khối lớp: ${resource.grade} | Phân kỳ: ${resource.period}
Tác giả: ${resource.author}
Tóm tắt: ${resource.description}
Thời gian khuyến nghị: ${preview?.estimatedStudyTimeMinutes || 45} phút`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const modalJsx = (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-[#FAF8F1] border border-[#0A1418]/25 shadow-2xl flex flex-col overflow-hidden text-[#0A1418]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#0A1418]/15 bg-[#F3EFE5]/50 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
              <span className="px-2 py-0.5 bg-[#0A1418] text-[#FAF8F1] text-[10px] uppercase">
                {resource.format} • {resource.fileSize}
              </span>
              <span className="text-[#9C3B32] uppercase">
                KHỐI {resource.grade} • {resource.period}
              </span>
              <span className="text-[#687477]">
                • Ngày đăng: {resource.createdAt}
              </span>
            </div>
            <h3
              id="preview-modal-title"
              className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418] leading-tight"
            >
              {resource.title}
            </h3>
            <p className="text-xs font-sans text-[#687477]">
              Biên soạn & Giảng dạy: <strong className="text-[#0A1418]">{resource.author}</strong>
            </p>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 text-[#0A1418]/70 hover:text-[#9C3B32] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-8 divide-y divide-[#0A1418]/10">
          
          {/* Section: Overview & Teacher Note */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9C3B32] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>DẶN DÒ TỪ THẦY NGUYỄN VƯƠNG GIA</span>
            </div>
            <div className="p-4 bg-[#F3EFE5]/70 border-l-3 border-[#9C3B32] font-serif text-sm leading-relaxed text-[#0A1418] italic">
              "{preview?.teacherNote || resource.description}"
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#687477]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C69A47]" />
                <span>Thời gian tự học dự kiến: <strong>{preview?.estimatedStudyTimeMinutes || 45} phút</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#9C3B32]" />
                <span>Lượt tải học liệu: <strong>{resource.downloadsCount.toLocaleString()}</strong></span>
              </span>
            </div>
          </div>

          {/* Section: Bloom Knowledge Matrix Breakdown */}
          {preview?.matrix && preview.matrix.length > 0 && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold tracking-wider text-[#0A1418] uppercase">
                  MA TRẬN NĂNG LỰC TƯ DUY (CHUẨN BLOOM)
                </h4>
                <span className="text-[11px] font-mono text-[#687477]">
                  Tổng 100% Ma Trận Đề
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {preview.matrix.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF8F1] border border-[#0A1418]/15 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold flex items-center gap-1" style={{ color: m.color }}>
                        <span>{m.symbol}</span>
                        <span>{m.level}</span>
                      </span>
                      <span className="font-bold text-[#0A1418]">{m.percent}%</span>
                    </div>
                    <div className="w-full bg-[#0A1418]/10 h-1.5">
                      <div
                        className="h-1.5"
                        style={{ width: `${m.percent}%`, backgroundColor: m.color }}
                      />
                    </div>
                    <p className="text-[11px] font-mono text-[#687477]">
                      {m.questionCount} câu hỏi / yêu cầu
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Sections Outline */}
          {preview?.sections && preview.sections.length > 0 && (
            <div className="pt-6 space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0A1418] uppercase">
                CẤU TRÚC CHI TIẾT CÁC PHẦN BÀI HỌC
              </h4>

              <div className="space-y-4">
                {preview.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="space-y-2">
                    <div className="font-playfair font-bold text-base text-[#0A1418] flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#9C3B32]">[{secIdx + 1}]</span>
                      <span>{sec.sectionTitle}</span>
                      {sec.sectionSubtitle && (
                        <span className="text-xs font-normal font-sans text-[#687477]">({sec.sectionSubtitle})</span>
                      )}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#0A1418]/90 pl-2">
                      {sec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                    {sec.answerKeyExcerpt && (
                      <div className="p-2.5 bg-black/5 font-mono text-xs text-[#9C3B32] font-semibold border-l-2 border-[#9C3B32]">
                        Trích đoạn đáp án: {sec.answerKeyExcerpt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Sample Questions with Bloom cognitive levels */}
          {preview?.sampleQuestions && preview.sampleQuestions.length > 0 && (
            <div className="pt-6 space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0A1418] uppercase">
                TRÍCH ĐOẠN CÂU HỎI MẪU & HƯỚNG DẪN GIẢI
              </h4>

              <div className="space-y-4">
                {preview.sampleQuestions.map((q) => (
                  <div key={q.num} className="p-4 bg-[#F3EFE5]/40 border border-[#0A1418]/15 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-[#9C3B32]">CÂU {q.num}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-black/5 text-[#0A1418] font-bold text-[10px]">
                        CẤP ĐỘ: {q.cognitiveLevel.toUpperCase()}
                      </span>
                    </div>

                    <p className="font-serif text-sm font-semibold text-[#0A1418] leading-relaxed">
                      {q.stem}
                    </p>

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-sans text-[#0A1418]/80">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="p-2 bg-[#FAF8F1] border border-[#0A1418]/10">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs font-sans text-[#486D5D] pt-1">
                      <strong>💡 Chỉ dẫn của Thầy:</strong> {q.guide}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights checklist */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#0A1418] uppercase">
              ĐIỂM NHẤN CỦA HỌC LIỆU NÀY
            </h4>
            <div className="flex flex-wrap gap-2">
              {resource.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#F3EFE5] border border-[#0A1418]/15 text-xs font-mono text-[#0A1418]"
                >
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer - Actions */}
        <div className="p-4 sm:p-5 border-t border-[#0A1418]/15 bg-[#F3EFE5]/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-2 bg-transparent border border-[#0A1418]/25 hover:border-[#0A1418] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã Sao Chép' : 'Sao Chép Tóm Tắt'}</span>
            </button>

            <button
              onClick={() => onOpenReport(resource)}
              className="px-3 py-2 bg-transparent border border-[#0A1418]/25 hover:border-[#9C3B32] text-xs font-mono text-[#687477] hover:text-[#9C3B32] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
              <span className="hidden sm:inline">Báo Sai Sót</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-transparent text-xs font-mono uppercase text-[#687477] hover:text-[#0A1418] cursor-pointer"
            >
              Đóng Lại
            </button>

            <button
              onClick={() => onDownload(resource)}
              className="px-5 py-2 bg-[#9C3B32] hover:bg-[#7e2e26] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Bản Đầy Đủ</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalJsx, document.body);
};
