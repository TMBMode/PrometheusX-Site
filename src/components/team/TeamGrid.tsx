import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { TeamMemberWithPosition } from './types';

interface TeamGridProps {
  teamMembers: TeamMemberWithPosition[];
  showDetails: boolean;
  onRotate: () => void;
}

const TeamGrid: React.FC<TeamGridProps> = ({ teamMembers, showDetails, onRotate }) => {
  // Get grid position coordinates
  const getGridPosition = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
  };

  // Helper function to render grid item with indicators
  const renderGridItem = (item: TeamMemberWithPosition, originalIndex: number, avatarSize: string, borderClass: string = 'border-2') => {
    const currentPos = getGridPosition(item.position);
    const targetPos = getGridPosition(item.targetPosition);
    
    const isAboveItem = item.position === 0 || item.position === 1;
    const isBelowItem = item.position === 5;
    const isExpanded = isAboveItem || isBelowItem;
    
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

  return (
    <>
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

      {/* Mobile/Small screens */}
      <div 
        className="block sm:hidden rounded-lg transition-colors duration-200 p-4 cursor-pointer hover:bg-white/5" 
        style={{ width: '280px', height: '240px' }}
        onClick={onRotate}
        title="Click to rotate team positions"
      >
        <div className="relative" style={{ width: '240px', height: '200px', margin: '0 auto' }}>
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
      </div>

      {/* Medium screens */}
      <div 
        className="hidden sm:block lg:hidden rounded-lg transition-colors duration-200 p-4 cursor-pointer hover:bg-white/5" 
        style={{ width: '360px', height: '280px' }}
        onClick={onRotate}
        title="Click to rotate team positions"
      >
        <div className="relative" style={{ width: '320px', height: '240px', margin: '0 auto' }}>
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
      </div>

      {/* Large screens */}
      <div 
        className="hidden lg:block rounded-lg transition-colors duration-200 p-4 cursor-pointer hover:bg-white/5" 
        style={{ width: '460px', height: '340px' }}
        onClick={onRotate}
        title="Click to rotate team positions"
      >
        <div className="relative" style={{ width: '420px', height: '300px', margin: '0 auto' }}>
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
      </div>
    </>
  );
};

export default TeamGrid;