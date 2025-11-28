import Section from './Section';
import { skills } from '../data';
import {
    SiPython, SiCplusplus, SiJavascript, SiGo,
    SiReact, SiNodedotjs, SiExpress, SiSpringboot, SiMui, SiChakraui, SiTailwindcss,
    SiScikitlearn, SiPytorch, SiSpacy,
    SiMysql, SiPostgresql, SiMongodb, SiFirebase,
    SiGit, SiPostman, SiDocker, SiAmazonwebservices
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const iconMap = {
    SiPython, SiCplusplus, FaJava, SiJavascript, SiGo,
    SiReact, SiNodedotjs, SiExpress, SiSpringboot, SiMui, SiChakraui, SiTailwindcss,
    SiScikitlearn, SiPytorch, SiSpacy,
    SiMysql, SiPostgresql, SiMongodb, SiFirebase,
    SiGit, SiPostman, SiDocker, SiAmazonwebservices
};

const Skills = () => {
    return (
        <Section id="skills">
            <h2 style={{ marginBottom: '50px', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Technical Expertise</h2>

            <div className="skills-grid" style={{ gap: '30px' }}>
                {skills.map((category, index) => (
                    <div key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            borderBottom: '1px solid var(--border-color)',
                            paddingBottom: '10px',
                            marginBottom: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ width: '6px', height: '6px', background: 'var(--accent-color)', borderRadius: '50%' }}></span>
                            {category.category}
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                            {category.items.map((skill) => {
                                const Icon = iconMap[skill.icon];
                                return (
                                    <div key={skill.name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 16px',
                                            backgroundColor: 'var(--card-bg)',
                                            borderRadius: '12px',
                                            fontSize: '0.95rem',
                                            border: '1px solid var(--border-color)',
                                            transition: 'all 0.2s ease',
                                            cursor: 'default',
                                            fontWeight: 500,
                                            color: 'var(--text-color)'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--text-secondary)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border-color)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                                        }}
                                    >
                                        {Icon && <Icon size={20} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} />}
                                        <span>{skill.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
