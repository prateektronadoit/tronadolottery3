'use client';

import React from 'react';
import Link from 'next/link';

const EnhancedLotteryResults = () => {
  const drawNumbers = [3, 10, 15, 17, 24, 27, 12];
  const matchResults = [
    { type: 'Match 6+1', winners: 0 },
    { type: 'Match 6+0', winners: 1 },
    { type: 'Match 5+1', winners: 3 },
    { type: 'Match 5+0, 4+1', winners: 61 },
    { type: 'Match 3+1, 2+1, 1+1, 0+1', winners: 5697 },
  ];
  
  const luckyWinners = [
    { id: 'D08331804', prize: 'TRDO 100,000' },
    { id: 'CT7084766', prize: 'TRDO 100,000' },
  ];

  return (
    <div className="bg-[var(--tronado-dark)] rounded-lg shadow-lg overflow-hidden border border-[var(--tronado-gold)]/20">
      <div className="flex justify-between items-center px-4 py-3 bg-[var(--tronado-dark)] border-b border-[var(--tronado-gold)]/20">
        <h3 className="text-xl font-bold text-white">LATEST DRAW RESULT</h3>
        <Link href="#" className="text-[var(--tronado-gold)] hover:text-[var(--tronado-gold-hover)] text-sm">
          More <span className="ml-1">›</span>
        </Link>
      </div>
      
      <div className="p-4">
        <div className="text-gray-400 text-sm mb-3">
          Saturday 22:00, 03/05/2025
        </div>
        
        {/* Lottery Numbers */}
        <div className="flex flex-wrap justify-center mb-4 gap-2">
          {drawNumbers.slice(0, 6).map((number, index) => (
            <div key={index} className="w-10 h-10 rounded-full bg-[var(--tronado-gold)] flex items-center justify-center text-[var(--tronado-dark)] font-bold text-sm">
              {number}
            </div>
          ))}
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
            {drawNumbers[6]}
          </div>
        </div>
        
        {/* Match Results */}
        <div className="space-y-2 mb-4">
          {matchResults.map((result, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div className="text-gray-300">{result.type}</div>
              <div className="bg-blue-600 text-white px-2 py-0.5 rounded-sm font-medium text-xs w-16 text-center">
                {result.winners.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        {/* Lucky Chance Results */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h4 className="text-lg font-semibold text-[var(--tronado-gold)] mb-2">LUCKY CHANCE RESULTS</h4>
          <div className="space-y-2">
            {luckyWinners.map((winner, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="text-gray-300">{winner.id}</div>
                <div className="text-[var(--tronado-gold)]">{winner.prize}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLotteryResults;
