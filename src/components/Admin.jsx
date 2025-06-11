import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) fetchProjects();
    }
    loadSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProjects();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await supabase.auth.signInWithPassword({ email, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('projects').insert({ title, description, url });
    setTitle('');
    setDescription('');
    setUrl('');
    fetchProjects();
  };

  async function fetchProjects() {
    const { data } = await supabase.from('projects').select('*');
    setProjects(data || []);
  }

  async function handleDelete(id) {
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter((p) => p.id !== id));
  }

  if (!session) {
    return (
      <section className="admin login-page">
        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin">
      <div className="admin-container">
        <h2>Manage Projects</h2>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
          <button type="submit">Add</button>
        </form>
        <ul className="project-list">
          {projects.map((p) => (
            <li key={p.id} className="project-item">
              <span>{p.title}</span>
              <button type="button" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
