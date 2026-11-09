import React, { useState } from 'react';
import { UploadCloud, Plus, CheckCircle2 } from 'lucide-react';
import type { CurriculumResource, GradeLevel, ResourceCategory } from '../../data/curriculumData';

interface DocumentPublisherFormProps {
  onPublish: (newRes: CurriculumResource) => void;
}

export const DocumentPublisherForm: React.FC<DocumentPublisherFormProps> = ({ onPublish }) => {
  const [title, setTitle] = useState<string>('');
  const [grade, setGrade] = useState<GradeLevel>('12');
  const [category, setCategory] = useState<ResourceCategory>('homework');
  const [period, setPeriod] = useState<string>('Kháng chiến chống Mỹ cứu nước');
  const [format, setFormat] = useState<'DOCX' | 'PDF' | 'PPTX'>('DOCX');
  const [fileSize, setFileSize] = useState<string>('4.5 MB');
  const [description, setDescription] = useState<string>('');
  const [highlightsInput, setHighlightsInput] = useState<string>('Có đáp án chi tiết, Chuẩn ma trận đề thi, File in ấn rõ nét');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const highlights = highlightsInput
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    const newResource: CurriculumResource = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      grade,
      category,
      period: period.trim() || 'Chương trình THPT',
      description: description.trim(),
      format,
      fileSize: fileSize.trim() || '5.0 MB',
      downloadsCount: 0,
      author: 'Thầy Nguyễn Vương Gia',
      createdAt: new Date().toISOString().split('T')[0],
      hasAnswerKey: category === 'exam' || category === 'homework',
      highlights: highlights.length > 0 ? highlights : ['Tài liệu phát hành mới', 'Chuẩn giáo trình THPT'],
    };

    onPublish(newResource);
    setSuccessMessage(`Đã đăng tải thành công tài liệu: "${newResource.title}"!`);

    // Reset form
    setTitle('');
    setDescription('');
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  return (
    <div className="p-6 bg-white border border-[#1A1615]/20 text-left space-y-6">
      <div className="flex items-center justify-between pb-3 hairline-b">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-[#8B0000]" />
          <h4 className="font-playfair text-xl font-bold text-[#1A1615]">
            Đăng Tải Bài Giảng, Đề Cương & Bài Tập Mới
          </h4>
        </div>
        <span className="text-xs font-mono text-[#C59B27] font-bold">
          PHÂN LOẠI TỰ ĐỘNG KHỐI 10-11-12
        </span>
      </div>

      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-300 text-green-900 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label htmlFor="pub-title" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
            Tiêu Đề Tài Liệu / Bộ Đề <span className="text-[#8B0000]">*</span>
          </label>
          <input
            id="pub-title"
            name="pubTitle"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Đề Ôn Tập Học Kỳ I Khối 12 — Chuyên Đề Chiến Dịch Hồ Chí Minh"
            className="w-full px-3.5 py-2.5 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-sm outline-none"
          />
        </div>

        {/* 3 Selects in Row: Grade, Category, Format */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pub-grade" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
              Khối Lớp Mục Tiêu <span className="text-[#8B0000]">*</span>
            </label>
            <select
              id="pub-grade"
              name="pubGrade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full px-3 py-2 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-mono outline-none"
            >
              <option value="12">Khối 12 (Ôn thi THPT)</option>
              <option value="11">Khối 11 (Cận - Hiện đại)</option>
              <option value="10">Khối 10 (GDPT 2018)</option>
            </select>
          </div>

          <div>
            <label htmlFor="pub-category" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
              Phân Loại Học Liệu <span className="text-[#8B0000]">*</span>
            </label>
            <select
              id="pub-category"
              name="pubCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value as ResourceCategory)}
              className="w-full px-3 py-2 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-mono outline-none"
            >
              <option value="homework">Bài tập về nhà</option>
              <option value="exam">Đề ôn tập & Đề thi</option>
              <option value="slide">Slide bài giảng (.PPTX)</option>
            </select>
          </div>

          <div>
            <label htmlFor="pub-format" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
              Định Dạng Tệp
            </label>
            <select
              id="pub-format"
              name="pubFormat"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'DOCX' | 'PDF' | 'PPTX')}
              className="w-full px-3 py-2 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-mono outline-none"
            >
              <option value="DOCX">Văn bản Word (.DOCX)</option>
              <option value="PDF">Tài liệu chuẩn (.PDF)</option>
              <option value="PPTX">Trình chiếu Slide (.PPTX)</option>
            </select>
          </div>
        </div>

        {/* Period & File size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pub-period" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
              Giai Đoạn Lịch Sử / Phân Kỳ
            </label>
            <input
              id="pub-period"
              name="pubPeriod"
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="Ví dụ: Kháng chiến chống Pháp (1945 - 1954)"
              className="w-full px-3 py-2 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs outline-none"
            />
          </div>

          <div>
            <label htmlFor="pub-filesize" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
              Dung Lượng Tệp Hiển Thị
            </label>
            <input
              id="pub-filesize"
              name="pubFileSize"
              type="text"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              placeholder="Ví dụ: 4.8 MB"
              className="w-full px-3 py-2 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="pub-description" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1">
            Tóm Tắt Nội Dung & Mục Tiêu Học Tập <span className="text-[#8B0000]">*</span>
          </label>
          <textarea
            id="pub-description"
            name="pubDescription"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nêu rõ phạm vi kiến thức, dạng bài tập tự luận hay trắc nghiệm, các câu phân hóa ăn điểm 9 - 10..."
            className="w-full p-3 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-sans outline-none leading-relaxed"
          ></textarea>
        </div>

        {/* Highlights */}
        <div>
          <label htmlFor="pub-highlights" className="block text-xs font-mono text-[#4A3E3D] uppercase mb-1">
            Điểm nhấn chính (Ngăn cách bằng dấu phẩy ",")
          </label>
          <input
            id="pub-highlights"
            name="pubHighlights"
            type="text"
            value={highlightsInput}
            onChange={(e) => setHighlightsInput(e.target.value)}
            placeholder="Có đáp án, Chuẩn ma trận, Mẹo thi"
            className="w-full px-3 py-2 bg-[#F6F0E4]/50 border border-[#1A1615]/30 focus:border-[#8B0000] text-xs outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#5E0000] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Phát Hành Tài Liệu Ngay</span>
          </button>
        </div>

      </form>
    </div>
  );
};
