import React from 'react';
import './menu.css'
import { connect } from 'react-redux';
import { addToCart, setNotification } from './Reducers/actionCart.jsx'; // Assuming this action is correctly defined
import { Menu } from './data';
import { Link } from 'react-router-dom';
import homeimg from './assets/Group 18.png'
import { useState, useEffect } from 'react';
import logo from './assets/image.png';
import { Footer } from './footer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function FullMenu({ addToCart }) {
  const [showHeader, setShowHeader] = useState(true);
  const [notification, setNotificationMessage] = useState('');


  const handleAddToCart = (item) => {
    addToCart(item);
    setNotificationMessage('Item added to cart');
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000); // Hide notification after 3 seconds
  };
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);






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

      <div className='bottom'>
        <div className="homePage1">

          <img style={{ fontSize: '100px', background: "none", paddingTop: "120px" }} className='imageHome' src={homeimg} />
          <div style={{ background: "none" }} className='mouveTitle'>
            <h1 >
              ASIAN <br />
              FAMILY
            </h1><br />
            <h2>
              100 ps
            </h2>
            <a href='#Scroll' style={{ background: "none" }}>
              <button>Let`s Up</button>
            </a></div>

        </div>
        <div id='Scroll'></div>
        <div>
          <section className="section2" >
            {Menu.map((item) => (
              <div key={item.id} className={`items`}>
                <img className="menu-item-img" src={item.ImageSrc} alt="Food" />
                <h4 className="items-price">{item.Price} DH</h4>
                <p className="items-desc">{item.Description}</p>
                {/* Directly call handleAddToCart function */}
                <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">Add to Cart</button>
              </div>
            ))}

          </section>
        </div>
      </div >
      <Footer />
      {/* Notification */}
      {notification && (
        <div className="notification">{notification}</div>
      )}
    </>
  );
}

// mapStateToProps function
const mapStateToProps = (state) => ({
  menuItems: state.menuItems,
});

// Connect the FullMenu component to Redux store
export default connect(mapStateToProps, { addToCart, setNotification })(FullMenu);
