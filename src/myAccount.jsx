import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './myAccount.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/image.png';

const MyAccount = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModifying, setIsModifying] = useState(false); // New state variable
  const [activeIndex, setActiveIndex] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState(false);




  const navigate = useNavigate();

  const handleClick = (index) => {
    setActiveIndex(index);
    setMenuOpen(false); // Close menu on item click
  };

  const toggleMenu = () => {
    if (isSmallScreen) {
      setMenuVisible(!isMenuVisible);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);

    if (storedEmail) {
      axios
        .get(`http://localhost:4002/auth/user-info/${storedEmail}`)
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleModify = () => {
    setIsModifying(true); // Set isModifying to true when the "Modify" button is clicked
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:4002/auth/modify', {
        username,
        email,
        password,
      });

      console.log(response.data.message);
      localStorage.setItem('username', username); // Save username to local storage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      setIsModifying(false); // Set isModifying to false after saving the changes
      setMessage('User information updated successfully');
    } catch (error) {
      console.error('Error modifying user:', error.response.data);
      setMessage('Failed to update user information');
    }
  };

  return (
    <>
      <header className='header0102'>
        <div className="logo-container0102" style={{ background: "none" }}>
          <Link to="/" style={{ textDecoration: "none", background: "none" }}>
            <img style={{ marginRight: "220px", background: "none" }} className='logo1' src={logo} alt="logo" />
          </Link>
        </div>
        <ul style={{ display: isMenuVisible || !isSmallScreen ? 'flex' : 'none', background: "none" }}>
          <Link to="/" style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(0)}>
            <li className={activeIndex === 0 ? 'active' : ''} style={{ fontWeight: "bold", fontSize: "24px", background: "none", color: "white" }}>
              Home
              <hr />
            </li>
          </Link>

          <Link to={'/Home#Categories'} style={{ textDecoration: "none", display: 'flex', alignItems: 'center', background: "none" }} onClick={() => handleClick(2)}>
            <li style={{ color: "white" }} className={activeIndex === 2 ? 'active' : ''}>
              Categories
              <hr />
            </li>
          </Link>
          <Link to='/Contact' style={{ textDecoration: "none", background: "none" }} onClick={() => handleClick(3)}>
            <li style={{ color: "white" }} className={activeIndex === 3 ? 'active' : ''}>
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
          <Link to="/my-account" style={{ background: "none" }}><FontAwesomeIcon icon={faUser} color='white' className='icon-user' /></Link>

        </ul>
        <Link className='header-menu-bar' style={{ textDecoration: "none" }} onClick={toggleMenu}>
          <li className={activeIndex === 6 ? 'active' : ''}>
            &#9776;
            <hr />
          </li>
        </Link>
      </header>

      <div className='first-container'>
        {isAuthenticated ? (
          <div className="account-container">
            <h1 className="welcome-message">Welcome, {username}!</h1>
            <div className="modify-section">
              {isModifying ? (
                <>
                  <label>Name</label>
                  <input
                    style={{ border: 'none' }}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br />
                  <label>E-mail</label>
                  <input
                    style={{ border: 'none' }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <label>Password</label>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input
                      style={{ border: 'none', paddingRight: '30px' }}
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={isPasswordVisible ? faEyeSlash : faEye}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  </div>

                  <br />
                  <button onClick={handleSave}>Save</button><br />

                </>
              ) : (
                <>
                  <label>Name</label>
                  <input style={{ border: 'none' }} type="text" value={username} disabled />
                  <br />
                  <label>E-mail</label>
                  <input style={{ border: 'none' }} type="email" value={email} disabled />
                  <br />
                  <label>Password</label>
                  <input style={{ border: 'none' }} type="password" value={password} disabled /><br />
                  <button onClick={handleModify}>Modify</button>
                  {message && (
                    <p className={`Message ${message.startsWith('Failed') ? 'error' : 'success'}`}>
                      {message}
                    </p>
                  )}

                </>
              )}
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="login-prompt">
            <h1>You need to log in to access your account.</h1>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAccount;