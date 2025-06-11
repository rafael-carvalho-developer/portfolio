import React from 'react';

export default function Skills() {
  const skills = [
    'HTML5',
    'CSS3',
    'PHP',
    'JavaScript (JS) & TypeScript (TS)',
    'React',
    'Python',
    'C#',
    'Power Apps',
  ];

  return (
    <section className="skills" id="skills">
      <h2 className="heading">Technologies <span>Used</span></h2>
      <ul className="skills-list">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
