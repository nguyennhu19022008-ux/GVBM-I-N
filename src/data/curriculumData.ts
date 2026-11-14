export type GradeLevel = '10' | '11' | '12';
export type ResourceCategory = 'homework' | 'exam' | 'slide' | 'quiz';

export interface KnowledgeMatrixLevel {
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  percent: number;
  questionCount: number;
  symbol: '○' | '◐' | '◕' | '●';
  color: string;
}

export interface DocumentSection {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: string[];
  answerKeyExcerpt?: string;
}

export interface SampleQuestion {
  num: number;
  cognitiveLevel: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  stem: string;
  options?: string[];
  guide: string;
}

export interface FullContentPreview {
  teacherNote: string;
  estimatedStudyTimeMinutes: number;
  matrix: KnowledgeMatrixLevel[];
  sections: DocumentSection[];
  sampleQuestions: SampleQuestion[];
}

export interface CurriculumResource {
  id: string;
  title: string;
  grade: GradeLevel;
  category: ResourceCategory;
  period: string;
  periodFacet?: string;
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
  fullContentPreview?: FullContentPreview;
}

export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) return fallback;
      const parsed = JSON.parse(item);
      if (parsed === null || parsed === undefined) return fallback;
      if (Array.isArray(fallback)) {
        return (Array.isArray(parsed) ? parsed : fallback) as T;
      }
      if (typeof fallback === 'object' && fallback !== null) {
        return (typeof parsed === 'object' && !Array.isArray(parsed) && parsed !== null
          ? parsed
          : fallback) as T;
      }
      if (typeof fallback !== 'undefined') {
        return (typeof parsed === typeof fallback ? parsed : fallback) as T;
      }
      return parsed as T;
    } catch (err) {
      console.warn(`Lỗi đọc localStorage key "${key}":`, err);
      return fallback;
    }
  },
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Lỗi ghi localStorage key "${key}":`, err);
      return false;
    }
  }
};

export const PERIOD_FACETS_BY_GRADE: Record<GradeLevel, { id: string; label: string; matchKeyword: string }[]> = {
  '10': [
    { id: 'all', label: 'Tất Cả Chuyên Đề', matchKeyword: '' },
    { id: 'su-hoc', label: 'Lịch Sử & Sử Học', matchKeyword: 'Sử học' },
    { id: 'van-minh-the-gioi', label: 'Văn Minh Cổ - Trung Đại', matchKeyword: 'Cổ - Trung đại' },
    { id: 'van-minh-viet-nam', label: 'Văn Minh Đất Nước Việt Nam', matchKeyword: 'Việt Nam' },
  ],
  '11': [
    { id: 'all', label: 'Tất Cả Chuyên Đề', matchKeyword: '' },
    { id: 'viet-nam-can-dai', label: 'Việt Nam (1858 - 1918)', matchKeyword: '1858 - 1918' },
    { id: 'the-gioi-can-dai', label: 'Thế Giới Cận - Hiện Đại', matchKeyword: 'Thế giới' },
    { id: 'dau-tk-xx', label: 'Việt Nam Đầu TK XX', matchKeyword: 'đầu thế kỷ XX' },
  ],
  '12': [
    { id: 'all', label: 'Tất Cả Chuyên Đề', matchKeyword: '' },
    { id: 'kc-chong-my', label: 'Kháng Chiến Chống Mỹ (1954-1975)', matchKeyword: 'chống Mỹ' },
    { id: 'kc-chong-phap', label: 'Kháng Chiến Chống Pháp (1945-1954)', matchKeyword: 'chống Pháp' },
    { id: 'toan-canh-thpt', label: 'Tổng Ôn Toàn Cảnh Lịch Sử', matchKeyword: 'Toàn cảnh' },
    { id: 'viet-nam-1919-2000', label: 'Lịch Sử Việt Nam (1919-2000)', matchKeyword: '1919 - 2000' },
  ]
};

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
    periodFacet: 'su-hoc',
    description: 'Hệ thống 15 câu hỏi trắc nghiệm và 2 câu tự luận rèn luyện phương pháp phân biệt giữa hiện thực lịch sử khách quan và nhận thức lịch sử chủ quan theo SGK Kết Nối / Cánh Diều.',
    format: 'DOCX',
    fileSize: '3.4 MB',
    downloadsCount: 520,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-03-01',
    hasAnswerKey: true,
    highlights: ['Có bảng đáp án chi tiết', 'Kèm thang điểm tự chấm', 'Có bài giải mẫu tự luận'],
    fullContentPreview: {
      teacherNote: 'Lưu ý phân biệt rõ: Hiện thực lịch sử chỉ diễn ra một lần duy nhất, còn nhận thức lịch sử phụ thuộc vào mục đích nghiên cứu, tư liệu và góc nhìn của người ghi chép.',
      estimatedStudyTimeMinutes: 30,
      matrix: [
        { level: 'Nhận biết', percent: 40, questionCount: 6, symbol: '○', color: '#2D6A4F' },
        { level: 'Thông hiểu', percent: 30, questionCount: 5, symbol: '◐', color: '#1D4ED8' },
        { level: 'Vận dụng', percent: 20, questionCount: 3, symbol: '◕', color: '#B45309' },
        { level: 'Vận dụng cao', percent: 10, questionCount: 1, symbol: '●', color: '#B91C1C' },
      ],
      sections: [
        {
          sectionTitle: 'Phần I: Câu hỏi trắc nghiệm khách quan',
          sectionSubtitle: 'Gồm 15 câu chọn 1 phương án đúng',
          items: [
            'Câu 1 - 5: Khái niệm hiện thực lịch sử và tri thức lịch sử.',
            'Câu 6 - 10: Chức năng và nhiệm vụ cơ bản của Sử học Việt Nam.',
            'Câu 11 - 15: Các nguồn sử liệu (sơ cấp, thứ cấp, hiện vật, chữ viết).'
          ],
          answerKeyExcerpt: '1.A | 2.C | 3.B | 4.D | 5.A | 6.B | 7.C | 8.D | 9.A | 10.B'
        },
        {
          sectionTitle: 'Phần II: Bài tập tự luận rèn luyện tư duy phản biện',
          sectionSubtitle: '2 bài tập tự luận có liên hệ thực tiễn',
          items: [
            'Bài 1: Phân tích vì sao cùng một sự kiện lịch sử lại có nhiều góc nhìn nhận thức khác nhau.',
            'Bài 2: Em hãy lấy ví dụ về việc bảo tồn di sản văn hóa tại địa phương em.'
          ]
        }
      ],
      sampleQuestions: [
        {
          num: 1,
          cognitiveLevel: 'Nhận biết',
          stem: 'Toàn bộ những gì đã diễn ra trong quá khứ, tồn tại hoàn toàn khách quan, không phụ thuộc vào ý muốn chủ quan của con người được gọi là:',
          options: ['A. Hiện thực lịch sử', 'B. Nhận thức lịch sử', 'C. Tri thức lịch sử', 'D. Quy luật lịch sử'],
          guide: 'Khái niệm hiện thực lịch sử là những gì diễn ra khách quan trong quá khứ.'
        },
        {
          num: 2,
          cognitiveLevel: 'Vận dụng',
          stem: 'Điểm khác biệt căn bản giữa hiện thực lịch sử và nhận thức lịch sử là gì?',
          options: [
            'A. Hiện thực lịch sử chỉ diễn ra một lần, nhận thức lịch sử có thể thay đổi và nhận thức lại.',
            'B. Hiện thực lịch sử do con người tạo nên, nhận thức lịch sử có sẵn trong tự nhiên.',
            'C. Nhận thức lịch sử luôn phản ánh đúng 100% hiện thực lịch sử.',
            'D. Hiện thực lịch sử mang tính chủ quan, nhận thức mang tính khách quan.'
          ],
          guide: 'Hiện thực lịch sử là duy nhất và khách quan; nhận thức lịch sử luôn phụ thuộc vào nguồn tư liệu và người nghiên cứu.'
        }
      ]
    }
  },
  {
    id: 'k10-exam-01',
    title: 'Đề Kiểm Tra Giữa Học Kỳ I Môn Lịch Sử 10 (Ma Trận Chuẩn Đổi Mới)',
    grade: '10',
    category: 'exam',
    period: 'Văn minh thời Cổ - Trung đại',
    periodFacet: 'van-minh-the-gioi',
    description: 'Đề thi 40 câu trắc nghiệm bao quát văn minh Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa và Hy Lạp - La Mã cổ đại. Phân hóa 4 cấp độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.',
    format: 'PDF',
    fileSize: '4.8 MB',
    downloadsCount: 890,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-20',
    hasAnswerKey: true,
    highlights: ['Ma trận đề chuẩn Bộ GD&ĐT', 'File PDF in ấn sắc nét', 'Có lời giải thích từng câu'],
    fullContentPreview: {
      teacherNote: 'Đề thi bám sát ma trận 40 câu trắc nghiệm. Trọng tâm tập trung vào thành tựu văn hóa, chữ viết, kiến trúc và tư tưởng tôn giáo phương Đông và phương Tây.',
      estimatedStudyTimeMinutes: 45,
      matrix: [
        { level: 'Nhận biết', percent: 40, questionCount: 16, symbol: '○', color: '#2D6A4F' },
        { level: 'Thông hiểu', percent: 30, questionCount: 12, symbol: '◐', color: '#1D4ED8' },
        { level: 'Vận dụng', percent: 20, questionCount: 8, symbol: '◕', color: '#B45309' },
        { level: 'Vận dụng cao', percent: 10, questionCount: 4, symbol: '●', color: '#B91C1C' },
      ],
      sections: [
        {
          sectionTitle: 'Chuyên đề 1: Văn minh phương Đông Cổ - Trung đại',
          sectionSubtitle: '20 câu về Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa',
          items: [
            'Thành tựu nông nghiệp lưu vực sông Nil, Hoàng Hà, sông Ấn.',
            'Hệ thống chữ viết hình nêm, tượng hình và tôn giáo lớn (Phật giáo, Nho giáo).'
          ]
        },
        {
          sectionTitle: 'Chuyên đề 2: Văn minh Hy Lạp - La Mã cổ đại',
          sectionSubtitle: '20 câu về thể chế dân chủ, luật pháp và khoa học',
          items: [
            'Nền tảng thể chế dân chủ chủ nô tại Athens và nền cộng hòa La Mã.',
            'Các ngành khoa học cơ bản (Toán học Pitago, Định lý Talet, Triết học).'
          ]
        }
      ],
      sampleQuestions: [
        {
          num: 1,
          cognitiveLevel: 'Thông hiểu',
          stem: 'Thành tựu văn hóa nào của cư dân phương Đông cổ đại có ảnh hưởng sâu rộng nhất đến đời sống tinh thần nhân loại ngày nay?',
          options: ['A. Chữ tượng hình', 'B. Kim tự tháp', 'C. Các tôn giáo lớn (Phật giáo, Ấn Độ giáo...)', 'D. Thuật ướp xác'],
          guide: 'Tôn giáo phương Đông đã trở thành các tôn giáo lớn mang tính toàn cầu đến tận ngày nay.'
        }
      ]
    }
  },
  {
    id: 'k10-slide-01',
    title: 'Bài Giảng Điện Tử: Một Số Nền Văn Minh Trên Đất Nước Việt Nam (Văn Lang - Âu Lạc, Chăm Pa, Phù Nam)',
    grade: '10',
    category: 'slide',
    period: 'Văn minh trên đất nước Việt Nam',
    periodFacet: 'van-minh-viet-nam',
    description: 'Trọn bộ 55 slide PowerPoint trực quan gồm bản đồ tương tác, hình ảnh di chỉ Đông Sơn, Sa Huỳnh, Óc Eo và hiện vật khảo cổ học phục vụ học tập và thuyết trình.',
    format: 'PPTX',
    fileSize: '42.6 MB',
    downloadsCount: 1140,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-01-15',
    hasAnswerKey: false,
    highlights: ['Animation mượt mà', 'Bản đồ tương tác', 'Hình ảnh di chỉ khảo cổ học thật'],
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
    periodFacet: 'viet-nam-can-dai',
    description: 'Phiếu so sánh toàn diện giữa phong trào Cần Vương theo ý thức hệ phong kiến và khởi nghĩa Yên Thế mang tính tự vệ của nông dân. Bồi dưỡng tư duy phản biện cho học sinh.',
    format: 'DOCX',
    fileSize: '4.1 MB',
    downloadsCount: 680,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-28',
    hasAnswerKey: true,
    highlights: ['Bảng so sánh 6 tiêu chí', 'Đáp án gạch ý chi tiết', 'Trích dẫn tư liệu lịch sử'],
    fullContentPreview: {
      teacherNote: 'Chú ý so sánh mục tiêu: Cần Vương nhằm giúp vua cứu nước lập lại chế độ phong kiến, trong khi Yên Thế là phong trào tự phát của nông dân nhằm tự vệ giữ đất giữ làng.',
      estimatedStudyTimeMinutes: 35,
      matrix: [
        { level: 'Nhận biết', percent: 30, questionCount: 5, symbol: '○', color: '#2D6A4F' },
        { level: 'Thông hiểu', percent: 40, questionCount: 6, symbol: '◐', color: '#1D4ED8' },
        { level: 'Vận dụng', percent: 20, questionCount: 3, symbol: '◕', color: '#B45309' },
        { level: 'Vận dụng cao', percent: 10, questionCount: 1, symbol: '●', color: '#B91C1C' },
      ],
      sections: [
        {
          sectionTitle: 'Bảng đối chiếu 6 tiêu chí Cần Vương vs Yên Thế',
          items: [
            'Lãnh đạo: Văn thân, sĩ phu yêu nước vs Hoàng Hoa Thám (nông dân kiệt xuất).',
            'Lực lượng: Đông đảo nhân dân cả nước vs Nông dân Bắc Giang.',
            'Tính chất: Ý thức hệ phong kiến vs Phong trào tự vệ nông dân.'
          ]
        }
      ],
      sampleQuestions: [
        {
          num: 1,
          cognitiveLevel: 'Thông hiểu',
          stem: 'Điểm giống nhau cơ bản giữa phong trào Cần Vương và khởi nghĩa Yên Thế là gì?',
          options: [
            'A. Đều do văn thân, sĩ phu phong kiến lãnh đạo.',
            'B. Đều thể hiện tinh thần yêu nước bất khuất chống thực dân Pháp.',
            'C. Đều chủ trương lập lại chế độ phong kiến độc lập.',
            'D. Đều kêu gọi sự giúp đỡ từ bên ngoài.'
          ],
          guide: 'Cả hai phong trào tuy khác ý thức hệ lãnh đạo nhưng đều chung mục tiêu yêu nước chống thực dân Pháp xâm lược.'
        }
      ]
    }
  },
  {
    id: 'k11-exam-01',
    title: 'Bộ Đề Ôn Tập Học Kỳ II Lịch Sử 11 (Chiến Tranh Thế Giới & Phong Trào Giải Phóng Dân Tộc)',
    grade: '11',
    category: 'exam',
    period: 'Lịch sử Thế giới Cận - Hiện đại',
    periodFacet: 'the-gioi-can-dai',
    description: 'Tổng hợp 3 đề thi thử 45 phút chuẩn cấu trúc kiểm tra định kỳ kèm hướng dẫn chấm và bảng phân tích bản chất chiến tranh đế quốc phi nghĩa.',
    format: 'PDF',
    fileSize: '6.2 MB',
    downloadsCount: 1250,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-10',
    hasAnswerKey: true,
    highlights: ['Bộ 3 đề hoàn chỉnh', 'Ma trận câu hỏi rõ ràng', 'Có hướng dẫn chấm điểm'],
  },
  {
    id: 'k11-slide-01',
    title: 'Slide Chuyên Sâu: Xu Hướng Cứu Nước Mới Đầu Thế Kỷ XX (Phan Bội Châu & Phan Châu Trinh)',
    grade: '11',
    category: 'slide',
    period: 'Việt Nam đầu thế kỷ XX',
    periodFacet: 'dau-tk-xx',
    description: 'Giáo án điện tử 48 slide phân tích đối chiếu xu hướng Bạo động Đông Du của Phan Bội Châu và xu hướng Cải cách Duy Tân của Phan Châu Trinh.',
    format: 'PPTX',
    fileSize: '36.8 MB',
    downloadsCount: 970,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-01-25',
    hasAnswerKey: false,
    highlights: ['Sơ đồ phân nhánh tư tưởng', 'Trích dẫn thơ văn yêu nước', 'Thiết kế cổ điển trang trọng'],
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
    periodFacet: 'kc-chong-my',
    description: 'Bảng đối chiếu tổng lực 4 chiến lược: Chiến tranh đơn phương, Chiến tranh đặc biệt, Chiến tranh cục bộ, Việt Nam hóa chiến tranh về âm mưu, thủ đoạn, lực lượng và thất bại.',
    format: 'DOCX',
    fileSize: '5.6 MB',
    downloadsCount: 2340,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-03-05',
    hasAnswerKey: true,
    highlights: ['Trọng tâm ăn điểm 8-9-10', 'Bảng so sánh kinh điển', 'Có mẹo tránh bẫy đề thi'],
    fullContentPreview: {
      teacherNote: 'Đây là chuyên đề chiếm 2-3 câu trong mọi đề thi tốt nghiệp THPT. Học sinh cần thuộc nằm lòng lực lượng đóng vai trò nòng cốt của từng chiến lược để không bị bẫy đề.',
      estimatedStudyTimeMinutes: 40,
      matrix: [
        { level: 'Nhận biết', percent: 25, questionCount: 4, symbol: '○', color: '#2D6A4F' },
        { level: 'Thông hiểu', percent: 35, questionCount: 6, symbol: '◐', color: '#1D4ED8' },
        { level: 'Vận dụng', percent: 25, questionCount: 4, symbol: '◕', color: '#B45309' },
        { level: 'Vận dụng cao', percent: 15, questionCount: 2, symbol: '●', color: '#B91C1C' },
      ],
      sections: [
        {
          sectionTitle: 'Bảng so sánh đối chiếu 4 chiến lược của Mỹ',
          items: [
            'Chiến tranh đơn phương (1954-1960): Chính sách tố cộng, diệt cộng, luật 10/59.',
            'Chiến tranh đặc biệt (1961-1965): Quân đội ngụy làm nòng cốt + cố vấn Mỹ + Ấp chiến lược.',
            'Chiến tranh cục bộ (1965-1968): Quân viễn chinh Mỹ nòng cốt + quân đồng minh + 2 gọng kìm "tìm diệt & bình định".',
            'Việt Nam hóa chiến tranh (1969-1975): Quân ngụy nòng cốt + hỏa lực không quân Mỹ + dùng người Việt đánh người Việt.'
          ]
        }
      ],
      sampleQuestions: [
        {
          num: 1,
          cognitiveLevel: 'Vận dụng cao',
          stem: 'Điểm khác biệt căn bản nhất giữa chiến lược "Chiến tranh cục bộ" so với "Chiến tranh đặc biệt" của Mỹ ở miền Nam là gì?',
          options: [
            'A. Sử dụng quân viễn chinh Mỹ trực tiếp tham chiến trên chiến trường.',
            'B. Sử dụng vũ khí và phương tiện chiến tranh tối tân của Mỹ.',
            'C. Nhằm mục tiêu chia cắt lâu dài nước Việt Nam.',
            'D. Dựa vào sự viện trợ quân sự dồi dào từ Quốc hội Mỹ.'
          ],
          guide: 'Trong Chiến tranh cục bộ, quân viễn chinh Mỹ đóng vai trò nòng cốt trực tiếp tham gia tác chiến trên chiến trường miền Nam.'
        }
      ]
    }
  },
  {
    id: 'k12-exam-01',
    title: 'Đề Thi Thử Tốt Nghiệp THPT 2026 Môn Lịch Sử — Đề Số 01 (Chuẩn Ma Trận Bộ GD&ĐT)',
    grade: '12',
    category: 'exam',
    period: 'Toàn cảnh Lịch sử VN & Thế giới',
    periodFacet: 'toan-canh-thpt',
    description: 'Đề thi chuẩn hóa 40 câu trắc nghiệm làm trong 50 phút. Đầy đủ các câu hỏi nhận định, liên hệ thực tiễn và so sánh lịch sử có độ phân hóa cao.',
    format: 'PDF',
    fileSize: '7.5 MB',
    downloadsCount: 3890,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-03-02',
    hasAnswerKey: true,
    highlights: ['Chuẩn 40 câu / 50 phút', 'Có phiếu tô trắc nghiệm', 'Kèm bảng giải thích từng đáp án'],
    fullContentPreview: {
      teacherNote: 'Đề số 01 được biên soạn chuẩn theo ma trận đề thi minh họa 2026 của Bộ GD&ĐT. Phân phối thời gian làm bài: 20 phút đầu làm 24 câu đầu; 20 phút tiếp theo làm câu vận dụng; 10 phút cuối rà soát phương án.',
      estimatedStudyTimeMinutes: 50,
      matrix: [
        { level: 'Nhận biết', percent: 40, questionCount: 16, symbol: '○', color: '#2D6A4F' },
        { level: 'Thông hiểu', percent: 30, questionCount: 12, symbol: '◐', color: '#1D4ED8' },
        { level: 'Vận dụng', percent: 20, questionCount: 8, symbol: '◕', color: '#B45309' },
        { level: 'Vận dụng cao', percent: 10, questionCount: 4, symbol: '●', color: '#B91C1C' },
      ],
      sections: [
        {
          sectionTitle: 'Phần I: Lịch sử Thế giới hiện đại (1945 - 2000)',
          sectionSubtitle: '12 câu hỏi trắc nghiệm',
          items: [
            'Trật tự thế giới 2 cực Ianta và tổ chức Liên Hợp Quốc.',
            'Phong trào giải phóng dân tộc Á, Phi, Mỹ Latinh.',
            'Mỹ, Tây Âu, Nhật Bản và xu thế toàn cầu hóa.'
          ]
        },
        {
          sectionTitle: 'Phần II: Lịch sử Việt Nam (1919 - 1975)',
          sectionSubtitle: '28 câu hỏi trắc nghiệm trọng tâm',
          items: [
            'Cách mạng tháng Tám 1945 và thành lập nước VNDCCH.',
            'Kháng chiến chống Pháp và chiến dịch Điện Biên Phủ 1954.',
            'Kháng chiến chống Mỹ và Đại thắng mùa Xuân 1975.'
          ]
        }
      ],
      sampleQuestions: [
        {
          num: 1,
          cognitiveLevel: 'Vận dụng',
          stem: 'Thắng lợi nào của quân dân ta đã giáng đòn quyết định đập tan Kế hoạch Nava của thực dân Pháp?',
          options: [
            'A. Chiến dịch Việt Bắc thu - đông 1947',
            'B. Chiến dịch Biên giới thu - đông 1950',
            'C. Cuộc Tiến công Đông - Xuân 1953 - 1954',
            'D. Chiến dịch lịch sử Điện Biên Phủ 1954'
          ],
          guide: 'Chiến thắng Điện Biên Phủ 1954 đã đập tan hoàn toàn kế hoạch Nava và ý chí xâm lược của thực dân Pháp.'
        }
      ]
    }
  },
  {
    id: 'k12-slide-01',
    title: 'Trọn Bộ Slide Bài Giảng: Cuộc Kháng Chiến Chống Thực Dân Pháp (1945 - 1954) & Điện Biên Phủ',
    grade: '12',
    category: 'slide',
    period: 'Kháng chiến chống Pháp',
    periodFacet: 'kc-chong-phap',
    description: 'Bộ 68 slide hình ảnh tư liệu sắc nét, bản đồ tác chiến động các chiến dịch Việt Bắc 1947, Biên Giới 1950, Kế hoạch Nava và Chiến thắng lịch sử Điện Biên Phủ 1954.',
    format: 'PPTX',
    fileSize: '48.5 MB',
    downloadsCount: 4210,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-15',
    hasAnswerKey: false,
    highlights: ['68 slide trình chiếu cao cấp', 'Bản đồ chiến dịch động', 'Tư liệu ảnh Bác Hồ & Bác Giáp'],
  },
  {
    id: 'k12-exam-02',
    title: 'Bộ Đề Rèn Luyện Tư Duy Tốc Độ: 200 Câu Trắc Nghiệm Mốc Thời Gian & Sự Kiện Then Chốt',
    grade: '12',
    category: 'exam',
    period: 'Lịch sử Việt Nam (1919-2000)',
    periodFacet: 'viet-nam-1919-2000',
    description: 'Tài liệu độc quyền giúp học sinh phản xạ nhanh không bao giờ nhầm lẫn mốc năm, tên chiến dịch, văn kiện nghị quyết của Đảng trong phòng thi.',
    format: 'DOCX',
    fileSize: '8.2 MB',
    downloadsCount: 2980,
    author: 'Thầy Nguyễn Vương Gia',
    createdAt: '2026-02-25',
    hasAnswerKey: true,
    highlights: ['200 câu trắc nghiệm chọn lọc', 'Xếp theo thứ tự thời gian', 'Có mẹo ghi nhớ nhanh'],
  }
];
