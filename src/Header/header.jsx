import './header.css';
import { useState, useEffect } from 'react';
import taste from '../assets/AsiaTastiLogo.png'; // Logo import

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle Scroll Event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <img src={taste} className="logo" alt="Logo" />
                    </li>
                    <li className="nav-item">
                        <button onClick={() => scrollToSection('home')}>Home</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => scrollToSection('Categories')}>Categories</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => scrollToSection('about')}>About</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => scrollToSection('contact')}>Contact</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
