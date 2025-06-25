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
      viewBox="0 0 512 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
    >
      {/* PrometheusX Logo - Embedded SVG */}
      <g>
        {/* Main text "PrometheusX" */}
        <text
          x="20"
          y="100"
          fontSize="48"
          fontWeight="300"
          fill="white"
          fontFamily="serif"
          letterSpacing="2px"
        >
          Prometheus
        </text>
        <text
          x="340"
          y="100"
          fontSize="48"
          fontWeight="600"
          fill="white"
          fontFamily="serif"
          letterSpacing="2px"
        >
          X
        </text>
        
        {/* Flame/Fire element */}
        <g transform="translate(450, 20)">
          {/* Outer flame */}
          <path
            d="M30 120C30 120 10 95 10 70C10 45 20 20 30 20C40 20 50 45 50 70C50 95 30 120 30 120Z"
            fill="url(#fireGradient1)"
            opacity="0.9"
          />
          {/* Middle flame */}
          <path
            d="M30 100C30 100 15 80 15 65C15 50 25 35 30 35C35 35 45 50 45 65C45 80 30 100 30 100Z"
            fill="url(#fireGradient2)"
            opacity="0.8"
          />
          {/* Inner flame */}
          <path
            d="M30 85C30 85 20 70 20 60C20 50 25 45 30 45C35 45 40 50 40 60C40 70 30 85 30 85Z"
            fill="url(#fireGradient3)"
            opacity="0.9"
          />
        </g>
        
        {/* Subtle glow effect around text */}
        <text
          x="20"
          y="100"
          fontSize="48"
          fontWeight="300"
          fill="url(#textGlow)"
          fontFamily="serif"
          letterSpacing="2px"
          opacity="0.3"
          filter="blur(2px)"
        >
          Prometheus
        </text>
        <text
          x="340"
          y="100"
          fontSize="48"
          fontWeight="600"
          fill="url(#textGlow)"
          fontFamily="serif"
          letterSpacing="2px"
          opacity="0.3"
          filter="blur(2px)"
        >
          X
        </text>
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        {/* Fire gradients */}
        <linearGradient id="fireGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff2500" />
          <stop offset="30%" stopColor="#ff4500" />
          <stop offset="60%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ffa500" />
        </linearGradient>
        <linearGradient id="fireGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff4500" />
          <stop offset="50%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ffaa00" />
        </linearGradient>
        <linearGradient id="fireGradient3" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff6b00" />
          <stop offset="50%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#ffff88" />
        </linearGradient>
        {/* Text glow */}
        <linearGradient id="textGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PrometheusXLogo;