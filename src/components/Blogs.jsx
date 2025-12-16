import React from 'react';
import './Blog.css';
import { ExternalLink, Calendar, Clock } from 'lucide-react';

const Blog = () => {
  const blogs = [
    {
      title: 'The Unseen Side of the AI Revolution: Why Relying on AI Could Be Making Us Dumber',
      description: 'Exploring the hidden consequences of AI dependency on human cognition and critical thinking skills. Is our reliance on artificial intelligence actually diminishing our own intellectual capabilities?',
      date: 'Aug 6, 2025',
      readTime: '4 min read',
      url: 'https://medium.com/@simu0609/the-unseen-side-of-the-ai-revolution-why-relying-on-ai-could-be-making-us-dumber-1dbadadaf27d',
      tags: ['AI', 'Technology', 'Future'],
      isFeatured: true
    },
    {
      title: 'Devin AI: The "First AI Engineer" and the Future of Junior Developers',
      description: 'Analyzing the impact of Devin AI on the software development industry and what it means for junior developers entering the field. Will AI replace human engineers or augment them?',
      date: 'Aug 6, 2025',
      readTime: '4 min read',
      url: 'https://medium.com/@simu0609/devin-ai-the-first-ai-engineer-and-the-future-of-junior-developers-067bd2b544',
      tags: ['AI', 'Software Development', 'Career', 'Innovation'],
      isFeatured: true
    }
    
  ];

  const featuredBlogs = blogs.filter(blog => blog.isFeatured);
  const otherBlogs = blogs.filter(blog => !blog.isFeatured);

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="section-title">Thoughts & Insights</h2>
          <p className="section-subtitle">
            Exploring technology, AI, and software development through writing
          </p>
          <div className="blog-stats">
            <div className="stat-item">

              <span>Latest in Tech</span>
            </div>
            <div className="stat-item">
              <Clock size={20} />
              <span>4+ min reads</span>
            </div>
          </div>
        </div>
        
        <div className="blog-featured">
          <h3 className="featured-title">
            <span className="highlight">Featured</span> Articles
          </h3>
          <div className="featured-grid">
            {featuredBlogs.map((blog, index) => (
              <article key={index} className="featured-card">
                <div className="featured-content">
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
                    className="blog-link featured-link"
                  >
                    Read Article <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {otherBlogs.length > 0 && (
          <div className="blog-other">
            <h3 className="other-title">More Articles</h3>
            <div className="blog-grid">
              {otherBlogs.map((blog, index) => (
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
                      Read Article <ExternalLink size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        
        <div className="blog-cta">
          <a 
            href="https://medium.com/@simu0609" 
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