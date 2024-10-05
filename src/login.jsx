import { Link, useNavigate } from "react-router-dom";
import './login.css';
import logo from './assets/image.png';
import taste from './assets/contact13.png';
import { useState, useEffect } from "react";
import ImageFit from './assets/Group 24.png';
import axios from 'axios';
import { Footer } from "./footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ForgotPassword from './forgotPassword';

export default function Login() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showHeader, setShowHeader] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowHeader(false);
            } else if (window.scrollY < lastScrollY) {
                setShowHeader(true);
            } else if (window.scrollY === "0px") {
                setShowHeader(true);
            }

            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        try {
            if (isLogin) {
                // Handle login
                const response = await axios.post('http://localhost:4002/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                console.log('Login response:', response.data);
                // Store token in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', formData.username);
                localStorage.setItem('email', formData.email);
                localStorage.setItem('password', formData.password);
                // Redirect to protected route or update UI
                setTimeout(() => {
                    setIsLoading(false); // Stop loading
                    Navigate('/'); // Redirect to home page
                }, 2000);
            } else {
                // Handle sign up
                const response = await axios.post('http://localhost:4002/auth/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                console.log('Registration response:', response.data);
                // Optionally, log the user in automatically after registration
                console.log("Successfully registered");
            }
        } catch (error) {
            // Handle errors (e.g., display error messages)
            setIsLoading(false); // Stop loading
            console.error("Error during authentication:", error.response.data);
            alert("Authentication failed. Please try again.");
        }
    };

    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

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
                <ul className="ul" style={{ display: isMenuVisible || !isSmallScreen ? 'flex' : 'none'}}>
                    <Link to="/" style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(1)}>
                        <li className={activeIndex === 0 ? 'active' : ''} style={{ fontWeight: "bold", fontSize: "24px", background: "none"}}>
                            Home
                            <hr />
                        </li>
                    </Link>

                    <Link to={'/Home#Categories'} style={{ textDecoration: "none", display: 'flex', alignItems: 'center', background: "none" }} onClick={() => handleClick(2)}>
                        <li  className={activeIndex === 2 ? 'active' : ''}>
                            Categories
                            <hr />
                        </li>
                    </Link>
                    <Link to='/Contact' style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(3)}>
                        <li  className={activeIndex === 3 ? 'active' : ''}>
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
                    <li style={{color:'white'}}  className={activeIndex === 6 ? 'active' : ''}>
                        &#9776;
                        <hr />
                    </li>
                </Link>
            </header>


            <div className="margFooter">
                <img className='tast-login' src={taste} alt="Image0" />

                <div className="container1-login" style={{ display: isLogin ? 'none' : 'block' }}>
                    <div className="form-container1-login">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required /><br />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                            <input type="submit" value="Sign Up" />
                            <p className="paragraphe" style={{ marginLeft: "50px" }}>already have an account? <button type="button" onClick={toggleForm} className="toggle-button">
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button></p>
                        </form>
                    </div>
                </div>
                <div className="container1-login" style={{ display: isLogin ? 'block' : 'none' }}>
                    <div className="form-container1-login">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required /><br />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                            <input type="submit" value="Log In" /><br />
                            {isLogin && (
                                <p className="paragraphe" style={{ marginLeft: "50px", marginTop: "20px" }}><a href="#" onClick={() => setIsForgotPassword(true)}>Forget Password</a> </p>
                            )}
                            <p className="paragraphe" style={{ marginLeft: "50px" }}>Don't have an account? <button type="button" onClick={toggleForm} className="toggle-button">
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button></p>
                        </form>
                    </div>
                </div>
                <div className="container1-login" style={{ display: isForgotPassword ? 'block' : 'none' }}>
                    <ForgotPassword />
                    <button className="BackToLogin" onClick={() => setIsForgotPassword(false)}>Back to Login</button>
                </div>
                <div className="login-image">
                    <img src={ImageFit} alt="Image01" />
                </div>
            </div>

            {isLoading && (
                <div className="loading-overlay">
                    <FontAwesomeIcon icon={faSpinner} spin size="10x" color="orange" />
                    <p>Loading...</p>
                </div>
            )}


            <Footer />
        </>
    );
}