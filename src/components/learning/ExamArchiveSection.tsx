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
      <div className="py-10 text-center text-[#687477] font-mono text-xs bg-[#F3EFE5]/40 border-l-3 border-[#9C3B32] p-6 text-left">
        Chưa có đề thi hoặc đề ôn tập phù hợp với tiêu chí lọc này. Thầy sẽ cập nhật thêm sớm!
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Section Sub-Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#0A1418]/15">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 bg-[#9C3B32] text-white text-xs font-mono font-bold tracking-wider">
            [ ✦ ĐỀ THI MA TRẬN ]
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0A1418]">
            Sổ Lưu Chiểu Đề Ôn Tập & Đề Thi Chuẩn Ma Trận Bộ GD&ĐT
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#9C3B32]">
          {examItems.length} BỘ ĐỀ KÈM ĐÁP ÁN
        </span>
      </div>

      {/* Cardless Open Editorial Rows */}
      <div className="divide-y divide-[#0A1418]/15 border-b border-[#0A1418]/20">
        {examItems.map((item, idx) => {
          const isBookmarked = bookmarkedIds.includes(item.id);
          const isCompleted = completedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`py-6 px-2 sm:px-4 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                isCompleted ? 'bg-[#9C3B32]/5' : 'hover:bg-[#F3EFE5]/40'
              }`}
            >
              {/* Left: Star, Index & Content */}
              <div className="flex items-start gap-4 max-w-4xl">
                
                {/* Bookmark Button */}
                <button
                  onClick={() => onToggleBookmark(item.id)}
                  className={`mt-1 p-1 transition-colors cursor-pointer ${
                    isBookmarked ? 'text-[#B47818]' : 'text-[#687477]/50 hover:text-[#B47818]'
                  }`}
                  title={isBookmarked ? 'Bỏ lưu tài liệu' : 'Lưu tài liệu ôn tập'}
                  aria-label={isBookmarked ? 'Bỏ lưu tài liệu' : 'Lưu tài liệu ôn tập'}
                >
                  <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                {/* Huge Editorial Index */}
                <span className="font-playfair text-3xl sm:text-4xl font-black text-[#9C3B32]/70 shrink-0 w-10 text-right">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 bg-[#9C3B32] text-white font-bold text-[10px]">
                      {item.format} • {item.fileSize}
                    </span>
                    <span className="text-[#B47818] font-bold uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>KÈM BẢNG ĐÁP ÁN & MA TRẬN ĐỀ</span>
                    </span>
                    <span className="text-[#687477]">
                      • Đăng ngày: {item.createdAt}
                    </span>
                    {isCompleted && (
                      <span className="px-2 py-0.5 bg-[#1B4931]/15 text-[#1B4931] font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ĐÃ HOÀN THÀNH
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

              {/* Right: Actions */}
              <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-center shrink-0">
                
                {/* Toggle Completed */}
                <button
                  onClick={() => onToggleComplete(item.id)}
                  className={`px-3 py-2 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 border ${
                    isCompleted
                      ? 'bg-[#1B4931] text-white border-[#1B4931]'
                      : 'bg-transparent text-[#687477] border-[#0A1418]/20 hover:border-[#1B4931] hover:text-[#1B4931]'
                  }`}
                  title="Đánh dấu đã giải đề này"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Đã Xong' : 'Đánh Dấu Xong'}</span>
                </button>

                {/* Preview / Read Full Content & Matrix */}
                <button
                  onClick={() => onPreview(item)}
                  className="px-3.5 py-2 bg-transparent border border-[#0A1418]/25 hover:border-[#9C3B32] hover:bg-[#9C3B32]/10 text-xs font-mono text-[#0A1418] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#9C3B32]" />
                  <span>Xem Ma Trận</span>
                </button>

                {/* Report Issue */}
                <button
                  onClick={() => onReportIssue(item)}
                  className="p-2 bg-transparent border border-[#0A1418]/20 hover:border-[#9C3B32] text-xs font-mono transition-colors cursor-pointer hover:text-[#9C3B32]"
                  title="Báo cáo sai đáp án hoặc lỗi đề"
                  aria-label="Báo cáo sai đáp án hoặc lỗi đề"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#9C3B32]" />
                </button>

                {/* Download */}
                <button
                  onClick={() => onDownload(item)}
                  className="px-4 py-2 bg-[#0A1418] hover:bg-[#9C3B32] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#E5C985]" />
                  <span>Tải Đề</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
