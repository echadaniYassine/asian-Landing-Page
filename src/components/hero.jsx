import '../style/hero.css';
import { useState, useEffect } from 'react';

const Hero = () => {
    const images = [
        { src: '/assets/home page2.png', id: 1 },
        { src: '/assets/Group 6.png', id: 2 }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setAnimationClass('slide-in');
        const timeout = setTimeout(() => {
            setAnimationClass('');
        }, 5000);
        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className="hero-title">ASIAN  <span>TASTE</span></h1>
                    <h3 className="hero-subtitle typing-animation">Authentic Japanese Cuisine</h3>
                    <p className="hero-paragraph">
                        Welcome to Asian Taste!<br />
                        Discover the ultimate sushi experience in the heart of Casablanca <br />
                        at our brand new restaurant in Maarif!
                    </p>
                    <div className="hero-text-phone">
                        <h2 className="phone-text">+212 642 420823</h2>
                        <img className="phone-icon" src="/assets/phone.png" alt="Phone" />
                    </div>
                </div>


                <div className="hero-image-container">
                    <img className={`hero-image ${animationClass}`} src={images[currentIndex].src} alt="Restaurant" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
