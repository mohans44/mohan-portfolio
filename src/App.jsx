import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import HomeIntroSection from './components/sections/HomeIntroSection';
import AboutSection from './components/sections/AboutSection';
import WorkSection from './components/sections/WorkSection';
import JourneySection from './components/sections/JourneySection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import ResumeModal from './components/common/ResumeModal';
import './App.css';

const MotionDiv = motion.div;
const pages = ['home', 'work', 'blog'];

function App() {
  const [showResume, setShowResume] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return pages.includes(hash) ? hash : 'home';
  });
  const homeRef = useRef(null);
  const workRef = useRef(null);
  const blogRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (pages.includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (activePage !== 'home') {
      window.location.hash = activePage;
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [activePage, isMobile]);

  const changePage = (pageId) => {
    if (!pages.includes(pageId)) return;
    setActivePage(pageId);
  };

  const openWork = () => {
    if (isMobile) {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    changePage('work');
  };

  return (
    <div className={!isMobile && activePage === 'work' ? 'app-shell work-mode' : 'app-shell'}>
      <MotionDiv
        className="ambient ambient-one"
        aria-hidden="true"
        animate={{ opacity: [0.2, 0.36, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="ambient ambient-two"
        aria-hidden="true"
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Header
        activePage={activePage}
        onPageChange={changePage}
      />

      <main className={isMobile || activePage === 'home' ? 'site-main home-main' : 'site-main'}>
        {isMobile ? (
          <MotionDiv
            className="page-view page-layer home-page-view"
            ref={homeRef}
            key="mobile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <HomeIntroSection
              openResume={() => setShowResume(true)}
              onOpenWork={openWork}
            />
            <AboutSection />
            <WorkSection />
            <JourneySection />
            <BlogSection />
            <ContactSection />
          </MotionDiv>
        ) : (
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <MotionDiv
                className="page-view page-layer home-page-view"
                ref={homeRef}
                key="home-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <HomeIntroSection
                  openResume={() => setShowResume(true)}
                  onOpenWork={openWork}
                />
                <AboutSection />
                <JourneySection />
                <ContactSection />
              </MotionDiv>
            )}

            {activePage === 'work' && (
              <MotionDiv
                className="page-view page-layer projects-page-view"
                ref={workRef}
                key="work-page"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <WorkSection />
              </MotionDiv>
            )}

            {activePage === 'blog' && (
              <MotionDiv
                className="page-view page-layer blog-page-view"
                ref={blogRef}
                key="blog-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <BlogSection />
              </MotionDiv>
            )}
          </AnimatePresence>
        )}
      </main>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
    </div>
  );
}

export default App;
