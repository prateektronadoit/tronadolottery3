'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AlternatingImagesProps {
  width?: number;
  height?: number;
  className?: string;
}

const AlternatingImages: React.FC<AlternatingImagesProps> = ({
  width = 300,
  height = 300,
  className = '',
}) => {
  const [currentImage, setCurrentImage] = useState<'casino' | 'logo'>('casino');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Set up the interval to change images every 4 seconds
    const interval = setInterval(() => {
      // Start the fade out transition
      setIsTransitioning(true);
      
      // After the fade-out animation completes, change the image and start fade-in
      setTimeout(() => {
        setCurrentImage(currentImage === 'casino' ? 'logo' : 'casino');
        setIsTransitioning(false);
      }, 500); // This should match the CSS transition duration
    }, 4000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="relative">
      <div 
        className={`transition-opacity duration-500 ease-in-out absolute inset-0 ${isTransitioning ? 'opacity-0' : 'opacity-100'} ${className}`}
        style={{ zIndex: 10 }}
      >
        <Image
          src={currentImage === 'casino' ? '/casino.png' : '/Logo.png'}
          alt={currentImage === 'casino' ? 'Casino Image' : 'Logo Image'}
          width={width}
          height={height}
          className="object-contain w-full h-full"
          priority={true}
        />
      </div>
      
      {/* Background image (shows during transition) */}
      <div className="absolute inset-0 opacity-100" style={{ zIndex: 5 }}>
        <Image
          src={currentImage === 'casino' ? '/Logo.png' : '/casino.png'}
          alt={currentImage === 'casino' ? 'Logo Image' : 'Casino Image'}
          width={width}
          height={height}
          className="object-contain w-full h-full"
          priority={true}
        />
      </div>
    </div>
  );
};

export default AlternatingImages;
