'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import PlatformFeatures from '@/components/PlatformFeatures';
import HowItWorks from '@/components/HowItWorks';
import PlatformStatistics from '@/components/PlatformStatistics';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function HomePage() {
  // Animation for BLOCKCHAIN LOTTERY color
  const [isPurple, setIsPurple] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPurple(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background and Header */}
      <section className="relative h-screen overflow-hidden bg-[#0a002a]">
        {/* Pure background color for consistent backdrop */}
        <div className="absolute inset-0 z-0 bg-[#0a002a]"></div>
        
        {/* Background image with guaranteed full visibility */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-full h-full">
            <Image 
              src="/ibg.png" 
              alt="Background" 
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority 
              quality={100}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Space left intentionally clean for the background image to be fully visible */}
        
        <div className="absolute top-0 left-0 right-0 z-50 w-full">
          <Header />
        </div>
        
        {/* Hero Content - Positioned directly below the header */}
        <div className="absolute inset-x-0 top-[50px] sm:top-[60px] z-30 flex flex-col items-center w-full">
          <div className="w-full flex flex-col items-center">
            {/* Win big with */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0 text-center tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              WIN BIG WITH
            </h2>
            
            {/* BLOCKCHAIN LOTTERY */}
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold italic text-center px-4 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              TRDO LOTTERY
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-white text-center max-w-2xl mx-auto px-4 mb-8 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Experience the future of lottery gaming with transparent, secure, and decentralized draws powered by smart contracts
            </p>
          </div>
        </div>
        
        {/* Buttons - Positioned at the bottom */}
        <div className="absolute inset-x-0 bottom-0 z-40 mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md mx-auto px-4">
            <button
              className="flex-1 flex items-center justify-center bg-[#9c19e9] hover:bg-[#a735ed] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => {
                const howItWorksSection = document.getElementById('how-it-works-section');
                if (howItWorksSection) howItWorksSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="mr-2">🎯</span> How It Works
            </button>
            <button
              className="flex-1 flex items-center justify-center bg-[#ffa200] hover:bg-[#ffb733] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => {
                const ticketSection = document.querySelector('section.bg-gray-900');
                if (ticketSection) ticketSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="mr-2">🎫</span> Buy Tickets Now
            </button>
          </div>
        </div>
      </section>

      {/* Components only */}
      <PlatformStatistics />
      <PlatformFeatures />
      <Testimonials />
      <CallToAction />

      <Footer />
    </div>
  );
}
