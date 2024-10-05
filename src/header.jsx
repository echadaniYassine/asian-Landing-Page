import './header.css';
import { Link } from "react-router-dom";
import taste from './assets/AsiaTastiLogo.png'; // Fixed typo in the assets path
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setNotification } from './Reducers/actionCart.jsx';


function Header({ notification, cartItemCount }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

    const handleAddToCart = () => {
        setNotification('Item added to cart');
        setTimeout(() => {
            setNotification('');
        }, 3000); // Clear the notification after 3 seconds
    };

    const handleClick = (index) => {
        setActiveIndex(index);
    };

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
            <header style={{ backgroundColor: "white" }} >
                <div className="logo-container">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <img style={{ marginRight: "220px" }} className='logo1' src={taste} alt="logo" />
                    </Link>
                </div>
                <ul style={{ display: isMenuVisible || !isSmallScreen ? 'flex' : 'none' }}>
                    <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleClick(0)}>
                        <li className={activeIndex === 0 ? 'active' : ''} style={{ fontWeight: "bold", fontSize: "24px" }}>
                            Home
                            <hr />
                        </li>
                    </Link>

                    <a href="#Categories" style={{ textDecoration: "none", display: 'flex', alignItems: 'center', color: "rgb(192, 161, 24)" }} onClick={() => handleClick(2)}>
                        <li className={activeIndex === 2 ? 'active' : ''}>
                            Categories
                            <hr />
                        </li>
                    </a>
                    <Link to='/Contact' style={{ textDecoration: "none", color: "rgb(192, 161, 24)" }} onClick={() => handleClick(3)}>
                        <li className={activeIndex === 3 ? 'active' : ''}>
                            Contact
                            <hr />
                        </li>
                    </Link>

                    <Link id='link0' to="/Cart" onClick={() => handleClick(5)}>
                        {notification && <div className="notification">{notification}</div>}
                        <li className={activeIndex === 5 ? 'active' : ''}>
                            <FontAwesomeIcon icon={faCartPlus} />
                            {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
                            <hr />
                        </li>
                    </Link>

                    <Link className='hideIcon' to="/my-account"><FontAwesomeIcon icon={faUser} color='black'backgroundColor="none" fontSize={"x-large"} /></Link>
                </ul>
                <div style={{ display: isMenuVisible || isSmallScreen ? 'flex' : 'none' }}>


                        <Link className='secondIcone' to="/Cart" onClick={() => handleClick(5)}>
                          
                            <li className={activeIndex === 5 ? 'active' : ''}>
                                <FontAwesomeIcon icon={faCartPlus} color='black' backgroundColor="none" fontSize={"x-large"} />
                                <hr />
                            </li>
                        </Link>
                        <Link className='theredIcone' to="/my-account"><FontAwesomeIcon icon={faUser} color='black' backgroundColor="none" fontSize={"x-large"} /></Link>
                </div>

                <Link className='header-menu-bar' style={{ textDecoration: "none" }} onClick={toggleMenu}>
                    <li className={activeIndex === 6 ? 'active' : ''}>
                        &#9776;
                        <hr />
                    </li>
                </Link>

            </header>
        </>
    );
}

const mapStateToProps = (state) => ({
    notification: state.notification ? state.notification.message : null,
});
const mapDispatchToProps = {
    setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

