import React from 'react';
import { Inbox, CheckCircle2, Clock, Check } from 'lucide-react';
import type { StudentFeedback } from '../../data/feedbackData';
import { ISSUE_TYPE_LABELS } from '../../data/feedbackData';

interface FeedbackInboxTableProps {
  feedbackList: StudentFeedback[];
  onResolveFeedback: (id: string) => void;
}

export const FeedbackInboxTable: React.FC<FeedbackInboxTableProps> = ({
  feedbackList,
  onResolveFeedback,
}) => {
  const pendingCount = feedbackList.filter((f) => f.status === 'pending').length;

  return (
    <div className="py-6 border-y border-[#1A1615]/30 text-left space-y-4">
      <div className="flex items-center justify-between pb-3 hairline-b">
        <div className="flex items-center gap-2">
          <Inbox className="w-5 h-5 text-[#8B0000]" />
          <h4 className="font-playfair text-xl font-bold text-[#1A1615]">
            Hộp Thư Tiếp Nhận Phản Hồi & Báo Lỗi Từ Sĩ Tử
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold">
            {pendingCount} CHƯA XỬ LÝ
          </span>
          <span className="text-[#4A3E3D]">/ {feedbackList.length} TỔNG</span>
        </div>
      </div>

      {feedbackList.length === 0 ? (
        <div className="py-8 text-center text-[#4A3E3D] font-mono text-xs border border-dashed border-[#1A1615]/20">
          Hiện chưa có báo cáo sự cố nào từ học sinh.
        </div>
      ) : (
        <div className="space-y-3">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className={`p-4 border transition-all ${
                item.status === 'pending'
                  ? 'bg-amber-50/40 border-amber-300'
                  : 'bg-[#F6F0E4]/30 border-[#1A1615]/15 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 hairline-b">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === 'pending'
                        ? 'bg-[#8B0000] text-white'
                        : 'bg-green-700 text-white'
                    }`}
                  >
                    {item.status === 'pending' ? 'Chờ Hiệu Đính' : 'Đã Sửa Xong'}
                  </span>
                  <span className="font-bold text-[#1A1615]">
                    {ISSUE_TYPE_LABELS[item.issueType]}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#4A3E3D] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.createdAt}</span>
                </span>
              </div>

              {/* Resource title */}
              <div className="text-xs font-mono text-[#8B0000] font-semibold mb-1">
                Tài liệu liên quan: {item.resourceTitle}
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#1A1615] leading-relaxed mb-3 bg-white p-2.5 border border-[#1A1615]/10">
                "{item.description}"
              </p>

              {/* Sender & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#4A3E3D]">
                <div>
                  <span>Người báo: <strong>{item.studentName || 'Sĩ tử ẩn danh'}</strong></span>
                  {item.studentEmail && (
                    <span className="ml-2 text-[#8B0000]">({item.studentEmail})</span>
                  )}
                </div>

                {item.status === 'pending' ? (
                  <button
                    onClick={() => onResolveFeedback(item.id)}
                    className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-1 cursor-pointer self-end sm:self-auto"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Đánh Dấu Đã Sửa Xong</span>
                  </button>
                ) : (
                  <span className="text-green-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã ghi nhận & hiệu đính</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
