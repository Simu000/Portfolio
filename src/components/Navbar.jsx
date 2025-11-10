import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsScrolled(scrollTop > 50);
      setIsOnHero(scrollTop < heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isOnHero ? 'navbar-opaque' : ''}`}>
      <div className="navbar-brand">
        <div className="Nav-Text" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Harsimrat
        </div>
      </div>
      <div className="navbar-links">
        <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
        <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
        <button onClick={() => scrollToSection('blog')} className="nav-link">Blog</button>
        <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;