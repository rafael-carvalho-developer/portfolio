import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [projects, setProjects] = useState([]);
  const [maintenance, setMaintenance] = useState(false);
  const [homeName, setHomeName] = useState('');
  const [homeDesc, setHomeDesc] = useState('');
  const [aboutDesc, setAboutDesc] = useState('');

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        fetchProjects();
        fetchSettings();
        fetchContent();
      }
    }
    loadSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProjects();
        fetchSettings();
        fetchContent();
      }
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

  async function fetchSettings() {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'maintenance')
      .single();
    if (data) setMaintenance(data.value === 'true');
  }

  async function updateMaintenance(value) {
    setMaintenance(value);
    await supabase.from('settings').upsert({ key: 'maintenance', value: value ? 'true' : 'false' });
  }

  async function fetchContent() {
    const { data } = await supabase
      .from('content')
      .select('*')
      .in('key', ['home_name', 'home_desc', 'about_desc']);
    if (data) {
      data.forEach((item) => {
        if (item.key === 'home_name') setHomeName(item.value);
        if (item.key === 'home_desc') setHomeDesc(item.value);
        if (item.key === 'about_desc') setAboutDesc(item.value);
      });
    }
  }

  async function saveContent() {
    await supabase.from('content').upsert([
      { key: 'home_name', value: homeName },
      { key: 'home_desc', value: homeDesc },
      { key: 'about_desc', value: aboutDesc },
    ]);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
        <button type="button" onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <h2>Website Settings</h2>
        <label className="toggle">
          <input
            type="checkbox"
            checked={maintenance}
            onChange={(e) => updateMaintenance(e.target.checked)}
          />
          Maintenance Mode
        </label>
        <form onSubmit={(e) => { e.preventDefault(); saveContent(); }}>
          <input
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            placeholder="Home Name"
          />
          <input
            value={homeDesc}
            onChange={(e) => setHomeDesc(e.target.value)}
            placeholder="Home Description"
          />
          <textarea
            value={aboutDesc}
            onChange={(e) => setAboutDesc(e.target.value)}
            placeholder="About Description"
          ></textarea>
          <button type="submit">Save Content</button>
        </form>
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
