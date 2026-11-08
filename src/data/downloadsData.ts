export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'slide-pptx' | 'de-cuong-docx' | 'tom-tat-pdf' | 'so-do-mindmap';
  categoryLabel: string;
  gradeLevel: '11' | '12' | 'all';
  fileFormat: 'PPTX' | 'DOCX' | 'PDF' | 'ZIP';
  fileSize: string;
  downloadsCount: number;
  author: string;
  downloadUrl: string;
  updatedAt: string;
  highlights: string[];
}

export const RESOURCE_CATEGORIES = [
  { id: 'all', label: 'Tất Cả Tài Liệu' },
  { id: 'slide-pptx', label: 'Bài Giảng PowerPoint (.PPTX)' },
  { id: 'de-cuong-docx', label: 'Đề Cương Ôn Tập (.DOCX)' },
  { id: 'tom-tat-pdf', label: 'Tóm Tắt & Niên Biểu (.PDF)' },
  { id: 'so-do-mindmap', label: 'Sơ Đồ Tư Duy Mindmap' },
] as const;

export const DOWNLOAD_RESOURCES: ResourceItem[] = [
  {
    id: 'res-slide-khang-chien-phap',
    title: 'Trọn Bộ Slide Bài Giảng: Cuộc Kháng Chiến Chống Thực Dân Pháp (1945 - 1954)',
    description: 'Bộ trình chiếu PowerPoint chuyên nghiệp gồm 68 slide minh họa trực quan, bản đồ tương tác các chiến dịch Việt Bắc, Biên Giới và Điện Biên Phủ chuẩn kiến thức SGK Lớp 12.',
    category: 'slide-pptx',
    categoryLabel: 'Slide Bài Giảng',
    gradeLevel: '12',
    fileFormat: 'PPTX',
    fileSize: '48.5 MB',
    downloadsCount: 1420,
    author: 'Ban Chuyên Môn Đam Mê Lịch Sử',
    downloadUrl: '#download-slide-phap',
    updatedAt: '02/2026',
    highlights: ['Hình ảnh tư liệu phục chế màu', 'Sơ đồ diễn biến động 3D', 'Tổng kết bài học & câu hỏi củng cố']
  },
  {
    id: 'res-slide-khang-chien-my',
    title: 'Slide Giảng Dạy: Kháng Chiến Chống Mỹ Cứu Nước (1954 - 1975) & Đại Thắng Mùa Xuân',
    description: 'Giáo án điện tử 85 slide chuyên sâu phân tích so sánh 4 chiến lược chiến tranh của Mỹ: Chiến tranh đơn phương, đặc biệt, cục bộ và Việt Nam hóa chiến tranh.',
    category: 'slide-pptx',
    categoryLabel: 'Slide Bài Giảng',
    gradeLevel: '12',
    fileFormat: 'PPTX',
    fileSize: '54.2 MB',
    downloadsCount: 1890,
    author: 'Ban Chuyên Môn Đam Mê Lịch Sử',
    downloadUrl: '#download-slide-my',
    updatedAt: '01/2026',
    highlights: ['Bảng so sánh 4 chiến lược', 'Phim tư liệu ngắn tích hợp', 'Bộ 30 câu hỏi trắc nghiệm nhanh']
  },
  {
    id: 'res-de-cuong-thpt-quoc-gia-2026',
    title: 'Đề Cương Ôn Thi Tốt Nghiệp THPT Môn Lịch Sử 2026 (Ma Trận Chuẩn Bộ GD&ĐT)',
    description: 'Tài liệu Word 120 trang tổng hợp toàn bộ trọng tâm kiến thức Lịch sử Việt Nam và Lịch sử Thế giới hiện đại, phân loại theo 4 mức độ: Nhận biết, Thông hiểu, Vận dụng và Vận dụng cao.',
    category: 'de-cuong-docx',
    categoryLabel: 'Đề Cương Ôn Tập',
    gradeLevel: '12',
    fileFormat: 'DOCX',
    fileSize: '8.4 MB',
    downloadsCount: 3650,
    author: 'Tổ Giáo Viên THPT Chuyên',
    downloadUrl: '#download-de-cuong-thpt',
    updatedAt: '03/2026',
    highlights: ['Bám sát định dạng cấu trúc đề thi 2026', 'Mẹo loại trừ đáp án nhiễu', 'Đáp án & thang điểm chi tiết']
  },
  {
    id: 'res-so-do-tu-duy-7-thoi-ky',
    title: 'Cẩm Nang Sơ Đồ Tư Duy (Mindmap) 7 Thời Kỳ Lịch Sử Việt Nam & Thế Giới',
    description: 'Bộ Mindmap chất lượng cao dạng vector in ấn rõ nét, hệ thống hóa toàn bộ các mốc sự kiện, bối cảnh, diễn biến và ý nghĩa giúp học sinh ghi nhớ siêu tốc chỉ trong 1 trang giấy.',
    category: 'so-do-mindmap',
    categoryLabel: 'Sơ Đồ Tư Duy',
    gradeLevel: 'all',
    fileFormat: 'PDF',
    fileSize: '18.6 MB',
    downloadsCount: 2940,
    author: 'Đội Ngũ Biên Tập Đam Mê Lịch Sử',
    downloadUrl: '#download-mindmap-history',
    updatedAt: '02/2026',
    highlights: ['Hình ảnh độ phân giải cao 300 DPI', 'Mã màu trực quan theo giai đoạn', 'Dễ dàng in ấn khổ A3/A4']
  },
  {
    id: 'res-nien-bieu-su-viet-nam',
    title: 'Sổ Tay Tra Cứu Niên Biểu Lịch Sử Việt Nam Cận - Hiện Đại (1858 - 2000)',
    description: 'Bảng niên biểu thời gian chuẩn xác tra cứu nhanh các sự kiện, nhân vật, địa danh và mốc thời gian bắt buộc phải thuộc trong đề thi Tốt nghiệp THPT.',
    category: 'tom-tat-pdf',
    categoryLabel: 'Tóm Tắt & Niên Biểu',
    gradeLevel: 'all',
    fileFormat: 'PDF',
    fileSize: '4.8 MB',
    downloadsCount: 2210,
    author: 'Kho Lưu Trữ Đam Mê Lịch Sử',
    downloadUrl: '#download-nien-bieu',
    updatedAt: '01/2026',
    highlights: ['Trình bày 2 cột đối chiếu', 'Ghi chú mẹo nhớ năm tháng', 'Kèm danh mục các Hội nghị quan trọng']
  },
  {
    id: 'res-de-cuong-lop-11',
    title: 'Chuyên Đề Bồi Dưỡng Lịch Sử Khối 11: Phong Trào Yêu Nước Đầu Thế Kỷ XX',
    description: 'Tài liệu học tập chuyên đề Lịch sử 11 phân tích sâu phong trào Cần Vương, Khởi nghĩa Yên Thế, xu hướng bạo động của Phan Bội Châu và xu hướng cải cách của Phan Châu Trinh.',
    category: 'de-cuong-docx',
    categoryLabel: 'Đề Cương Ôn Tập',
    gradeLevel: '11',
    fileFormat: 'DOCX',
    fileSize: '6.2 MB',
    downloadsCount: 1150,
    author: 'Thầy Cô Nhóm Sử 11',
    downloadUrl: '#download-lop-11',
    updatedAt: '12/2025',
    highlights: ['Bảng so sánh Phan Bội Châu vs Phan Châu Trinh', 'Hệ thống câu hỏi tự luận & trắc nghiệm', 'Đề kiểm tra định kỳ có đáp án']
  }
];
