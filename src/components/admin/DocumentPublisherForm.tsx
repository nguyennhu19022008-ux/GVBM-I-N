import React, { useState, useEffect } from 'react';
import { UploadCloud, Plus, CheckCircle2, Save, X } from 'lucide-react';
import type { CurriculumResource, GradeLevel, ResourceCategory } from '../../data/curriculumData';
import { PERIOD_FACETS_BY_GRADE } from '../../data/curriculumData';

interface DocumentPublisherFormProps {
  onPublish: (newRes: CurriculumResource) => void;
  editingResource?: CurriculumResource | null;
  onCancelEdit?: () => void;
}

export const DocumentPublisherForm: React.FC<DocumentPublisherFormProps> = ({
  onPublish,
  editingResource,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState<string>('');
  const [grade, setGrade] = useState<GradeLevel>('12');
  const [category, setCategory] = useState<ResourceCategory>('homework');
  const [periodFacet, setPeriodFacet] = useState<string>('kc-chong-my');
  const [period, setPeriod] = useState<string>('Kháng chiến chống Mỹ cứu nước');
  const [format, setFormat] = useState<'DOCX' | 'PDF' | 'PPTX'>('DOCX');
  const [fileSize, setFileSize] = useState<string>('4.5 MB');
  const [estimatedStudyTimeMinutes, setEstimatedStudyTimeMinutes] = useState<number>(40);
  const [teacherNote, setTeacherNote] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [highlightsInput, setHighlightsInput] = useState<string>('Có đáp án chi tiết, Chuẩn ma trận đề thi, File in ấn rõ nét');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const availableFacets = (PERIOD_FACETS_BY_GRADE[grade] || []).filter((f) => f.id !== 'all');

  useEffect(() => {
    if (editingResource) {
      setTitle(editingResource.title);
      setGrade(editingResource.grade);
      setCategory(editingResource.category);
      setPeriodFacet(editingResource.periodFacet || 'kc-chong-my');
      setPeriod(editingResource.period);
      setFormat((editingResource.format === 'QUIZ' ? 'DOCX' : editingResource.format) || 'DOCX');
      setFileSize(editingResource.fileSize);
      setDescription(editingResource.description);
      setTeacherNote(editingResource.fullContentPreview?.teacherNote || '');
      setEstimatedStudyTimeMinutes(editingResource.fullContentPreview?.estimatedStudyTimeMinutes || 40);
      setHighlightsInput((editingResource.highlights || []).join(', '));
    }
  }, [editingResource]);

  useEffect(() => {
    if (!editingResource) {
      const facets = (PERIOD_FACETS_BY_GRADE[grade] || []).filter((f) => f.id !== 'all');
      if (facets.length > 0) {
        setPeriodFacet(facets[0].id);
        setPeriod(facets[0].label);
      }
    }
  }, [grade, editingResource]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const highlights = highlightsInput
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    const resourceToSave: CurriculumResource = {
      id: editingResource ? editingResource.id : `custom-${Date.now()}`,
      title: title.trim(),
      grade,
      category,
      period: period.trim() || 'Chương trình THPT',
      periodFacet,
      description: description.trim(),
      format,
      fileSize: fileSize.trim() || '5.0 MB',
      downloadsCount: editingResource ? editingResource.downloadsCount : 0,
      author: editingResource ? editingResource.author : 'Thầy Nguyễn Vương Gia',
      createdAt: editingResource ? editingResource.createdAt : new Date().toISOString().split('T')[0],
      hasAnswerKey: category === 'exam' || category === 'homework',
      highlights: highlights.length > 0 ? highlights : ['Tài liệu phát hành mới', 'Chuẩn giáo trình THPT'],
      fullContentPreview: {
        teacherNote: teacherNote.trim() || description.trim(),
        estimatedStudyTimeMinutes: Number(estimatedStudyTimeMinutes) || 40,
        matrix: editingResource?.fullContentPreview?.matrix || [
          { level: 'Nhận biết', percent: 40, questionCount: 8, symbol: '○', color: '#2D6A4F' },
          { level: 'Thông hiểu', percent: 30, questionCount: 6, symbol: '◐', color: '#1D4ED8' },
          { level: 'Vận dụng', percent: 20, questionCount: 4, symbol: '◕', color: '#B45309' },
          { level: 'Vận dụng cao', percent: 10, questionCount: 2, symbol: '●', color: '#B91C1C' },
        ],
        sections: editingResource?.fullContentPreview?.sections || [
          {
            sectionTitle: 'Nội dung trọng tâm tài liệu',
            items: [description.trim()],
          },
        ],
        sampleQuestions: editingResource?.fullContentPreview?.sampleQuestions || [],
      },
    };

    onPublish(resourceToSave);
    setSuccessMessage(editingResource ? `Đã lưu cập nhật thành công: "${resourceToSave.title}"!` : `Đã đăng tải thành công: "${resourceToSave.title}"!`);

    if (!editingResource) {
      setTitle('');
      setDescription('');
      setTeacherNote('');
    }
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  return (
    <div className="py-6 border-y border-[rgba(16,37,43,0.16)] text-left space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 hairline-b">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-[#9C3B32]" />
          <div>
            <h4 className="font-playfair text-xl font-bold text-[#0A1418]">
              {editingResource ? 'Hiệu Đính Học Liệu Đã Phát Hành' : 'Xuất Bản Tài Liệu Học Tập Mới'}
            </h4>
            <span className="text-xs font-mono text-[#687477]">
              {editingResource ? `Đang chỉnh sửa: ID ${editingResource.id}` : 'Nhập thông tin sư phạm để phân phối tới các khối lớp'}
            </span>
          </div>
        </div>

        {editingResource && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-3 py-1.5 border border-[#0A1418]/30 hover:border-[#9C3B32] hover:text-[#9C3B32] text-xs font-mono uppercase transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Hủy Hiệu Đính</span>
          </button>
        )}
      </div>

      {successMessage && (
        <div className="p-3 bg-[#486D5D]/10 border border-[#486D5D] text-xs font-mono text-[#486D5D] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="pub-title" className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1">
            Tiêu Đề Học Liệu / Đề Thi <span className="text-[#9C3B32]">*</span>
          </label>
          <input
            id="pub-title"
            name="pubTitle"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Phiếu Rèn Luyện Tuần 09: Chiến Dịch Tây Nguyên 1975"
            className="w-full px-3.5 py-2.5 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs sm:text-sm font-sans outline-none text-[#0A1418]"
          />
        </div>

        {/* 3 Select Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Grade */}
          <div>
            <label htmlFor="pub-grade" className="block text-xs font-mono text-[#687477] uppercase mb-1">
              Khối Lớp
            </label>
            <select
              id="pub-grade"
              name="pubGrade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full px-3 py-2 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs font-mono outline-none text-[#0A1418]"
            >
              <option value="12">Khối 12 (Lịch sử Hiện đại & Khảo thí THPT)</option>
              <option value="11">Khối 11 (Cận đại & Chiến tranh thế giới)</option>
              <option value="10">Khối 10 (Sử học đại cương & Văn minh)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="pub-category" className="block text-xs font-mono text-[#687477] uppercase mb-1">
              Phân Loại Sư Phạm
            </label>
            <select
              id="pub-category"
              name="pubCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value as ResourceCategory)}
              className="w-full px-3 py-2 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs font-mono outline-none text-[#0A1418]"
            >
              <option value="homework">✎ Bài tập về nhà / Phiếu tuần</option>
              <option value="exam">✦ Đề thi thử & Ma trận khảo thí</option>
              <option value="slide">☵ Slide bài giảng điện tử</option>
            </select>
          </div>

          {/* Format */}
          <div>
            <label htmlFor="pub-format" className="block text-xs font-mono text-[#687477] uppercase mb-1">
              Định Dạng Tệp
            </label>
            <select
              id="pub-format"
              name="pubFormat"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'DOCX' | 'PDF' | 'PPTX')}
              className="w-full px-3 py-2 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs font-mono outline-none text-[#0A1418]"
            >
              <option value="DOCX">DOCX (Soạn thảo & In ấn Word)</option>
              <option value="PDF">PDF (Tài liệu chuẩn Adobe Reader)</option>
              <option value="PPTX">PPTX (Trình chiếu PowerPoint)</option>
            </select>
          </div>
        </div>

        {/* Period Facet & File Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pub-facet" className="block text-xs font-mono text-[#687477] uppercase mb-1">
              Chuyên Đề Thời Kỳ (Theo Khối Lớp)
            </label>
            <select
              id="pub-facet"
              name="pubFacet"
              value={periodFacet}
              onChange={(e) => {
                setPeriodFacet(e.target.value);
                const found = availableFacets.find((f) => f.id === e.target.value);
                if (found) setPeriod(found.label);
              }}
              className="w-full px-3 py-2 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs font-mono outline-none text-[#0A1418]"
            >
              {availableFacets.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="pub-size" className="block text-xs font-mono text-[#687477] uppercase mb-1">
                Dung lượng file
              </label>
              <input
                id="pub-size"
                name="pubSize"
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="4.5 MB"
                className="w-full px-3 py-2 bg-white border border-[#0A1418]/25 focus:border-[#9C3B32] text-xs outline-none text-[#0A1418]"
              />
            </div>

            <div>
              <label htmlFor="pub-time" className="block text-xs font-mono text-[#687477] uppercase mb-1">
                Phút tự học
              </label>
              <input
                id="pub-time"
                name="pubTime"
                type="number"
                min={5}
                max={180}
                value={estimatedStudyTimeMinutes}
                onChange={(e) => setEstimatedStudyTimeMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#0A1418]/25 focus:border-[#9C3B32] text-xs outline-none text-[#0A1418]"
              />
            </div>
          </div>
        </div>

        {/* Teacher Note */}
        <div>
          <label htmlFor="pub-teacher-note" className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1">
            Lời Dặn Dò Của Thầy (Hiển thị trong Xem Ma Trận)
          </label>
          <input
            id="pub-teacher-note"
            name="pubTeacherNote"
            type="text"
            value={teacherNote}
            onChange={(e) => setTeacherNote(e.target.value)}
            placeholder="Ví dụ: Học sinh chú ý phân biệt mốc thời gian trước và sau chiến dịch..."
            className="w-full px-3.5 py-2 bg-white border border-[#0A1418]/25 focus:border-[#9C3B32] text-xs outline-none text-[#0A1418]"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="pub-description" className="block text-xs font-mono font-bold text-[#0A1418] uppercase mb-1">
            Tóm Tắt Nội Dung & Mục Tiêu Học Tập <span className="text-[#9C3B32]">*</span>
          </label>
          <textarea
            id="pub-description"
            name="pubDescription"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nêu rõ phạm vi kiến thức, dạng bài tập tự luận hay trắc nghiệm, các câu phân hóa ăn điểm 9 - 10..."
            className="w-full p-3 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs font-sans outline-none leading-relaxed text-[#0A1418]"
          ></textarea>
        </div>

        {/* Highlights */}
        <div>
          <label htmlFor="pub-highlights" className="block text-xs font-mono text-[#687477] uppercase mb-1">
            Điểm nhấn chính (Ngăn cách bằng dấu phẩy ",")
          </label>
          <input
            id="pub-highlights"
            name="pubHighlights"
            type="text"
            value={highlightsInput}
            onChange={(e) => setHighlightsInput(e.target.value)}
            placeholder="Có đáp án, Chuẩn ma trận, Mẹo thi"
            className="w-full px-3 py-2 bg-white border border-[rgba(16,37,43,0.25)] focus:border-[#9C3B32] text-xs outline-none text-[#0A1418]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end gap-3">
          {editingResource && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-5 py-2.5 border border-[#0A1418] hover:bg-[#0A1418]/5 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
            >
              Hủy
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#9C3B32] hover:bg-[#7e2e26] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            {editingResource ? (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu Cập Nhật Học Liệu</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Phát Hành Tài Liệu Ngay</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
