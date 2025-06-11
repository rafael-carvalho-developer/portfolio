import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const sr = ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200,
    });
    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    sr.reveal('.home-content h1, .about-img', { origin: 'left' });
    sr.reveal('.home-content p, .about-content, .timeline-list li', { origin: 'right' });
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', !dark);
  }, [dark]);

  return (
    <div>
      <Header dark={dark} setDark={setDark} />
      <Home />
      <About />
      <Services />
      <Skills />
      <Timeline />
      <Stats />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;
