import React, { useEffect } from 'react';
import Typed from 'typed.js';

export default function Home() {
  useEffect(() => {
    const typed = new Typed('.multiple-text', {
      strings: ['Full-Stack Web', 'Front-End', 'Back-End', 'PowerApps'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3>Hello, my name is</h3>
        <h1>Rafael Carvalho</h1>
        <h3>
          and I'm <span className="multiple-text"></span> Developer
        </h3>
        <p>
          I'm a 24-year-old developer with over 3 years of experience in full stack web development and the Microsoft Power Platform.
        </p>
        <div className="social-media">
          <a href="https://github.com/rafael-carvalho-developer"><i className="bx bxl-github"></i></a>
          <a href="https://www.linkedin.com/in/rafael-carvalho-developer/"><i className="bx bxl-linkedin"></i></a>
        </div>
        <a href="CV - Rafael Carvalho.pdf" download className="home-btn">Download CV</a>
      </div>
      <div className="home-img">
        <img src="images/portfolio1.jpg" alt="Rafael Carvalho" />
      </div>
    </section>
  );
}
