import React, { useState } from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import emailjs from 'emailjs-com';
import './Contact.css';
import XIcon from '/assets/X.svg'; // Import the SVG directly

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: import.meta.env.VITE_YOUR_EMAIL
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({ 
        type: 'error', 
        message: `Failed to send message. Please try again or contact me directly at ${import.meta.env.VITE_YOUR_EMAIL}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      url: 'https://github.com/Simu000',
      color: '#ffffff' 
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/hrsmrt/',
      color: '#0077b5' 
    },
    {
      icon: 'X',
      label: 'X',
      url: "https://x.com/_hrsmrt",
      color: '#000000' // Changed to black for X/Twitter
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-subtitle">
          Ready to bring your next project to life? Let's collaborate!
        </p>
        
        <div className="contact-content">
          <div className="social-links">
            <h3 className="social-title">Find me online</h3>
            {socialLinks.map((social) => (
              <a 
                key={social.label} 
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ '--social-color': social.color }}
              >
                {social.icon === 'X' ? (
                  <img 
                    src={XIcon} 
                    alt="X" 
                    style={{ 
                      width: 20, 
                      height: 20, 
                      filter: 'invert(1)' // Makes the X icon white
                    }} 
                  />
                ) : (
                  <social.icon size={20} />
                )}
                <span>{social.label}</span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Tell me about your project..."
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                maxLength="500"
                required
                disabled={isSubmitting}
              />
              <span className="char-count">{formData.message.length}/500</span>
            </div>
            
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} 
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;