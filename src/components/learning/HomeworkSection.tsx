import React from 'react';
import { BookOpen, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { CurriculumResource } from '../../data/curriculumData';

interface HomeworkSectionProps {
  resources: CurriculumResource[];
  onReportIssue: (res: CurriculumResource) => void;
  onDownload: (res: CurriculumResource) => void;
}

export const HomeworkSection: React.FC<HomeworkSectionProps> = ({
  resources,
  onReportIssue,
  onDownload,
}) => {
  const homeworkItems = resources.filter((r) => r.category === 'homework');

  if (homeworkItems.length === 0) {
    return (
      <div className="py-12 text-center text-[#687477] font-mono text-xs border border-dashed border-[#10252B]/30 p-8">
        Chưa có phiếu bài tập cho tiêu chí lọc này. Thầy sẽ cập nhật sớm!
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Section Sub-Header */}
      <div className="flex items-center justify-between pb-3 broadsheet-double-b">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#9C3B32]" />
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Sổ Lưu Chiểu Bài Tập Về Nhà & Rèn Luyện Tư Duy
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#9C3B32]">
          {homeworkItems.length} PHIẾU BÀI TẬP HIỆN HÀNH
        </span>
      </div>

      {/* Cardless Open Register Rows */}
      <div className="divide-y divide-[#10252B]/20 border-b border-[#10252B]/20">
        {homeworkItems.map((item, idx) => (
          <div
            key={item.id}
            className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#F3EFE5]/50 transition-colors px-2 -mx-2"
          >
            {/* Left: Index & Content */}
            <div className="flex items-start gap-5 max-w-4xl">
              {/* Huge Editorial Index */}
              <span className="font-playfair text-3xl sm:text-4xl font-black text-[#9C3B32]/60 shrink-0 w-12 text-right">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#0A1418] text-[#FAF8F1] font-bold text-[10px]">
                    {item.format} • {item.fileSize}
                  </span>
                  <span className="text-[#9C3B32] font-bold uppercase">
                    {item.period}
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

                {/* Highlights pill row */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#0A1418]">
                  {item.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="flex items-center gap-1.5 text-[11px] font-mono text-[#0A1418]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#486D5D]" />
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
                className="px-3 py-2 border border-[#10252B]/30 hover:border-[#9C3B32] hover:text-[#9C3B32] text-xs font-mono uppercase transition-colors cursor-pointer flex items-center gap-1"
                title="Báo cáo câu hỏi chưa chuẩn hoặc sai sót"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                <span className="hidden sm:inline">Báo Lỗi</span>
              </button>

              <button
                onClick={() => onDownload(item)}
                className="px-5 py-2.5 bg-[#9C3B32] hover:bg-[#7A2820] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 border border-[#E5C985]/30"
              >
                <Download className="w-4 h-4 text-[#E5C985]" />
                <span>Tải Phiếu (.DOCX)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
