import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, List, Code2 } from "lucide-react";

import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiPytorch,
  SiScikitlearn,
  SiTailwindcss,
  SiMui,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiAmazonwebservices,
  SiGit,
  SiPostman,
  SiGo,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  aboutKeyPoints,
  aboutKeyPointsMobile,
  bio,
  bioMobile,
  skills,
} from "../../data/siteData";

const MotionDiv = motion.div;
const tabTransition = {
  duration: 0.26,
  ease: [0.22, 1, 0.36, 1],
};

const contentTypes = [
  { id: "about", icon: FileText },
  { id: "highlights", icon: List },
  { id: "skills", icon: Code2 },
];

// Map skill names to brand icons
const skillIcons = {
  // Programming
  Python: SiPython,
  Java: FaJava,
  JavaScript: SiJavascript,
  Go: SiGo,
  "C++": SiCplusplus,
  // Frameworks & Libraries
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "Spring Boot": SiSpringboot,
  PyTorch: SiPytorch,
  "Scikit-learn": SiScikitlearn,
  Tailwind: SiTailwindcss,
  "Material UI": SiMui,
  // Databases
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  // Dev Tools
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  Git: SiGit,
  Postman: SiPostman,
};

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );
  const resolvedActiveTab =
    isMobile && activeTab === "skills" ? "about" : activeTab;
  const visibleTabs = isMobile
    ? contentTypes.filter((item) => item.id !== "skills")
    : contentTypes;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = (event) => setIsMobile(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="about" className="portfolio-section">
      <div className="container section-stack">
        <MotionDiv
          className="section-heading-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="about-header-row">
            <div>
              <p className="eyebrow dot-text">About</p>
              <h2>About Me</h2>
            </div>
            <div className="about-icon-tabs">
              {visibleTabs.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      resolvedActiveTab === item.id
                        ? "about-icon-btn active"
                        : "about-icon-btn"
                    }
                    onClick={() => setActiveTab(item.id)}
                    aria-label={item.id}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          className="about-content-area"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.24 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <MotionDiv
              key={resolvedActiveTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={tabTransition}
            >
              {resolvedActiveTab === "about" && (
                <p className="about-paragraph">
                  {(isMobile ? bioMobile : bio).trim()}
                </p>
              )}

              {resolvedActiveTab === "highlights" && (
                <ul className="about-highlights-list">
                  {(isMobile ? aboutKeyPointsMobile : aboutKeyPoints).map(
                    (point) => (
                      <li key={point}>{point}</li>
                    ),
                  )}
                </ul>
              )}

              {!isMobile && resolvedActiveTab === "skills" && (
                <div className="skills-kanban-container">
                  {skills.map((group) => (
                    <div key={group.category} className="skills-kanban-column">
                      <div className="skills-column-head">
                        <h3 className="skills-category">{group.category}</h3>
                      </div>
                      <div className="skills-card-list">
                        {group.items.map((item) => {
                          const SkillIcon = skillIcons[item.name];
                          return (
                            <div key={item.name} className="skill-card">
                              <div className="skill-icon-wrap">
                                {SkillIcon && <SkillIcon size={20} />}
                              </div>
                              <span className="skill-name">{item.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </MotionDiv>
          </AnimatePresence>
        </MotionDiv>
      </div>
    </section>
  );
};

export default AboutSection;
