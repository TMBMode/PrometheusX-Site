import React from 'react';
import { TeamMember } from './types';

interface TeamMemberDetailsProps {
  member: TeamMember;
  showDetails: boolean;
  alignment: 'left' | 'right' | 'center';
}

const TeamMemberDetails: React.FC<TeamMemberDetailsProps> = ({ member, showDetails, alignment }) => {
  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
        return 'text-center';
      default:
        return 'text-left';
    }
  };

  return (
    <div 
      className={`transition-all duration-100 ${
        showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className={getAlignmentClasses()}>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-neue-montreal text-white truncate">
          {member.name}
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-saol-light leading-relaxed truncate">
          {member.description}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberDetails;