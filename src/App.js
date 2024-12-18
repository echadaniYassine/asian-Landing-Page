import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/homePage.jsx';
import About from './About/About.jsx';
import Contact from './Contact/Contact.jsx';
import Header from './Header/header.jsx';
import  Footer  from './Footer/footer.jsx';
import Main from './Main/main.jsx';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Home />
        <Main />
        <About />
        <Footer />

        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
