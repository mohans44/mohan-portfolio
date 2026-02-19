import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { work } from '../../data/siteData';

const MotionArticle = motion.article;
const PANEL_REVEAL_INITIAL = {
  opacity: 0,
  scale: 0.992,
};
const PANEL_REVEAL_INVIEW = {
  opacity: 1,
  scale: 1,
};
const PANEL_REVEAL_TRANSITION = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};
const STICKY_COLORS = ['#ffd86f', '#8be9c4', '#9ec8ff', '#ffb4d0', '#cbb7ff', '#ffa373'];
const STICKY_ANGLES = [-6, 5, -4, 7, -5, 6];
const STICKY_BASE_POSITIONS = [
  { x: -320, y: -128 },
  { x: 300, y: -120 },
  { x: -302, y: 126 },
  { x: 286, y: 132 },
  { x: -28, y: -190 },
  { x: 14, y: 196 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const buildInitialStickies = () =>
  work.map((item, idx) => {
    const fallbackPoint = item.desc.split('. ')[0].replace(/\.$/, '');
    const basePosition = STICKY_BASE_POSITIONS[idx % STICKY_BASE_POSITIONS.length];
    return {
      id: `${item.name}-${idx}`,
      name: item.name,
      keyPoint: item.keyPoint ?? fallbackPoint,
      x: basePosition.x,
      y: basePosition.y,
      rotation: STICKY_ANGLES[idx % STICKY_ANGLES.length],
      color: STICKY_COLORS[idx % STICKY_COLORS.length],
    };
  });

const WorkPanel = ({ item, idx }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(hover: none), (pointer: coarse)').matches : false,
  );
  const slides = Array.isArray(item.screenshots) ? item.screenshots : [];
  const currentSlide = slides[activeImage] ?? slides[0] ?? null;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const onChange = (event) => setIsTouchDevice(event.matches);
    setIsTouchDevice(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || isPaused || isTouchDevice) return undefined;
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, isTouchDevice]);

  const goPrev = () => {
    setActiveImage((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveImage((prev) => (prev + 1) % slides.length);
  };

  return (
    <MotionArticle
      className="project-full-panel"
      initial={PANEL_REVEAL_INITIAL}
      whileInView={PANEL_REVEAL_INVIEW}
      viewport={{ amount: 0.52, once: false }}
      transition={{ ...PANEL_REVEAL_TRANSITION, delay: idx * 0.008 }}
    >
      <div className="container project-full-wrap">
        <div className="project-label-row">
          <span className="project-index dot-text">{String(idx + 1).padStart(2, '0')}</span>
          <p className="project-tech-line">{item.tech.join(' · ')}</p>
        </div>

        <div
          className="project-demo-wrap project-demo-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {currentSlide && (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={currentSlide}
                alt={`${item.name} screen ${activeImage + 1}`}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              />
            </AnimatePresence>
          )}

          {slides.length > 1 && (
            <>
              <button type="button" className="carousel-control prev" onClick={goPrev} aria-label="Previous screenshot">
                <ChevronLeft size={16} />
              </button>
              <button type="button" className="carousel-control next" onClick={goNext} aria-label="Next screenshot">
                <ChevronRight size={16} />
              </button>
              <div className="carousel-dots" role="tablist" aria-label={`${item.name} screenshots`}>
                {slides.map((_, dotIdx) => (
                  <button
                    type="button"
                    key={`${item.name}-dot-${dotIdx}`}
                    className={dotIdx === activeImage ? 'carousel-dot active' : 'carousel-dot'}
                    onClick={() => setActiveImage(dotIdx)}
                    aria-label={`Go to screenshot ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="project-info-clean project-info-full">
          <div className="project-title-block">
            <h3>{item.name}</h3>
          </div>
          <p>{item.desc}</p>
          <div className="project-links-clean">
            <a href={item.live} target="_blank" rel="noreferrer">
              Live Demo
              <ArrowUpRight size={16} />
            </a>
            <a href={item.github} target="_blank" rel="noreferrer">
              Source Code
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
};

const GAME_DURATION = 15;
const randomTarget = () => ({
  x: 8 + Math.random() * 84,
  y: 10 + Math.random() * 78,
});

const WorkOutroPanel = ({ revealGame }) => {
  const [gameState, setGameState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [target, setTarget] = useState(() => randomTarget());
  const [streak, setStreak] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const isPlaying = gameState === 'playing';
  const isEnded = gameState === 'ended';

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('ended');
          setBest((bestScore) => Math.max(bestScore, score));
          setStreak(0);
          return 0;
        }
        setStreak(0);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, score]);

  const startGame = (countFirstHit = false) => {
    setTimeLeft(GAME_DURATION);
    setTarget(randomTarget());
    setScore(countFirstHit ? 1 : 0);
    setStreak(countFirstHit ? 1 : 0);
    setGameState('playing');
  };

  const hitTarget = () => {
    if (!isPlaying) {
      startGame(true);
      return;
    }
    if (timeLeft <= 0 || isEnded) return;
    setScore((prev) => prev + 1 + Math.min(streak, 4));
    setStreak((prev) => prev + 1);
    setTarget(randomTarget());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGame(revealGame);
    }, revealGame ? 420 : 0);
    return () => clearTimeout(timer);
  }, [revealGame]);

  return (
    <MotionArticle
      className="work-outro-panel"
      initial={PANEL_REVEAL_INITIAL}
      whileInView={PANEL_REVEAL_INVIEW}
      viewport={{ amount: 0.5, once: false }}
      transition={PANEL_REVEAL_TRANSITION}
    >
      <div className="work-outro-wrap">
        <div className={showGame ? 'work-outro-head is-visible' : 'work-outro-head is-hidden'}>
          <h3 className={showGame ? 'dot-text playground-title is-live' : 'dot-text playground-title'}>
            PLAYGROUND
          </h3>
          <p className="work-outro-sub">Quick reflex challenge: hit the moving orb before time runs out.</p>
        </div>

        <div className="scroll-game">
          <AnimatePresence mode="wait">
            {!showGame ? (
              <motion.div
                key="playground-locked"
                className="scroll-game-blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <motion.div
                key="playground-open"
                className="scroll-game-live"
                initial={{ opacity: 0, y: 20, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="scroll-game-stage" role="img" aria-label="Reflex game board">
                  <div className="scroll-game-hud">
                    <span>{isPlaying ? `Time: ${timeLeft}s` : 'Tap Orb to Start'}</span>
                    <span>Score: {score}</span>
                    <span>Best: {best}</span>
                    <span>Combo: x{Math.max(streak, 1)}</span>
                    {isEnded && <span>Round Complete</span>}
                  </div>

                  <button
                    type="button"
                    className="game-target"
                    onClick={hitTarget}
                    style={{ '--target-x': `${target.x}%`, '--target-y': `${target.y}%` }}
                    aria-label="Hit target"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionArticle>
  );
};

const WorkSection = () => {
  const [stickies, setStickies] = useState(() => buildInitialStickies());
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1025px)').matches : true,
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );
  const [playgroundUnlocked, setPlaygroundUnlocked] = useState(() => !isDesktop);
  const panelRef = useRef(null);
  const dragRef = useRef({
    stickyId: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const onStickyPointerDown = (event, sticky) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      stickyId: sticky.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: sticky.x,
      originY: sticky.y,
    };
  };

  const onStickyPointerMove = (event) => {
    const { stickyId, pointerId, startX, startY, originX, originY } = dragRef.current;
    if (!stickyId || !panelRef.current) return;
    if (pointerId !== null && event.pointerId !== pointerId) return;

    const rect = panelRef.current.getBoundingClientRect();
    const maxX = Math.max(92, rect.width / 2 - 120);
    const maxY = Math.max(92, rect.height / 2 - 86);
    const nextX = clamp(originX + event.clientX - startX, -maxX, maxX);
    const nextY = clamp(originY + event.clientY - startY, -maxY, maxY);

    setStickies((prev) => prev.map((sticky) => (sticky.id === stickyId ? { ...sticky, x: nextX, y: nextY } : sticky)));
  };

  const onStickyPointerUp = () => {
    dragRef.current = {
      stickyId: null,
      pointerId: null,
      startX: 0,
      startY: 0,
      originX: 0,
      originY: 0,
    };
  };

  useEffect(() => {
    const handlePointerMove = (event) => onStickyPointerMove(event);
    const handlePointerUp = () => onStickyPointerUp();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(min-width: 1025px)');
    const onChange = (event) => setIsDesktop(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      const id = window.requestAnimationFrame(() => setPlaygroundUnlocked(true));
      return () => window.cancelAnimationFrame(id);
    }
    const scrollRoot = panelRef.current?.closest('.projects-page-view');
    if (!scrollRoot) {
      const id = window.requestAnimationFrame(() => setPlaygroundUnlocked(false));
      return () => window.cancelAnimationFrame(id);
    }
    const unlockWhenDoneScrolling = () => {
      const atBottom = scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 8;
      setPlaygroundUnlocked(atBottom);
    };

    unlockWhenDoneScrolling();
    scrollRoot.addEventListener('scroll', unlockWhenDoneScrolling, { passive: true });
    return () => scrollRoot.removeEventListener('scroll', unlockWhenDoneScrolling);
  }, [isDesktop]);

  return (
    <section id="work" className="projects-modern">
      <motion.div
        className="work-intro-panel"
        ref={panelRef}
        initial={PANEL_REVEAL_INITIAL}
        whileInView={PANEL_REVEAL_INVIEW}
        viewport={{ amount: 0.5, once: false }}
        transition={PANEL_REVEAL_TRANSITION}
      >
        <div className="work-stickies-layer">
          {stickies.map((sticky) => (
            <button
              key={sticky.id}
              type="button"
              className="work-sticky-note"
              style={{
                '--sticky-x': `${sticky.x}px`,
                '--sticky-y': `${sticky.y}px`,
                '--sticky-rotation': `${sticky.rotation}deg`,
                '--sticky-color': sticky.color,
              }}
              onPointerDown={(event) => onStickyPointerDown(event, sticky)}
              aria-label={`Move sticky note for ${sticky.name}`}
            >
              <span className="sticky-name">{sticky.name}</span>
              <p>{sticky.keyPoint}</p>
            </button>
          ))}
        </div>
        <h2 className="work-intro-title nothing-dotted">Selected Work</h2>
        <div className="work-scroll-hint" aria-hidden="true">
          <span className="work-scroll-text">Scroll for Work</span>
          <span className="work-scroll-arrow">↓</span>
        </div>
      </motion.div>
      {work.map((item, idx) => (
        <WorkPanel key={item.name} item={item} idx={idx} />
      ))}
      {!isMobile && <WorkOutroPanel revealGame={playgroundUnlocked} />}
    </section>
  );
};

export default WorkSection;
