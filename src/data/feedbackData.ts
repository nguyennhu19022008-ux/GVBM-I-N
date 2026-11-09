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
}

export const INITIAL_FEEDBACK_LIST: StudentFeedback[] = [
  {
    id: 'fb-01',
    resourceTitle: 'Đề Thi Thử Tốt Nghiệp THPT 2026 Môn Lịch Sử — Đề Số 01',
    resourceId: 'k12-exam-01',
    issueType: 'sai_dap_an',
    description: 'Thưa thầy, ở câu số 28 về ý nghĩa của Hiệp định Paris 1973, phương án C và D có vẻ bị trùng từ khóa, em chọn phương án B thì bị báo sai ạ.',
    studentName: 'Trần Văn Nam',
    studentEmail: 'nam.tran@example.com',
    createdAt: '2026-03-08 14:20',
    status: 'pending'
  },
  {
    id: 'fb-02',
    resourceTitle: 'Phiếu Rèn Luyện Tuần 08: Phong Trào Cần Vương & Khởi Nghĩa Yên Thế',
    resourceId: 'k11-hw-01',
    issueType: 'loi_chinh_ta',
    description: 'Trong bảng so sánh ở trang 3, chỗ năm bùng nổ khởi nghĩa Hương Khê bị gõ nhầm thành 1888 thay vì 1885 ạ.',
    studentName: 'Nguyễn Thị Mai',
    studentEmail: 'mai.nguyen@example.com',
    createdAt: '2026-03-07 09:15',
    status: 'resolved',
    resolvedAt: '2026-03-07 16:30'
  },
  {
    id: 'fb-03',
    resourceTitle: 'Bài Giảng Điện Tử: Một Số Nền Văn Minh Trên Đất Nước Việt Nam',
    resourceId: 'k10-slide-01',
    issueType: 'link_hong',
    description: 'Link tải slide PPTX bản nén ZIP báo quyền truy cập Google Drive cần cấp phép thầy ơi.',
    studentName: 'Lê Hoàng Long',
    studentEmail: 'long.le@example.com',
    createdAt: '2026-03-06 20:45',
    status: 'pending'
  }
];

export const ISSUE_TYPE_LABELS: Record<IssueType, string> = {
  sai_dap_an: 'Sai đáp án trắc nghiệm',
  sai_de: 'Lỗi câu hỏi / Đề bài chưa rõ',
  loi_chinh_ta: 'Lỗi chính tả / Câu chữ',
  link_hong: 'Lỗi link tải file / Không mở được',
  khac: 'Góp ý chuyên môn khác'
};
