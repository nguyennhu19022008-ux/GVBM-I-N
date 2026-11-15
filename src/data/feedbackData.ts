export type IssueType = 'sai_dap_an' | 'sai_de' | 'loi_chinh_ta' | 'link_hong' | 'khac';

export interface StudentFeedback {
  id: string;
  resourceTitle: string;
  resourceId?: string;
  issueType: IssueType;
  description: string;
  studentName?: string;
  studentEmail?: string;
  createdAt: string;
  status: 'pending' | 'resolved';
  resolvedAt?: string;
  teacherReply?: string;
}

export const INITIAL_FEEDBACK_LIST: StudentFeedback[] = [];

export const ISSUE_TYPE_LABELS: Record<IssueType, string> = {
  sai_dap_an: 'Sai đáp án trắc nghiệm',
  sai_de: 'Lỗi câu hỏi / Đề bài chưa rõ',
  loi_chinh_ta: 'Lỗi chính tả / Câu chữ',
  link_hong: 'Lỗi link tải file / Không mở được',
  khac: 'Góp ý chuyên môn khác'
};
