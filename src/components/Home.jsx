import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [name, setName] = useState('Rafael Carvalho');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const typed = new Typed('.multiple-text', {
      strings: ['Full-Stack Web', 'Front-End', 'Back-End', 'PowerApps'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  useEffect(() => {
    async function fetchContent() {
      const { data } = await supabase
        .from('content')
        .select('*')
        .in('key', ['home_name', 'home_desc']);
      if (data) {
        data.forEach((item) => {
          if (item.key === 'home_name') setName(item.value);
          if (item.key === 'home_desc') setDesc(item.value);
        });
      }
    }
    fetchContent();
  }, []);

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3>Hello, my name is</h3>
        <h1>{name}</h1>
        <h3>
          and I'm <span className="multiple-text"></span> Developer
        </h3>
        <p>{desc}</p>
        <div className="social-media">
          <a href="https://github.com/rafael-carvalho-developer"><i className="bx bxl-github"></i></a>
          <a href="https://www.linkedin.com/in/rafael-carvalho-developer/"><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>
    </section>
  );
}
