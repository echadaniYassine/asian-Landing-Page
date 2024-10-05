import React, { useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Category as CategoryData } from './data.jsx';
import { addToCart, setNotification } from './Reducers/actionCart.jsx';
import About from "./About.jsx";
import './main.css';
import './category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';



const Main = ({ addToCart, setNotification }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CategoryData[0]);
  const [visibleCategories, setVisibleCategories] = useState(CategoryData.slice(0, 5));
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [notification, setNotificationMessage] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);



  useEffect(() => {
    const handleScroll = () => {
      const categoriesSection = document.getElementById('Categories');
      if (categoriesSection) {
        const categoriesSectionTop = categoriesSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (categoriesSectionTop < windowHeight * 0.75) {
          setShowAnimation(true);
        } else {
          setShowAnimation(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % CategoryData.length;

        // Add animation class
        setShowAnimation(false);
        setTimeout(() => {
          if (nextIndex + 5 > CategoryData.length) {
            setVisibleCategories([...CategoryData.slice(nextIndex), ...CategoryData.slice(0, 5 - (CategoryData.length - nextIndex))]);
          } else {
            setVisibleCategories(CategoryData.slice(nextIndex, nextIndex + 5));
          }
          setShowAnimation(true);
        }, 0);

        return nextIndex;
      });
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [CategoryData.length]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotificationMessage('Item added to cart');
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
    setCartItemCount(prevCount => prevCount + 1); // Increment cartItemCount
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div id="Categories"></div>
      <br /><br /><br />
      <div className="newImage0" style={{ margin: "30px" }}>
        <div id='specific'>
          <h1 className="ttl">Categories</h1>
          <section className={`container ${showAnimation ? 'animated fadeInUp' : ''}`} ref={containerRef}>
            {visibleCategories.map((item) => (
              <div
                key={item.id}
                className={`image00 ${showAnimation ? 'animated fadeInUp' : ''}`}
                onClick={() => handleCategoryClick(item)}
              >
                <img className="image" src={item.ImageSrc} alt="Food" />
                <h4 className="name">{item.Name}</h4>
                {item === activeCategory && <div className="category-triangle"></div>}
              </div>
            ))}
          </section>

          <section className="menu-items">
            <div className='image0'>
              {activeCategory.menu.map((item) => (
                <div key={item.id} className={`menu-item show`}>
                  <img className="menu-item-img" src={item.ImageSrc} alt="Food" />
                  <h4 className="menu-item-price">{item.Price} DH</h4>
                  <p className="menu-item-description">{item.Description}</p>
                  <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">Add to Cart</button>
                </div>
              ))}
            </div>
          </section>

          <div id="buttonImage">
            <Link to='/Full-menu'>
              <button className='seeAll'>See More</button>
            </Link>
          </div>
        </div>
      </div>
      <About />

      {/* Notification */}
      {notification && (
        <div className="notification"> {notification} _<FontAwesomeIcon icon={faCartPlus} className="notif" /></div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  menuItems: state.menuItems,
});

export default connect(mapStateToProps, { addToCart, setNotification })(Main);
