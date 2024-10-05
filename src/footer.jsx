import './footer.css';
import React from "react";
import taste from './assets/AsiaTastiLogo.png';
// In your main JavaScript file
import '@fortawesome/fontawesome-free/css/all.min.css';


export const Footer = () => {
    return (
        <><hr/>
        <br/>
            <footer className="footer0102">
                <div className="footer-content">
                    <div className="footer-section about">
                        <img src={taste} alt="Logo" className="footer-logo" />
                        <p>Indulge in Asia's exquisite flavors, where tradition meets modern innovation, transporting you straight to the heart of Japan.</p>
                        <div className="subscribe">
                            <h3 >Subscribe Us</h3>
                            <div className="subscribe-input">
                                <input type="email" placeholder="Your email address" />
                                <button type="submit"><i style={{background:"none"}} className="fas fa-arrow-right "> </i></button>
                            </div>
                        </div>
                    </div>
                    <div className="footer-section links">
                        <h2 className='importLinks' style={{ fontSize: "26px" }}>Important Links</h2>
                        <ul> 
                            <li><a href="">Home</a></li>
                            <li><a href="/Contact">Support</a></li>
                            <li><a href="/About">About</a></li>
                            <li><a href="#Categories">Categories</a></li>

                        </ul>
                    </div>
                    <div className="footer-section contact">
                        <h3 style={{ fontSize: "30px" }}>Contact Us</h3>
                        <div className='footer-section-contact'>  <p><i className="fas fa-envelope green"></i> asiantaste713@gmail.com
                        </p><br />
                            <p><i className="fas fa-phone green"></i> 0642420823 / 0522980679</p><br />
                            <p><i className="fas fa-map-marker-alt green"></i> 23 rue Tal Zaatar , Rue du Louvre, Casablanca</p></div>

                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Asian Taste | All Right Reserved</p>
                </div>
            </footer>

        </>
    );
};
