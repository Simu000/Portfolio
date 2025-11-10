import React from 'react';
import './Blog.css';
import { ExternalLink, Calendar, Clock } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      title: 'Building Modern Web Applications with React',
      description: 'Exploring the best practices and patterns for creating scalable React applications in 2024.',
      date: 'Nov 5, 2024',
      readTime: '8 min read',
      url: '#',
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      title: 'The Future of Web Development',
      description: 'A deep dive into emerging technologies and trends shaping the future of web development.',
      date: 'Oct 28, 2024',
      readTime: '6 min read',
      url: '#',
      tags: ['Web Dev', 'Technology', 'Future']
    },
    {
      title: 'Mastering CSS Animations',
      description: 'Learn how to create stunning animations and transitions using modern CSS techniques.',
      date: 'Oct 15, 2024',
      readTime: '10 min read',
      url: '#',
      tags: ['CSS', 'Animation', 'Design']
    }
  ];

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Thoughts, tutorials, and insights on web development
        </p>
        
        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <article key={index} className="blog-card">
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">
                    <Calendar size={14} />
                    {blog.date}
                  </span>
                  <span className="blog-read-time">
                    <Clock size={14} />
                    {blog.readTime}
                  </span>
                </div>
                
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
                
                <div className="blog-tags">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                
                <a 
                  href={blog.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="blog-link"
                >
                  Read on Medium <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="blog-cta">
          <a 
            href="https://medium.com/@your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-view-all"
          >
            View All Articles on Medium
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;