import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import IntroPage from './components/IntroPage';
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';
import ProjectPage from './components/ProjectPage';
import TeamPage from './components/TeamPage';
import DescriptionPage from './components/DescriptionPage';
import CommunityPage from './components/CommunityPage';
import ResearchPage from './components/ResearchPage';
import AnimationPage from './components/AnimationPage';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';

// Main site component that handles the scroll-based navigation
const MainSite: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const isNavigatingRef = useRef(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle navigation to specific section
  const handleNavigate = (sectionIndex: number) => {
    // Prevent multiple rapid clicks
    if (isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    setCurrentSection(sectionIndex);
    
    if (sectionsRef.current) {
      const sections = sectionsRef.current.children;
      if (sections[sectionIndex]) {
        sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
        
        // Reset the navigating flag after scroll animation completes
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 600); // Slightly longer than scroll animation to ensure completion
      } else {
        // If scroll fails, reset immediately
        isNavigatingRef.current = false;
      }
    } else {
      // If no sections ref, reset immediately
      isNavigatingRef.current = false;
    }
  };

  // Handle scroll to track current section
  useEffect(() => {
    const handleScroll = () => {
      // Don't update if we're in the middle of a manual navigation
      if (isNavigatingRef.current) return;
      
      if (sectionsRef.current) {
        const sections = sectionsRef.current.children;
        const scrollTop = sectionsRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i] as HTMLElement;
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop < sectionBottom - windowHeight / 2) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    const sectionsElement = sectionsRef.current;
    if (sectionsElement) {
      sectionsElement.addEventListener('scroll', handleScroll);
      return () => sectionsElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Shared Background for Main Site */}
      <div 
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-200 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(/resources/Background/bg-dark.jpg)`,
        }}
      />
      
      {/* Video Background for Main Site */}
      <video
        ref={videoRef}
        className={`fixed inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/resources/Background/bg-dark-animated.mp4" type="video/mp4" />
      </video>
      
      {/* Navigation */}
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      
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
          <VideoPage />
        </div>
        <div className="snap-start">
          <ProjectPage />
        </div>
        <div className="snap-start">
          <DescriptionPage />
        </div>
        <div className="snap-start">
          <TeamPage />
        </div>
        <div className="snap-start">
          <CommunityPage />
        </div>
      </div>
    </div>
  );
};

// Research page component with its own background
const ResearchPageWithBackground: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      <ResearchPage />
    </div>
  );
};

// Animation page component with its own background
const AnimationPageWithBackground: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      <AnimationPage />
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  // Handle video loading for intro
  useEffect(() => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
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
    <Router>
      <Routes>
        <Route path="/research" element={<ResearchPageWithBackground />} />
        <Route path="/animation" element={<AnimationPageWithBackground />} />
        <Route path="/" element={
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
              <MainSite />
            </div>

            {/* Transition Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-black to-gray-900 transition-opacity duration-500 pointer-events-none ${
                isTransitioning ? 'opacity-20' : 'opacity-0'
              }`}
            />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;