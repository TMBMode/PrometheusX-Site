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
      className={`transition-all duration-300 ${className}`}
    >
      {/* Main Logo Text */}
      <text
        x="10"
        y="35"
        fontSize="24"
        fontWeight="600"
        fill="white"
        fontFamily="Arial, sans-serif"
        letterSpacing="1px"
      >
        PrometheusX
      </text>
      
      {/* Flame/Fire Icon */}
      <g transform="translate(170, 8)">
        <path
          d="M15 48C15 48 5 38 5 28C5 18 15 8 15 8C15 8 25 18 25 28C25 38 15 48 15 48Z"
          fill="url(#fireGradient)"
          opacity="0.9"
        />
        <path
          d="M15 40C15 40 10 34 10 28C10 22 15 16 15 16C15 16 20 22 20 28C20 34 15 40 15 40Z"
          fill="url(#innerFire)"
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
        <linearGradient id="innerFire" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PrometheusXLogo;