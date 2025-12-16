import React, { useState } from 'react';
import { Send, Github, Linkedin, Mail, MessageSquare, Sparkles } from 'lucide-react';
import emailjs from 'emailjs-com';
import './Contact.css';
import XIcon from '../assets/X.svg';

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
          message: '✨ Message sent successfully! I\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({ 
        type: 'error', 
        message: `❌ Failed to send message. Please try again or contact me directly at ${import.meta.env.VITE_YOUR_EMAIL}` 
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
      color: '#ffffff',
      gradient: 'linear-gradient(135deg, #333, #666)'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/hrsmrt/',
      color: '#0077b5',
      gradient: 'linear-gradient(135deg, #0077b5, #00a0dc)'
    },
    {
      icon: 'X',
      label: 'X',
      url: "https://x.com/_hrsmrt",
      color: '#000000',
      gradient: 'linear-gradient(135deg, #000, #333)'
    },
    {
      icon: Mail,
      label: 'Email',
      url: `mailto:${import.meta.env.VITE_YOUR_EMAIL}`,
      color: '#ea4335',
      gradient: 'linear-gradient(135deg, #ea4335, #fbbc05)'
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <Sparkles className="sparkle-icon" size={40} />
          <h2 className="section-title">Let's Connect & Create</h2>
          <p className="section-subtitle">
            Ready to bring your next project to life? Let's collaborate on something amazing!
          </p>
          <div className="contact-stats">
            <div className="stat-bubble">
              <MessageSquare size={18} />
              <span>Fast Response</span>
            </div>
            <div className="stat-bubble">
              <Sparkles size={18} />
              <span>Creative Solutions</span>
            </div>
          </div>
        </div>
        
        <div className="contact-content">
          <div className="social-section">
            <div className="social-card">
              <h3 className="social-title">
                <span className="social-icon">💬</span>
                Connect With Me
              </h3>
              <p className="social-description">
                Follow my journey and see what I'm building next
              </p>
              
              <div className="social-links-grid">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-card"
                    style={{ '--social-gradient': social.gradient }}
                  >
                    <div className="social-icon-wrapper">
                      {social.icon === 'X' ? (
                        <img 
                          src={XIcon} 
                          alt="X" 
                          className="x-icon"
                        />
                      ) : (
                        <social.icon size={22} />
                      )}
                    </div>
                    <div className="social-info">
                      <span className="social-label">{social.label}</span>
                      <span className="social-action">Visit →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="contact-cta">
              <p className="cta-text">
                Prefer a quick chat? I'm always open to discuss new opportunities!
              </p>
            </div>
          </div>

          <div className="form-section">
            <div className="form-header">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">Tell me about your project or just say hello!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="name" className="floating-label">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="input-underline"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor="email" className="floating-label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="input-underline"></div>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-group">
                  <label htmlFor="message" className="floating-label">Your Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength="500"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="textarea-underline"></div>
                  <div className="textarea-footer">
                    <span className="char-count">{formData.message.length}/500 characters</span>
                    <span className="tip-text">What excites you about this project?</span>
                  </div>
                </div>
              </div>
              
              {status.message && (
                <div className={`status-message ${status.type}`}>
                  <div className="status-content">
                    <span className="status-icon">
                      {status.type === 'success' ? '✨' : '❌'}
                    </span>
                    {status.message}
                  </div>
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
              >
                <span className="btn-content">
                  {isSubmitting ? (
                    <>
                      <span className="sending-dots">
                        <span>.</span><span>.</span><span>.</span>
                      </span>
                      Sending Message
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="send-icon" />
                    </>
                  )}
                </span>
                <div className="btn-shine"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;