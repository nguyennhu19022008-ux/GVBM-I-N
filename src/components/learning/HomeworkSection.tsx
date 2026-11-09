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
      <div className="py-12 text-center text-[#4A3E3D] font-mono text-xs border border-dashed border-[#1A1615]/30 p-8">
        Chưa có phiếu bài tập cho tiêu chí lọc này. Thầy sẽ cập nhật sớm!
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between pb-3 hairline-b">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#8B0000]" />
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1A1615]">
            Phiếu Bài Tập Về Nhà & Rèn Luyện Tư Duy
          </h3>
        </div>
        <span className="text-xs font-mono text-[#4A3E3D]">
          {homeworkItems.length} PHIẾU BÀI TẬP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworkItems.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white border border-[#1A1615]/20 hover:border-[#8B0000] transition-all paper-lift flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-[#ECE3D0] text-[#1A1615] font-bold">
                  {item.format} • {item.fileSize}
                </span>
                <span className="text-[#8B0000] font-semibold">{item.period}</span>
              </div>

              <h4 className="font-playfair text-lg font-bold text-[#1A1615] leading-snug">
                {item.title}
              </h4>

              <p className="font-sans text-xs sm:text-sm text-[#4A3E3D] leading-relaxed line-clamp-3">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="pt-2 space-y-1.5 text-xs text-[#1A1615]">
                {item.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-[#4A3E3D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 mt-4 hairline-t flex items-center justify-between gap-3">
              <button
                onClick={() => onReportIssue(item)}
                className="text-[11px] font-mono text-[#4A3E3D] hover:text-[#8B0000] flex items-center gap-1 cursor-pointer transition-colors"
                title="Báo cáo câu hỏi chưa chuẩn hoặc sai sót"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Báo Lỗi / Góp Ý</span>
              </button>

              <button
                onClick={() => onDownload(item)}
                className="px-4 py-2 bg-[#1A1615] hover:bg-[#8B0000] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Phiếu Về</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
