import React from 'react';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-img">
        <img src="images/portfolio2.jpg" alt="Rafael Carvalho" />
      </div>
      <div className="about-content">
        <h2 className="heading">About <span>Me</span></h2>
        <h3>Full Stack Web Developer & PowerApps Specialist</h3>
        <p>
          I'm a developer with experience building web and mobile applications and integrating data from SharePoint, Dataverse, Office 365 and SQL Server.
        </p>
        <a href="#" className="about-btn">Read More</a>
      </div>
    </section>
  );
}
