'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const EnhancedFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqItems: FAQItem[] = [
    {
      question: "How do I play Lucky Day?",
      answer: "To play Lucky Day, choose 6 numbers between 1-31 and 1 Lucky Number between 1-12. You can play manually or use our Easy Pick option for random selection."
    },
    {
      question: "When are the draws held?",
      answer: "Lucky Day draws are held every Saturday at 22:00 Dubai time. Make sure to purchase your tickets before the cutoff time at 21:00."
    },
    {
      question: "What is the Lucky Chance?",
      answer: "Lucky Chance is a special feature that gives you additional chances to win prizes based on your ticket ID, regardless of whether your number selection matches the winning combination."
    },
    {
      question: "How do I claim my prize?",
      answer: "Prizes below TRDO 5,000 are automatically credited to your account. For larger prizes, you'll need to contact our customer service team to arrange the collection process."
    },
    {
      question: "Can I play from outside Dubai?",
      answer: "Yes, you can play TronadoLottery games from anywhere in the world as long as online lottery participation is legal in your jurisdiction. Please check your local regulations."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <div className="bg-[var(--tronado-dark)] rounded-lg shadow-lg overflow-hidden border border-[var(--tronado-gold)]/20">
      <div className="flex justify-between items-center px-4 py-3 bg-[var(--tronado-dark)] border-b border-[var(--tronado-gold)]/20">
        <h3 className="text-xl font-bold text-white">FREQUENTLY ASKED QUESTIONS</h3>
        <Link href="#" className="text-[var(--tronado-gold)] hover:text-[var(--tronado-gold-hover)] text-sm">
          More <span className="ml-1">›</span>
        </Link>
      </div>
      
      <div className="p-2">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-700 last:border-b-0">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <h4 className="text-[var(--tronado-gold)] font-medium">{item.question}</h4>
              <svg 
                className={`w-5 h-5 text-[var(--tronado-gold)] transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-3 text-sm text-gray-300">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedFAQ;
