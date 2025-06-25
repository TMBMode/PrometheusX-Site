import React, { useState, useEffect, useRef } from 'react';
import IntroPage from './components/IntroPage';
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';
import TeamPage from './components/TeamPage';
import DescriptionPage from './components/DescriptionPage';
import CustomCursor from './components/CustomCursor';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  
  // Touch handling state
  const touchStartRef = useRef<{ y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ y: number; time: number } | null>(null);

  const sections = ['home', 'video', 'team', 'description'];

  // Navigate to section function
  const navigateToSection = (newSection: number) => {
    if (newSection !== currentSection && !isScrollingRef.current && !isTransitioning) {
      isScrollingRef.current = true;
      setCurrentSection(newSection);
      
      // Smooth scroll to section
      if (sectionsRef.current) {
        sectionsRef.current.scrollTo({
          top: newSection * window.innerHeight,
          behavior: 'smooth'
        });
      }
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  useEffect(() => {
    if (showIntro) return;

    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current || isTransitioning) return;
      
      e.preventDefault();
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      
      navigateToSection(newSection);
    };

    // Keyboard handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current || isTransitioning) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const newSection = Math.min(sections.length - 1, currentSection + 1);
        navigateToSection(newSection);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newSection = Math.max(0, currentSection - 1);
        navigateToSection(newSection);
      }
    };

    // Touch start handler
    const handleTouchStart = (e: TouchEvent) => {
      if (isScrollingRef.current || isTransitioning) return;
      
      const touch = e.touches[0];
      touchStartRef.current = {
        y: touch.clientY,
        time: Date.now()
      };
      touchEndRef.current = null;
    };

    // Touch move handler - prevent default scrolling during our custom handling
    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current || isTransitioning) return;
      
      // Only prevent default if we have a valid touch start
      if (touchStartRef.current) {
        e.preventDefault();
      }
    };

    // Touch end handler
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current || isTransitioning || !touchStartRef.current) return;
      
      const touch = e.changedTouches[0];
      touchEndRef.current = {
        y: touch.clientY,
        time: Date.now()
      };

      const touchStart = touchStartRef.current;
      const touchEnd = touchEndRef.current;
      
      // Calculate swipe distance and time
      const deltaY = touchStart.y - touchEnd.y;
      const deltaTime = touchEnd.time - touchStart.time;
      const velocity = Math.abs(deltaY) / deltaTime;
      
      // Minimum swipe distance and maximum time for a valid swipe
      const minSwipeDistance = 25;
      const maxSwipeTime = 2000;
      const minVelocity = 0.1; // pixels per millisecond
      
      if (Math.abs(deltaY) >= minSwipeDistance && 
          deltaTime <= maxSwipeTime && 
          velocity >= minVelocity) {
        
        // Determine direction: positive deltaY = swipe up (next section)
        const direction = deltaY > 0 ? 1 : -1;
        const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        
        navigateToSection(newSection);
      }
      
      // Reset touch tracking
      touchStartRef.current = null;
      touchEndRef.current = null;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, showIntro, sections.length, isTransitioning]);

  const handleEnterSite = () => {
    setIsTransitioning(true);
    
    // Start the transition after a brief delay
    setTimeout(() => {
      setShowIntro(false);
      // Reset transition state after the transition completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Intro Page */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          showIntro 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-110 pointer-events-none'
        }`}
      >
        <IntroPage onEnter={handleEnterSite} />
      </div>

      {/* Main Site */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          !showIntro 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div 
          ref={sectionsRef}
          className="h-screen overflow-hidden scroll-smooth"
          style={{ 
            scrollSnapType: 'y mandatory',
            overscrollBehavior: 'none'
          }}
        >
          <div style={{ scrollSnapAlign: 'start' }}>
            <HomePage />
          </div>
          <div style={{ scrollSnapAlign: 'start' }}>
            <TeamPage />
          </div>
          <div style={{ scrollSnapAlign: 'start' }}>
            <VideoPage />
          </div>
          <div style={{ scrollSnapAlign: 'start' }}>
            <DescriptionPage />
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black to-gray-900 transition-opacity duration-500 pointer-events-none ${
          isTransitioning ? 'opacity-20' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default App;