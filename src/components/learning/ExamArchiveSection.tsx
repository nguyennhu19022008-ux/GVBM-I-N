import React from 'react';
import { FileText, Download, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { CurriculumResource } from '../../data/curriculumData';

interface ExamArchiveSectionProps {
  resources: CurriculumResource[];
  onReportIssue: (res: CurriculumResource) => void;
  onDownload: (res: CurriculumResource) => void;
}

export const ExamArchiveSection: React.FC<ExamArchiveSectionProps> = ({
  resources,
  onReportIssue,
  onDownload,
}) => {
  const examItems = resources.filter((r) => r.category === 'exam');

  if (examItems.length === 0) {
    return (
      <div className="py-12 text-center text-[#687477] font-mono text-xs bg-[#F3EFE5]/40 rounded-2xl p-8">
        Chưa có đề thi hoặc đề ôn tập cho tiêu chí này. Thầy sẽ tải lên thêm sớm!
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Section Sub-Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#9C3B32]" />
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Sổ Lưu Chiểu Đề Ôn Tập & Đề Thi Chuẩn Ma Trận
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#9C3B32]">
          {examItems.length} BỘ ĐỀ HOÀN CHỈNH KÈM ĐÁP ÁN
        </span>
      </div>

      {/* Modern Elevated Rows (Zero Dividing Lines) */}
      <div className="space-y-3">
        {examItems.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#F3EFE5]/50 hover:bg-[#F3EFE5] transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left: Index & Content */}
            <div className="flex items-start gap-5 max-w-4xl">
              {/* Huge Editorial Index */}
              <span className="font-playfair text-3xl sm:text-4xl font-black text-[#9C3B32]/60 shrink-0 w-12 text-right">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#9C3B32] text-white font-bold text-[10px] rounded">
                    {item.format} • {item.fileSize}
                  </span>
                  <span className="text-[#C69A47] font-bold uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>KÈM BẢNG ĐÁP ÁN & LỜI GIẢI THÍCH</span>
                  </span>
                  <span className="text-[#687477]">
                    • Đăng ngày: {item.createdAt}
                  </span>
                </div>

                <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#0A1418] leading-snug">
                  {item.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-[#687477] leading-relaxed max-w-3xl">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#0A1418]">
                  {item.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="flex items-center gap-1.5 text-[11px] font-mono text-[#0A1418]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C69A47]" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
              <button
                onClick={() => onReportIssue(item)}
                className="px-3.5 py-2 bg-white/70 hover:bg-white text-xs font-mono uppercase transition-colors cursor-pointer rounded-xl flex items-center gap-1.5 shadow-2xs hover:text-[#9C3B32]"
                title="Báo cáo câu hỏi có vấn đề hoặc sai đáp án"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span className="hidden sm:inline">Báo Sai Đề</span>
              </button>

              <button
                onClick={() => onDownload(item)}
                className="px-5 py-2.5 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer rounded-xl shadow-xs active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#E5C985]" />
                <span>Tải Đề Kèm Đáp Án</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
