import React, { useState } from 'react';
import { GradeFilterBar } from './GradeFilterBar';
import { HomeworkSection } from './HomeworkSection';
import { ExamArchiveSection } from './ExamArchiveSection';
import { QuizStudioSection } from './QuizStudioSection';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { StudentProgressStrip } from './StudentProgressStrip';
import { ReportIssueModal } from './ReportIssueModal';
import type { GradeLevel, ResourceCategory, CurriculumResource } from '../../data/curriculumData';
import { INITIAL_CURRICULUM_RESOURCES, PERIOD_FACETS_BY_GRADE, safeStorage } from '../../data/curriculumData';
import type { StudentFeedback } from '../../data/feedbackData';
import type { QuizExam } from '../../data/quizData';
import { QUIZ_EXAMS } from '../../data/quizData';

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
  const [activePeriodFacet, setActivePeriodFacet] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'bookmarked' | 'completed' | 'unattempted'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bookmarking & Completed Status Tracking with safeStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    safeStorage.get<string[]>('dam_me_lich_su_bookmarks', [])
  );
  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    safeStorage.get<string[]>('dam_me_lich_su_completed_resources', [])
  );

  // Modal States
  const [previewResource, setPreviewResource] = useState<CurriculumResource | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [reportTargetTitle, setReportTargetTitle] = useState<string>('');
  const [reportTargetId, setReportTargetId] = useState<string | undefined>(undefined);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      safeStorage.set('dam_me_lich_su_bookmarks', next);
      return next;
    });
  };

  const handleToggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      safeStorage.set('dam_me_lich_su_completed_resources', next);
      return next;
    });
  };

  // Combine initial resources with any newly added ones from Admin
  const allResources = [...customResources, ...INITIAL_CURRICULUM_RESOURCES];

  // Grade-level resources for counting
  const gradeResources = allResources.filter((r) => r.grade === activeGrade);
  const gradeBookmarkedCount = gradeResources.filter((r) => bookmarkedIds.includes(r.id)).length;
  const gradeCompletedCount = gradeResources.filter((r) => completedIds.includes(r.id)).length;
  const gradeUnattemptedCount = gradeResources.filter((r) => !completedIds.includes(r.id)).length;

  // Filter resources by grade, category, period facet, status, and search query
  const filteredResources = allResources.filter((res) => {
    if (res.grade !== activeGrade) return false;
    if (activeCategory !== 'all' && res.category !== activeCategory) return false;

    // Period Facet Filter
    if (activePeriodFacet !== 'all') {
      const currentFacets = PERIOD_FACETS_BY_GRADE[activeGrade] || [];
      const targetFacet = currentFacets.find((f) => f.id === activePeriodFacet);
      if (targetFacet && targetFacet.matchKeyword) {
        const matchKey = targetFacet.matchKeyword.toLowerCase();
        const inPeriod = (res.period || '').toLowerCase().includes(matchKey);
        const inFacetField = (res.periodFacet || '').toLowerCase().includes(matchKey);
        if (!inPeriod && !inFacetField) return false;
      }
    }

    // Status Filter
    if (activeStatusFilter === 'bookmarked' && !bookmarkedIds.includes(res.id)) return false;
    if (activeStatusFilter === 'completed' && !completedIds.includes(res.id)) return false;
    if (activeStatusFilter === 'unattempted' && completedIds.includes(res.id)) return false;

    // Search Query
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
    <div className="w-full py-10 lg:py-14 px-6 md:px-12 xl:px-16 bg-[#FAF8F1] animate-fadeSlideUp relative overflow-hidden">
      {/* Prominent Educational Heritage Historical Background Blend */}
      <div 
        className="absolute top-0 right-0 w-full sm:w-2/3 h-[500px] bg-cover bg-center opacity-22 mix-blend-multiply pointer-events-none image-blend-panoramic select-none filter contrast-120"
        style={{ backgroundImage: `url('/images/hoi-nghi-ianta.jpg')` }}
      />
      {/* Soft warm paper lighting vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#FAF8F1]/60 to-[#FAF8F1] pointer-events-none" />

      {/* Large Pedagogical Watermark */}
      <div className="absolute right-6 top-10 font-mono text-8xl sm:text-9xl font-black text-[#9C3B32]/5 select-none pointer-events-none tracking-widest uppercase">
        10 · 11 · 12
      </div>

      <div className="relative z-10">
        {/* Top Breadcrumb & Page Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-2 text-left relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#9C3B32] uppercase mb-1.5">
              <span>GIẢNG ĐƯỜNG SỐ HÓA</span>
              <span>•</span>
              <span>HỆ THỐNG BÀI TẬP & ĐỀ THI</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1418] tracking-tight">
              Không Gian Học Tập & Tương Tác Khối 10 · 11 · 12
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#687477] max-w-md italic">
            "Phân loại trực quan bằng hệ ký hiệu sư phạm: [ ✎ BÀI TẬP TUẦN ], [ ✦ ĐỀ THI MA TRẬN ], [ ◈ KHẢO THÍ ONLINE ], kèm ma trận đề thi và giải thích chi tiết."
          </p>
        </div>

        {/* Student Progress Ledger Strip */}
        <StudentProgressStrip
          activeGrade={activeGrade}
          totalExamsCount={QUIZ_EXAMS.length}
          bookmarkedCount={gradeBookmarkedCount}
          completedResourcesCount={gradeCompletedCount}
          onQuickFilterBookmarked={() => setActiveStatusFilter('bookmarked')}
          onQuickFilterCompleted={() => setActiveStatusFilter('completed')}
        />

        {/* Grade Filter Bar */}
        <GradeFilterBar
          activeGrade={activeGrade}
          onSelectGrade={(g) => {
            setActiveGrade(g);
            setActivePeriodFacet('all');
          }}
          activeCategory={activeCategory}
          onSelectCategory={(c) => setActiveCategory(c)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          activePeriodFacet={activePeriodFacet}
          onSelectPeriodFacet={(f) => setActivePeriodFacet(f)}
          activeStatusFilter={activeStatusFilter}
          onSelectStatusFilter={(s) => setActiveStatusFilter(s)}
          bookmarkedCount={gradeBookmarkedCount}
          completedCount={gradeCompletedCount}
          unattemptedCount={gradeUnattemptedCount}
        />

        {/* Main Content Area */}
        <div className="pt-8 space-y-12">
          
          {/* Section 1: Homework */}
          {(activeCategory === 'all' || activeCategory === 'homework') && (
            <HomeworkSection
              resources={filteredResources}
              bookmarkedIds={bookmarkedIds}
              completedIds={completedIds}
              onToggleBookmark={handleToggleBookmark}
              onToggleComplete={handleToggleComplete}
              onPreview={(res) => setPreviewResource(res)}
              onReportIssue={handleOpenReport}
              onDownload={handleDownload}
            />
          )}

          {/* Section 2: Exams & Tests */}
          {(activeCategory === 'all' || activeCategory === 'exam') && (
            <ExamArchiveSection
              resources={filteredResources}
              bookmarkedIds={bookmarkedIds}
              completedIds={completedIds}
              onToggleBookmark={handleToggleBookmark}
              onToggleComplete={handleToggleComplete}
              onPreview={(res) => setPreviewResource(res)}
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

        {/* Document In-line Preview & Matrix Modal */}
        <DocumentPreviewModal
          isOpen={!!previewResource}
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          onDownload={handleDownload}
          onOpenReport={handleOpenReport}
        />

        {/* Report Modal */}
        <ReportIssueModal
          isOpen={isReportOpen}
          resourceTitle={reportTargetTitle}
          resourceId={reportTargetId}
          onClose={() => setIsReportOpen(false)}
          onSubmitReport={onSubmitFeedback}
        />

      </div>
    </div>
  );
};
