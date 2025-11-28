import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { header } from '../data';
import { Sun, Moon } from 'lucide-react';

const Header = ({ openResume }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Check system preference or saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.body.classList.add('dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const navLinks = [
        { name: 'Skills', href: '#skills' },
        { name: 'Work', href: '#projects' },
        { name: 'Writing', href: '#blogs' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                backgroundColor: scrolled ? 'rgba(var(--bg-color-rgb), 0.8)' : 'transparent',
                borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
                padding: '20px 0',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container flex-between">
                <a href="#" style={{ fontWeight: 600, fontSize: '1.4rem', letterSpacing: '-0.05em' }}>
                    MSS.
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <nav className="desktop-nav">
                        <ul style={{ display: 'flex', gap: '25px' }}>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--text-secondary)',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseOver={(e) => e.target.style.color = 'var(--text-color)'}
                                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                        <button
                            onClick={toggleTheme}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--hover-bg)',
                                transition: 'background-color 0.2s'
                            }}
                            title="Toggle Theme"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
