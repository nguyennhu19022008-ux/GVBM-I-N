import React, { useState } from 'react';
import { Trash2, Pencil, Eye, X, FileText } from 'lucide-react';
import type { CurriculumResource, GradeLevel } from '../../data/curriculumData';

interface DocumentManagerTableProps {
  resources: CurriculumResource[];
  onDeleteResource: (id: string) => void;
  onEditResource?: (res: CurriculumResource) => void;
}

export const DocumentManagerTable: React.FC<DocumentManagerTableProps> = ({
  resources,
  onDeleteResource,
  onEditResource,
}) => {
  const [filterGrade, setFilterGrade] = useState<GradeLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<CurriculumResource | null>(null);

  const filtered = resources.filter((r) => {
    if (filterGrade !== 'all' && r.grade !== filterGrade) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.period.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-6 border-y border-[rgba(16,37,43,0.16)] text-left space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 hairline-b">
        <div>
          <h4 className="font-playfair text-xl font-bold text-[#0A1418]">
            Quản Lý Danh Mục Tài Liệu Đã Phát Hành
          </h4>
          <p className="text-xs font-mono text-[#687477]">
            TỔNG CỘNG: {resources.length} HỌC LIỆU TRÊN TOÀN HỆ THỐNG
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex items-center gap-2">
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value as GradeLevel | 'all')}
            className="px-2.5 py-1.5 bg-[#FAF8F1] border border-[rgba(16,37,43,0.25)] text-xs font-mono outline-none text-[#0A1418]"
          >
            <option value="all">Tất cả khối</option>
            <option value="12">Khối 12</option>
            <option value="11">Khối 11</option>
            <option value="10">Khối 10</option>
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tài liệu..."
            className="px-2.5 py-1.5 bg-[#FAF8F1] border border-[rgba(16,37,43,0.25)] text-xs outline-none w-36 sm:w-48 font-sans text-[#0A1418]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#F3EFE5] border-b border-[rgba(16,37,43,0.16)] font-mono text-[#687477] uppercase text-[11px]">
              <th className="py-2.5 px-3">Khối</th>
              <th className="py-2.5 px-3">Định Dạng</th>
              <th className="py-2.5 px-3">Tiêu Đề Tài Liệu</th>
              <th className="py-2.5 px-3">Phân Loại</th>
              <th className="py-2.5 px-3">Ngày Đăng</th>
              <th className="py-2.5 px-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(16,37,43,0.1)]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#F3EFE5]/50 transition-colors">
                <td className="py-2.5 px-3 font-mono font-bold text-[#9C3B32]">
                  Lớp {item.grade}
                </td>
                <td className="py-2.5 px-3">
                  <span className="px-1.5 py-0.5 bg-[#0A1418] text-white text-[10px] font-mono">
                    {item.format}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-medium text-[#0A1418] max-w-xs truncate">
                  {item.title}
                </td>
                <td className="py-2.5 px-3 font-mono text-[#687477] uppercase text-[11px]">
                  {item.category === 'homework' ? 'Bài tập về nhà' : item.category === 'exam' ? 'Đề ôn thi' : 'Slide bài giảng'}
                </td>
                <td className="py-2.5 px-3 font-mono text-[#687477]">
                  {item.createdAt}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* View Details */}
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="p-1 text-[#0A1418]/70 hover:text-[#0A1418] transition-colors cursor-pointer"
                      title="Xem chi tiết tài liệu"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit Document */}
                    {onEditResource && (
                      <button
                        onClick={() => onEditResource(item)}
                        className="p-1 text-[#486D5D] hover:text-[#1B4931] transition-colors cursor-pointer"
                        title="Hiệu đính / Chỉnh sửa tài liệu"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}

                    {/* Delete Document */}
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn xóa tài liệu "${item.title}" không?`)) {
                          onDeleteResource(item.id);
                        }
                      }}
                      className="p-1 text-[#9C3B32] hover:text-[#7e2e26] transition-colors cursor-pointer"
                      title="Xóa tài liệu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-[#0A1418]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#FAF8F1] border border-[#0A1418]/30 shadow-2xl p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 hairline-b">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#9C3B32]" />
                <span className="font-mono text-xs uppercase text-[#9C3B32] font-bold">
                  Chi Tiết Học Liệu (Lớp {previewItem.grade})
                </span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 hover:bg-[#0A1418]/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-playfair text-xl font-bold text-[#0A1418]">
              {previewItem.title}
            </h3>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#687477]">
              <span className="px-2 py-0.5 bg-[#F3EFE5] border border-[#0A1418]/10 text-[#0A1418]">
                Định dạng: {previewItem.format} ({previewItem.fileSize})
              </span>
              <span className="px-2 py-0.5 bg-[#F3EFE5] border border-[#0A1418]/10 text-[#0A1418]">
                Thời kỳ: {previewItem.period}
              </span>
              <span className="px-2 py-0.5 bg-[#F3EFE5] border border-[#0A1418]/10 text-[#0A1418]">
                Tác giả: {previewItem.author}
              </span>
              <span className="px-2 py-0.5 bg-[#F3EFE5] border border-[#0A1418]/10 text-[#0A1418]">
                Ngày đăng: {previewItem.createdAt}
              </span>
            </div>

            <div className="p-3 bg-white border border-[#0A1418]/15 text-xs font-sans text-[#0A1418] leading-relaxed">
              <strong>Tóm tắt nội dung:</strong> {previewItem.description}
            </div>

            {previewItem.fullContentPreview?.teacherNote && (
              <div className="p-3 bg-[#486D5D]/10 border border-[#486D5D]/30 text-xs font-sans text-[#486D5D] leading-relaxed">
                <strong>Lời dặn của Thầy:</strong> {previewItem.fullContentPreview.teacherNote}
              </div>
            )}

            {previewItem.highlights && previewItem.highlights.length > 0 && (
              <div>
                <span className="block text-xs font-mono uppercase font-bold text-[#0A1418] mb-1.5">
                  Điểm nhấn học liệu:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {previewItem.highlights.map((h, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#F3EFE5] text-[11px] font-mono border border-[#0A1418]/15 text-[#0A1418]">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              {onEditResource && (
                <button
                  onClick={() => {
                    const toEdit = previewItem;
                    setPreviewItem(null);
                    onEditResource(toEdit);
                  }}
                  className="px-4 py-1.5 bg-[#486D5D] hover:bg-[#3b594b] text-white text-xs font-mono uppercase font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Chỉnh Sửa Tài Liệu Này</span>
                </button>
              )}
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-1.5 border border-[#0A1418] text-xs font-mono uppercase hover:bg-[#0A1418]/5 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
