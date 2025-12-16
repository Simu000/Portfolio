import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

const Projects = () => {
  const upcomingproject = [
    {
      title: "Shade",
      description:
        "An upcoming e-commerce platform built to sell original art pieces to real customers, featuring favorites, custom portrait requests, secure ordering, and a creator-first management system. Designed for real-world use — more details will be revealed when it goes live.",
      image:
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop",
      isUpcoming: true,
    },
  ];

  const projects = [
    {
      title: "Taekwondo KickMeter",
      description:
        "A sensor-based system designed to measure and analyze the force of taekwondo kicks in real time. The project captures impact data and presents it through a web interface with clear metrics and visual feedback, enabling athletes to track performance and improvement over time.",
      technologies: [
        "React",
        "Gemini API",
        "Firebase",
        "Raspberry Pi",
        "Python",
        "Arduino Nano",
      ],
      image:
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop",
      codeLink: "https://github.com/Simu000/Taekwondo-Kickmeter",
    },
    {
      title: "WaterWise – Ingress ChatBod",
      description:
        "A user-friendly web interface built on top of the Ingress groundwater and climate data platform that simplifies location-based navigation and converts complex data into clear insights with year-wise groundwater visualizations. Team project; I handled the front end and data visualization.",
      technologies: [
        "Next.js",
        "Node.js",
        "Spline",
        "Recharts",
        "Tailwind CSS",
        "Rasa AI",
      ],
      image:
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop",
      codeLink: "https://github.com/Simu000/IN-GRES-SIH",
    },
    {
      title: "DevOrbit",
      description:
        "A developer-focused learning and collaboration platform that enables users to create and consume tutorial content, engage through comments, ratings, and moderated publishing, and connect via real-time public and private chat rooms. The platform includes focus tools, private personal journaling, mood tracking, and a peer-support space for sharing resources and guidance.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "Chart.js",
        "Tailwind CSS",
        "PostgreSQL",
        "Socket.IO",
        "JWT",
        "OAuth",
      ],
      image:
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop",
      codeLink: "https://github.com/Simu000/DevOrbit",
    },
  ];

  const allProjects = [...projects, ...upcomingproject];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === allProjects.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allProjects.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Touch and mouse drag handling
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleTouchStart = (e) => {
      startXRef.current = e.touches[0].clientX;
      isDraggingRef.current = true;
      carousel.style.transition = "none";
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      currentXRef.current = e.touches[0].clientX - startXRef.current;
      carousel.style.transform = `translateX(calc(-${currentIndex * 100}% + ${currentXRef.current}px))`;
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      carousel.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

      const threshold = 50;
      if (currentXRef.current > threshold) {
        prevSlide();
      } else if (currentXRef.current < -threshold) {
        nextSlide();
      } else {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    };

    const handleMouseDown = (e) => {
      startXRef.current = e.clientX;
      isDraggingRef.current = true;
      carousel.style.transition = "none";
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      currentXRef.current = e.clientX - startXRef.current;
      carousel.style.transform = `translateX(calc(-${currentIndex * 100}% + ${currentXRef.current}px))`;
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      carousel.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

      const threshold = 50;
      if (currentXRef.current > threshold) {
        prevSlide();
      } else if (currentXRef.current < -threshold) {
        nextSlide();
      } else {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    };

    // Touch events
    carousel.addEventListener("touchstart", handleTouchStart);
    carousel.addEventListener("touchmove", handleTouchMove);
    carousel.addEventListener("touchend", handleTouchEnd);

    // Mouse events
    carousel.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchmove", handleTouchMove);
      carousel.removeEventListener("touchend", handleTouchEnd);
      carousel.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentIndex]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Discover the innovative solutions I've crafted
        </p>

        <div className="carousel-wrapper">
          <button 
            className="carousel-btn prev-btn" 
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous project"
          >
            <span className="arrow">←</span>
          </button>

          <div className="carousel">
            <div
              ref={carouselRef}
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {allProjects.map((project, index) => (
                <div key={index} className="carousel-slide">
                  <div className="project-card">
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      {project.isUpcoming && (
                        <div className="upcoming-banner">
                          <span>UPCOMING</span>
                        </div>
                      )}
                      <div className="project-overlay"></div>
                    </div>

                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">
                        {project.description}
                      </p>

                      {project.technologies && (
                        <div className="project-technologies">
                          <span className="tech-label">Technologies Used</span>
                          <div className="tech-tags">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {!project.isUpcoming && (
                        <div className="project-buttons">
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-code-btn"
                          >
                            <span className="btn-icon">{"</>"}</span>
                            View Code
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn next-btn" 
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next project"
          >
            <span className="arrow">→</span>
          </button>
        </div>

        <div className="carousel-dots">
          {allProjects.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;