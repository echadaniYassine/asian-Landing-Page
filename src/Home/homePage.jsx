import './home.css';
import { Link } from 'react-router-dom';
import icon from '../assets/icon1.png';
import img1 from '../assets/Group 6.png';
import phone from '../assets/phone.png';
import img5 from '../assets/home page2.png';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Home() {
    const Images = [
        { image: img5, id: 1 },
        { image: img1, id: 3 }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animationClassName, setAnimationClassName] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex === Images.length - 1 ? 0 : prevIndex + 1
            );
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setAnimationClassName('slideIn');
        const timeout = setTimeout(() => {
            setAnimationClassName('');
        }, 7000); // Duration of slideIn animation

        return () => clearTimeout(timeout);
    }, [currentImageIndex]);

    const currentImage = Images[currentImageIndex];

    return (
        <>
            <div className="home-page">
                <img
                    className={`image-fit ${animationClassName}`}
                    src={currentImage.image}
                    alt="Not Found"
                />
                <div class="main-title-container">
                    <h1 class="main-title">
                        <span class="sparkle-text">ASIAN <br />TASTE</span>
                    </h1>
                </div>


                <p className="intro-text">
                    Welcome to Asian Taste!<br /> Discover the ultimate sushi experience <br /> in the heart of Casablanca <br />in our brand new restaurant in Maarif!
                </p>
                <Link to={'https://play.google.com/store/search?q=asphalt+9&c=apps'}>
                    <button className="cta-button">
                        <h1 style={{ background: 'none', fontSize: '20px' }}>
                            Get On In
                        </h1>
                        <h2 className="cta-subtext" style={{ color: 'white' }}>
                            Google Play
                        </h2>
                        <img className="cta-icon" src={icon} alt="Google Play" />
                    </button>
                </Link>
                <br />
                <Link to={'/'}>
                    <button className="cta-phone-button" style={{ border: '5px orange solid' }}>
                        <h2 className="cta-subtext" style={{ color: 'orange' }}>
                            0642420823
                        </h2>
                        <img className="cta-icon" src={phone} alt="Phone" />
                    </button>
                </Link>

                <div className="social-media-hero">
                    <a href="https://www.facebook.com/profile.php?id=61554955762961" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="social-icon-hero" />
                    </a>
                    <a href="https://www.instagram.com/asiantastecasablanca?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon-hero" />
                    </a>
                    <a href="https://wa.me/+212642420823" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="social-icon-hero" />
                    </a>
                </div>
            </div>
        </>
    );
}
