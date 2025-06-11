import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const placeholders = [
  'images/portfolio1.jpg',
  'images/portfolio2.jpg',
  'images/portfolio3.jpg',
  'images/portfolio4.jpg',
  'images/portfolio5.jpg',
  'images/portfolio6.jpg',
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase.from('projects').select('*');
    if (!error) setProjects(data || []);
  }

  return (
    <section className="portfolio" id="portfolio">
      <h2 className="heading">Latest <span>Project</span></h2>
      <div className="portfolio-container">
        {projects.map((p, i) => (
          <div key={p.id} className="portfolio-box">
            <img src={placeholders[i % placeholders.length]} alt={p.title} />
            <div className="portfolio-layer">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer">
                  <i className="bx bx-link-external"></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
