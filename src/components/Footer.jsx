import React from 'react';
import './Footer.css';
import { Heart, Coffee, Code2, Rocket } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const footerLinks = [
    { label: 'Source Code', url: 'https://github.com/Simu000/portfolio', icon: Code2 },
    { label: 'Design System', url: '#', icon: Rocket },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-header">
          <div className="footer-brand">
            <div className="footer-logo">
              <Code2 size={24} />
            </div>
            <div className="footer-brand-text">
              <h3 className="footer-title">Harsimrat Kaur</h3>
              <p className="footer-tagline">Building digital experiences with passion</p>
            </div>
          </div>
        </div>
        
        
        
        <div className="footer-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <Coffee size={16} />
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p className="footer-text">
              &copy; {currentYear} Harsimrat Kaur. All rights reserved.
              <span className="footer-time">
                <span className="time-icon">🕒</span>
                {currentTime}
              </span>
            </p>
            <p className="footer-note">
              Built with <Heart size={14} className="heart-icon" /> and lots of 
              <Coffee size={14} className="coffee-icon" /> 
              in India
            </p>
          </div>
          
          <div className="footer-quote">
            <p className="quote-text">
              "The only way to do great work is to love what you do."
              <span className="quote-author">— Steve Jobs</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer-particles">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </footer>
  );
}