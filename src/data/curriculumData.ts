export type GradeLevel = '10' | '11' | '12';
export type ResourceCategory = 'homework' | 'exam' | 'slide' | 'quiz';

export interface CurriculumResource {
  id: string;
  title: string;
  grade: GradeLevel;
  category: ResourceCategory;
  period: string;
  description: string;
  format: 'DOCX' | 'PDF' | 'PPTX' | 'QUIZ';
  fileSize: string;
  downloadsCount: number;
  author: string;
  createdAt: string;
  downloadUrl?: string;
  questionCount?: number;
  timeLimitMinutes?: number;
  hasAnswerKey: boolean;
  highlights: string[];
}

export const INITIAL_CURRICULUM_RESOURCES: CurriculumResource[] = [
  // ==========================================
  // KHỐI 10 (CHƯƠNG TRÌNH MỚI GDPT 2018)
  // ==========================================
  {
    id: 'k10-hw-01',
    title: 'Phiếu Bài Tập Tuần 04: Hiện Thực Lịch Sử & Lịch Sử Được Con Người Nhận Thức',
    grade: '10',
    category: 'homework',
    period: 'Chủ đề 1: Lịch sử & Sử học',
    description: 'Hệ thống 15 câu hỏi trắc nghiệm và 2 câu tự luận rèn luyện phương pháp phân biệt giữa hiện thực lịch sử khách quan và nhận thức lịch sử chủ quan theo SGK Kết Nối / Cánh Diều.',
    format: 'DOCX',
    fileSize: '3.4 MB',
    downloadsCount: 520,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-03-01',
    hasAnswerKey: true,
    highlights: ['Có bảng đáp án chi tiết', 'Kèm thang điểm tự chấm', 'Có bài giải mẫu tự luận']
  },
  {
    id: 'k10-exam-01',
    title: 'Đề Kiểm Tra Giữa Học Kỳ I Môn Lịch Sử 10 (Ma Trận Chuẩn Đổi Mới)',
    grade: '10',
    category: 'exam',
    period: 'Văn minh thời Cổ - Trung đại',
    description: 'Đề thi 40 câu trắc nghiệm bao quát văn minh Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa và Hy Lạp - La Mã cổ đại. Phân hóa 4 cấp độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.',
    format: 'PDF',
    fileSize: '4.8 MB',
    downloadsCount: 890,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-20',
    hasAnswerKey: true,
    highlights: ['Ma trận đề chuẩn Bộ GD&ĐT', 'File PDF in ấn sắc nét', 'Có lời giải thích từng câu']
  },
  {
    id: 'k10-slide-01',
    title: 'Bài Giảng Điện Tử: Một Số Nền Văn Minh Trên Đất Nước Việt Nam (Văn Lang - Âu Lạc, Chăm Pa, Phù Nam)',
    grade: '10',
    category: 'slide',
    period: 'Văn minh trên đất nước Việt Nam',
    description: 'Trọn bộ 55 slide PowerPoint trực quan gồm bản đồ tương tác, hình ảnh di chỉ Đông Sơn, Sa Huỳnh, Óc Eo và hiện vật khảo cổ học phục vụ học tập và thuyết trình.',
    format: 'PPTX',
    fileSize: '42.6 MB',
    downloadsCount: 1140,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-01-15',
    hasAnswerKey: false,
    highlights: ['Animation mượt mà', 'Bản đồ tương tác', 'Hình ảnh di chỉ khảo cổ học thật']
  },

  // ==========================================
  // KHỐI 11 (CẬN - HIỆN ĐẠI & THẾ GIỚI)
  // ==========================================
  {
    id: 'k11-hw-01',
    title: 'Phiếu Rèn Luyện Tuần 08: Phong Trào Cần Vương & Khởi Nghĩa Nông Dân Yên Thế',
    grade: '11',
    category: 'homework',
    period: 'Lịch sử Việt Nam (1858 - 1918)',
    description: 'Phiếu so sánh toàn diện giữa phong trào Cần Vương theo ý thức hệ phong kiến và khởi nghĩa Yên Thế mang tính tự vệ của nông dân. Bồi dưỡng tư duy phản biện cho học sinh.',
    format: 'DOCX',
    fileSize: '4.1 MB',
    downloadsCount: 680,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-28',
    hasAnswerKey: true,
    highlights: ['Bảng so sánh 6 tiêu chí', 'Đáp án gạch ý chi tiết', 'Trích dẫn tư liệu lịch sử']
  },
  {
    id: 'k11-exam-01',
    title: 'Bộ Đề Ôn Tập Học Kỳ II Lịch Sử 11 (Chiến Tranh Thế Giới & Phong Trào Giải Phóng Dân Tộc)',
    grade: '11',
    category: 'exam',
    period: 'Lịch sử Thế giới Cận - Hiện đại',
    description: 'Tổng hợp 3 đề thi thử 45 phút chuẩn cấu trúc kiểm tra định kỳ kèm hướng dẫn chấm và bảng phân tích bản chất chiến tranh đế quốc phi nghĩa.',
    format: 'PDF',
    fileSize: '6.2 MB',
    downloadsCount: 1250,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-10',
    hasAnswerKey: true,
    highlights: ['Bộ 3 đề hoàn chỉnh', 'Ma trận câu hỏi rõ ràng', 'Có hướng dẫn chấm điểm']
  },
  {
    id: 'k11-slide-01',
    title: 'Slide Chuyên Sâu: Xu Hướng Cứu Nước Mới Đầu Thế Kỷ XX (Phan Bội Châu & Phan Châu Trinh)',
    grade: '11',
    category: 'slide',
    period: 'Việt Nam đầu thế kỷ XX',
    description: 'Giáo án điện tử 48 slide phân tích đối chiếu xu hướng Bạo động Đông Du của Phan Bội Châu và xu hướng Cải cách Duy Tân của Phan Châu Trinh.',
    format: 'PPTX',
    fileSize: '36.8 MB',
    downloadsCount: 970,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-01-25',
    hasAnswerKey: false,
    highlights: ['Sơ đồ phân nhánh tư tưởng', 'Trích dẫn thơ văn yêu nước', 'Thiết kế cổ điển trang trọng']
  },

  // ==========================================
  // KHỐI 12 (TRỌNG TÂM LUYỆN THI THPT QUỐC GIA)
  // ==========================================
  {
    id: 'k12-hw-01',
    title: 'Phiếu Ôn Tập Chuyên Đề: 4 Chiến Lược Chiến Tranh Của Mỹ Ở Miền Nam (1954 - 1975)',
    grade: '12',
    category: 'homework',
    period: 'Kháng chiến chống Mỹ cứu nước',
    description: 'Bảng đối chiếu tổng lực 4 chiến lược: Chiến tranh đơn phương, Chiến tranh đặc biệt, Chiến tranh cục bộ, Việt Nam hóa chiến tranh về âm mưu, thủ đoạn, lực lượng và thất bại.',
    format: 'DOCX',
    fileSize: '5.6 MB',
    downloadsCount: 2340,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-03-05',
    hasAnswerKey: true,
    highlights: ['Trọng tâm ăn điểm 8-9-10', 'Bảng so sánh kinh điển', 'Có mẹo tránh bẫy đề thi']
  },
  {
    id: 'k12-exam-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2026 Môn Lịch Sử — Đề Số 01 (Chuẩn Ma Trận Bộ GD&ĐT)',
    grade: '12',
    category: 'exam',
    period: 'Toàn cảnh Lịch sử VN & Thế giới',
    description: 'Đề thi chuẩn hóa 40 câu trắc nghiệm làm trong 50 phút. Đầy đủ các câu hỏi nhận định, liên hệ thực tiễn và so sánh lịch sử có độ phân hóa cao.',
    format: 'PDF',
    fileSize: '7.5 MB',
    downloadsCount: 3890,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-03-02',
    hasAnswerKey: true,
    highlights: ['Chuẩn 40 câu / 50 phút', 'Có phiếu tô trắc nghiệm', 'Kèm bảng giải thích từng đáp án']
  },
  {
    id: 'k12-slide-01',
    title: 'Trọn Bộ Slide Bài Giảng: Cuộc Kháng Chiến Chống Thực Dân Pháp (1945 - 1954) & Điện Biên Phủ',
    grade: '12',
    category: 'slide',
    period: 'Kháng chiến chống Pháp',
    description: 'Bộ 68 slide hình ảnh tư liệu sắc nét, bản đồ tác chiến động các chiến dịch Việt Bắc 1947, Biên Giới 1950, Kế hoạch Nava và Chiến thắng lịch sử Điện Biên Phủ 1954.',
    format: 'PPTX',
    fileSize: '48.5 MB',
    downloadsCount: 4210,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-15',
    hasAnswerKey: false,
    highlights: ['68 slide trình chiếu cao cấp', 'Bản đồ chiến dịch động', 'Tư liệu ảnh Bác Hồ & Bác Giáp']
  },
  {
    id: 'k12-exam-02',
    title: 'Bộ Đề Rèn Luyện Tư Duy Tốc Độ: 200 Câu Trắc Nghiệm Mốc Thời Gian & Sự Kiện Then Chốt',
    grade: '12',
    category: 'exam',
    period: 'Việt Nam (1919 - 2000)',
    description: 'Tài liệu độc quyền giúp học sinh phản xạ nhanh không bao giờ nhầm lẫn mốc năm, tên chiến dịch, văn kiện nghị quyết của Đảng trong phòng thi.',
    format: 'DOCX',
    fileSize: '8.2 MB',
    downloadsCount: 2980,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-25',
    hasAnswerKey: true,
    highlights: ['200 câu trắc nghiệm chọn lọc', 'Xếp theo thứ tự thời gian', 'Có mẹo ghi nhớ nhanh']
  }
];
