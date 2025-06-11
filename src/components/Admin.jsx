import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setSession(supabase.auth.getSession());
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
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
  };

  if (!session) {
    return (
      <section className="admin login-page">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </section>
    );
  }

  return (
    <section className="admin">
      <h2>Manage Projects</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
