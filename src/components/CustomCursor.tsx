import React, { useState, useEffect, useRef } from 'react';
import { RESOURCE_ENDPOINT } from '../Constants';

const CURSORSIZE = 128

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Show cursor initially if mouse is already over the page
    setIsVisible(true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
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
      }}
    />
  );
};

export default CustomCursor;