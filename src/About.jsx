import React, { useEffect, useRef, useState } from 'react';
import about from './assets/Group 17.png';
import './About.css'; // Import your CSS file

export const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (aboutRef.current) {
                const top = aboutRef.current.getBoundingClientRect().top;
                const isVisible = top < window.innerHeight;
                setIsVisible(isVisible);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            
            
            <div className={`image-text-container ${isVisible ? 'visible' : ''}`} ref={aboutRef}>
                <div className="image-container">
                    <img src={about} alt="Image" />
                </div>
                <div className="text-container">
                    <p className='txtabout'>Store Sushi is your go-to destination for fresh and delicious sushi.<br /> We offer a wide variety of sushi rolls, sashimi, nigiri, and other Japanese delicacies, expertly prepared by our skilled chefs.<br /><br /> Whether you're craving classic California rolls or adventurous specialty rolls, our store provides the perfect selection to satisfy your sushi cravings.<br /><br /> Visit us in-store or order online for convenient pickup or delivery, and experience the exquisite taste of authentic sushi at Store Sushi.</p>
                </div>
            </div>

        </>
    );
};

export default About;
