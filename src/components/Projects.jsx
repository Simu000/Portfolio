import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Immersive E-Commerce Platform',
      description: 'A revolutionary shopping experience with 3D product visualization and AR integration. Built with React, Three.js, and Spline for seamless interactivity.',
      technologies: ['React', 'Three.js', 'Spline', 'WebGL'],
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Discover the innovative solutions I've crafted</p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay"></div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  <span className="tech-label">Technologies Used</span>
                  <div className="tech-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="project-buttons">
                  <button className="btn-primary">View Live Demo</button>
                  <button className="btn-secondary">View Code</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;