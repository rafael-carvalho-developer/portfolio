import React, { useEffect } from 'react';

export default function Skills() {
  const skills = [
    { name: 'HTML5', icon: 'bxl-html5', level: 90 },
    { name: 'CSS3', icon: 'bxl-css3', level: 85 },
    { name: 'PHP', icon: 'bxl-php', level: 70 },
    { name: 'JavaScript / TypeScript', icon: 'bxl-javascript', level: 80 },
    { name: 'React', icon: 'bxl-react', level: 75 },
    { name: 'Python', icon: 'bxl-python', level: 70 },
    { name: 'Power Apps', icon: 'bxl-microsoft', level: 75 },
  ];

  useEffect(() => {
    const bars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute('data-level');
          entry.target.style.width = level + '%';
        }
      });
    }, { threshold: 0.5 });

    bars.forEach((bar) => observer.observe(bar));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills" id="skills">
      <h2 className="heading">Technologies <span>Used</span></h2>
      <div className="skills-container">
        {skills.map((skill) => (
          <div className="skill" key={skill.name}>
            <i className={`bx ${skill.icon}`}></i>
            <span>{skill.name}</span>
            <div className="progress">
              <div className="skill-bar" data-level={skill.level}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

