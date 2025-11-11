import React from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} Harsimrat Kaur. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
