import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function PortfolioLanding() {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create textured sphere with more organic distortion
    const geometry = new THREE.SphereGeometry(1.2, 256, 256);
    
    // Create more complex distortion for organic look
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positions, i);
      
      // Multiple layers of noise for more organic texture
      const noise1 = Math.sin(vertex.x * 4) * Math.cos(vertex.y * 4) * 0.1;
      const noise2 = Math.sin(vertex.y * 6 + vertex.z * 3) * 0.06;
      const noise3 = Math.cos(vertex.x * 8 - vertex.z * 5) * 0.04;
      
      const totalNoise = noise1 + noise2 + noise3;
      vertex.normalize().multiplyScalar(1.2 + totalNoise);
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();

    // Monochromatic metallic material
    const material = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.95,
      roughness: 0.3,
      envMapIntensity: 0.8,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Create orbital ring
    const ringGeometry = new THREE.TorusGeometry(2.2, 0.015, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.8,
      roughness: 0.4,
      transparent: true,
      opacity: 0,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.y = Math.PI / 6;
    scene.add(ring);

    // Create segmented ring parts
    const segments = [];
    const segmentCount = 12;
    const segmentAngle = (Math.PI * 2) / segmentCount;
    
    for (let i = 0; i < segmentCount; i++) {
      const segGeometry = new THREE.TorusGeometry(2.2, 0.02, 8, 50, segmentAngle * 0.7);
      const segMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0,
      });
      const segment = new THREE.Mesh(segGeometry, segMaterial);
      segment.rotation.x = Math.PI / 2.5;
      segment.rotation.y = Math.PI / 6;
      segment.rotation.z = segmentAngle * i;
      scene.add(segment);
      segments.push(segment);
    }

    // Subtle monochromatic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xaaaaaa, 0.4);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xcccccc, 0.6);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // Subtle point lights for depth
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xdddddd, 0.5, 10);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Check if mouse is near center (sphere area)
      const distFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      setIsHovered(distFromCenter < 0.3);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    const clock = new THREE.Clock();
    let targetRingOpacity = 0;
    let currentRingOpacity = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse follow
      targetX += (mouseX * 0.3 - targetX) * 0.05;
      targetY += (mouseY * 0.3 - targetY) * 0.05;
      
      // Slow, subtle rotation
      sphere.rotation.y = elapsedTime * 0.08 + targetX * 0.5;
      sphere.rotation.x = elapsedTime * 0.04 + targetY * 0.5;
      
      // Ring animation on hover
      const distFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      targetRingOpacity = distFromCenter < 0.3 ? 0.8 : 0;
      currentRingOpacity += (targetRingOpacity - currentRingOpacity) * 0.1;
      
      // Update ring segments opacity
      segments.forEach((segment, i) => {
        segment.material.opacity = currentRingOpacity;
        segment.rotation.z = segmentAngle * i + elapsedTime * 0.2;
      });
      
      // Rotate ring slowly
      ring.rotation.z = elapsedTime * 0.1;
      
      // Subtle light animation
      pointLight1.position.x = Math.sin(elapsedTime * 0.3) * 3;
      pointLight1.position.y = Math.cos(elapsedTime * 0.2) * 3;
      
      pointLight2.position.x = Math.cos(elapsedTime * 0.25) * 3;
      pointLight2.position.y = Math.sin(elapsedTime * 0.35) * 3;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      segments.forEach(seg => {
        seg.geometry.dispose();
        seg.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Three.js Canvas - only in hero section */}
      <div ref={mountRef} className="absolute inset-0 z-0 h-screen" />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6">
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h1 
            className="text-6xl md:text-8xl font-light tracking-[0.3em] text-white"
            style={{ 
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 40px rgba(255,255,255,0.05)'
            }}
          >
            HARSIMRAT
          </h1>
          <h2 
            className="text-6xl md:text-8xl font-light tracking-[0.3em] text-white"
            style={{ 
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 40px rgba(255,255,255,0.05)'
            }}
          >
            KAUR
          </h2>
          <p 
            className="text-sm md:text-base tracking-[0.4em] text-gray-400 mt-6"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            CLARITY, FOCUS, IMPACT
          </p>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-12 left-12 text-xs text-gray-600 tracking-wider">
          <p>2ND YEAR SOFTWARE ENGINEERING</p>
          <p>STUDENT</p>
        </div>
        
        <div className="absolute bottom-12 right-12 text-xs text-gray-600 tracking-wider text-right">
          <p>EXPERTISE IN NEXT, REACT, NODE, EXPRESS,</p>
          <p>TAILWIND</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent opacity-50" />
          <p className="text-sm text-gray-400 tracking-widest">SCROLL</p>
        </div>
      </div>
    </div>
  );
}