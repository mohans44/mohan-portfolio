import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CloudSun,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Users,
} from "lucide-react";
import { SiReact, SiNodedotjs, SiMongodb, SiPython } from 'react-icons/si';
import { header } from '../../data/siteData';

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionAnchor = motion.a;
const MotionP = motion.p;
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

const HomeIntroSection = ({ openResume, onOpenWork }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [weatherText, setWeatherText] = useState('Loading weather...');
  const displayName = "Mohan";
  const github = header.socials.find((item) => item.label === "GitHub")?.url;
  const linkedin = header.socials.find(
    (item) => item.label === "LinkedIn",
  )?.url;
  const email = header.socials.find((item) => item.label === "Email")?.url;
  const greetings = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 1400);
    return () => clearInterval(timer);
  }, [greetings.length]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=17.0052&longitude=81.7778&current=temperature_2m,weather_code&timezone=auto',
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('weather fetch failed');

        const data = await response.json();
        const temp = Math.round(data?.current?.temperature_2m);
        const weatherCode = data?.current?.weather_code;
        const weatherLabel = weatherCodeMap[weatherCode] ?? 'Weather';
        if (Number.isFinite(temp)) {
          setWeatherText(`${temp}°C · ${weatherLabel}`);
        } else {
          setWeatherText('Weather unavailable');
        }
      } catch (error) {
        if (error.name !== 'AbortError') setWeatherText('Weather unavailable');
      }
    };

    fetchWeather();
    const refresh = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => {
      controller.abort();
      clearInterval(refresh);
    };
  }, []);

  return (
    <section id="hero" className="portfolio-section hero-section">
      <div className="container hero-grid">
        <MotionArticle
          className="hero-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-greeting-wrap" aria-live="polite">
            <AnimatePresence mode="wait">
              <MotionP
                key={greetings[greetingIndex]}
                className="hero-greeting dot-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {greetings[greetingIndex]}
              </MotionP>
            </AnimatePresence>
          </div>

          <h1 className="hero-intro-line">
            <span className="hero-im">I&apos;m,</span>{" "}
            <span className="hero-name hero-name-inter">{displayName}</span>
          </h1>
          <p className="hero-role">Software Developer</p>

          <div className="hero-actions">
            <MotionAnchor
              href="#work"
              className="hero-work-link"
              onClick={(event) => {
                event.preventDefault();
                onOpenWork();
              }}
              whileTap={{ scale: 0.98 }}
            >
              View my work
              <ExternalLink size={16} />
            </MotionAnchor>
          </div>
        </MotionArticle>

        <MotionDiv
          className="widget-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <MotionArticle
            className="widget-circle widget-weather"
            whileHover={{ y: -4 }}
          >
            <CloudSun size={42} strokeWidth={1.5} />
            <h3 className="dot-text widget-circle-title">Rajahmundry</h3>
            <p className="widget-circle-subtitle">{weatherText}</p>
          </MotionArticle>

          <MotionArticle
            className="widget-circle widget-tech"
            whileHover={{ y: -4 }}
          >
            <Code2 size={42} strokeWidth={1.5} />
            <h3 className="dot-text widget-circle-title">Tech Stack</h3>
            <div className="widget-tech-icons widget-circle-subtitle" aria-label="Tech stack icons">
              <span title="React">
                <SiReact size={22} color="currentColor" />
              </span>
              <span title="Node.js">
                <SiNodedotjs size={22} color="currentColor" />
              </span>
              <span title="MongoDB">
                <SiMongodb size={22} color="currentColor" />
              </span>
              <span title="Python">
                <SiPython size={22} color="currentColor" />
              </span>
            </div>
          </MotionArticle>

          <MotionArticle
            className="widget-circle widget-social"
            whileHover={{ y: -4 }}
          >
            <Users size={42} strokeWidth={1.5} />
            <h3 className="dot-text widget-circle-title">Socials</h3>
            <div className="widget-socials widget-circle-subtitle">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a href={email} aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </MotionArticle>

          <MotionArticle
            className="widget-circle widget-resume-tile"
            whileHover={{ y: -4 }}
            onClick={openResume}
          >
            <FileText size={42} strokeWidth={1.5} />
            <h3 className="dot-text widget-circle-title">Resume</h3>
          </MotionArticle>
        </MotionDiv>
      </div>
    </section>
  );
};

export default HomeIntroSection;
