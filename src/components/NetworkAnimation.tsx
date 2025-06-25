import React, { useState, useEffect, useRef } from 'react';

interface Rectangle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number | null; // null for empty boxes
  actualWidth: number;
  actualHeight: number;
  randomDate: string;
  isEmpty: boolean;
}

interface Connection {
  from: number;
  to: number;
}

interface NetworkAnimationProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const NetworkAnimation: React.FC<NetworkAnimationProps> = ({ containerRef }) => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [visibleRects, setVisibleRects] = useState<Set<number>>(new Set());
  const [visibleDots, setVisibleDots] = useState<Set<number>>(new Set());
  const [visibleConnections, setVisibleConnections] = useState<Set<string>>(new Set());
  const [imageData, setImageData] = useState<Array<{aspectRatio: number, width: number, height: number}>>([]);
  
  const animationTimeoutRef = useRef<NodeJS.Timeout>();
  const isAnimatingRef = useRef(false);

  // Generate random date
  const generateRandomDate = (): string => {
    const start = new Date(1989, 5, 4);
    const end = new Date(2077, 11, 31);
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                   'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    return `${randomDate.getDate().toString().padStart(2, '0')}${months[randomDate.getMonth()]}${randomDate.getFullYear()}`;
  };

  // Load single image data
  const loadImageInfo = async (index: number): Promise<{aspectRatio: number, width: number, height: number}> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          aspectRatio: img.width / img.height,
          width: img.width,
          height: img.height
        });
      };
      
      img.onerror = () => {
        resolve({
          aspectRatio: 1.0,
          width: 800,
          height: 800
        }); // Fallback
      };
      
      img.src = `/resources/RandomTiles/${index}.jpg`;
    });
  };

  // Load all image data
  const loadAllImageData = async (): Promise<Array<{aspectRatio: number, width: number, height: number}>> => {
    const imagePromises = Array.from({ length: 194 }, (_, i) => loadImageInfo(i + 1));
    
    try {
      const data = await Promise.all(imagePromises);
      return data;
    } catch (error) {
      console.warn('Error loading image data:', error);
      // Return fallback data
      return Array.from({ length: 194 }, () => ({
        aspectRatio: 1.0,
        width: 800,
        height: 800
      }));
    }
  };

  // Generate random rectangles with consistent sizing
  const generateRandomRectangles = (): Rectangle[] => {
    if (!containerRef.current) return [];

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    
    const areaWidth = containerRect.width * 0.75;
    const areaHeight = containerRect.height * 0.75;
    
    const newRectangles: Rectangle[] = [];
    const shuffledIndices = Array.from({ length: 194 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 8; i++) {
      let attempts = 0;
      let validPosition = false;
      let rect: Rectangle;
      
      while (!validPosition && attempts < 200) {
        // 0.3% chance to create an empty box, equivalent of Genshin gacha
        const isEmpty = Math.random() < 0.003;
        
        let width: number, height: number, actualWidth: number, actualHeight: number, imageIndex: number | null;
        
        if (isEmpty) {
          // Generate random dimensions for empty box
          const minSize = 60;
          const maxSize = 140;
          width = minSize + Math.random() * (maxSize - minSize);
          height = minSize + Math.random() * (maxSize - minSize);
          actualWidth = Math.round(width);
          actualHeight = Math.round(height);
          imageIndex = null;
        } else {
          // Use image data for regular boxes
          if (imageData.length === 0) {
            // Fallback if image data not loaded yet
            width = height = 90 + Math.random() * 40;
            actualWidth = actualHeight = 800;
            imageIndex = shuffledIndices[i];
          } else {
            imageIndex = shuffledIndices[i];
            const { aspectRatio, width: imgWidth, height: imgHeight } = imageData[imageIndex - 1];
            
            // Calculate consistent sizing based on area
            const targetArea = (90 + Math.random() * 40) ** 2;
            width = Math.sqrt(targetArea * aspectRatio);
            height = Math.sqrt(targetArea / aspectRatio);
            actualWidth = imgWidth;
            actualHeight = imgHeight;
          }
        }
        
        const x = centerX - areaWidth/2 + Math.random() * (areaWidth - width);
        const y = centerY - areaHeight/2 + Math.random() * (areaHeight - height);
        
        rect = {
          id: i,
          x: x + width/2,
          y: y + height/2,
          width,
          height,
          imageIndex,
          actualWidth,
          actualHeight,
          randomDate: generateRandomDate(),
          isEmpty
        };
        
        validPosition = newRectangles.every(existingRect => {
          const distance = Math.sqrt(
            Math.pow(rect.x - existingRect.x, 2) + 
            Math.pow(rect.y - existingRect.y, 2)
          );
          return distance >= 100;
        });
        
        attempts++;
      }
      
      if (validPosition) {
        newRectangles.push(rect!);
      }
    }
    
    return newRectangles;
  };

  // Generate connections between rectangles
  const generateConnections = (rects: Rectangle[]): Connection[] => {
    const newConnections: Connection[] = [];
    
    rects.forEach((rect, index) => {
      const connectionCount = Math.floor(Math.random() * 2.4) + 1;
      const availableTargets = rects
        .map((_, i) => i)
        .filter(i => i !== index);
      
      const shuffledTargets = availableTargets.sort(() => Math.random() - 0.5);
      const selectedTargets = shuffledTargets.slice(0, Math.min(connectionCount, availableTargets.length));
      
      selectedTargets.forEach(targetIndex => {
        const connectionExists = newConnections.some(conn => 
          (conn.from === index && conn.to === targetIndex) ||
          (conn.from === targetIndex && conn.to === index)
        );
        
        if (!connectionExists) {
          newConnections.push({
            from: index,
            to: targetIndex
          });
        }
      });
    });
    
    return newConnections;
  };

  // Clear all animation states
  const clearAll = (): void => {
    setRectangles([]);
    setConnections([]);
    setVisibleRects(new Set());
    setVisibleDots(new Set());
    setVisibleConnections(new Set());
  };

  // Delay utility function
  const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // Animate rectangles appearing
  const animateRectsAppearing = async (rects: Rectangle[]): Promise<void> => {
    // Add a small delay before starting to ensure initial state is rendered
    await delay(50);
    
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      setVisibleRects(prev => new Set([...prev, rect.id]));
      if (i < rects.length - 1) {
        await delay(500);
      }
    }
  };

  // Animate dots appearing
  const animateDotsAppearing = async (rects: Rectangle[]): Promise<void> => {
    await delay(500); // Small delay after rectangles
    
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      setVisibleDots(prev => new Set([...prev, rect.id]));
      if (i < rects.length - 1) {
        await delay(150);
      }
    }
  };

  // Animate connections appearing
  const animateConnectionsAppearing = async (allConnections: Connection[]): Promise<void> => {
    await delay(300); // Small delay after dots
    
    for (let i = 0; i < allConnections.length; i++) {
      const connection = allConnections[i];
      const connectionKey = `${connection.from}-${connection.to}`;
      setVisibleConnections(prev => new Set([...prev, connectionKey]));
      if (i < allConnections.length - 1) {
        await delay(200);
      }
    }
  };

  // Animate disappearing
  const animateDisappearing = async (rects: Rectangle[]): Promise<void> => {
    await delay(5000); // Display for 5 seconds
    
    // Fade out dots and lines together instantly
    setVisibleDots(new Set());
    setVisibleConnections(new Set());
    
    await delay(300); // Small delay before rectangles start disappearing
    
    // Fade out rectangles one by one (in reverse order)
    const reversedRects = [...rects].reverse();
    for (let i = 0; i < reversedRects.length; i++) {
      const rect = reversedRects[i];
      setVisibleRects(prev => {
        const newSet = new Set(prev);
        newSet.delete(rect.id);
        return newSet;
      });
      if (i < reversedRects.length - 1) {
        await delay(200);
      }
    }
    
    await delay(500); // Pause before next cycle
  };

  // Main animation cycle
  const runAnimationCycle = async (): Promise<void> => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    clearAll();

    await delay(1000); // Initial pause

    const rects = generateRandomRectangles();
    if (!rects || rects.length === 0) {
      isAnimatingRef.current = false;
      return;
    }

    const allConnections = generateConnections(rects);
    setRectangles(rects);
    setConnections(allConnections);

    try {
      // Run animation phases sequentially
      await animateRectsAppearing(rects);
      await animateDotsAppearing(rects);
      await animateConnectionsAppearing(allConnections);
      await animateDisappearing(rects);
      
      // Schedule next cycle
      isAnimatingRef.current = false;
      animationTimeoutRef.current = setTimeout(() => {
        runAnimationCycle();
      }, 0);
      
    } catch (error) {
      console.warn('Animation error:', error);
      isAnimatingRef.current = false;
    }
  };

  // Initialize image data
  useEffect(() => {
    const initializeImageData = async () => {
      const data = await loadAllImageData();
      setImageData(data);
    };

    initializeImageData();
  }, []);

  // Start animation when image data is ready or immediately if no image data needed
  useEffect(() => {
    const timer = setTimeout(() => {
      runAnimationCycle();
    }, 2000); // Initial delay

    return () => {
      clearTimeout(timer);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full z-[2]">
        {connections.map((connection, index) => {
          const fromRect = rectangles[connection.from];
          const toRect = rectangles[connection.to];
          const connectionKey = `${connection.from}-${connection.to}`;
          
          if (!fromRect || !toRect) return null;
          
          return (
            <g key={`connection-${index}`}>
              <line
                x1={fromRect.x}
                y1={fromRect.y}
                x2={toRect.x}
                y2={toRect.y}
                stroke="white"
                strokeWidth="1"
                className={`transition-all duration-500 ${
                  visibleConnections.has(connectionKey) ? 'opacity-90' : 'opacity-0'
                }`}
              />
            </g>
          );
        })}
      </svg>

      {/* Rectangles, dots, and labels */}
      {rectangles.map((rect) => (
        <div key={rect.id} className="z-[1]">
          {/* Dimensions label (above, left-aligned) - Only for non-empty boxes */}
          {!rect.isEmpty && (
            <div
              className={`absolute text-[8px] font-mono text-white/30 transition-all duration-500 ${
                visibleRects.has(rect.id) ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: rect.x - rect.width/2,
                top: rect.y - rect.height/2 - 12,
              }}
            >
              {rect.actualWidth}x{rect.actualHeight}
            </div>
          )}

          {/* Rectangle */}
          <div
            className={`absolute border-2 border-white transition-all duration-500 transform pointer-events-auto-main hover:scale-105 ${
              visibleRects.has(rect.id)
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-75'
            } ${rect.isEmpty ? 'bg-transparent' : ''}`}
            style={{
              left: rect.x - rect.width/2,
              top: rect.y - rect.height/2,
              width: rect.width,
              height: rect.height,
              ...(rect.isEmpty ? {} : {
                backgroundImage: `url(/resources/RandomTiles/${rect.imageIndex}.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              })
            }}
          />

          {/* Date label (below, right-aligned) - Only for non-empty boxes */}
          {!rect.isEmpty && (
            <div
              className={`absolute text-[8px] font-mono text-white/30 transition-all duration-500 ${
                visibleRects.has(rect.id) ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: rect.x - rect.width/2,
                top: rect.y + rect.height/2,
                width: rect.width,
                textAlign: 'right'
              }}
            >
              {rect.randomDate}
            </div>
          )}
          
          {/* Center dot */}
          <div
            className={`absolute w-2 h-2 bg-white rounded-full transition-all duration-500 transform z-[3] ${
              visibleDots.has(rect.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              left: rect.x - 4,
              top: rect.y - 4,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NetworkAnimation;