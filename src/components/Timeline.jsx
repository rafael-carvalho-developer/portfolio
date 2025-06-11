import React from 'react';

export default function Timeline() {
  const items = [
    { year: '2021', text: 'Started career as a web developer' },
    { year: '2022', text: 'Worked with React and PowerApps on client projects' },
    { year: '2023', text: 'Expanded skills with Python and C# development' },
    { year: '2024', text: 'Created this portfolio with modern features' },
  ];

  return (
    <section className="timeline" id="timeline">
      <h2 className="heading">My <span>Journey</span></h2>
      <ul className="timeline-list">
        {items.map((item, i) => (
          <li key={i} style={{ '--i': i }}>
            <span className="year">{item.year}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
