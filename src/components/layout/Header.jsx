import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MotionHeader = motion.header;
const MotionSpan = motion.span;
const MotionDiv = motion.div;

const navLinks = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "blog", label: "Blog" },
];

const Header = ({ activePage, onPageChange }) => {
  const [now, setNow] = useState(() => new Date());
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const dateText = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" }).format(now),
    [now],
  );
  const timeText = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(now) + " IST",
    [now],
  );

  return (
    <MotionHeader
      className="site-header"
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionDiv
        className="header-shell header-float motion-glass"
        animate={{
          width: 'min(760px, calc(100vw - 12px))',
          padding: '7px 8px'
        }}
        transition={{ duration: 0, layout: { duration: 0 } }}
      >
        <AnimatePresence mode="wait">
          <MotionDiv
            key="full-nav"
            className="header-full-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="brand-mark motion-glass"
              aria-label="Go to home page"
              onClick={() => onPageChange("home")}
            >
              MSS.
            </button>

            {!isMobile && (
              <nav className="site-nav" aria-label="Primary navigation">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className={activePage === link.id ? "nav-link active" : "nav-link"}
                    onClick={() => onPageChange(link.id)}
                  >
                    {activePage === link.id && (
                      <MotionSpan
                        layoutId="active-pill"
                        className="active-pill-bg"
                        transition={{ duration: 0 }}
                      />
                    )}
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            <div className="header-actions">
              <span className="header-meta">
                {isMobile ? timeText : `${dateText} · ${timeText}`}
              </span>
            </div>
          </MotionDiv>
        </AnimatePresence>
      </MotionDiv>
    </MotionHeader>
  );
};

export default Header;
