'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Animated FAQ item with slide and fade effects
const AnimatedFAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 150);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div 
      className={`border-b border-[var(--tronado-gold)]/10 pb-3 last:border-0 last:pb-0 transition-all duration-500 transform
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[var(--tronado-gold)] font-bold mb-2 group-hover:text-[var(--tronado-gold-hover)] transition-colors">{question}</h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-[var(--tronado-gold)] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 text-gray-300 text-sm
          ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="pt-2">{answer}</p>
      </div>
    </div>
  );
};

/**
 * EnhancedFAQ component that displays frequently asked questions in a styled box
 * with animations and casino-themed background matching the EnhancedLotteryResults component.
 */
const EnhancedFAQ: React.FC = () => {
  // FAQ items with questions and answers
  const faqItems = [
    {
      question: 'How do I play Lucky Day?',
      answer: 'Select 6 numbers from 1-31 (days) and 1 number from 1-12 (months). Match all numbers to win the jackpot!'
    },
    {
      question: 'When are the draws held?',
      answer: 'Draws are held every Saturday at 22:00, with results posted immediately after.'
    },
    {
      question: 'What is the Lucky Chance?',
      answer: 'Lucky Chance is an additional draw where 7 random ticket numbers win TRDO 100,000 each, regardless of the numbers selected.'
    },
    {
      question: 'How do I claim my prize?',
      answer: 'Prizes under TRDO 10,000 can be claimed online. For larger amounts, contact our support center for secure verification.'
    },
    {
      question: 'Can I play from outside Dubai?',
      answer: 'Yes, TronadoLottery is available internationally. You must be over 18 years old and in a jurisdiction where online lotteries are permitted.'
    }
  ];

  return (
    <div className="relative bg-[var(--tronado-dark)] rounded-md overflow-hidden shadow-lg border border-[var(--tronado-gold)]/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]">
      {/* Casino chips background effect - matching the lottery results component */}
      <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: "url('/casino.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "soft-light" }}></div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--tronado-dark)] via-[var(--tronado-dark)]/90 to-[var(--tronado-dark)]/80 z-0"></div>
      <div className="flex justify-between items-center p-4 border-b border-[var(--tronado-gold)]/20 relative z-10">
        <h2 className="text-xl font-bold text-white">FREQUENTLY ASKED QUESTIONS</h2>
        <Link href="/faq" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
          <span className="text-sm text-blue-500">More</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="p-4 relative z-10">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <AnimatedFAQItem 
              key={index} 
              question={item.question} 
              answer={item.answer} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Animated gold particles */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--tronado-gold)]/30 to-transparent animate-pulse"></div>
    </div>
  );
}

export default EnhancedFAQ;
