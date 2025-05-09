'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
}

export default function ImageCarousel({ images, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Auto-rotate images
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTransitioning(false);
      }, 500); // Half a second for transition
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex 
              ? transitioning ? 'opacity-70 z-10' : 'opacity-100 z-10' 
              : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={index === 0}
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
