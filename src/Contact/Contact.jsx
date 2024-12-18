import { Link } from "react-router-dom";
import './Contact.css';
import taste from '../assets/contact13.png';
import logo from '../assets/image.png';
import ImageFit from '../assets/china.png';
import { useState, useEffect } from "react";
import phone from '../assets/icons8-ringer-volume-50.png';
import adress from '../assets/location_12656056.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Make sure to install axios: npm install axios

export default function Contact() {
    const [formData, setFormData] = useState({
        name: localStorage.getItem('username') || "",
        email: localStorage.getItem('email') || "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3005/send-email",
                formData
            );
            if (response.data.success) {
                setFormData({ name: "", email: "", message: "" }); // Clear form
                setMessage("Message sent successfully! thank you for contact us");
            } else {
                setMessage("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    const [activeIndex, setActiveIndex] = useState(null);
    const [showHeader, setShowHeader] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);
    const [isError, setIsError] = useState(false);

    const handleClick = (index) => {
        setActiveIndex(index);
        setMenuOpen(false); // Close menu on item click
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        if (isSmallScreen) {
            setMenuVisible(!isMenuVisible);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
            if (window.innerWidth > 600) {
                setMenuVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <header className={`header ${showHeader ? '' : 'hidden'}`} >
                <div className="logo-container" style={{ background: "none" }} >
                    <Link to="/" style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(0)}>
                        <img style={{ marginRight: "220px", background: "none" }} className='logo1' src={logo} alt="logo" />
                    </Link>
                </div>
                <ul className="ul" style={{ display: isMenuVisible || !isSmallScreen ? 'flex' : 'none' }}>
                    <Link to="/" style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(1)}>
                        <li className={activeIndex === 0 ? 'active' : ''} style={{ fontWeight: "bold", fontSize: "24px", background: "none" }}>
                            Home
                            <hr />
                        </li>
                    </Link>

                    <Link to={'/Home#Categories'} style={{ textDecoration: "none", display: 'flex', alignItems: 'center', background: "none" }} onClick={() => handleClick(2)}>
                        <li className={activeIndex === 2 ? 'active' : ''}>
                            Categories
                            <hr />
                        </li>
                    </Link>
                    <Link to='/Contact' style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(3)}>
                        <li className={activeIndex === 3 ? 'active' : ''}>
                            Contact
                            <hr />
                        </li>
                    </Link>

                    <Link id='link' to="/Cart" onClick={() => handleClick(5)} style={{ textDecoration: "none", background: "none" }}>
                        <li y className={activeIndex === 5 ? 'active' : ''}>
                            <FontAwesomeIcon icon={faCartPlus} style={{ background: 'none' }} />

                            <hr />
                        </li>
                    </Link>
                    <Link to="/my-account" style={{ background: "none" }}><FontAwesomeIcon icon={faUser} color='white' className='icon-user' /></Link>

                </ul>
                <div style={{ display: isMenuVisible || isSmallScreen ? 'flex' : 'none' }}>


                    <Link className='secondIconeContact' to="/Cart" onClick={() => handleClick(5)}>

                        <li className={activeIndex === 5 ? 'active' : ''}>
                            <FontAwesomeIcon icon={faCartPlus} className='icon-user' />
                            <hr />
                        </li>
                    </Link>


                    <Link className='theredIconeContact' to="/my-account"><FontAwesomeIcon icon={faUser} className='icon-user' /></Link>
                </div>
                <Link className='header-menu-bar' style={{ textDecoration: "none" }} onClick={toggleMenu}>
                    <li style={{ color: 'white' }} className={activeIndex === 6 ? 'active' : ''}>
                        &#9776;
                        <hr />
                    </li>
                </Link>
            </header>

            <img className='tast' src={taste} alt="Image" />
            <div className="container1">
                <div className="form-container1">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Enter your message here..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <input type="submit" value="Submit" />

                        {message && <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>}

                    </form>
                </div>
                <div className="image-container1">
                    <img src={ImageFit} alt="Image" />
                </div>
            </div>
            <footer className="footer">
                <div >
                    <iframe
                        className="map-iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4089.896759982652!2d-7.633633223723186!3d33.58317604235172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3006c186543%3A0xea0d439f9a062c36!2sAsian%20Taste!5e1!3m2!1sfr!2sma!4v1716925556202!5m2!1sfr!2sma"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>

                <div className="contact-info">
                    <h1 className="title11">Asian Taste</h1>
                    <table class="opening-hours">
                        <tr>
                            <th>Mon - Thur</th>
                            <td>11:00 AM  -  23:00 PM</td>
                        </tr>
                        <tr>
                            <th>Friday</th>
                            <td>18:00 AM - 23:00 PM</td>
                        </tr>
                        <tr>
                            <th>Saturday</th>
                            <td>11:00 AM  -  23:00 PM</td>
                        </tr>
                        <tr>
                            <th>Sun</th>
                            <td>close</td>
                        </tr>
                    </table>
                    <div className="address-info">
                        <img src={adress} alt="Address Icon" />
                        <span>23 rue Tal Zaatar Rue du Louvre Casablanca</span>
                    </div>

                    <div className="phone-info">
                        <img src={phone} alt="Phone Icon" />
                        <span> 0642420823 / 0522980679</span>
                    </div>

                </div>
                <div id="Contact"></div>
            </footer>
        </>
    );
}
