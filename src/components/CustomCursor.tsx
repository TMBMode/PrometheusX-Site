import React, { useState, useEffect, useRef } from 'react';
import { RESOURCE_ENDPOINT } from '../Constants';

const CURSORSIZE = 64

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOverIframe, setIsOverIframe] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();

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

  // Check if mouse is over an iframe
  const checkIfOverIframe = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    const isIframe = element?.tagName === 'IFRAME' || element?.closest('iframe') !== null;
    setIsOverIframe(isIframe);
    return isIframe;
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      // Check if mouse is over iframe
      checkIfOverIframe(e.clientX, e.clientY);
      
      // Clear any existing timeout
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
      
      // Set a timeout to detect when mouse stops moving (likely over iframe)
      mouseMoveTimeoutRef.current = setTimeout(() => {
        // Double-check iframe status after mouse stops moving
        checkIfOverIframe(lastMousePositionRef.current.x, lastMousePositionRef.current.y);
      }, 100);
    };

    const handleMouseEnter = () => {
      if (imageLoaded) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsOverIframe(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Handle focus events on iframes to detect when mouse enters them
    const handleFocusIn = (e: FocusEvent) => {
      if (e.target && (e.target as Element).tagName === 'IFRAME') {
        setIsOverIframe(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (e.target && (e.target as Element).tagName === 'IFRAME') {
        setIsOverIframe(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

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
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, [imageLoaded]);

  // Apply cursor hiding only when custom cursor is visible and not over iframe
  useEffect(() => {
    if (isVisible && imageLoaded && !isOverIframe) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      document.body.style.cursor = '';
    };
  }, [isVisible, imageLoaded, isOverIframe]);

  // Hide custom cursor when over iframe
  const shouldShowCursor = isVisible && imageLoaded && !isOverIframe;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-150 ${
        shouldShowCursor ? 'opacity-100' : 'opacity-0'
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