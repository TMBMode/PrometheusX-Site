import React from 'react';
import { RotateCw } from 'lucide-react';

interface RotateButtonProps {
  onRotate: () => void;
  isRotating: boolean;
  buttonRotation: number;
  size?: 'small' | 'medium' | 'large';
}

const RotateButton: React.FC<RotateButtonProps> = ({ 
  onRotate, 
  isRotating, 
  buttonRotation, 
  size = 'medium' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          button: 'p-3',
          icon: 'w-6 h-6',
          text: 'text-xs'
        };
      case 'large':
        return {
          button: 'p-3 md:p-4 lg:p-5',
          icon: 'w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8',
          text: 'text-xs md:text-sm'
        };
      default: // medium
        return {
          button: 'p-4',
          icon: 'w-7 h-7',
          text: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <>
      <button
        onClick={onRotate}
        disabled={isRotating}
        className={`group ${sizeClasses.button} rounded-full border-2 border-white/30 hover:border-white/60 text-white transition-all duration-200 transform hover:scale-110 ${
          isRotating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
        }`}
        title="Rotate team positions clockwise"
      >
        <RotateCw 
          className={`${sizeClasses.icon} transition-transform duration-300 ease-in-out`}
          style={{
            transform: `rotate(${buttonRotation}deg)`
          }}
        />
      </button>
      <span className={`${sizeClasses.text} text-white/40 font-mono tracking-wider`}>
        ROTATE
      </span>
    </>
  );
};

export default RotateButton;