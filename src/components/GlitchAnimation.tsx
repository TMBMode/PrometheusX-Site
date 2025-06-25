import React, { useState, useEffect, useRef } from 'react';

const GlitchAnimation: React.FC = () => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [glitchedText, setGlitchedText] = useState('Welcome to PrometheusX');
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const originalText = 'Welcome to PrometheusX';
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  // Fixed position for the glitch box
  const boxPosition = { x: 40, y: 40 }; // Bottom left area

  // Generate glitched text based on intensity
  const generateGlitchedText = (intensity: number) => {
    const charactersToGlitch = Math.floor(originalText.length * intensity);
    let result = originalText;

    for (let i = 0; i < charactersToGlitch; i++) {
      const randomIndex = Math.floor(Math.random() * originalText.length);
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      result = result.substring(0, randomIndex) + randomChar + result.substring(randomIndex + 1);
    }

    return result;
  };

  // Trigger random glitch effect
  const triggerGlitch = () => {
    if (isGlitching) return;

    // Random intensity between 0.2 and 0.8
    const intensity = 0.2 + Math.random() * 0.6;
    setGlitchIntensity(intensity);
    setIsGlitching(true);

    // Generate glitched text
    setGlitchedText(generateGlitchedText(intensity));

    // Clear existing timeout
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }

    // Stop glitching after a random duration (200-800ms)
    const glitchDuration = 100 + Math.random() * 200;
    glitchTimeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
      setGlitchedText(originalText);
      setGlitchIntensity(0);
    }, glitchDuration);
  };

  // Set up random interval glitching
  useEffect(() => {
    const scheduleNextGlitch = () => {
      // Random interval
      const nextGlitchDelay = 800 + Math.random() * 1500;
      
      intervalRef.current = setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch(); // Schedule the next one
      }, nextGlitchDelay);
    };

    // Start the first glitch after an initial delay
    const initialDelay = 500;
    setTimeout(() => {
      triggerGlitch();
      scheduleNextGlitch();
    }, initialDelay);

    return () => {
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className="absolute pointer-events-auto-main z-20 transition-all duration-200 transform hover:scale-105"
      style={{
        left: `${boxPosition.x}px`,
        bottom: `${boxPosition.y}px`,
      }}
    >
      <div 
        className={`font-mono text-white text-sm transition-all duration-150 ${
          isGlitching ? 'animate-pulse' : ''
        }`}
        style={{
          textShadow: isGlitching ? [
            `${glitchIntensity * 3}px 0 #ff0000`,
            `${-glitchIntensity * 2}px 0 #00ff00`,
            `${glitchIntensity * 4}px 0 #0000ff`,
            `${-glitchIntensity * 1}px 0 #ffff00`
          ].join(', ') : 'none',
          transform: isGlitching ? `
            translateX(${(Math.random() - 0.5) * glitchIntensity * 4}px)
            translateY(${(Math.random() - 0.5) * glitchIntensity * 2}px)
          ` : 'none',
          filter: isGlitching ? `
            hue-rotate(${glitchIntensity * 180}deg)
            saturate(${1 + glitchIntensity * 2})
            contrast(${1 + glitchIntensity * 0.5})
          ` : 'none',
        }}
      >
        {glitchedText}
      </div>
      
      {/* Additional glitch layers for more intense effect */}
      {isGlitching && glitchIntensity > 0.3 && (
        <>
          <div 
            className="absolute top-0 left-0 font-mono text-sm text-red-500 opacity-60"
            style={{
              transform: `translateX(${glitchIntensity * 2}px)`,
              mixBlendMode: 'screen',
            }}
          >
            {glitchedText}
          </div>
          <div 
            className="absolute top-0 left-0 font-mono text-sm text-cyan-500 opacity-60"
            style={{
              transform: `translateX(${-glitchIntensity * 2}px)`,
              mixBlendMode: 'screen',
            }}
          >
            {glitchedText}
          </div>
        </>
      )}
      
      {/* Extreme glitch overlay for high intensity */}
      {isGlitching && glitchIntensity > 0.6 && (
        <div 
          className="absolute top-0 left-0 font-mono text-sm text-white opacity-30"
          style={{
            transform: `
              translateX(${(Math.random() - 0.5) * glitchIntensity * 8}px)
              translateY(${(Math.random() - 0.5) * glitchIntensity * 4}px)
              scaleX(${1 + (Math.random() - 0.5) * glitchIntensity * 0.2})
            `,
            filter: `blur(${glitchIntensity * 1}px)`,
          }}
        >
          {generateGlitchedText(glitchIntensity * 1.5)}
        </div>
      )}
    </div>
  );
};

export default GlitchAnimation;