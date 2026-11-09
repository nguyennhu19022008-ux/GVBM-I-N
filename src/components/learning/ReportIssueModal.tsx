import React, { useState } from 'react';
import { X, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import type { IssueType, StudentFeedback } from '../../data/feedbackData';
import { ISSUE_TYPE_LABELS } from '../../data/feedbackData';

interface ReportIssueModalProps {
  isOpen: boolean;
  resourceTitle: string;
  resourceId?: string;
  onClose: () => void;
  onSubmitReport: (report: Omit<StudentFeedback, 'id' | 'createdAt' | 'status'>) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  resourceTitle,
  resourceId,
  onClose,
  onSubmitReport,
}) => {
  const [issueType, setIssueType] = useState<IssueType>('sai_dap_an');
  const [description, setDescription] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmitReport({
      resourceTitle,
      resourceId,
      issueType,
      description: description.trim(),
      studentName: studentName.trim() || 'Sĩ tử ẩn danh',
      studentEmail: studentEmail.trim() || undefined,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeSlideUp">
      <div 
        className="relative w-full max-w-lg bg-[#F6F0E4] border-2 border-[#1A1615] shadow-2xl p-6 sm:p-7 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-3 mb-5 broadsheet-double-b">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#8B0000] uppercase">
            <AlertTriangle className="w-4 h-4 text-[#8B0000]" />
            <span>BÁO CÁO SAI SÓT & ĐÓNG GÓP Ý KIẾN</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-[#1A1615]/30 hover:border-[#1A1615] hover:bg-[#8B0000] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto" />
            <h4 className="font-playfair text-xl font-bold text-[#1A1615]">
              Cảm Ơn Đóng Góp Quý Giá Của Bạn!
            </h4>
            <p className="text-xs font-sans text-[#4A3E3D] max-w-xs mx-auto">
              Ý kiến của bạn đã được chuyển thẳng tới Hộp thư Quản trị của Thầy. Thầy sẽ rà soát và hiệu đính ngay!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Target Resource Label */}
            <div className="p-3 bg-[#ECE3D0]/60 border border-[#1A1615]/15 text-xs">
              <span className="font-mono text-[#4A3E3D] uppercase block text-[10px]">TÀI LIỆU / ĐỀ ĐANG PHẢN ÁNH:</span>
              <p className="font-bold text-[#1A1615] font-sans mt-0.5">{resourceTitle}</p>
            </div>

            {/* Issue Category */}
            <div>
              <label htmlFor="issue-type" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1.5">
                Vấn đề bạn phát hiện là gì? <span className="text-[#8B0000]">*</span>
              </label>
              <select
                id="issue-type"
                name="issueType"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as IssueType)}
                className="w-full px-3 py-2 bg-white border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-mono outline-none"
              >
                {(Object.keys(ISSUE_TYPE_LABELS) as IssueType[]).map((key) => (
                  <option key={key} value={key}>
                    {ISSUE_TYPE_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="issue-description" className="block text-xs font-mono font-bold text-[#1A1615] uppercase mb-1.5">
                Mô tả chi tiết câu hỏi hoặc lỗi sai <span className="text-[#8B0000]">*</span>
              </label>
              <textarea
                id="issue-description"
                name="issueDescription"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ví dụ: Ở câu 15 đề số 02, phương án B đúng hơn phương án C vì theo SGK trang 45..."
                className="w-full p-3 bg-white border border-[#1A1615]/30 focus:border-[#8B0000] text-xs font-sans outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Student Name & Email (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reporter-name" className="block text-[11px] font-mono text-[#4A3E3D] uppercase mb-1">
                  Họ tên bạn (Tùy chọn)
                </label>
                <input
                  id="reporter-name"
                  name="reporterName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ví dụ: Trần Văn Nam"
                  className="w-full px-3 py-1.5 bg-white border border-[#1A1615]/30 focus:border-[#8B0000] text-xs outline-none"
                />
              </div>

              <div>
                <label htmlFor="reporter-email" className="block text-[11px] font-mono text-[#4A3E3D] uppercase mb-1">
                  Email nhận phản hồi (Tùy chọn)
                </label>
                <input
                  id="reporter-email"
                  name="reporterEmail"
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-1.5 bg-white border border-[#1A1615]/30 focus:border-[#8B0000] text-xs outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 hairline-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#1A1615]/30 text-xs font-mono uppercase text-[#4A3E3D] hover:text-[#1A1615] cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#8B0000] hover:bg-[#5E0000] text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Báo Cáo Cho Thầy</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
