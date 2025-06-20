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
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/ibg.png" alt="Background" fill style={{ objectFit: 'cover' }} priority />
        </div>

        {/* Coin decorations */}
        {/* Top Left Coin */}
        <div className="absolute left-0 top-0 z-30 mt-24 ml-4">
          <Image src="/coinL.png" alt="Coin Left" width={200} height={200} className="w-[120px] h-[120px] md:w-[180px] md:h-[180px]" />
        </div>
        
        {/* Top Center Coin */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-30 mt-16">
          <Image src="/coinM.png" alt="Coin Middle" width={200} height={200} className="w-[140px] h-[140px] md:w-[200px] md:h-[200px]" />
        </div>
        
        {/* Bottom Right Coin */}
        <div className="absolute right-0 bottom-0 z-30 mb-8 mr-4">
          <Image src="/coinR.png" alt="Coin Right" width={250} height={250} className="w-[160px] h-[160px] md:w-[240px] md:h-[240px]" />
        </div>
        
        {/* Bottom Left Circle */}
        <div className="absolute left-0 bottom-0 z-40 mb-24 ml-8">
          <Image 
            src="/circle1.png" 
            alt="Circle 1" 
            width={250} 
            height={250} 
            className="w-[160px] h-[160px] md:w-[240px] md:h-[240px]" 
          />
        </div>
        
        {/* Bottom Right Circle */}
        <div className="absolute right-0 bottom-0 z-40 mb-36 mr-36">
          <Image 
            src="/circle2.png" 
            alt="Circle 2" 
            width={200} 
            height={200} 
            className="w-[140px] h-[140px] md:w-[200px] md:h-[200px]" 
          />
        </div>
        <div className="absolute top-0 left-0 right-0 z-20 w-full">
          <Header />
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <span className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest text-white mb-2 text-center mt-8 drop-shadow-lg" style={{textShadow: '0 8px 24px rgba(0,0,0,0.5)'}}>WIN BIG WITH</span>
              <span
                className={`uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold italic text-center transition-all duration-1000 ${isPurple ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent' : 'text-white'}`}
              >
                BLOCKCHAIN LOTTERY
              </span>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-10">
              Experience the future of lottery gaming with transparent, secure, and decentralized draws powered by smart contracts
            </p>
            
            <div className="flex flex-row gap-6 justify-center w-full max-w-xl mt-6">
              <button
                className="flex items-center justify-center bg-[#0F0448] hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => {
                  const howItWorksSection = document.getElementById('how-it-works-section');
                  if (howItWorksSection) howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="mr-2">🎯</span> How It Works
              </button>
              <button
                className="flex items-center justify-center bg-[#0F0448] hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => {
                  const ticketSection = document.querySelector('section.bg-gray-900');
                  if (ticketSection) ticketSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="mr-2">🎫</span> Buy Tickets Now
              </button>
            </div>
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
