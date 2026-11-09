import React, { useState } from 'react';
import { GradeFilterBar } from './GradeFilterBar';
import { HomeworkSection } from './HomeworkSection';
import { ExamArchiveSection } from './ExamArchiveSection';
import { QuizStudioSection } from './QuizStudioSection';
import { ReportIssueModal } from './ReportIssueModal';
import type { GradeLevel, ResourceCategory, CurriculumResource } from '../../data/curriculumData';
import { INITIAL_CURRICULUM_RESOURCES } from '../../data/curriculumData';
import type { StudentFeedback } from '../../data/feedbackData';
import type { QuizExam } from '../../data/quizData';

interface LearningHubViewProps {
  initialGrade?: GradeLevel;
  onSelectExam: (exam: QuizExam) => void;
  onSubmitFeedback: (fb: Omit<StudentFeedback, 'id' | 'createdAt' | 'status'>) => void;
  customResources: CurriculumResource[];
}

export const LearningHubView: React.FC<LearningHubViewProps> = ({
  initialGrade = '12',
  onSelectExam,
  onSubmitFeedback,
  customResources,
}) => {
  const [activeGrade, setActiveGrade] = useState<GradeLevel>(initialGrade);
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Report Modal State
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [reportTargetTitle, setReportTargetTitle] = useState<string>('');
  const [reportTargetId, setReportTargetId] = useState<string | undefined>(undefined);

  // Combine initial resources with any newly added ones from Admin
  const allResources = [...customResources, ...INITIAL_CURRICULUM_RESOURCES];

  // Filter resources by grade, category, and search query
  const filteredResources = allResources.filter((res) => {
    if (res.grade !== activeGrade) return false;
    if (activeCategory !== 'all' && res.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.period.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenReport = (res: CurriculumResource) => {
    setReportTargetTitle(res.title);
    setReportTargetId(res.id);
    setIsReportOpen(true);
  };

  const handleOpenReportByTitle = (title: string) => {
    setReportTargetTitle(title);
    setReportTargetId(undefined);
    setIsReportOpen(true);
  };

  const handleDownload = (res: CurriculumResource) => {
    // Generate downloadable study document blob
    const content = `===============================================================
ĐAM MÊ LỊCH SỬ • TÀI LIỆU HỌC TẬP & ÔN THI CHÍNH THỨC
CHỦ NHIỆM: THẦY NGUYỄN VƯƠNG GIA
===============================================================
TÊN TÀI LIỆU: ${res.title}
KHỐI LỚP: ${res.grade} | THỂ LOẠI: ${res.category.toUpperCase()}
PHÂN KỲ: ${res.period}
ĐỊNH DẠNG: ${res.format} | NGÀY BAN HÀNH: ${res.createdAt}
TÁC GIẢ: ${res.author}
---------------------------------------------------------------
TÓM TẮT NỘI DUNG & MA TRẬN:
${res.description}

ĐIỂM NHẤN CẦN LƯU Ý KHI LÀM BÀI:
${res.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

HƯỚNG DẪN ÔN TẬP:
- Nắm vững bối cảnh lịch sử, nguyên nhân trực tiếp và nguyên nhân sâu xa.
- So sánh các mốc sự kiện có điểm tương đồng.
- Loại trừ các phương án gây nhiễu mang tính tuyệt đối hóa hoặc sai mốc thời gian.
===============================================================
Chúc các em học sinh Khối ${res.grade} ôn tập hiệu quả và đạt điểm 10 kỳ thi THPT!
===============================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.id}-${res.title.substring(0, 30).replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full py-10 lg:py-14 px-6 md:px-12 xl:px-16 bg-[#F6F0E4] animate-fadeSlideUp">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 broadsheet-double-b text-left">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8B0000] uppercase mb-1.5">
            <span>GIẢNG ĐƯỜNG SỐ HÓA</span>
            <span>•</span>
            <span>HỆ THỐNG BÀI TẬP & ĐỀ THI</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1615] tracking-tight">
            Không Gian Học Tập & Tương Tác Khối 10 · 11 · 12
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#4A3E3D] max-w-md italic">
          "Đầy đủ bài tập về nhà theo tuần, đề thi học kỳ và đề thi thử THPT Quốc gia chuẩn cấu trúc Bộ GD&ĐT kèm giải thích chi tiết."
        </p>
      </div>

      {/* Grade Filter Bar */}
      <GradeFilterBar
        activeGrade={activeGrade}
        onSelectGrade={(g) => setActiveGrade(g)}
        activeCategory={activeCategory}
        onSelectCategory={(c) => setActiveCategory(c)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Main Content Area */}
      <div className="pt-8 space-y-12">
        
        {/* Section 1: Homework */}
        {(activeCategory === 'all' || activeCategory === 'homework') && (
          <HomeworkSection
            resources={filteredResources}
            onReportIssue={handleOpenReport}
            onDownload={handleDownload}
          />
        )}

        {/* Section 2: Exams & Tests */}
        {(activeCategory === 'all' || activeCategory === 'exam') && (
          <ExamArchiveSection
            resources={filteredResources}
            onReportIssue={handleOpenReport}
            onDownload={handleDownload}
          />
        )}

        {/* Section 3: Online Quiz Studio */}
        {(activeCategory === 'all' || activeCategory === 'quiz') && (
          <QuizStudioSection
            grade={activeGrade}
            onSelectExam={onSelectExam}
            onOpenReport={handleOpenReportByTitle}
          />
        )}

      </div>

      {/* Report Modal */}
      <ReportIssueModal
        isOpen={isReportOpen}
        resourceTitle={reportTargetTitle}
        resourceId={reportTargetId}
        onClose={() => setIsReportOpen(false)}
        onSubmitReport={onSubmitFeedback}
      />

    </div>
  );
};
