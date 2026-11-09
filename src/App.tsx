import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { TimelineDetailModal } from './components/TimelineDetailModal';
import { DownloadsSection } from './components/DownloadsSection';
import { QuizSection } from './components/QuizSection';
import { QuizModal } from './components/QuizModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { QUIZ_EXAMS } from './data/quizData';
import type { TimelineEvent } from './data/historyData';
import type { QuizExam } from './data/quizData';

export function App() {
  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'timeline' | 'downloads' | 'quiz' | 'all'>('all');

  // Selected Timeline Event for Modal Reader
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<TimelineEvent | null>(null);

  // Selected Quiz Exam for Testing Room
  const [selectedExam, setSelectedExam] = useState<QuizExam | null>(null);

  // Auth User State
  const [user, setUser] = useState<{ name: string; email: string; school?: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Check stored user on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dam_me_lich_su_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.warn('Cannot read stored user:', err);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    scrollToSection('downloads-section');
  };

  const handleLoginSuccess = (newUser: { name: string; email: string; school?: string }) => {
    setUser(newUser);
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] text-[#18120E] flex flex-col font-sans selection:bg-[#D4A373]/30 selection:text-[#4A2508] w-full max-w-full overflow-x-hidden">
      {/* Top Sticky Full-Bleed Masthead */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main className="w-full flex-1">
        {/* Chapter I: Hero Section 16:9 Asymmetric Split */}
        <HeroSection
          onExploreTimeline={() => scrollToSection('timeline-section')}
          onExploreDownloads={() => scrollToSection('downloads-section')}
          onStartQuiz={() => scrollToSection('quiz-section')}
        />

        {/* Chapter II: Interactive 16:9 Timeline (Split-Stage Master-Detail) */}
        <TimelineSection
          onSelectEventDetail={(evt) => setSelectedTimelineEvent(evt)}
          onGoToQuiz={handleGoToQuizByTopic}
          onGoToDownload={handleGoToDownloadByTopic}
        />

        {/* Chapter III: Public Downloads Hub (16:9 Asymmetric Bento & Open Ledger) */}
        <DownloadsSection
          onGoToQuiz={handleGoToQuizByTopic}
        />

        {/* Chapter IV: Widescreen Mini-Quiz Exam Room */}
        <QuizSection
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onSelectExam={(exam) => handleStartExam(exam)}
        />
      </main>

      {/* Footer 16:9 Full-Bleed */}
      <Footer
        onNavigateTab={setActiveTab}
        onScrollToSection={scrollToSection}
      />

      {/* Modal 1: Full-Screen Archival Event Reader */}
      <TimelineDetailModal
        event={selectedTimelineEvent}
        onClose={() => setSelectedTimelineEvent(null)}
        onGoToQuiz={handleGoToQuizByTopic}
        onGoToDownload={handleGoToDownloadByTopic}
      />

      {/* Modal 2: 16:9 Widescreen Exam Studio */}
      <QuizModal
        exam={selectedExam}
        onClose={() => setSelectedExam(null)}
        user={user}
      />

      {/* Modal 3: Fast Auth & Student Registration */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
