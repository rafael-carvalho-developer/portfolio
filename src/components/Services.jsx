import React from 'react';

export default function Services() {
  return (
    <section className="services" id="services">
      <h2 className="heading">My <span>Services</span></h2>
      <div className="services-container">
        <div className="services-box">
          <i className="bx bx-code-alt"></i>
          <h3>Web Development</h3>
          <p>Creating websites and web applications using modern technologies.</p>
          <a href="#web" className="services-btn">Read More</a>
        </div>
        <div className="services-box">
          <i className="bx bxs-paint"></i>
          <h3>Graphic Design</h3>
          <p>Designing logos, banners and other visuals.</p>
          <a href="#design" className="services-btn">Read More</a>
        </div>
        <div className="services-box">
          <i className="bx bx-bar-chart-alt"></i>
          <h3>Digital Marketing</h3>
          <p>Improving your presence on the web and social networks.</p>
          <a href="#marketing" className="services-btn">Read More</a>
        </div>
      </div>
    </section>
  );
}
