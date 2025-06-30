import React, { useState, useEffect } from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import Logo from './Logo';

interface IntroPageProps {
  onEnter: () => void;
  videoLoaded: boolean;
}

const IntroPage: React.FC<IntroPageProps> = ({ onEnter, videoLoaded }) => {
  const [gameServerAvailable, setGameServerAvailable] = useState(0);

  useEffect(() => {
    const checkGameServer = async () => {
      try {
        const response = await fetch('https://game.prometheusx.space/', {
          method: 'HEAD',
          mode: 'no-cors'
        });
        setGameServerAvailable(1);
      } catch (error) {
        setGameServerAvailable(-1);
      }
    };

    checkGameServer();
  }, []);

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
        <div className="absolute portrait:top-4 landscape:top-8 portrait:left-4 landscape:left-8 pointer-events-auto">
          <Logo 
            className="hover:brightness-150 transition-all duration-300 portrait:max-w-[70vw]"
            width={280}
          />
        </div>
        
        {/* Badge */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12">
          <a 
            href="https://bolt.new/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <img 
              src="/resources/Badge/bolt.png" 
              alt="Bolt Badge"
              className="w-16 h-16 md:w-24 md:h-24 pointer-events-auto hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
        
        {/* Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="max-w-4xl portrait:space-y-10 landscape:space-y-20">
            {/* Tagline */}
            <div>
              <h1 className="text-md md:text-lg lg:text-xl font-neue-montreal text-gray-300 leading-tight uppercase">
                {'A movement of minds'.split('').map((char, index) => (
                  <span key={index} className="hidden landscape:inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="landscape:hidden">A movement of minds</span>
              </h1>
              <p className="text-5xl md:text-6xl lg:text-7xl text-white font-saol-light-italic mb-2">
                {'Flaming divinity'.split('').map((char, index) => (
                  <span key={index} className="hidden landscape:inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="landscape:hidden">Flaming divinity</span>
              </p>
              <p className="text-5xl md:text-6xl lg:text-7xl text-white font-neue-montreal">
                {'at intelligence\'s frontier'.split('').map((char, index) => (
                  <span key={index} className="hidden landscape:inline-block hover:rotate-12 transition-transform duration-400">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="landscape:hidden">at intelligence's frontier</span>
              </p>
            </div>
            
            {/* Buttons Row */}
            <div className="flex portrait:flex-col landscape:flex-row items-center justify-center gap-x-14 gap-y-8">
              {/* Play the Game Link */}
              <a
                href={(gameServerAvailable == 0) ? "about:blank" : ((gameServerAvailable == 1) ? "https://game.prometheusx.space/" : "https://discord.gg/rvHje6Y5Pr")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-[1em] py-[.8em] border-2 border-white/30 hover:border-white/80 text-white text-base md:text-lg lg:text-xl font-light transition-all duration-300 transform hover:scale-105 no-underline w-[15em]"
              >
                <div className="relative w-6 h-6">
                  <Gamepad2 className={`absolute inset-0 w-6 h-6 group-hover:-rotate-12 group-hover:-translate-x-1 transition-all duration-300 ${
                    (gameServerAvailable > -1) ? 'opacity-100' : 'opacity-0'
                  }`} />
                  <img 
                    src="/resources/Symbol/discord-white.svg" 
                    alt="Discord"
                    className={`absolute inset-0 w-6 h-6 group-hover:-rotate-12 group-hover:-translate-x-1 transition-all duration-300 ${
                      (gameServerAvailable > -1) ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>
                <span className="font-neue-montreal">Join Our Experiment</span>
              </a>
              
              {/* Read Our Research Button */}
              {/* <button
                className="group inline-flex items-center justify-center gap-3 px-[1em] py-[.8em] border-2 border-white/30 hover:border-white/80 text-white text-base md:text-lg lg:text-xl font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal min-w-[13em] max-w-[15em] flex-1"
              >
                Read the Paper
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button> */}
              
              {/* Enter Button */}
              <button
                onClick={onEnter}
                className="group inline-flex items-center justify-center gap-3 px-[1em] py-[.8em] border-2 border-white/30 hover:border-white/80 text-white text-base md:text-lg lg:text-xl font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal w-[15em]"
              >
                Explore Our Project
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