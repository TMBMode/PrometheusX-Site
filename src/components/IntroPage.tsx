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
      
      {/* RGB Border Animation Styles */}
      <style>{`
        @keyframes rgb-border {
          0% {
            border-color: #ff0000cc;
          }
          16.66% {
            border-color: #ff8000cc;
          }
          33.33% {
            border-color: #ffff00cc;
          }
          50% {
            border-color: #00ff00cc;
          }
          66.66% {
            border-color: #0080ffcc;
          }
          83.33% {
            border-color: #8000ffcc;
          }
          100% {
            border-color: #ff0000cc;
          }
        }

        .rgb-border {
          animation: rgb-border 1.5s linear infinite;
        }
      `}</style>
      
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
          <div className="max-w-4xl space-y-16">
            {/* Tagline */}
            <div>
              <h1 className="text-md lg:text-lg font-neue-montreal text-gray-300 leading-tight uppercase">
                {'A movement of minds'.split('').map((char, index) => (
                  <span key={index} className="inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
              <p className="text-4xl md:text-5xl lg:text-6xl text-white font-saol-light-italic mb-2">
                {'Flaming divinity'.split('').map((char, index) => (
                  <span key={index} className="inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl text-white font-neue-montreal">
                {'at intelligence\'s frontier'.split('').map((char, index) => (
                  <span key={index} className="inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
            </div>
            
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              {/* Play the Game Link - Larger */}
              <a
                href="about:blank"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-10 py-4 border-2 rgb-border text-white text-xl font-medium transition-all duration-300 transform hover:scale-105 no-underline"
              >
                <Gamepad2 className="w-6 h-6 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-saol-light">Play the Game</span>
              </a>
              
              {/* Enter Button */}
              <button
                onClick={onEnter}
                className="group inline-flex items-center gap-3 px-8 py-3 border-2 border-white/30 hover:border-white/80 text-white text-lg font-medium transition-all duration-300 transform hover:scale-105 font-saol-light"
              >
                About Our Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroPage;