import React from 'react';

interface PrometheusXLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const PrometheusXLogo: React.FC<PrometheusXLogoProps> = ({ 
  className = "", 
  width = 200, 
  height = 64 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main Logo Text */}
      <text
        x="10"
        y="35"
        fontSize="24"
        fontWeight="600"
        fill="white"
        fontFamily="serif"
      >
        PrometheusX
      </text>
      
      {/* Flame/Fire Icon */}
      <g transform="translate(170, 8)">
        <path
          d="M15 45C15 45 5 35 5 25C5 15 15 5 15 5C15 5 25 15 25 25C25 35 15 45 15 45Z"
          fill="url(#fireGradient)"
          opacity="0.9"
        />
        <path
          d="M15 40C15 40 8 32 8 24C8 16 15 8 15 8C15 8 22 16 22 24C22 32 15 40 15 40Z"
          fill="url(#fireGradient2)"
          opacity="0.7"
        />
        <path
          d="M15 35C15 35 11 29 11 23C11 17 15 11 15 11C15 11 19 17 19 23C19 29 15 35 15 35Z"
          fill="url(#fireGradient3)"
          opacity="0.8"
        />
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff4500" />
          <stop offset="50%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ffa500" />
        </linearGradient>
        <linearGradient id="fireGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff6b00" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ffb347" />
        </linearGradient>
        <linearGradient id="fireGradient3" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="50%" stopColor="#ffa500" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PrometheusXLogo;