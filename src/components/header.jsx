
import "../style/header.css";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="header-container">
      <div className="logo-container ">
        <a href="/">
          <img src="assets/AsiaTastiLogo.png" className="imageLogo" alt="OKY Logo" />
        </a>
      </div>

      {/* Navigation */}
      <nav className="navigation" >
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link" >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a href="#Categories" className="nav-link" >
              Categories
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" >
              About
            </a>
          </li>
          <li className="nav-item">
            <Link to="/Contact" className="nav-link" >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
