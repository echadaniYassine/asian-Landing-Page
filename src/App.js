import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero';
import Header from './components/header';
import About from './components/About';
import Main from './components/main';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Hero />
        <About />
        <Main />
        <Footer />
      </>

    </Router>
  );
}

export default App;
