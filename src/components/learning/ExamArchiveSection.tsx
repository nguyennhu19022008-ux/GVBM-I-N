import React from 'react';
import { Download, AlertTriangle, CheckCircle2, ShieldCheck, Star, Eye } from 'lucide-react';
import type { CurriculumResource } from '../../data/curriculumData';

export interface ExamArchiveSectionProps {
  resources: CurriculumResource[];
  bookmarkedIds: string[];
  completedIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onPreview: (res: CurriculumResource) => void;
  onReportIssue: (res: CurriculumResource) => void;
  onDownload: (res: CurriculumResource) => void;
}

export const ExamArchiveSection: React.FC<ExamArchiveSectionProps> = ({
  resources,
  bookmarkedIds,
  completedIds,
  onToggleBookmark,
  onToggleComplete,
  onPreview,
  onReportIssue,
  onDownload,
}) => {
  const examItems = resources.filter((r) => r.category === 'exam');

  if (examItems.length === 0) {
    return (
      <div className="py-8 px-6 rounded-2xl bg-white/65 border border-[#0A1418]/10 text-left text-[#687477] font-sans text-sm">
        Chưa có đề thi hoặc đề ôn tập phù hợp với tiêu chí lọc này. Giáo viên sẽ cập nhật thêm sớm!
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Section Sub-Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#0A1418]/12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#9C3B32]/12 text-[#9C3B32] text-xs font-mono font-bold tracking-wider">
            Đề thi ma trận
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Kho Đề Ôn Tập & Đề Thi Chuẩn Ma Trận Bộ GD&ĐT
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#9C3B32]">
          {examItems.length} bộ đề kèm đáp án
        </span>
      </div>

      {/* Soft Open Rows */}
      <div className="divide-y divide-[#0A1418]/10">
        {examItems.map((item, idx) => {
          const isBookmarked = bookmarkedIds.includes(item.id);
          const isCompleted = completedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`py-6 px-4 rounded-2xl transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isCompleted ? 'bg-[#9C3B32]/5' : 'hover:bg-white/70'
              }`}
            >
              {/* Left: Star, Index & Content */}
              <div className="flex items-start gap-4 max-w-4xl">
                
                {/* Bookmark Button */}
                <button
                  onClick={() => onToggleBookmark(item.id)}
                  className={`mt-1 p-1.5 rounded-full transition-colors cursor-pointer ${
                    isBookmarked ? 'text-[#B47818] bg-[#B47818]/10' : 'text-[#687477]/50 hover:text-[#B47818] hover:bg-[#0A1418]/5'
                  }`}
                  title={isBookmarked ? 'Bỏ lưu tài liệu' : 'Lưu tài liệu ôn tập'}
                  aria-label={isBookmarked ? 'Bỏ lưu tài liệu' : 'Lưu tài liệu ôn tập'}
                >
                  <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                {/* Editorial Index */}
                <span className="font-playfair text-3xl sm:text-4xl font-black text-[#9C3B32]/65 shrink-0 w-10 text-right">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#9C3B32]/12 text-[#9C3B32] font-bold text-[11px]">
                      {item.format} • {item.fileSize}
                    </span>
                    <span className="text-[#B47818] font-bold uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Kèm bảng đáp án & ma trận</span>
                    </span>
                    <span className="text-[#687477]">
                      • Đăng ngày: {item.createdAt}
                    </span>
                    {isCompleted && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1B4931] text-white font-bold text-[10px] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                      </span>
                    )}
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9C3B32]" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Clean Actions (Borderless ghost pills + 1 Primary pill CTA) */}
              <div className="flex flex-wrap items-center gap-2 self-end lg:self-center shrink-0">
                
                {/* Toggle Completed */}
                <button
                  onClick={() => onToggleComplete(item.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isCompleted
                      ? 'bg-[#1B4931] text-white'
                      : 'text-[#687477] hover:bg-[#1B4931]/10 hover:text-[#1B4931]'
                  }`}
                  title="Đánh dấu đã giải đề này"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Đã xong' : 'Đánh dấu xong'}</span>
                </button>

                {/* Preview / Read Full Content & Matrix */}
                <button
                  onClick={() => onPreview(item)}
                  className="px-3.5 py-2 rounded-full text-xs font-sans font-semibold text-[#0A1418] hover:bg-[#0A1418]/6 hover:text-[#9C3B32] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#9C3B32]" />
                  <span>Xem ma trận</span>
                </button>

                {/* Report Issue */}
                <button
                  onClick={() => onReportIssue(item)}
                  className="p-2 rounded-full text-xs font-sans transition-colors cursor-pointer text-[#687477] hover:bg-[#9C3B32]/10 hover:text-[#9C3B32]"
                  title="Báo cáo sai đáp án hoặc lỗi đề"
                  aria-label="Báo cáo sai đáp án hoặc lỗi đề"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                </button>

                {/* Download Primary Pill CTA */}
                <button
                  onClick={() => onDownload(item)}
                  className="px-5 py-2 rounded-full bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#E5C985]" />
                  <span>Tải đề</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
