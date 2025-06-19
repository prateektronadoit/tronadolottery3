'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function BuildingBackground() {
  const rollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create floating animation
    const animateRoll = () => {
      if (!rollRef.current) return;
      
      const currentY = parseFloat(rollRef.current.style.getPropertyValue('--roll-y') || '0');
      const newY = Math.sin(Date.now() / 1000) * 20; // 20px up and down movement
      
      rollRef.current.style.setProperty('--roll-y', `${newY}px`);
      requestAnimationFrame(animateRoll);
    };
    
    const animationFrame = requestAnimationFrame(animateRoll);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static background layer with darker gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ibg.png"
          alt="Luxury building background"
          fill
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center',
            filter: 'brightness(0.7) contrast(1.2)'
          }}
          priority
          quality={100}
        />
      </div>
      
      {/* Gradient overlay to match the design */}
      {/* <div className="absolute inset-0 z-5 bg-gradient-to-r from-[var(--tronado-gradient-start)] to-[var(--tronado-gradient-end)] opacity-80"></div> */}
      
      {/* Static large Roll.png on the right side */}
      {/* <div 
        ref={rollRef} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        style={{
          width: '450px',
          height: '450px',
          marginRight: '80px',
          transform: `translateY(calc(-50% + var(--roll-y, 0px)))`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Image
          src="/Roll.png"
          alt="Lottery Roll"
          width={450}
          height={450}
          className="object-contain"
          priority
        />
      </div> */}
      
      {/* Simple overlay for gradient effect */}
      {/* <div className="absolute inset-0 z-20">
        <div className="w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/30"></div>
      </div> */}
    </div>
  );
}
