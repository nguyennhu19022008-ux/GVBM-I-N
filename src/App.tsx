import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import type { PortalView } from './components/Navbar';
import { PortalLandingView } from './components/portal/PortalLandingView';
import { LearningHubView } from './components/learning/LearningHubView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AdminPinModal } from './components/admin/AdminPinModal';
import { TimelineDetailModal } from './components/TimelineDetailModal';
import { QuizModal } from './components/QuizModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import type { TimelineEvent } from './data/historyData';
import type { QuizExam } from './data/quizData';
import type { CurriculumResource, GradeLevel } from './data/curriculumData';
import type { StudentFeedback } from './data/feedbackData';
import { INITIAL_FEEDBACK_LIST } from './data/feedbackData';
import { QUIZ_EXAMS } from './data/quizData';

export function App() {
  // Current Active Main Zone
  const [currentView, setCurrentView] = useState<PortalView>('portal');
  const [learningGrade, setLearningGrade] = useState<GradeLevel>('12');
  const [hasSelectedGrade, setHasSelectedGrade] = useState<boolean>(false);

  // Admin PIN Protection State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState<boolean>(false);

  // Dynamic Custom Resources (Added by teacher)
  const [customResources, setCustomResources] = useState<CurriculumResource[]>([]);

  // Student Feedback Reports State
  const [feedbackList, setFeedbackList] = useState<StudentFeedback[]>([]);

  // Selected Timeline Event for Modal Reader
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<TimelineEvent | null>(null);

  // Selected Quiz Exam for Testing Room
  const [selectedExam, setSelectedExam] = useState<QuizExam | null>(null);

  // Auth User State
  const [user, setUser] = useState<{ name: string; email: string; school?: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Load persistent states on mount
  useEffect(() => {
    try {
      // 1. User
      const storedUser = localStorage.getItem('dam_me_lich_su_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // 2. Custom Resources
      const storedRes = localStorage.getItem('dam_me_lich_su_custom_res');
      if (storedRes) {
        setCustomResources(JSON.parse(storedRes));
      }

      // 3. Feedback Reports
      const storedFeedback = localStorage.getItem('dam_me_lich_su_feedback');
      if (storedFeedback) {
        setFeedbackList(JSON.parse(storedFeedback));
      } else {
        setFeedbackList(INITIAL_FEEDBACK_LIST);
      }

      // 4. URL Hash Routing
      const hash = window.location.hash.replace('#', '');
      if (hash === 'learning' || hash === 'admin' || hash === 'portal') {
        if (hash === 'admin') {
          setIsAdminPinModalOpen(true);
        } else {
          setCurrentView(hash as PortalView);
        }
      }
    } catch (err) {
      console.warn('Error reading stored state:', err);
    }
  }, []);

  // Sync custom resources to localStorage
  const handleAddResource = (newRes: CurriculumResource) => {
    const updated = [newRes, ...customResources];
    setCustomResources(updated);
    try {
      localStorage.setItem('dam_me_lich_su_custom_res', JSON.stringify(updated));
    } catch (err) {
      console.warn('Cannot save custom resources:', err);
    }
  };

  const handleDeleteResource = (id: string) => {
    const updated = customResources.filter((r) => r.id !== id);
    setCustomResources(updated);
    try {
      localStorage.setItem('dam_me_lich_su_custom_res', JSON.stringify(updated));
    } catch (err) {
      console.warn('Cannot update custom resources:', err);
    }
  };

  // Sync feedback to localStorage
  const handleSubmitFeedback = (fb: Omit<StudentFeedback, 'id' | 'createdAt' | 'status'>) => {
    const newFeedback: StudentFeedback = {
      ...fb,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'pending',
    };

    const updated = [newFeedback, ...feedbackList];
    setFeedbackList(updated);
    try {
      localStorage.setItem('dam_me_lich_su_feedback', JSON.stringify(updated));
    } catch (err) {
      console.warn('Cannot save feedback:', err);
    }
  };

  const handleResolveFeedback = (id: string) => {
    const updated = feedbackList.map((f) =>
      f.id === id ? { ...f, status: 'resolved' as const, resolvedAt: new Date().toISOString() } : f
    );
    setFeedbackList(updated);
    try {
      localStorage.setItem('dam_me_lich_su_feedback', JSON.stringify(updated));
    } catch (err) {
      console.warn('Cannot update feedback:', err);
    }
  };

  // View Navigation
  const handleNavigateView = (view: PortalView) => {
    if (view === 'admin' && !isAdminAuthenticated) {
      setIsAdminPinModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToGrade = (grade: GradeLevel) => {
    setLearningGrade(grade);
    setHasSelectedGrade(true);
    setCurrentView('learning');
    window.location.hash = 'learning';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminPinSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminPinModalOpen(false);
    setCurrentView('admin');
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('portal');
    window.location.hash = 'portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExam = (exam: QuizExam) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setSelectedExam(exam);
    }
  };

  const handleGoToQuizByTopic = (quizId?: string) => {
    const targetExam = QUIZ_EXAMS.find((q) => q.id === quizId) || QUIZ_EXAMS[0];
    handleStartExam(targetExam);
  };

  const handleGoToDownloadByTopic = (_resourceId?: string) => {
    setCurrentView('learning');
    window.location.hash = 'learning';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F1] text-[#0A1418] flex flex-col font-sans selection:bg-[#E5C985]/30 selection:text-[#0A1418] w-full max-w-full overflow-x-hidden">
      
      {/* Top Broadsheet Masthead */}
      <Navbar
        currentView={currentView}
        onChangeView={handleNavigateView}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="w-full flex-1">
        
        {/* VIEW 1: CỔNG KẾT NỐI (LANDING PAGE NHẬT BÁO KÝ ỨC) */}
        {currentView === 'portal' && (
          <PortalLandingView
            onGoToGrade={handleGoToGrade}
            onGoToLearning={() => handleNavigateView('learning')}
            onSelectTimelineEvent={(evt) => setSelectedTimelineEvent(evt)}
            onGoToQuizByTopic={handleGoToQuizByTopic}
            onGoToDownloadByTopic={handleGoToDownloadByTopic}
          />
        )}

        {/* VIEW 2: GIẢNG ĐƯỜNG HỌC TẬP & TƯƠNG TÁC (KHỐI 10 - 11 - 12) */}
        {currentView === 'learning' && (
          <LearningHubView
            initialGrade={learningGrade}
            hasSelectedGrade={hasSelectedGrade}
            onConfirmGrade={(g) => {
              setLearningGrade(g);
              setHasSelectedGrade(true);
            }}
            onResetGradeSelection={() => setHasSelectedGrade(false)}
            onSelectExam={handleStartExam}
            onSubmitFeedback={handleSubmitFeedback}
            customResources={customResources}
          />
        )}

        {/* VIEW 3: KHU VỰC QUẢN TRỊ GIÁO VIÊN (ADMIN DASHBOARD) */}
        {currentView === 'admin' && isAdminAuthenticated && (
          <AdminDashboardView
            resources={customResources}
            feedbackList={feedbackList}
            onAddResource={handleAddResource}
            onDeleteResource={handleDeleteResource}
            onResolveFeedback={handleResolveFeedback}
            onLogout={handleAdminLogout}
          />
        )}

      </main>

      {/* Footer 16:9 Full-Bleed */}
      <Footer
        onNavigateView={handleNavigateView}
        onSelectGrade={handleGoToGrade}
      />

      {/* Modal 1: Admin PIN Login */}
      <AdminPinModal
        isOpen={isAdminPinModalOpen}
        onSuccess={handleAdminPinSuccess}
        onCancel={() => setIsAdminPinModalOpen(false)}
      />

      {/* Modal 2: Full-Screen Archival Event Reader (Timeline) */}
      <TimelineDetailModal
        event={selectedTimelineEvent}
        onClose={() => setSelectedTimelineEvent(null)}
        onGoToQuiz={handleGoToQuizByTopic}
        onGoToDownload={handleGoToDownloadByTopic}
      />

      {/* Modal 3: 16:9 Widescreen Exam Studio */}
      <QuizModal
        exam={selectedExam}
        onClose={() => setSelectedExam(null)}
        user={user}
      />

      {/* Modal 4: Fast Auth & Student Registration */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(newUser) => setUser(newUser)}
      />

    </div>
  );
}

export default App;
