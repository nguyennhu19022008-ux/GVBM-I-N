import React, { useState } from 'react';
import { Inbox, CheckCircle2, Clock, Check, MessageSquare } from 'lucide-react';
import type { StudentFeedback } from '../../data/feedbackData';
import { ISSUE_TYPE_LABELS } from '../../data/feedbackData';

interface FeedbackInboxTableProps {
  feedbackList: StudentFeedback[];
  onResolveFeedback: (id: string, teacherReply?: string) => void;
}

export const FeedbackInboxTable: React.FC<FeedbackInboxTableProps> = ({
  feedbackList,
  onResolveFeedback,
}) => {
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const pendingCount = feedbackList.filter((f) => f.status === 'pending').length;

  return (
    <div className="py-6 border-y border-[rgba(16,37,43,0.16)] text-left space-y-4">
      <div className="flex items-center justify-between pb-3 hairline-b">
        <div className="flex items-center gap-2">
          <Inbox className="w-5 h-5 text-[#9C3B32]" />
          <h4 className="font-playfair text-xl font-bold text-[#0A1418]">
            Hộp Thư Tiếp Nhận Phản Hồi & Báo Lỗi Từ Sĩ Tử
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 bg-[#9C3B32]/10 text-[#9C3B32] font-bold">
            {pendingCount} CHƯA XỬ LÝ
          </span>
          <span className="text-[#687477]">/ {feedbackList.length} TỔNG</span>
        </div>
      </div>

      {feedbackList.length === 0 ? (
        <div className="py-8 text-center text-[#687477] font-mono text-xs border border-dashed border-[rgba(16,37,43,0.2)]">
          Hiện chưa có báo cáo sự cố nào từ học sinh.
        </div>
      ) : (
        <div className="space-y-3">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className={`p-4 border transition-all ${
                item.status === 'pending'
                  ? 'bg-[#9C3B32]/5 border-[#9C3B32]/30'
                  : 'bg-[#F3EFE5]/40 border-[rgba(16,37,43,0.1)] opacity-85'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 hairline-b">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === 'pending'
                        ? 'bg-[#9C3B32] text-white'
                        : 'bg-[#486D5D] text-white'
                    }`}
                  >
                    {item.status === 'pending' ? 'Chờ Hiệu Đính' : 'Đã Sửa Xong'}
                  </span>
                  <span className="font-bold text-[#0A1418]">
                    {ISSUE_TYPE_LABELS[item.issueType]}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#687477] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.createdAt}</span>
                </span>
              </div>

              {/* Resource title */}
              <div className="text-xs font-mono text-[#9C3B32] font-semibold mb-1">
                Tài liệu liên quan: {item.resourceTitle}
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#0A1418] leading-relaxed mb-3 bg-white p-2.5 border border-[rgba(16,37,43,0.1)]">
                "{item.description}"
              </p>

              {/* Teacher Reply Input (if pending) */}
              {item.status === 'pending' && (
                <div className="mb-3 p-3 bg-white border border-[#486D5D]/30 space-y-1">
                  <label htmlFor={`reply-${item.id}`} className="block text-[11px] font-mono font-bold text-[#486D5D] uppercase flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Lời nhắn phản hồi của Thầy cho học sinh (tùy chọn):</span>
                  </label>
                  <input
                    id={`reply-${item.id}`}
                    type="text"
                    value={replyTexts[item.id] || ''}
                    onChange={(e) => setReplyTexts({ ...replyTexts, [item.id]: e.target.value })}
                    placeholder="Ví dụ: Thầy đã đính chính lại mốc sự kiện và cập nhật file mới..."
                    className="w-full px-3 py-1.5 bg-[#FAF8F1] border border-[#0A1418]/20 focus:border-[#486D5D] text-xs font-sans outline-none text-[#0A1418]"
                  />
                </div>
              )}

              {/* Existing Teacher Reply (if resolved) */}
              {item.teacherReply && (
                <div className="mb-3 p-3 bg-[#486D5D]/10 border-l-2 border-[#486D5D] text-xs font-sans text-[#486D5D] leading-relaxed">
                  <strong>Lời nhắn của Thầy:</strong> {item.teacherReply}
                </div>
              )}

              {/* Sender & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#687477]">
                <div>
                  <span>Người báo: <strong>{item.studentName || 'Sĩ tử ẩn danh'}</strong></span>
                  {item.studentEmail && (
                    <span className="ml-2 text-[#9C3B32]">({item.studentEmail})</span>
                  )}
                </div>

                {item.status === 'pending' ? (
                  <button
                    onClick={() => onResolveFeedback(item.id, replyTexts[item.id])}
                    className="px-3.5 py-1.5 bg-[#486D5D] hover:bg-[#3b594b] text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer self-end sm:self-auto shadow-xs active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Đánh Dấu Đã Sửa Xong</span>
                  </button>
                ) : (
                  <span className="text-[#486D5D] font-bold flex items-center gap-1">
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
