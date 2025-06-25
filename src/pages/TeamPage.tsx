import React, { useState, useEffect } from 'react';
import TeamGrid from '../components/team/TeamGrid';
import TeamMemberDetails from '../components/team/TeamMemberDetails';
import RotateButton from '../components/team/RotateButton';
import { TeamMember, TeamMemberWithPosition } from '../components/team/types';
import { RESOURCE_ENDPOINT } from '../Constants';

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

  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-black to-gray-900 flex flex-col justify-center overflow-hidden">
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
                  <TeamMemberDetails 
                    member={aboveMember} 
                    showDetails={showDetails} 
                    alignment="left"
                  />
                </div>
              )}

              {/* Team Grid */}
              <div className="relative">
                <TeamGrid 
                  teamMembers={teamMembers}
                  showDetails={showDetails}
                  onRotate={handleRotate}
                />
              </div>

              {/* Last Member Details (Below Grid) */}
              {belowMember && (
                <div className="w-full max-w-lg">
                  <TeamMemberDetails 
                    member={belowMember} 
                    showDetails={showDetails} 
                    alignment="right"
                  />
                </div>
              )}
            </div>

            {/* Vertical Separator */}
            <div className="h-32 md:h-40 w-px bg-white/20 ml-4 md:ml-6 mr-10 md:mr-16"></div>

            {/* Right Section: Rotate Button */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <RotateButton 
                onRotate={handleRotate}
                isRotating={isRotating}
                buttonRotation={buttonRotation}
              />
            </div>
          </div>
        )}

        {/* Portrait Layout (Vertical Split) - All Centered */}
        {!isLandscape && (
          <div className="flex flex-col items-center space-y-8">
            {/* Top Section: First Member Details (Centered) */}
            {aboveMember && (
              <div className="text-center max-w-sm">
                <TeamMemberDetails 
                  member={aboveMember} 
                  showDetails={showDetails} 
                  alignment="center"
                />
              </div>
            )}

            {/* Middle Section: Team Grid (Centered) */}
            <div className="relative">
              <TeamGrid 
                teamMembers={teamMembers}
                showDetails={showDetails}
                onRotate={handleRotate}
              />
            </div>

            {/* Bottom Section: Rotate Button (Centered) */}
            <div className="flex flex-col items-center gap-2">
              <RotateButton 
                onRotate={handleRotate}
                isRotating={isRotating}
                buttonRotation={buttonRotation}
                size="small"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamPage;