'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Types
type PrizeData = {
  matches: string;
  winners: number;
};

type LuckyChanceWinner = {
  ticketId: string;
  amount: string;
};

// Lottery number ball component with glow effect and animation
const LotteryBall = ({ number, isPowerBall = false, delay = 0 }: { number: number; isPowerBall?: boolean; delay?: number }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100 + delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`relative flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold transition-all duration-500 transform
        ${isAnimated ? 'scale-100' : 'scale-0'}
        ${isPowerBall 
          ? 'bg-red-500 text-white' 
          : 'bg-[var(--tronado-gold)] text-[var(--tronado-dark)]'
        }`}
      style={{
        boxShadow: isPowerBall 
          ? '0 0 15px rgba(239, 68, 68, 0.7)' 
          : '0 0 15px rgba(255, 215, 0, 0.7)',
        transition: `transform 0.5s ease ${delay}ms, box-shadow 0.3s ease`
      }}
    >
      <span className="relative z-10">{number}</span>
      <div className={`absolute inset-0 rounded-full ${isPowerBall ? 'bg-red-500' : 'bg-[var(--tronado-gold)]'} animate-pulse opacity-50`} 
           style={{ animationDelay: `${delay}ms` }}></div>
    </div>
  );
};



// Animated counter for displaying numbers with counting animation
const AnimatedCounter = ({ value, className = '' }: { value: number; className?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (value === 0) {
      setCount(0);
      return;
    }
    
    const duration = 1500; // animation duration in ms
    const steps = 20; // number of steps in the animation
    const stepValue = value / steps;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(stepValue * currentStep));
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [value]);
  
  return <span className={className}>{count.toLocaleString()}</span>;
};

/**
 * EnhancedLotteryResults component that displays lottery results in a styled box
 * with animations and casino-themed background.
 */
const EnhancedLotteryResults: React.FC = () => {
  // Static data that matches the image
  const latestDrawDate = "Saturday 22:00, 03/05/2025";
  
  const winningNumbers = [3, 10, 16, 17, 24, 27];
  const powerBall = 12;
  
  // Prize data that matches the image
  const prizeData: PrizeData[] = [
    { matches: 'Match 6+1', winners: 0 },
    { matches: 'Match 6+0', winners: 1 },
    { matches: 'Match 5+1', winners: 3 },
    { matches: 'Match 5+0, 4+1', winners: 61 },
    { matches: 'Match 3+1, 2+1, 1+1, 0+1', winners: 5697 },
  ];

  // Lucky chance winners that match the image
  const luckyChanceWinners: LuckyChanceWinner[] = [
    { ticketId: 'DG8331804', amount: 'TRDO 100,000' },
    { ticketId: 'CT7084766', amount: 'TRDO 100,000' },
  ];

  return (
    <div className="relative bg-[var(--tronado-dark)] rounded-md overflow-hidden shadow-lg border border-[var(--tronado-gold)]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]">
      {/* Casino chips background effect */}
      <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: "url('/casino.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "soft-light" }}></div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--tronado-dark)] via-[var(--tronado-dark)]/90 to-[var(--tronado-dark)]/80 z-0"></div>
      <div className="flex justify-between items-center p-4 border-b border-[var(--tronado-gold)]/20 relative z-10">
        <h2 className="text-xl font-bold text-white">LATEST DRAW RESULT</h2>
        <Link href="/results" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
          <span className="text-sm text-blue-500">More</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="p-4 relative z-10">
        <p className="text-gray-400 mb-4">{latestDrawDate}</p>
        <div className="flex space-x-3 mb-6 justify-center">
          {winningNumbers.map((num, index) => (
            <LotteryBall key={index} number={num} delay={index * 100} />
          ))}
          <LotteryBall number={powerBall} isPowerBall delay={winningNumbers.length * 100} />
        </div>
      </div>

      <div className="px-4 pb-4 relative z-10">
        <div className="space-y-2">
          {prizeData.map((prize, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="text-white text-sm">{prize.matches}</div>
              <div className="bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-semibold text-center transform transition-all duration-300 hover:scale-110 hover:bg-blue-600">
                <AnimatedCounter value={prize.winners} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-[var(--tronado-gold)]/20">
          <h3 className="text-[var(--tronado-gold)] font-bold mb-3 text-center">LUCKY CHANCE RESULTS</h3>
          <div className="space-y-2">
            {luckyChanceWinners.map((winner, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="text-white text-sm">{winner.ticketId}</div>
                <div className="text-[var(--tronado-gold)] font-bold text-sm">{winner.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedLotteryResults;
