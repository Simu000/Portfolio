import "./About.css";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import simu from "../assets/simu.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutSectionRef = useRef(null);
  const profileImageRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const aboutTextRefs = useRef([]);
  const skillBadgesRef = useRef([]);

  // Add ref to text elements
  const addToTextRefs = (el) => {
    if (el && !aboutTextRefs.current.includes(el)) {
      aboutTextRefs.current.push(el);
    }
  };

  // Add ref to skill badges
  const addToSkillRefs = (el) => {
    if (el && !skillBadgesRef.current.includes(el)) {
      skillBadgesRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile image floating animation
      gsap.to(profileImageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // About heading animation - fixed
      gsap.fromTo(aboutHeadingRef.current, 
        {
          opacity: 0,
          y: -80
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: aboutHeadingRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // About text animation
      aboutTextRefs.current.forEach((text, index) => {
        gsap.fromTo(text, 
          {
            opacity: 0,
            x: -80
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Skills heading animation
      gsap.fromTo(".skills-heading", 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills badges animation with stagger effect
      gsap.fromTo(skillBadgesRef.current, 
        {
          opacity: 0,
          scale: 0.8,
          y: 40,
          rotationY: 90
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animations for skill badges
      skillBadgesRef.current.forEach((badge) => {
        badge.addEventListener("mouseenter", () => {
          gsap.to(badge, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
            backgroundColor: "rgba(255, 255, 255, 0.15)"
          });
        });

        badge.addEventListener("mouseleave", () => {
          gsap.to(badge, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            backgroundColor: "rgba(255, 255, 255, 0.08)"
          });
        });
      });

      // Section background pulse effect
      gsap.to(aboutSectionRef.current, {
        background: "radial-gradient(circle at center, rgba(40, 40, 40, 0.8) 0%, rgba(0, 0, 0, 1) 100%)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black" ref={aboutSectionRef}>
      <section id="about" className="bg-black text-white px-8 md:px-40 about-container">
        <div className="max-w-7xl mx-auto w-full">
          <h2 
            className="text-5xl md:text-6xl font-bold mb-20 mt-8 about-heading text-center"
            ref={aboutHeadingRef}
          >
            About Me
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Profile Image */}
            <div className="flex-shrink-0 lg:w-1/3 flex justify-center">
              <div className="profile-image-container" ref={profileImageRef}>
                <img src={simu} alt="Harsimrat Kaur" className="profile-image" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 lg:w-2/3 lg:mt-12">
              <div className="about-content-margin text-lg md:text-xl leading-relaxed space-y-6 mb-16 px-4 lg:px-0">
                <p ref={addToTextRefs}>
                  I'm Harsimrat Kaur, a passionate developer who brings digital
                  visions to life through code and creativity. With expertise in
                  modern web technologies and 3D design, I craft immersive
                  experiences that push the boundaries of what's possible on the
                  web.
                </p>
                <br />
                <p ref={addToTextRefs}>
                  My journey in development is driven by a love for innovation and
                  a commitment to creating solutions that not only function
                  flawlessly but also inspire and engage users on a deeper level.
                </p>
              </div>

              {/* Skills & Technologies */}
              <div className="skills-section about-content-margin">
                <h3 className="text-2xl font-semibold mb-8 skills-heading">
                  Skills & Technologies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">HTML</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">Tailwind CSS</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">JavaScript</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">React</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">PostgreSQL</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">Node.js</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">Express</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">MongoDB</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">Java</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">C#</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">Next.js</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">Arduino</span>
                  </div>

                  <div className="skill-badge" ref={addToSkillRefs}>
                    <span className="skill-text">RaspberryPi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}