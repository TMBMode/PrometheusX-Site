import React, { useState, useEffect, useRef } from 'react';
import { RESOURCE_ENDPOINT } from '../Constants';

const CURSORSIZE = 64

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Preload the cursor image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // If image fails to load, still show cursor (fallback)
      setImageLoaded(true);
    };
    img.src = `${RESOURCE_ENDPOINT}/Pointer/pointer1.png`;
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      if (imageLoaded) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Show cursor initially if mouse is already over the page and image is loaded
    if (imageLoaded) {
      setIsVisible(true);
    }

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [imageLoaded]);

  // Apply cursor hiding only when custom cursor is visible
  useEffect(() => {
    if (isVisible && imageLoaded) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      document.body.style.cursor = '';
    };
  }, [isVisible, imageLoaded]);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-150 ${
        isVisible && imageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - CURSORSIZE/2,
        top: mousePosition.y - CURSORSIZE/2,
        width: `${CURSORSIZE}px`,
        height: `${CURSORSIZE}px`,
        backgroundImage: `url(${RESOURCE_ENDPOINT}/Pointer/pointer1.png)`,
        backgroundSize: `${CURSORSIZE}px ${CURSORSIZE}px`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transform: isClicked ? 'rotate(-15deg)' : 'rotate(0deg)',
        transformOrigin: 'center',
      }}
    />
  );
};

export default CustomCursor;