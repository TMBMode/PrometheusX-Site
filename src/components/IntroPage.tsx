import React from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import Logo from './Logo';

interface IntroPageProps {
  onEnter: () => void;
  videoLoaded: boolean;
}

const IntroPage: React.FC<IntroPageProps> = ({ onEnter, videoLoaded }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(/resources/Background/bg-dark.jpg)`,
        }}
      />
      
      {/* Video Background */}
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        autoPlay
      >
        <source src="/resources/Background/bg-dark-animated.mp4" type="video/mp4" />
      </video>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo */}
        <div className="absolute top-8 left-8 pointer-events-auto">
          <Logo 
            className="hover:brightness-150 transition-all duration-300"
            width={280}
          />
        </div>
        
        {/* Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="max-w-4xl space-y-20">
            {/* Tagline */}
            <div>
              <h1 className="text-md md:text-lg lg:text-xl font-neue-montreal text-gray-300 leading-tight uppercase">
                {'A movement of minds'.split('').map((char, index) => (
                  <span key={index} className="inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
              <p className="text-5xl md:text-6xl lg:text-7xl text-white font-saol-light-italic mb-2">
                {'Flaming divinity'.split('').map((char, index) => (
                  <span key={index} className="inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
              <p className="text-5xl md:text-6xl lg:text-7xl text-white font-neue-montreal">
                {'at intelligence\'s frontier'.split('').map((char, index) => (
                  <span key={index} className="inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
            </div>
            
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-14">
              {/* Play the Game Link */}
              <a
                href="about:blank"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-10 py-4 border-2 border-white/30 hover:border-white/80 text-white text-xl font-medium transition-all duration-300 transform hover:scale-105 no-underline"
              >
                <Gamepad2 className="w-6 h-6 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-saol-light">Join the Experiment</span>
              </a>
              
              {/* Enter Button */}
              <button
                onClick={onEnter}
                className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-white/30 hover:border-white/80 text-white text-xl font-medium transition-all duration-300 transform hover:scale-105 font-saol-light"
              >
                View Our Work
                <ArrowRight className="w-5 h-5s group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroPage;