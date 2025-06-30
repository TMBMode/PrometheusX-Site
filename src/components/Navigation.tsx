import React from 'react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (sectionIndex: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const sections = [
    { name: 'Home', index: 0 },
    { name: 'Trailer', index: 1 },
    { name: 'Project', index: 2 },
    { name: 'Research', index: 3 },
    { name: 'Team', index: 4 }
  ];

  // Inline styles for animations
  const navSlideInStyle = {
    animation: 'navSlideIn 0.6s ease-out'
  };

  const navItemHoverStyle = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const navGlowStyle = {
    animation: 'navGlow 2s ease-in-out infinite'
  };

  return (
    <>
      <style>
        {`
          @keyframes navGlow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.02);
            }
          }

          @keyframes navSlideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
      
      <nav className="fixed bottom-6 right-6 portrait:bottom-0 portrait:right-0 scale-75 md:scale-85 lg:scale-100 z-50 pointer-events-auto-main" style={navSlideInStyle}>
        <div className="flex flex-col portrait:border portrait:border-white/20 portrait:bg-black/20 portrait:backdrop-blur-md portrait:rounded-lg portrait:p-2">
          {sections.map((section, index) => (
            <button
              key={section.index}
              onClick={() => onNavigate(section.index)}
              className="group relative nav-item-hover"
              style={{
                ...navItemHoverStyle,
                animationDelay: `${index * 0.1}s`,
                width: '120px',
                height: '30px'
              }}
            >
              {/* Text content */}
              <div className="relative px-1 py-1 h-full flex items-center">
                <span 
                  className={`font-cinzel transition-all duration-500 ease-out ${
                    currentSection === section.index
                      ? 'text-white text-lg tracking-wider'
                      : 'text-white/40 text-base tracking-wide group-hover:text-white/70 group-hover:tracking-wider'
                  }`}
                >
                  {section.name}
                </span>
                
                {/* Underline indicator */}
                <div 
                  className={`absolute bottom-1 left-1 h-0.5 bg-white transition-all duration-500 ease-out ${
                    currentSection === section.index
                      ? `opacity-100 ${section.name.length > 7 ? 'w-28' :(section.name.length > 4 ? 'w-24' : 'w-16')}`
                      : 'opacity-0 w-0 group-hover:opacity-50 group-hover:w-8'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;