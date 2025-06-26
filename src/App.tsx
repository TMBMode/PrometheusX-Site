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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
        // Ensure video plays when ready
        video.play().catch(e => console.log('Video autoplay prevented:', e));
      };

      video.addEventListener('canplay', handleCanPlay);
      
      // Start loading the video
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden ${showIntro ? 'intro-active' : ''}`}>
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
        <IntroPage onEnter={handleEnterSite} videoLoaded={videoLoaded} />
      </div>

      {/* Main Site */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-auto-main ${
          !showIntro 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90'
        }`}
      >
        {/* Shared Background for Main Site */}
        <div 
          className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(/resources/Background/bg-dark.jpg)`,
          }}
        />
        
        {/* Video Background for Main Site */}
        <video
          ref={videoRef}
          className={`fixed inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/resources/Background/bg-dark-animated.mp4" type="video/mp4" />
        </video>
        
        <div 
          ref={sectionsRef}
          className="relative h-screen overflow-y-auto snap-y snap-mandatory"
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