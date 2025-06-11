import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Admin from './components/Admin';

function App() {
  return (
    <div>
      <Header />
      <Home />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Admin />
    </div>
  );
}

export default App;
