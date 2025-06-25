export interface TeamMember {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface TeamMemberWithPosition {
  member: TeamMember;
  position: number;
  isAnimating: boolean;
  targetPosition: number;
}