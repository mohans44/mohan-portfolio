import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  CloudSnow,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Minus,
  Moon,
  Sun,
  Users,
  X,
} from "lucide-react";
import { SiReact, SiNodedotjs, SiMongodb, SiPython } from 'react-icons/si';
import { header } from '../../data/siteData';

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionAnchor = motion.a;
const MotionP = motion.p;
const WIDGET_STICKIES = [
  { id: 'weather', x: 0, y: 0, rotation: -4, layer: 1 },
  { id: 'tech', x: 0, y: 0, rotation: 3.4, layer: 1 },
  { id: 'social', x: 0, y: 0, rotation: -3.2, layer: 1 },
  { id: 'resume', x: 0, y: 0, rotation: 4, layer: 1 },
];
const weatherCodeMap = {
  0: 'Clear',
  1: 'Mostly Clear',
  2: 'Partly Cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Rime Fog',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Dense Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Light Rain',
  63: 'Rainy',
  65: 'Heavy Rain',
  66: 'Freezing Rain',
  67: 'Freezing Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Rain Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  85: 'Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Storm + Hail',
  99: 'Severe Storm',
};
const GREETINGS = [
  "Hi",
  "नमस्कार",
  "నమస్కారం",
  "வணக்கம்",
  "നമസ്കാരം",
  "ನಮಸ್ಕಾರ",
  "Bonjour",
  "Hola",
  "Ciao",
  "こんにちは",
  "Hallo",
];
const WORK_CTA_STATES = [
  "View My Work",
  "PROJECT_ARCHIVE",
  "LAUNCH_WORK",
  "WORK://OPEN",
  "WORK.EXE",
  "Open Portfolio",
];

