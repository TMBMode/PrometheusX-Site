import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import NetworkAnimation from './NetworkAnimation';
import TypingAnimation from './TypingAnimation';
import GlitchAnimation from './GlitchAnimation';

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/resources/Background/bg-brain.jpg)`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-gray-900/70" />
      
      {/* Animated Network Container */}
      <div ref={containerRef} className="absolute inset-0">
        <NetworkAnimation containerRef={containerRef} />
      </div>
      
      {/* Animations - Only show in landscape */}
      {isLandscape && (
        <>
          {/* Typing Animation */}
          <TypingAnimation />
          
          {/* Glitch Animation */}
          <GlitchAnimation />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <img 
            src="/resources/Logo/logo-prometheusx-v2.svg"
            alt="PrometheusX Logo" 
            className="h-16 w-auto hover:brightness-150 transition-all duration-300"
          />
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60 transition-colors duration-300 animate-bounce">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;