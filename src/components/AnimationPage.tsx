import React, { useRef } from 'react';
import NetworkAnimation from './NetworkAnimation';

const AnimationPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/resources/Background/bg-dark.jpg)`,
        }}
      />
      
      {/* Home Page Specific Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/resources/Background/bg-overlay-home.png)`,
        }}
      />
      
      {/* Animated Network Container */}
      <div ref={containerRef} className="absolute inset-0">
        <NetworkAnimation containerRef={containerRef} />
      </div>
    </section>
  );
};

export default AnimationPage;