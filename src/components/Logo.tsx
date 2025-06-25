import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", width = 369, height = 85 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="18 53 369 85" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap');`}
      </style>
      <defs>
        <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007A87" />
          <stop offset="100%" stopColor="#66B2B2" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <text 
        x="200" 
        y="100"
        fontFamily="Cinzel, serif"
        fontSize="48"
        fontWeight="600"
        textAnchor="middle"
        fill="url(#tealGradient)"
        filter="url(#glow)"
      >
        PrometheusX
      </text>

      <text 
        x="213" 
        y="125"
        fontFamily="Cinzel, serif"
        fontSize="16"
        fontStyle="italic"
        textAnchor="end"
        fill="rgba(0, 122, 135, 0.7)"
      >
        Ignis Divinus Furatur
      </text>
    </svg>
  );
};

export default Logo;