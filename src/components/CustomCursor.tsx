import React, { useState, useEffect, useRef } from 'react';

const CURSORSIZE = 180

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOverIframe, setIsOverIframe] = useState(false);
  const [hasCursor, setHasCursor] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();

  // Detect if device has a cursor (mouse/trackpad)
  useEffect(() => {
    const detectCursorCapability = () => {
      // Check for pointer capability
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      
      // Check if device is primarily touch-based
      const isTouchDevice = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0 || 
                           window.matchMedia('(hover: none)').matches;
      
      // Only show cursor if device has fine pointer control and isn't primarily touch-based
      const shouldShowCursor = hasPointer && !isTouchDevice;
      
      setHasCursor(shouldShowCursor);
    };

    detectCursorCapability();

    // Listen for changes in pointer capability (e.g., connecting/disconnecting mouse)
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');
    
    const handleMediaChange = () => {
      detectCursorCapability();
    };

    pointerQuery.addEventListener('change', handleMediaChange);
    hoverQuery.addEventListener('change', handleMediaChange);

    return () => {
      pointerQuery.removeEventListener('change', handleMediaChange);
      hoverQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Preload the cursor image only if device has cursor capability
  useEffect(() => {
    if (!hasCursor) {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // If image fails to load, still show cursor (fallback)
      setImageLoaded(true);
    };
    img.src = '/resources/Pointer/pointer1.png';
  }, [hasCursor]);

  // Check if mouse is over an iframe
  const checkIfOverIframe = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    const isIframe = element?.tagName === 'IFRAME' || element?.closest('iframe') !== null;
    setIsOverIframe(isIframe);
    return isIframe;
  };

  useEffect(() => {
    // Don't add mouse event listeners if device doesn't have cursor capability
    if (!hasCursor) {
      return;
    }

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
  }, [imageLoaded, hasCursor]);

  // Hide default cursor when we have cursor capability and image is loaded
  useEffect(() => {
    if (hasCursor && imageLoaded) {
      // Always hide default cursor when custom cursor is available
      const style = document.createElement('style');
      style.id = 'custom-cursor-hide';
      style.textContent = '* { cursor: none !important; }';
      document.head.appendChild(style);
    } else {
      // Remove the cursor hiding style
      const existingStyle = document.getElementById('custom-cursor-hide');
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    return () => {
      // Cleanup on unmount
      const existingStyle = document.getElementById('custom-cursor-hide');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [hasCursor, imageLoaded]);

  // Don't render anything if device doesn't have cursor capability
  if (!hasCursor) {
    return null;
  }

  // Hide custom cursor when over iframe, but keep default cursor hidden
  const shouldShowCursor = isVisible && imageLoaded && !isOverIframe;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-150 ${
        shouldShowCursor ? 'opacity-90' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - CURSORSIZE/2,
        top: mousePosition.y - CURSORSIZE/2,
        width: `${CURSORSIZE}px`,
        height: `${CURSORSIZE}px`,
        backgroundImage: `url(/resources/Pointer/pointer1.png)`,
        backgroundSize: `${CURSORSIZE}px ${CURSORSIZE}px`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transform: isClicked ? 'rotate(0deg)' : 'rotate(20deg)',
        transformOrigin: 'center',
      }}
    />
  );
};

export default CustomCursor;