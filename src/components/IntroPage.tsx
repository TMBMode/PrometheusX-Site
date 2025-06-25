import React from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import { RESOURCE_ENDPOINT } from '../Constants';

interface IntroPageProps {
  onEnter: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onEnter }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${RESOURCE_ENDPOINT}/Background/bg-dark.jpg)`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-gray-900/60" />
      
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
        <div className="absolute top-10 left-10">
          <img 
            src={`${RESOURCE_ENDPOINT}/Logo/logo-prometheusx.svg`}
            alt="PrometheusX Logo" 
            className="h-16 w-auto hover:brightness-150 transition-all duration-300"
          />
        </div>
        
        {/* Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="max-w-4xl space-y-16">
            {/* Tagline */}
            <div>
              <h1 className="text-md lg:text-lg font-neue-montreal text-gray-300 leading-tight uppercase">
                A movement of minds
              </h1>
              <p className="text-4xl md:text-5xl lg:text-6xl text-white font-saol-light-italic mb-2">
                Flaming divinity
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl text-white font-neue-montreal">
                at intelligence's frontier
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