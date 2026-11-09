import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { CurriculumResource, GradeLevel } from '../../data/curriculumData';

interface DocumentManagerTableProps {
  resources: CurriculumResource[];
  onDeleteResource: (id: string) => void;
}

export const DocumentManagerTable: React.FC<DocumentManagerTableProps> = ({
  resources,
  onDeleteResource,
}) => {
  const [filterGrade, setFilterGrade] = useState<GradeLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = resources.filter((r) => {
    if (filterGrade !== 'all' && r.grade !== filterGrade) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.period.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-6 border-y border-[#1A1615]/30 text-left space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 hairline-b">
        <div>
          <h4 className="font-playfair text-xl font-bold text-[#1A1615]">
            Quản Lý Danh Mục Tài Liệu Đã Phát Hành
          </h4>
          <p className="text-xs font-mono text-[#4A3E3D]">
            TỔNG CỘNG: {resources.length} HỌC LIỆU TRÊN TOÀN HỆ THỐNG
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex items-center gap-2">
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value as GradeLevel | 'all')}
            className="px-2.5 py-1.5 bg-[#F6F0E4] border border-[#1A1615]/30 text-xs font-mono outline-none"
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
            className="px-2.5 py-1.5 bg-[#F6F0E4] border border-[#1A1615]/30 text-xs outline-none w-36 sm:w-48 font-sans"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#ECE3D0]/60 border-b border-[#1A1615]/20 font-mono text-[#4A3E3D] uppercase text-[11px]">
              <th className="py-2.5 px-3">Khối</th>
              <th className="py-2.5 px-3">Định Dạng</th>
              <th className="py-2.5 px-3">Tiêu Đề Tài Liệu</th>
              <th className="py-2.5 px-3">Phân Loại</th>
              <th className="py-2.5 px-3">Ngày Đăng</th>
              <th className="py-2.5 px-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1615]/10">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#F6F0E4]/50 transition-colors">
                <td className="py-2.5 px-3 font-mono font-bold text-[#8B0000]">
                  Lớp {item.grade}
                </td>
                <td className="py-2.5 px-3">
                  <span className="px-1.5 py-0.5 bg-[#1A1615] text-white text-[10px] font-mono">
                    {item.format}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-medium text-[#1A1615] max-w-xs truncate">
                  {item.title}
                </td>
                <td className="py-2.5 px-3 font-mono text-[#4A3E3D] uppercase text-[11px]">
                  {item.category === 'homework' ? 'Bài tập về nhà' : item.category === 'exam' ? 'Đề ôn thi' : 'Slide bài giảng'}
                </td>
                <td className="py-2.5 px-3 font-mono text-[#4A3E3D]">
                  {item.createdAt}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => {
                      if (confirm(`Bạn có chắc chắn muốn xóa tài liệu "${item.title}" không?`)) {
                        onDeleteResource(item.id);
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                    title="Xóa tài liệu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
