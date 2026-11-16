import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { GradeSelectionGate } from './GradeSelectionGate';
import { GradeFilterBar } from './GradeFilterBar';
import { HomeworkSection } from './HomeworkSection';
import { ExamArchiveSection } from './ExamArchiveSection';
import { QuizStudioSection } from './QuizStudioSection';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { ReportIssueModal } from './ReportIssueModal';
import type { GradeLevel, ResourceCategory, CurriculumResource } from '../../data/curriculumData';
import { INITIAL_CURRICULUM_RESOURCES, PERIOD_FACETS_BY_GRADE, safeStorage } from '../../data/curriculumData';
import type { StudentFeedback } from '../../data/feedbackData';
import type { QuizExam } from '../../data/quizData';
import { QUIZ_EXAMS } from '../../data/quizData';

interface ScoreHistoryItem {
  examTitle: string;
  score: string;
  correctCount: number;
  totalQuestions: number;
  date: string;
}

interface LearningHubViewProps {
  initialGrade?: GradeLevel;
  hasSelectedGrade: boolean;
  onConfirmGrade: (grade: GradeLevel) => void;
  onResetGradeSelection: () => void;
  onSelectExam: (exam: QuizExam) => void;
  onSubmitFeedback: (fb: Omit<StudentFeedback, 'id' | 'createdAt' | 'status'>) => void;
  customResources: CurriculumResource[];
}

const GRADE_HEADER_META: Record<GradeLevel, { badge: string; desc: string }> = {
  '10': {
    badge: 'Khối 10 · GDPT 2018',
    desc: 'Sử học & Nền văn minh nhân loại',
  },
  '11': {
    badge: 'Khối 11 · 1858 — 1945',
    desc: 'Kháng Pháp, Cần Vương & Thế chiến II',
  },
  '12': {
    badge: 'Khối 12 ★ · Trọng tâm THPT 2026',
    desc: '1919 — Kháng chiến, Độc lập & Đổi mới',
  },
};

