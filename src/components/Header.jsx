import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Header({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      header.classList.toggle('sticky', window.scrollY > 100);

      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('header nav a');
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`header nav a[href*=${id}]`);
          if (active) active.classList.add('active');
        }
      });
      setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    async function fetchMaintenance() {
      const { data } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'maintenance')
        .single();
      if (data) setMaintenance(data.value === 'true');
    }
    fetchMaintenance();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      {maintenance && (
        <div className="maintenance-alert">
          <img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" alt="maintenance" />
          <span>Website in maintenance</span>
        </div>
      )}
      <i
        id="menu-icon"
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>
      <i
        className={`bx ${dark ? 'bx-moon' : 'bx-sun'} theme-toggle`}
        onClick={() => setDark(!dark)}
      ></i>
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <a href="#home" className="active">
          <i className="bx bx-home"></i>
          <span>Home</span>
        </a>
        <a href="#about">
          <i className="bx bx-user"></i>
          <span>About</span>
        </a>
        <a href="#services">
          <i className="bx bx-briefcase"></i>
          <span>Services</span>
        </a>
        <a href="#skills">
          <i className="bx bx-code"></i>
          <span>Skills</span>
        </a>
        <a href="#timeline">
          <i className="bx bx-timer"></i>
          <span>Journey</span>
        </a>
        <a href="#portfolio">
          <i className="bx bx-book"></i>
          <span>Portfolio</span>
        </a>
        <a href="#contact">
          <i className="bx bx-mail-send"></i>
          <span>Contact</span>
        </a>
      </nav>
    </header>
  );
}