const HomeIntroSection = ({ openResume, onOpenWork }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [weatherText, setWeatherText] = useState('Loading weather...');
  const [weatherCode, setWeatherCode] = useState(null);
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [isDaytime, setIsDaytime] = useState(null);
  const [workCtaMode, setWorkCtaMode] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );
  const [widgetStickies, setWidgetStickies] = useState(WIDGET_STICKIES);
  const [activeStickyId, setActiveStickyId] = useState(null);
  const [widgetVisible, setWidgetVisible] = useState({
    weather: true,
    tech: true,
    social: true,
    resume: true,
  });
  const [widgetMinimized, setWidgetMinimized] = useState({
    weather: false,
    tech: false,
    social: false,
    resume: false,
  });
  const dragRef = useRef({
    id: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });
  const skipResumeClickRef = useRef(false);
  const displayName = "Mohan";
  const github = header.socials.find((item) => item.label === "GitHub")?.url;
  const linkedin = header.socials.find(
    (item) => item.label === "LinkedIn",
  )?.url;
  const email = header.socials.find((item) => item.label === "Email")?.url;
  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setWorkCtaMode(0);
      return undefined;
    }
    const timer = setInterval(() => {
      setWorkCtaMode((prev) => (prev + 1) % WORK_CTA_STATES.length);
    }, 1450);
    return () => clearInterval(timer);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return undefined;
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=17.0052&longitude=81.7778&current=temperature_2m,weather_code,is_day&timezone=auto',
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('weather fetch failed');

        const data = await response.json();
        const temp = Math.round(data?.current?.temperature_2m);
        const weatherCode = data?.current?.weather_code;
        const dayFlag = data?.current?.is_day;
        const weatherLabel = weatherCodeMap[weatherCode] ?? 'Weather';
        setWeatherCode(Number.isFinite(weatherCode) ? weatherCode : null);
        setWeatherTemp(Number.isFinite(temp) ? temp : null);
        setIsDaytime(dayFlag === 1);
        if (Number.isFinite(temp)) {
          setWeatherText(`${temp}°C · ${weatherLabel}`);
        } else {
          setWeatherText('Weather unavailable');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setWeatherText('Weather unavailable');
          setWeatherTemp(null);
          setIsDaytime(null);
        }
      }
    };

    fetchWeather();
    const refresh = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => {
      controller.abort();
      clearInterval(refresh);
    };
  }, [isMobile]);

  const getSticky = (id) => widgetStickies.find((item) => item.id === id) ?? WIDGET_STICKIES.find((item) => item.id === id);

  const stickyStyle = (id) => {
    const item = getSticky(id);
    if (!item) return undefined;
    return {
      '--widget-offset-x': `${item.x}px`,
      '--widget-offset-y': `${item.y}px`,
      '--widget-rotation': `${item.rotation}deg`,
      zIndex: item.layer,
    };
  };

  const onStickyPointerDown = (event, id) => {
    if (event.target.closest('a, button')) return;
    const sticky = getSticky(id);
    if (!sticky) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setActiveStickyId(id);
    setWidgetStickies((prev) => {
      const maxLayer = prev.reduce((max, item) => Math.max(max, item.layer), 1);
      return prev.map((item) => (item.id === id ? { ...item, layer: maxLayer + 1 } : item));
    });
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: sticky.x,
      originY: sticky.y,
      moved: false,
    };
  };

  const onStickyPointerMove = (event) => {
    const { id, pointerId, startX, startY, originX, originY } = dragRef.current;
    if (!id || (pointerId !== null && event.pointerId !== pointerId)) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      dragRef.current.moved = true;
      if (id === 'resume') skipResumeClickRef.current = true;
    }
    setWidgetStickies((prev) => prev.map((item) => (item.id === id ? { ...item, x: originX + deltaX, y: originY + deltaY } : item)));
  };

  const onStickyPointerUp = () => {
    dragRef.current = {
      id: null,
      pointerId: null,
      startX: 0,
      startY: 0,
      originX: 0,
      originY: 0,
      moved: false,
    };
    setActiveStickyId(null);
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

  const toggleWidgetFold = (event, id) => {
    event.stopPropagation();
    event.preventDefault();
    setWidgetMinimized((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeWidget = (event, id) => {
    event.stopPropagation();
    event.preventDefault();
    setWidgetVisible((prev) => ({ ...prev, [id]: false }));
  };

  const getWeatherVisual = () => {
    const code = weatherCode;
    const temp = weatherTemp;
    const daytimeNow = isDaytime ?? (() => {
      const hour = new Date().getHours();
      return hour >= 6 && hour < 18;
    })();
    const tempBand = (() => {
      if (!Number.isFinite(temp)) return 'mild';
      if (temp >= 36) return 'hot';
      if (temp >= 29) return 'warm';
      if (temp >= 21) return 'mild';
      if (temp >= 11) return 'cool';
      return 'cold';
    })();
    const pick = (palette) => palette[tempBand] ?? palette.mild;

    if ([95, 96, 99].includes(code)) {
      return {
        Icon: CloudLightning,
        color: daytimeNow ? '#8f5bff' : '#b794ff',
      };
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return {
        Icon: CloudSnow,
        color: pick({
          hot: '#8fc9ff',
          warm: '#7cbcff',
          mild: '#68aef5',
          cool: '#5f9edf',
          cold: '#7ea8d8',
        }),
      };
    }
    if ([61, 63, 65, 66, 67].includes(code)) {
      return {
        Icon: CloudRain,
        color: pick({
          hot: '#4f89d9',
          warm: '#477fc9',
          mild: '#3f75b8',
          cool: '#3669a6',
          cold: '#4f78aa',
        }),
      };
    }
    if ([51, 53, 55, 56, 57, 80, 81, 82].includes(code)) {
      return {
        Icon: CloudDrizzle,
        color: pick({
          hot: '#5a9be4',
          warm: '#4f90d8',
          mild: '#4683ca',
          cool: '#3d77bc',
          cold: '#5f8fbe',
        }),
      };
    }
    if ([2].includes(code)) {
      return {
        Icon: daytimeNow ? CloudSun : CloudMoon,
        color: daytimeNow
          ? pick({
              hot: '#ff9548',
              warm: '#f8ab4f',
              mild: '#f2be64',
              cool: '#8ea6e3',
              cold: '#7f97d7',
            })
          : pick({
              hot: '#c09bff',
              warm: '#a991ff',
              mild: '#94a8ff',
              cool: '#7f9cf4',
              cold: '#79a4e5',
            }),
      };
    }
    if ([3, 45, 48].includes(code)) {
      return {
        Icon: Cloud,
        color: daytimeNow
          ? pick({
              hot: '#9aa4b1',
              warm: '#8f9ba8',
              mild: '#83909d',
              cool: '#778391',
              cold: '#8c9dad',
            })
          : pick({
              hot: '#94a0b7',
              warm: '#8592aa',
              mild: '#7785a0',
              cool: '#6e7b95',
              cold: '#7f90ad',
            }),
      };
    }
    if ([0, 1].includes(code)) {
      return {
        Icon: daytimeNow ? Sun : Moon,
        color: daytimeNow
          ? pick({
              hot: '#ff6b2c',
              warm: '#ff8c3a',
              mild: '#f4b400',
              cool: '#f6c64d',
              cold: '#ffd27a',
            })
          : pick({
              hot: '#caa8ff',
              warm: '#b9a3ff',
              mild: '#a8b6ff',
              cool: '#91a7f5',
              cold: '#88b5ea',
            }),
      };
    }
    return {
      Icon: daytimeNow ? CloudSun : CloudMoon,
      color: daytimeNow ? '#8f9aa8' : '#8b98b6',
    };
  };

  const { Icon: WeatherIcon, color: weatherIconColor } = getWeatherVisual();

  return (
    <section id="hero" className="portfolio-section hero-section">
      <div className="container hero-grid">
        <MotionArticle
          className="hero-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-greeting-wrap" aria-live="polite">
            <AnimatePresence initial={false} mode="wait">
              <MotionP
                key={GREETINGS[greetingIndex]}
                className="hero-greeting"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                {GREETINGS[greetingIndex]}
              </MotionP>
            </AnimatePresence>
          </div>

          <h1 className="hero-intro-line">
            <span className="hero-im">I&apos;m,</span>{" "}
            <span className="hero-name hero-name-inter hero-name-highlight">
              <span className="hero-name-sticky" aria-hidden="true">
                <span className="hero-name-sticky-text dot-text glyph-lights">{displayName}</span>
              </span>
              <span className="hero-name-main">{displayName}</span>
            </span>
          </h1>
          <p className="hero-role">Software Developer</p>

          <div className="hero-actions">
            <MotionAnchor
              href="#work"
              className={`hero-work-link cta-morph mode-${workCtaMode}`}
              onClick={(event) => {
                event.preventDefault();
                onOpenWork();
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="link-label">{WORK_CTA_STATES[workCtaMode]}</span>
              <ExternalLink size={16} />
            </MotionAnchor>
          </div>
        </MotionArticle>

        {isMobile ? (
          <MotionDiv
            className="mobile-home-info"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="mobile-info-item" onClick={openResume}>
              <FileText size={16} />
              <span>Resume</span>
            </button>

            <div className="mobile-info-item mobile-tech-row">
              <Code2 size={16} />
              <span className="mobile-tech-label">Tech Stack</span>
              <div className="mobile-tech-icons" aria-label="Tech stack icons">
                <SiReact size={14} color="currentColor" />
                <SiNodedotjs size={14} color="currentColor" />
                <SiMongodb size={14} color="currentColor" />
                <SiPython size={14} color="currentColor" />
              </div>
            </div>

            <div className="mobile-info-item">
              <Users size={16} />
              <span>Socials</span>
              <div className="mobile-social-links">
                <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={14} />
                </a>
                <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={14} />
                </a>
                <a href={email} aria-label="Email">
                  <Mail size={14} />
                </a>
              </div>
            </div>
          </MotionDiv>
        ) : (
          <MotionDiv
            className="widget-grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {widgetVisible.weather && (
            <MotionArticle
              className={activeStickyId === 'weather'
                ? `widget-circle widget-weather ${widgetMinimized.weather ? 'is-minimized' : ''} ${!widgetVisible.weather ? 'is-closed' : ''} is-dragging`
                : `widget-circle widget-weather ${widgetMinimized.weather ? 'is-minimized' : ''} ${!widgetVisible.weather ? 'is-closed' : ''}`}
              style={stickyStyle('weather')}
              onPointerDown={(event) => onStickyPointerDown(event, 'weather')}
            >
                <div className="widget-top-row">
                  <div className="widget-icon-lead" aria-hidden="true">
                    <CloudSun size={21} strokeWidth={2} />
                  </div>
                <div className="widget-controls" aria-label="Widget controls">
                  <button type="button" className="widget-control-btn min" onClick={(event) => toggleWidgetFold(event, 'weather')} aria-label="Minimize sticky">
                    <Minus size={10} />
                  </button>
                  <button type="button" className="widget-control-btn close" onClick={(event) => closeWidget(event, 'weather')} aria-label="Close sticky">
                    <X size={9} />
                  </button>
                </div>
              </div>
              <h3 className="dot-text widget-circle-title">Rajahmundry</h3>
              <div className="widget-copy">
                <div className="widget-weather-extra-icon" aria-hidden="true">
                  <WeatherIcon size={40} strokeWidth={2} style={{ color: weatherIconColor }} />
                </div>
                <p className="widget-circle-subtitle">{weatherText}</p>
              </div>
            </MotionArticle>
            )}

            {widgetVisible.tech && (
            <MotionArticle
              className={activeStickyId === 'tech'
                ? `widget-circle widget-tech ${widgetMinimized.tech ? 'is-minimized' : ''} ${!widgetVisible.tech ? 'is-closed' : ''} is-dragging`
                : `widget-circle widget-tech ${widgetMinimized.tech ? 'is-minimized' : ''} ${!widgetVisible.tech ? 'is-closed' : ''}`}
              style={stickyStyle('tech')}
              onPointerDown={(event) => onStickyPointerDown(event, 'tech')}
            >
              <div className="widget-top-row">
                <div className="widget-icon-lead" aria-hidden="true">
                  <Code2 size={20} strokeWidth={1.8} />
                </div>
                <div className="widget-controls" aria-label="Widget controls">
                  <button type="button" className="widget-control-btn min" onClick={(event) => toggleWidgetFold(event, 'tech')} aria-label="Minimize sticky">
                    <Minus size={10} />
                  </button>
                  <button type="button" className="widget-control-btn close" onClick={(event) => closeWidget(event, 'tech')} aria-label="Close sticky">
                    <X size={9} />
                  </button>
                </div>
              </div>
              <h3 className="dot-text widget-circle-title">Tech Stack</h3>
              <div className="widget-copy">
                <div className="widget-tech-icons widget-circle-subtitle" aria-label="Tech stack icons">
                  <span title="React">
                    <SiReact size={25} color="currentColor" />
                  </span>
                  <span title="Node.js">
                    <SiNodedotjs size={25} color="currentColor" />
                  </span>
                  <span title="MongoDB">
                    <SiMongodb size={25} color="currentColor" />
                  </span>
                  <span title="Python">
                    <SiPython size={25} color="currentColor" />
                  </span>
                </div>
              </div>
            </MotionArticle>
            )}

            {widgetVisible.social && (
            <MotionArticle
              className={activeStickyId === 'social'
                ? `widget-circle widget-social ${widgetMinimized.social ? 'is-minimized' : ''} ${!widgetVisible.social ? 'is-closed' : ''} is-dragging`
                : `widget-circle widget-social ${widgetMinimized.social ? 'is-minimized' : ''} ${!widgetVisible.social ? 'is-closed' : ''}`}
              style={stickyStyle('social')}
              onPointerDown={(event) => onStickyPointerDown(event, 'social')}
            >
              <div className="widget-top-row">
                <div className="widget-icon-lead" aria-hidden="true">
                  <Users size={20} strokeWidth={1.8} />
                </div>
                <div className="widget-controls" aria-label="Widget controls">
                  <button type="button" className="widget-control-btn min" onClick={(event) => toggleWidgetFold(event, 'social')} aria-label="Minimize sticky">
                    <Minus size={10} />
                  </button>
                  <button type="button" className="widget-control-btn close" onClick={(event) => closeWidget(event, 'social')} aria-label="Close sticky">
                    <X size={9} />
                  </button>
                </div>
              </div>
              <h3 className="dot-text widget-circle-title">Socials</h3>
              <div className="widget-copy">
                <div className="widget-socials widget-circle-subtitle">
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <Github size={21} />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={21} />
                  </a>
                  <a href={email} aria-label="Email">
                    <Mail size={21} />
                  </a>
                </div>
              </div>
            </MotionArticle>
            )}

            {widgetVisible.resume && (
            <MotionArticle
              className={activeStickyId === 'resume'
                ? `widget-circle widget-resume-tile ${widgetMinimized.resume ? 'is-minimized' : ''} ${!widgetVisible.resume ? 'is-closed' : ''} is-dragging`
                : `widget-circle widget-resume-tile ${widgetMinimized.resume ? 'is-minimized' : ''} ${!widgetVisible.resume ? 'is-closed' : ''}`}
              style={stickyStyle('resume')}
              onPointerDown={(event) => onStickyPointerDown(event, 'resume')}
            >
              <div className="widget-top-row">
                <div className="widget-icon-lead" aria-hidden="true">
                  <FileText size={20} strokeWidth={1.8} />
                </div>
                <div className="widget-controls" aria-label="Widget controls">
                  <button type="button" className="widget-control-btn min" onClick={(event) => toggleWidgetFold(event, 'resume')} aria-label="Minimize sticky">
                    <Minus size={10} />
                  </button>
                  <button type="button" className="widget-control-btn close" onClick={(event) => closeWidget(event, 'resume')} aria-label="Close sticky">
                    <X size={9} />
                  </button>
                </div>
              </div>
              <h3 className="dot-text widget-circle-title">Resume</h3>
              <div className="widget-copy widget-copy-empty">
                <button
                  type="button"
                  className="widget-resume-action"
                  aria-label="View resume"
                  title="View resume"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (skipResumeClickRef.current) {
                      skipResumeClickRef.current = false;
                      return;
                    }
                    openResume();
                  }}
                >
                  <ExternalLink size={25} />
                </button>
              </div>
            </MotionArticle>
            )}
          </MotionDiv>
        )}
      </div>
    </section>
  );
};

export default HomeIntroSection;
