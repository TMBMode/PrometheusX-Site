import React from 'react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (sectionIndex: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate, isOpen, onToggle }) => {
  const sections = [
    { name: 'Home', index: 0 },
    { name: 'Trailer', index: 1 },
    { name: 'Project', index: 2 },
    { name: 'Research', index: 3 },
    { name: 'Team', index: 4 },
    { name: 'Community', index: 5 }
  ];

  // Calculate underline width based on current section progress
  const lastSectionIndex = sections.length - 1;
  const underlineWidth = `${((currentSection / lastSectionIndex) * 100)}%`;

  return (
    <>
      {/* Navigation Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-6 lg:bottom-6 lg:right-10 z-50 group hidden md:block"
      >
        <div className="relative">
          <span className="font-cinzel text-white/60 text-lg md:text-xl lg:text-2xl tracking-wide group-hover:text-white transition-all duration-300">
            Menu
          </span>
          <div 
            className="h-0.5 bg-white/60 transition-all duration-500 ease-out group-hover:bg-white"
            style={{ width: underlineWidth }}
          />
        </div>
      </button>

      {/* Full Screen Navigation Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#000] to-[#111] z-30 hidden md:block">
        {/* Left side (70%) - can be used for additional content or remain empty */}
        <div className="absolute left-0 top-0 w-[70%] h-full">
          {/* Optional: Add content here like a logo, background pattern, etc. */}
        </div>

        {/* Right side (30%) - Navigation Menu */}
        <div className="absolute right-0 top-0 w-[30%] h-full">
          <div className="flex flex-col h-full px-8 pt-16">
            <div className="space-y-8">
              {/* Logo or Title with responsive constraint */}
              <div className="mb-16">
                <h2 className="font-cinzel text-white text-2xl md:text-3xl lg:text-4xl max-w-[80%] truncate">
                  PrometheusX
                </h2>
              </div>

              {/* Navigation Items */}
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <button
                    key={section.index}
                    onClick={() => onNavigate(section.index)}
                    className="group relative w-full text-left"
                  >
                    <div className="flex-1">
                      <span className={`font-cinzel transition-all duration-300 block ${
                        currentSection === section.index
                          ? 'text-white text-base md:text-lg lg:text-xl tracking-wider'
                          : 'text-white/60 text-base md:text-lg lg:text-xl tracking-wide group-hover:text-white/80 group-hover:tracking-wider'
                      }`}>
                        {section.name}
                      </span>
                      
                      {/* Underline indicator */}
                      <div className={`h-0.5 bg-white transition-all duration-300 ${
                        currentSection === section.index
                          ? 'w-[90%] opacity-100'
                          : 'w-0 opacity-0 group-hover:w-36 group-hover:opacity-50'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Additional menu items can go here */}
              <div className="pt-8 border-t border-white/10">
                <a
                  href="/research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full text-left block"
                >
                  <span className="font-cinzel text-white/60 text-base md:text-lg lg:text-xl tracking-wide group-hover:text-white/80 group-hover:tracking-wider transition-all duration-300">
                    Research Paper
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;