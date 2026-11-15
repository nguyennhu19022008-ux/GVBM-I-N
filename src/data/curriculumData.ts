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

export const INITIAL_CURRICULUM_RESOURCES: CurriculumResource[] = [];
