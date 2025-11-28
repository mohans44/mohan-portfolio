import Section from './Section';
import { experience, education } from '../data';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
    return (
        <Section id="experience">
            <div className="bento-grid">
                {/* Experience Column */}
                <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                        <div style={{ padding: '10px', backgroundColor: 'var(--card-bg)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                            <Briefcase size={20} />
                        </div>
                        <h2 style={{ fontSize: '2rem' }}>Experience</h2>
                    </div>

                    {experience.map((exp, index) => (
                        <div key={index} className="bento-card" style={{ padding: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{exp.title}</h3>
                            <p style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '0.95rem' }}>{exp.organization}</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '5px 0 20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.duration}</p>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                {exp.responsibilities.map((resp, i) => (
                                    <li key={i} style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                                        <span style={{ color: 'var(--accent-color)', marginTop: '6px' }}>▹</span>
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Education Column */}
                <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                        <div style={{ padding: '10px', backgroundColor: 'var(--card-bg)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                            <GraduationCap size={20} />
                        </div>
                        <h2 style={{ fontSize: '2rem' }}>Education</h2>
                    </div>

                    {education.map((edu, index) => (
                        <div key={index} className="bento-card" style={{ padding: '30px', height: '100%' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{edu.degree}</h3>
                            <p style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '0.95rem' }}>{edu.college}</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '5px 0 20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{edu.years} • CGPA: {edu.cgpa}</p>

                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>Key Coursework</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {edu.coursework.map((course, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.8rem',
                                            padding: '6px 12px',
                                            backgroundColor: 'var(--bg-color)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '20px',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Experience;
