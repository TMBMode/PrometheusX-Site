import React, { useState, useEffect } from 'react';
import { RotateCw, ChevronUp, ChevronDown } from 'lucide-react';
import { RESOURCE_ENDPOINT } from '../Constants';

interface TeamMember {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface TeamMemberWithPosition {
  member: TeamMember;
  position: number;
  isAnimating: boolean;
  targetPosition: number;
}

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithPosition[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [buttonRotation, setButtonRotation] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Initial team data
  const initialTeamData: TeamMember[] = [
    {
      id: 1,
      name: "玉藻前",
      description: "玉藻前玉藻前玉藻前玉藻前玉藻前",
      imageUrl: `${RESOURCE_ENDPOINT}/Avatar/zao.jpg`
    },
    {
      id: 2,
      name: "UU",
      description: "UUUUUUUUUU",
      imageUrl: `${RESOURCE_ENDPOINT}/Avatar/you.jpg`
    },
    {
      id: 3,
      name: "Tab",
      description: "TabTabTabTabTab",
      imageUrl: `${RESOURCE_ENDPOINT}/Avatar/tab.jpg`
    },
    {
      id: 4,
      name: "Treap",
      description: "TreapTreapTreapTreapTreap",
      imageUrl: `${RESOURCE_ENDPOINT}/Avatar/treap.jpg`
    },
    {
      id: 5,
      name: "酸黄瓜",
      description: "酸黄瓜酸黄瓜酸黄瓜酸黄瓜酸黄瓜",
      imageUrl: `${RESOURCE_ENDPOINT}/Avatar/gua.jpg`
    },
    {
      id: 6,
      name: "+1",
      description: "+1+1+1+1+1",
      imageUrl: `${RESOURCE_ENDPOINT}/Avatar/jiayi.jpg`
    }
  ];

  // Shuffle array function
  const shuffleArray = (array: TeamMember[]): TeamMember[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get grid position coordinates
  const getGridPosition = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
  };

  // Calculate TRUE clockwise rotation mapping
  const getClockwiseMapping = (): number[] => {
    // Grid layout:     Clockwise rotation:
    // 0 1 2           3 0 1
    // 3 4 5    -->    4 5 2
    // 
    // So position mapping is:
    // 0 -> 1, 1 -> 2, 2 -> 5, 3 -> 0, 4 -> 3, 5 -> 4
    return [1, 2, 5, 0, 3, 4];
  };

  // Handle rotation with true position animation
  const handleRotate = async () => {
    if (isRotating) return;
    
    setIsRotating(true);
    
    // Start button 360° rotation
    setButtonRotation(prev => prev + 360);
    
    // Hide details quickly
    setShowDetails(false);
    
    // Wait for details to fade out (very short)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Set up animation targets
    const rotationMapping = getClockwiseMapping();
    setTeamMembers(prev => prev.map((item, index) => ({
      ...item,
      isAnimating: true,
      targetPosition: rotationMapping[index]
    })));
    
    // Wait for animation to complete (much faster)
    await new Promise(resolve => setTimeout(resolve, 250));
    
    // Update actual positions after animation
    setTeamMembers(prev => {
      const newArray = new Array(6);
      prev.forEach((item, index) => {
        newArray[rotationMapping[index]] = {
          ...item,
          position: rotationMapping[index],
          isAnimating: false,
          targetPosition: rotationMapping[index]
        };
      });
      return newArray;
    });
    
    // Show details again quickly
    setShowDetails(true);
    setIsRotating(false);
  };

  // Initialize with shuffled team members
  useEffect(() => {
    const shuffled = shuffleArray(initialTeamData);
    setTeamMembers(shuffled.map((member, index) => ({
      member,
      position: index,
      isAnimating: false,
      targetPosition: index
    })));
  }, []);

  if (teamMembers.length === 0) return null;

  const aboveMember = isLandscape ? teamMembers[0]?.member : teamMembers[1]?.member;
  const belowMember = teamMembers[5]?.member;

  // Helper function to render grid item with indicators
  const renderGridItem = (item: TeamMemberWithPosition, originalIndex: number, avatarSize: string, borderClass: string = 'border-2') => {
    const currentPos = getGridPosition(item.position);
    const targetPos = getGridPosition(item.targetPosition);
    
    const isAboveItem = isLandscape ? (item.position === 0) : (item.position === 1);
    const isBelowItem = item.position === 5;
    const isExpanded = isAboveItem || (isBelowItem && isLandscape);
    
    return (
      <div 
        key={item.member.id}
        className={`absolute transition-all duration-400 ease-in-out ${
          item.isAnimating ? 'z-10' : 'z-0'
        }`}
      >
        <div className="relative">
          {/* Expansion Indicator Outline */}
          {isExpanded && (
            <div 
              className={`absolute inset-0 rounded-full border-2 border-white transition-all duration-100 ${
                showDetails ? 'opacity-60 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                width: avatarSize === 'w-16 h-16' ? '68px' : avatarSize === 'w-20 h-20' ? '84px' : '100px',
                height: avatarSize === 'w-16 h-16' ? '68px' : avatarSize === 'w-20 h-20' ? '84px' : '100px',
                left: avatarSize === 'w-16 h-16' ? '-2px' : avatarSize === 'w-20 h-20' ? '-2px' : '-2px',
                top: avatarSize === 'w-16 h-16' ? '-2px' : avatarSize === 'w-20 h-20' ? '-2px' : '-2px',
              }}
            />
          )}
          
          {/* Avatar - No zoom effect */}
          <div className={`${avatarSize} rounded-full overflow-hidden ${borderClass} border-gray-700/50 transition-all duration-300`}>
            <img 
              src={item.member.imageUrl} 
              alt={item.member.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Chevron Indicators with Custom Bounce Animation */}
          {isExpanded && (
            <div 
              className={`absolute transition-all duration-300 ${
                showDetails ? 'opacity-100' : 'opacity-0'
              } ${isAboveItem ? 'animate-bounce-up' : 'animate-bounce-down'}`}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                [isAboveItem ? 'top' : 'bottom']: avatarSize === 'w-16 h-16' ? '-24px' : avatarSize === 'w-20 h-20' ? '-28px' : '-32px',
              }}
            >
              {isAboveItem ? (
                <ChevronUp className={`text-white/60 ${
                  avatarSize === 'w-16 h-16' ? 'w-4 h-4' : avatarSize === 'w-20 h-20' ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
              ) : (
                <ChevronDown className={`text-white/60 ${
                  avatarSize === 'w-16 h-16' ? 'w-4 h-4' : avatarSize === 'w-20 h-20' ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render grid with responsive sizing
  const renderGrid = () => {
    return (
      <>
        {/* Mobile/Small screens */}
        <div className="block sm:hidden" style={{ width: '240px', height: '200px' }}>
          {teamMembers.map((item, originalIndex) => {
            const currentPos = getGridPosition(item.position);
            const targetPos = getGridPosition(item.targetPosition);
            
            const currentX = currentPos.col * 90;
            const currentY = currentPos.row * 90;
            const targetX = targetPos.col * 90;
            const targetY = targetPos.row * 90;
            
            return (
              <div 
                key={item.member.id}
                className={`absolute transition-all duration-400 ease-in-out ${
                  item.isAnimating ? 'z-10' : 'z-0'
                }`}
                style={{
                  left: `${item.isAnimating ? targetX : currentX}px`,
                  top: `${item.isAnimating ? targetY : currentY}px`,
                }}
              >
                {renderGridItem(item, originalIndex, 'w-16 h-16')}
              </div>
            );
          })}
        </div>

        {/* Medium screens */}
        <div className="hidden sm:block lg:hidden" style={{ width: '320px', height: '240px' }}>
          {teamMembers.map((item, originalIndex) => {
            const currentPos = getGridPosition(item.position);
            const targetPos = getGridPosition(item.targetPosition);
            
            const currentX = currentPos.col * 120;
            const currentY = currentPos.row * 110;
            const targetX = targetPos.col * 120;
            const targetY = targetPos.row * 110;
            
            return (
              <div 
                key={item.member.id}
                className={`absolute transition-all duration-400 ease-in-out ${
                  item.isAnimating ? 'z-10' : 'z-0'
                }`}
                style={{
                  left: `${item.isAnimating ? targetX : currentX}px`,
                  top: `${item.isAnimating ? targetY : currentY}px`,
                }}
              >
                {renderGridItem(item, originalIndex, 'w-20 h-20')}
              </div>
            );
          })}
        </div>

        {/* Large screens */}
        <div className="hidden lg:block" style={{ width: '420px', height: '300px' }}>
          {teamMembers.map((item, originalIndex) => {
            const currentPos = getGridPosition(item.position);
            const targetPos = getGridPosition(item.targetPosition);
            
            const currentX = currentPos.col * 160;
            const currentY = currentPos.row * 140;
            const targetX = targetPos.col * 160;
            const targetY = targetPos.row * 140;
            
            return (
              <div 
                key={item.member.id}
                className={`absolute transition-all duration-400 ease-in-out ${
                  item.isAnimating ? 'z-10' : 'z-0'
                }`}
                style={{
                  left: `${item.isAnimating ? targetX : currentX}px`,
                  top: `${item.isAnimating ? targetY : currentY}px`,
                }}
              >
                {renderGridItem(item, originalIndex, 'w-24 h-24', 'border-3')}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-black to-gray-900 flex flex-col justify-center overflow-hidden">
      {/* Custom Animations */}
      <style>{`
        @keyframes bounce-up {
          0%, 100% {
            translate: 0 -25%;
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            translate: 0 10%;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        @keyframes bounce-down {
          0%, 100% {
            translate: 0 25%;
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            translate: 0 -10%;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        .animate-bounce-up {
          animation: bounce-up 1.5s infinite;
        }

        .animate-bounce-down {
          animation: bounce-down 1.5s infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white">
            The Minds Behind PrometheusX
          </h2>
        </div>

        {/* Landscape Layout (Horizontal Split) */}
        {isLandscape && (
          <div className="flex items-center justify-between">
            {/* Left Section: Grid + Descriptions */}
            <div className="flex-1 flex flex-col items-center max-w-3xl">
              {/* First Member Details (Above Grid) */}
              {aboveMember && (
                <div className="mb-[11%] w-full max-w-lg">
                  <div 
                    className={`transition-all duration-100 ${
                      showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
                  >
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-neue-montreal text-white truncate">{aboveMember.name}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-saol-light leading-relaxed truncate">{aboveMember.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Grid */}
              <div className="relative">
                {renderGrid()}
              </div>

              {/* Last Member Details (Below Grid) */}
              {belowMember && (
                <div className="w-full max-w-lg">
                  <div 
                    className={`transition-all duration-100 ${
                      showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="text-right">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-neue-montreal text-white truncate">{belowMember.name}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-saol-light leading-relaxed truncate">{belowMember.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Separator */}
            <div className="h-32 md:h-40 w-px bg-white/20 ml-4 md:ml-6 mr-10 md:mr-16"></div>

            {/* Right Section: Rotate Button */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <button
                onClick={handleRotate}
                disabled={isRotating}
                className={`group p-3 md:p-4 lg:p-5 rounded-full border-2 border-white/30 hover:border-white/60 text-white transition-all duration-200 transform hover:scale-110 ${
                  isRotating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
                }`}
                title="Rotate team positions clockwise"
              >
                <RotateCw 
                  className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `rotate(${buttonRotation}deg)`
                  }}
                />
              </button>
              <span className="text-xs md:text-sm text-white/40 font-mono tracking-wider">ROTATE</span>
            </div>
          </div>
        )}

        {/* Portrait Layout (Vertical Split) - All Centered */}
        {!isLandscape && (
          <div className="flex flex-col items-center space-y-8">
            {/* Top Section: First Member Details (Centered) */}
            {aboveMember && (
              <div className="text-center max-w-sm">
                <div 
                  className={`transition-all duration-100 ${
                    showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <h3 className="text-lg font-neue-montreal text-white">{aboveMember.name}</h3>
                  <p className="text-gray-300 text-sm font-saol-light leading-relaxed">{aboveMember.description}</p>
                </div>
              </div>
            )}

            {/* Middle Section: Team Grid (Centered) */}
            <div className="relative">
              {renderGrid()}
            </div>

            {/* Bottom Section: Rotate Button (Centered) */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleRotate}
                disabled={isRotating}
                className={`group p-3 rounded-full border-2 border-white/30 hover:border-white/60 text-white transition-all duration-200 transform hover:scale-110 ${
                  isRotating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
                }`}
                title="Rotate team positions clockwise"
              >
                <RotateCw 
                  className="w-6 h-6 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `rotate(${buttonRotation}deg)`
                  }}
                />
              </button>
              <span className="text-xs text-white/40 font-mono tracking-wider">ROTATE</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamPage;