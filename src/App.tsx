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
          <div className="snap-start">
            <HomePage />
          </div>
          <div className="snap-start">
            <TeamPage />
          </div>
          <div className="snap-start">
            <VideoPage />
          </div>
          <div className="snap-start">
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