export const LearningHubView: React.FC<LearningHubViewProps> = ({
  initialGrade = '12',
  hasSelectedGrade,
  onConfirmGrade,
  onResetGradeSelection,
  onSelectExam,
  onSubmitFeedback,
  customResources,
}) => {
  const [activeGrade, setActiveGrade] = useState<GradeLevel>(initialGrade);
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');
  const [activePeriodFacet, setActivePeriodFacet] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'bookmarked' | 'completed' | 'unattempted'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setActiveGrade(initialGrade);
    setActivePeriodFacet('all');
  }, [initialGrade]);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    safeStorage.get<string[]>('dam_me_lich_su_bookmarks', [])
  );
  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    safeStorage.get<string[]>('dam_me_lich_su_completed_resources', [])
  );

  const [previewResource, setPreviewResource] = useState<CurriculumResource | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [reportTargetTitle, setReportTargetTitle] = useState<string>('');
  const [reportTargetId, setReportTargetId] = useState<string | undefined>(undefined);

  // Rules of Hooks: keep ALL useMemo BEFORE early return (!hasSelectedGrade)
  const allResources = useMemo(() => {
    const resourceMap = new Map<string, CurriculumResource>();
    INITIAL_CURRICULUM_RESOURCES.forEach((r) => resourceMap.set(r.id, r));
    customResources.forEach((r) => resourceMap.set(r.id, r));
    return Array.from(resourceMap.values());
  }, [customResources]);

  const quizScores = useMemo(() => {
    return safeStorage.get<ScoreHistoryItem[]>('dam_me_lich_su_scores', []);
  }, []);

  const averageScore = useMemo(() => {
    if (quizScores.length === 0) return null;
    const sum = quizScores.reduce((acc, cur) => acc + (parseFloat(cur.score) || 0), 0);
    return (sum / quizScores.length).toFixed(1);
  }, [quizScores]);

  const customResourcesCountByGrade: Record<GradeLevel, number> = {
    '10': customResources.filter((r) => r.grade === '10').length,
    '11': customResources.filter((r) => r.grade === '11').length,
    '12': customResources.filter((r) => r.grade === '12').length,
  };

  if (!hasSelectedGrade) {
    return (
      <GradeSelectionGate
        onSelectGrade={(g) => {
          setActiveGrade(g);
          setActiveCategory('all');
          setActivePeriodFacet('all');
          setActiveStatusFilter('all');
          setSearchQuery('');
          onConfirmGrade(g);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        customResourcesCountByGrade={customResourcesCountByGrade}
      />
    );
  }

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

  const gradeResources = allResources.filter((r) => r.grade === activeGrade);
  const gradeBookmarkedCount = gradeResources.filter((r) => bookmarkedIds.includes(r.id)).length;
  const gradeCompletedCount = gradeResources.filter((r) => completedIds.includes(r.id)).length;
  const gradeUnattemptedCount = gradeResources.filter((r) => !completedIds.includes(r.id)).length;
  const gradeExamsCount = QUIZ_EXAMS.filter((e) => e.gradeLevel === activeGrade).length;
  const gradeMeta = GRADE_HEADER_META[activeGrade];

  const filteredResources = gradeResources.filter((res) => {
    if (activeCategory !== 'all' && res.category !== activeCategory) return false;

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

    if (activeStatusFilter === 'bookmarked' && !bookmarkedIds.includes(res.id)) return false;
    if (activeStatusFilter === 'completed' && !completedIds.includes(res.id)) return false;
    if (activeStatusFilter === 'unattempted' && completedIds.includes(res.id)) return false;

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
    const content = `===============================================================
ĐAM MÊ LỊCH SỬ • TÀI LIỆU HỌC TẬP & ÔN THI CHÍNH THỨC
CHỦ NHIỆM: GVBM BÙI THỊ ĐIỀN
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
    <div className="w-full py-10 lg:py-14 bg-[#FAF8F1] animate-fadeSlideUp min-h-[75vh]">
      <div className="w-full max-w-[1680px] mx-auto px-5 sm:px-10 lg:px-14 space-y-6 text-left">
        {/* Clean Unified Grade Header (Zero Background Photo, Zero Duplicate Subheaders) */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
              <span className="px-3 py-1 rounded-full bg-[#9C3B32]/10 text-[#9C3B32] font-bold">
                {gradeMeta.badge}
              </span>
              <button
                onClick={onResetGradeSelection}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#4A5558] hover:text-[#9C3B32] underline underline-offset-4 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đổi khối lớp</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans text-[#4A5558]">
              <span>
                Hoàn thành: <strong className="text-[#0A1418]">{gradeCompletedCount}</strong>
              </span>
              <span>·</span>
              <span>
                Đã lưu: <strong className="text-[#0A1418]">{gradeBookmarkedCount}</strong>
              </span>
              <span>·</span>
              <span>
                Thi thử: <strong className="text-[#0A1418]">{quizScores.length}/{gradeExamsCount}</strong> đề
              </span>
              <span>·</span>
              <span>
                Điểm TB: <strong className="text-[#9C3B32]">{averageScore ? `${averageScore}/10` : '—'}</strong>
              </span>
            </div>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1418] tracking-tight">
            Bài Tập & Đề Thi Khối {activeGrade}
          </h2>
          <p className="text-sm font-sans text-[#4A5558]">{gradeMeta.desc}</p>
        </div>

        {/* Streamlined Filter Strip */}
        <GradeFilterBar
          activeGrade={activeGrade}
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
        <div className="pt-2 space-y-10">
          {(activeCategory === 'homework' ||
            (activeCategory === 'all' && filteredResources.some((r) => r.category === 'homework'))) && (
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

          {(activeCategory === 'exam' ||
            (activeCategory === 'all' && filteredResources.some((r) => r.category === 'exam'))) && (
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

          {(activeCategory === 'all' || activeCategory === 'quiz') && (
            <QuizStudioSection
              grade={activeGrade}
              onSelectExam={onSelectExam}
              onOpenReport={handleOpenReportByTitle}
            />
          )}
        </div>

        <DocumentPreviewModal
          isOpen={!!previewResource}
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          onDownload={handleDownload}
          onOpenReport={handleOpenReport}
        />

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
