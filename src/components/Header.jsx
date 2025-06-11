import React, { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <a href="#" className="logo">Rafael Carvalho</a>
      <i
        id="menu-icon"
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <a href="#home" className="active">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
        <a href="/admin">Admin</a>
      </nav>
    </header>
  );
}
