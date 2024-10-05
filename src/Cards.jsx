import './Cards.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import taste from './assets/image.png';
import { Footer } from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart } from './Reducers/cartActions'; // Make sure the correct path is used
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PaymentForm from './PaymentForm';

function Cards({ cartItems, removeFromCart }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);



  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});
  let delevryPrice = 20;

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems, itemQuantities]);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const quantity = itemQuantities[item.id] || 0;
      total += item.Price * quantity; // Multiply by item quantity
    });
    setTotalPrice(total);
  };

  const getItemCount = (id) => {
    // Find the item in the cartItems array
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      // Retrieve the quantity from itemQuantities
      return itemQuantities[id] || 0;
    }
    return 0;
  };

  const handleIncrement = (id) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setItemQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 0) - 1;
      return { ...prevQuantities, [id]: newQuantity >= 0 ? newQuantity : 0 };
    });
  };
  const Total = totalPrice + delevryPrice;
  const [, setShowHeader] = useState(true);


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
  const handleRemove = (id) => {
    removeFromCart(id);
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  };
  const navigate = useNavigate();
  const handleCommand = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowPaymentForm(true);

    } else {
      // User is not authenticated, redirect to the login page
      navigate('/login');
    }
  };

  return (
    <>
      <header className='header0102'>
        <div className="logo-container0102" style={{ background: "none" }} >
          <Link to="/" style={{ textDecoration: "none", background: "none" }}>
            <img style={{ marginRight: "220px", background: "none" }} className='logo1' src={taste} alt="logo" />
          </Link>
        </div>
        <ul style={{ display: isMenuVisible || !isSmallScreen ? 'flex' : 'none' }}>
          <Link to="/" style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(0)}>
            <li className={activeIndex === 0 ? 'active' : ''} style={{ fontWeight: "bold", fontSize: "24px", background: "none"}}>
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
            <li style={{ color: "white" }} className={activeIndex === 5 ? 'active' : ''}>
              <FontAwesomeIcon icon={faCartPlus} style={{ background: 'none' }} />
              <hr />
            </li>
          </Link>
          <Link id='link1' to="/my-account" style={{ background: "none" }}><FontAwesomeIcon icon={faUser} color='white' className='icon-user' /></Link>

        </ul>
        <div style={{ display: isMenuVisible || isSmallScreen ? 'flex' : 'none' }}>


          <Link className='secondIconeCards'  to="/Cart" onClick={() => handleClick(5)}>

            <li className={activeIndex === 5 ? 'active' : ''}>
              <FontAwesomeIcon icon={faCartPlus} className='icon-user'/>
              <hr />
            </li>
          </Link>


          <Link className='theredIconeCards' to="/my-account"><FontAwesomeIcon icon={faUser}className='icon-user' /></Link>
        </div>
        <Link className='header-menu-bar' style={{ textDecoration: "none" }} onClick={toggleMenu}>
          <li style={{color:'white'}} className={activeIndex === 6 ? 'active' : ''}>
            &#9776;
            <hr />
          </li>
        </Link>

      </header>
      <div className="order-container">
        <div className="order-items">
          <h2 className="order-heading">MY ORDER</h2>
          {cartItems.length === 0 ? (
            <p style={{ background: "none" }}>Your cart is empty.</p>
          ) : (
            <div className='white'>
              {[...new Set(cartItems.map(item => item.id))].map((id, index) => (
                <div className="order-item" key={index}>
                  {cartItems.find(item => item.id === id) && (
                    <>
                      <div className="item-details">
                        <div className="quantity-container">
                          <div className="quantity-buttons">
                            <button className="decrement" onClick={() => handleDecrement(id)}>-</button>
                            <span className="quantity">{getItemCount(id)}</span>
                            <button className="increment" onClick={() => handleIncrement(id)}>+</button>
                          </div>
                        </div>
                        <img className="item-image" src={cartItems.find(item => item.id === id).ImageSrc} alt="Food" />
                        <div className="item-info">
                          <span className="item-name">{cartItems.find(item => item.id === id).Name}</span>
                          <span className="item-description">{cartItems.find(item => item.id === id).Description}</span>
                        </div>
                      </div>
                      <span className="item-price">{(cartItems.find(item => item.id === id).Price * getItemCount(id)).toFixed(2)} DH</span>
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleRemove(id)} />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="order-summary">
            <div className="summary-item">
              <span>delevry Price</span>
              <span>20.00 DH</span>
            </div>
            <div className="total">
              <span>TOTAL</span>
              <span >{Total} DH</span>
            </div>
            <button onClick={handleCommand} className="commander-button">COMMANDER</button>
          </div>) : (
          <></>
        )};

      </div>
      {showPaymentForm && (
        <PaymentForm
          cartItems={cartItems}
          total={Total}
          onClose={() => setShowPaymentForm(false)}
        />
      )}

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps, { removeFromCart })(Cards);