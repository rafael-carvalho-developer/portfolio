import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

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
    <section id="portfolio">
      <h2>Latest Projects</h2>
      <div className="portfolio-grid">
        {projects.map(p => (
          <div key={p.id} className="portfolio-item">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.url && (
              <a href={p.url} target="_blank" rel="noreferrer">
                Visit
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
