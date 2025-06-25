import React, { useState, useEffect, useRef } from 'react';
import IntroPage from './components/IntroPage';
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';
import TeamPage from './components/TeamPage';
import DescriptionPage from './components/DescriptionPage';
import CustomCursor from './components/CustomCursor';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0: Home, 1: Team, 2: Video, 3: Description
  const sectionsRef = useRef<HTMLDivElement>(null);

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

  // Track scroll position to determine current page
  useEffect(() => {
    if (showIntro || !sectionsRef.current) return;

    const container = sectionsRef.current;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;
      const pageIndex = Math.round(scrollTop / windowHeight);
      
      // Clamp between 0 and 3 (4 pages total)
      const clampedPageIndex = Math.max(0, Math.min(3, pageIndex));
      
      if (clampedPageIndex !== currentPage) {
        setCurrentPage(clampedPageIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [showIntro, currentPage]);

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
          className="h-screen overflow-y-auto snap-y snap-mandatory"
          style={{ 
            scrollBehavior: 'smooth',
            overscrollBehavior: 'none'
          }}
        >
          <div 
            className={`snap-start ${currentPage !== 0 ? 'pointer-events-none' : ''}`}
            style={{ pointerEvents: currentPage !== 0 ? 'none !important' : 'auto' }}
          >
            <HomePage />
          </div>
          <div 
            className={`snap-start ${currentPage !== 1 ? 'pointer-events-none' : ''}`}
            style={{ pointerEvents: currentPage !== 1 ? 'none !important' : 'auto' }}
          >
            <TeamPage />
          </div>
          <div 
            className={`snap-start ${currentPage !== 2 ? 'pointer-events-none' : ''}`}
            style={{ pointerEvents: currentPage !== 2 ? 'none !important' : 'auto' }}
          >
            <VideoPage />
          </div>
          <div 
            className={`snap-start ${currentPage !== 3 ? 'pointer-events-none' : ''}`}
            style={{ pointerEvents: currentPage !== 3 ? 'none !important' : 'auto' }}
          >
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