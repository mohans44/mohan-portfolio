import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { education, experience } from '../../data/siteData';

const MotionDiv = motion.div;

const getYear = (period = '') => {
  const match = period.match(/(20\d{2})/);
  return match ? Number(match[1]) : 0;
};

const JourneySection = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const timeline = [
    ...experience
      .map((item) => ({
        type: 'experience',
        year: getYear(item.duration),
        title: item.title,
        subtitle: item.organization,
        period: item.duration,
        points: item.responsibilities,
        chips: [],
      }))
      .sort((a, b) => b.year - a.year),
    ...education
      .map((item) => ({
        type: 'education',
        year: getYear(item.years),
        title: item.degree,
        college: item.college,
        cgpa: item.cgpa,
        period: item.years,
        points: [],
        chips: item.coursework,
      }))
      .sort((a, b) => b.year - a.year),
  ];

  const renderTimelineCard = (item) => {
    if (item.type === 'experience') {
      return (
        <article className={`timeline-node timeline-node-${item.type}`}>
          <h3>{item.title}</h3>
          <p className="institution-name">{item.subtitle}</p>
          <span>{item.period}</span>
          {!isMobile && (
            <ul>
              {item.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          )}
        </article>
      );
    }

    return (
      <article className={`timeline-node timeline-node-${item.type}`}>
        <h3>{item.title}</h3>
        <p className="institution-name">{item.college}</p>
        <p className="cgpa">CGPA: {item.cgpa}</p>
        <span>{item.period}</span>
      </article>
    );
  };

  return (
    <section id="journey" className="portfolio-section">
      <div className="container section-stack">
        <MotionDiv
          className="section-heading-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow dot-text">Journey</p>
          <h2>Education and Experience</h2>
        </MotionDiv>

        <div className="unified-timeline">
          <div className="timeline-axis-center" aria-hidden="true" />

          {timeline.map((item, idx) => (
            (() => {
              const metaOnLeft = idx % 2 !== 0;
              return (
            <MotionDiv
              key={`${item.type}-${item.title}`}
              className="timeline-row"
              initial={{ opacity: 0, y: 26, scale: 0.995 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.22 }}
              transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1], delay: idx * 0.03 }}
            >
              <div className="timeline-left">
                {metaOnLeft ? (
                  <div className="timeline-meta timeline-meta-left">
                    <span className="timeline-year">{item.year}</span>
                  </div>
                ) : (
                  renderTimelineCard(item)
                )}
              </div>

              <div className="timeline-right">
                {metaOnLeft ? (
                  renderTimelineCard(item)
                ) : (
                  <div className="timeline-meta timeline-meta-right">
                    <span className="timeline-year">{item.year}</span>
                  </div>
                )}
              </div>
            </MotionDiv>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
