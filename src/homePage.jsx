import './home.css';
import Header from './header.jsx';
import { Link } from 'react-router-dom';
import { Footer } from './footer';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import whatsapp from './assets/whatsapp.png';
import icon from './assets/icon1.png';
import img1 from './assets/Group 6.png';
import phone from './assets/phone.png';
import img5 from './assets/home page2.png';
import img6 from './assets/Group 3.png';
import { useState, useEffect } from 'react';
import Main from './main';

export default function Home() {
    const Images = [
        { image: img5, id: 1 },
        { image: img6, id: 2 },
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
    const renderPoints = () => {
        return Images.map((image, index) => (
            <div
                key={index}
                className={`point ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
            />
        ));
    }
    return (
        <>
            <Header />
            <div className="homePage">
                <img className={`imageFit ${animationClassName}`} src={currentImage.image} alt="Not Found" />
                <h1 className='titlehome1'>
                    ASIAN <br />
                    TASTE
                </h1>
                <p className='para1'>
                Welcome to Asian Taste!<br/> Discover the ultimate sushi experience <br/> in the heart of Casablanca <br/>in our brand new restaurant in Maarif!                </p>
                <Link to={'https://play.google.com/store/search?q=asphalt+9&c=apps'}><button className="Snap"><h1 style={{ background: "none", fontSize: "20px" }} >Get On In</h1><h2 className='googleplay' style={{ color: "white" }}> Google Play</h2>
                    <img className='imgPlay' src={icon} />

                </button>
                </Link>
                <br />
                <Link to={'/'}><button className="Snap2" style={{ border: "5px orange solid" }}><h2 className='googleplay' style={{ color: "orange" }}> 0642420823</h2>
                    <img className='imgPlay' src={phone} />

                </button>
                </Link>
                <div className="navigation">
                    <div className="points">
                        {renderPoints()}
                    </div>
                </div>
                <div className='social'>
                    <a href="https://www.facebook.com/profile.php?id=61554955762961"><img className='media' src={facebook} alt="facebook" /></a>
                    <a href="https://www.instagram.com/asiantastecasablanca?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><img className='media' src={instagram} alt="instagram" /></a>
                    <a href="https://wa.me/+212642420823"><img className='media' src={whatsapp} alt="whatsapp" /></a>
                </div>
            </div>
            <Main />
            <Footer />

        </>
    )
}
