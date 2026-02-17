import { motion } from 'framer-motion';
import { education, experience } from '../../data/siteData';

const MotionDiv = motion.div;

const getYear = (period = '') => {
  const match = period.match(/(20\d{2})/);
  return match ? Number(match[1]) : 0;
};

const JourneySection = () => {
  const timeline = [
    ...experience.map((item) => ({
      type: 'experience',
      year: getYear(item.duration),
      title: item.title,
      subtitle: item.organization,
      period: item.duration,
      points: item.responsibilities,
      chips: [],
    })),
    ...education.map((item) => ({
      type: 'education',
      year: getYear(item.years),
      title: item.degree,
      college: item.college,
      cgpa: item.cgpa,
      period: item.years,
      points: [],
      chips: item.coursework,
    })),
  ].sort((a, b) => b.year - a.year);

  return (
    <section id="journey" className="portfolio-section">
      <div className="container section-stack">
        <MotionDiv
          className="section-heading-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow dot-text">Journey</p>
          <h2>Education and Experience</h2>
        </MotionDiv>

        <div className="unified-timeline">
          <div className="timeline-axis-center" aria-hidden="true" />

          {timeline.map((item) => (
            <div key={`${item.type}-${item.title}`} className="timeline-row">
              <div className="timeline-left">
                {item.type === 'experience' && (
                  <article className="timeline-node">
                    <h3>{item.title}</h3>
                    <p className="institution-name">{item.subtitle}</p>
                    <span>{item.period}</span>
                    <ul>
                      {item.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </article>
                )}
              </div>

              <div className="timeline-year dot-text">{item.year}</div>

              <div className="timeline-right">
                {item.type === 'education' && (
                  <article className="timeline-node">
                    <h3>{item.title}</h3>
                    <p className="institution-name">{item.college}</p>
                    <p className="cgpa">CGPA: {item.cgpa}</p>
                    <span>{item.period}</span>
                  </article>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
