'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import Footer from '@/components/Footer';
import BuildingBackground from '@/components/BuildingMotionBackground';
import Header from '@/components/Header';
import EnhancedLotteryResults from '@/components/EnhancedLotteryResults';
import EnhancedFAQ from '@/components/EnhancedFAQ';

export default function HomePage() {
  // Router for home page redirect
  const router = useRouter();

  // State for selected days and months
  const [selectedDays, setSelectedDays] = useState<number[]>([20, 28]);
  const [selectedMonth, setSelectedMonth] = useState<number>(5);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [currentDate] = useState<Date>(new Date(2025, 4, 17)); // May 17, 2025

  // Redirect if necessary (using asPath instead of pathname in App Router)
  useEffect(() => {
    // Only redirect if needed
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      router.push('/home');
    }
  }, [router]);

  // Handle day selection with exactly 6 selections required
  // Clicking on a selected day unselects it
  const handleDaySelect = (day: number) => {
    if (selectedDays.includes(day)) {
      // If day is already selected, unselect it
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      // If day isn't selected and fewer than 6 are selected, select it
      if (selectedDays.length < 6) {
        setSelectedDays([...selectedDays, day]);
      }
    }
  };

  // Handle month selection (only one can be selected)
  // Clicking on a selected month unselects it
  const handleMonthSelect = (month: number) => {
    if (month === selectedMonth) {
      // If month is already selected, unselect it
      setSelectedMonth(0); // 0 represents no selection
    } else {
      // Otherwise select it
      setSelectedMonth(month);
    }
  };

  // Handle ticket quantity
  const incrementTicket = () => {
    setTicketQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decrementTicket = () => {
    setTicketQuantity((prev) => Math.max(prev - 1, 1));
  };

  // State to track animations for visual feedback
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Function to clear all selections (delete button)
  const clearSelections = useCallback(() => {
    // Add visual feedback
    setIsDeleting(true);
    
    // Clear all selected days and month
    setSelectedDays([]);
    setSelectedMonth(0);
    
    console.log('All selections cleared');
    
    // Reset animation after 500ms
    setTimeout(() => {
      setIsDeleting(false);
    }, 500);
  }, []);
  
  // Easy Button: Randomly select 6 days and 1 month for lottery
  const handleEasyButton = useCallback(() => {
    // Add visual feedback
    setIsAnimating(true);
    
    // 1. Generate 6 unique random days between 1 and 31
    const getRandomDay = () => Math.floor(Math.random() * 31) + 1;
    
    // Ensure we get 6 unique days
    const randomDays: number[] = [];
    while (randomDays.length < 6) {
      const day = getRandomDay();
      if (!randomDays.includes(day)) {
        randomDays.push(day);
      }
    }
    
    // Sort the days in ascending order
    randomDays.sort((a, b) => a - b);
    
    // Update the selected days
    setSelectedDays(randomDays);
    
    // 2. Generate 1 random month between 1 and 12
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    
    // Update the selected month
    setSelectedMonth(randomMonth);
    
    console.log(`Easy Pick clicked! Randomly selected 6 days: ${randomDays.join(', ')} and month: ${randomMonth}`);
    
    // Reset animation after 500ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Full screen hero section with carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Building Background */}
        <div className="absolute inset-0 z-0">
          <BuildingBackground />
        </div>
        
        {/* Transparent header overlaid on carousel */}
        <div className="absolute top-0 left-0 right-0 z-20 w-full">
          <Header />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10 -mt-20">
          <div className="text-left max-w-xl md:max-w-2xl lg:ml-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2 text-white leading-tight">
              DARE TO IMAGINE
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[var(--tronado-gold)]">
              WIN TRDO 100 MILLION
            </h3>
          
          </div>
          
          {/* Single large Roll.png image */}
          <div className="hidden md:block relative h-[570px] w-[570px] lg:h-[600px] lg:w-[600px] xl:h-[650px] xl:w-[650px]">
            <Image
              src="/Roll.png"
              alt="Roulette Wheel"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Lottery Ticket Selection Section - styled to exactly match the reference image */}
      <section className="bg-gray-900 py-8" style={{ backgroundImage: "linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.95)), url('/home-luckday-bg.jpg')", backgroundSize: "cover" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[var(--tronado-dark)] rounded-lg overflow-hidden shadow-lg border border-[var(--tronado-gold)]/20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Side - Jackpot Information */}
              <div className="md:col-span-5 p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-[var(--tronado-dark)] border-r border-[var(--tronado-gold)]/20">
                <div className="mb-3">
                  <Image 
                    src="/Logo.png" 
                    alt="Lucky Day Logo" 
                    width={100} 
                    height={50} 
                  />
                </div>
                
                <h2 className="text-3xl font-bold text-white mt-2 mb-1">JACKPOT</h2>
                <div>
                  <div className="text-[var(--tronado-gold)] text-xl font-bold inline-block mr-2">TRDO</div>
                  <div className="text-[#e85d4b] text-5xl md:text-6xl font-bold inline-block">
                    100,000,000
                  </div>
                </div>
                
                <div className="bg-[var(--tronado-gold)]/20 text-center py-1 px-5 rounded-full text-[var(--tronado-gold)] font-medium mt-6 mb-2">
                  Guaranteed Lucky Chance Draw
                </div>
                
                <div className="text-[var(--tronado-gold)] text-lg font-semibold mb-4">
                  TRDO 100,000 * 7 Winners
                </div>
                
                <div className="text-sm text-gray-400 mb-6">
                  1 Entry for TRDO 50
                </div>
                
                <button className="w-full bg-[var(--tronado-gold)] hover:bg-[var(--tronado-gold-hover)] text-[var(--tronado-dark)] font-bold py-3 rounded-full transition-colors">
                  PLAY
                </button>
              </div>
              
              {/* Right Side - Ticket Selection */}
              <div className="md:col-span-7 bg-[var(--tronado-dark)] p-4 sm:p-5 md:p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-xl font-medium text-white">Buy A Ticket Quickly</div>
                  <div className="flex items-center space-x-4">
                    <button 
                      className={`p-2 ${isDeleting ? 'text-red-500' : 'text-gray-400 hover:text-gray-500'} transition-colors`}
                      onClick={clearSelections}
                      style={{ transform: isDeleting ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.2s ease' }}
                      aria-label="Clear all selections"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button 
                      className={`flex items-center space-x-2 border border-[var(--tronado-gold)] text-white rounded-full px-4 py-2 hover:bg-[var(--tronado-gold)]/10 transition-colors ${isAnimating ? 'bg-[var(--tronado-gold)]/20' : ''}`}
                      onClick={handleEasyButton}
                      style={{ transition: 'all 0.2s ease' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--tronado-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="font-medium">Easy Pick</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-4 hidden">
                  Draw Date: Saturday 22:00, {currentDate.toLocaleDateString('en-GB')}
                </div>
                
                {/* Days Selection */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-baseline">
                      <span className="text-white text-xl font-medium">Days</span>
                      <span className="text-[var(--tronado-gold)] text-sm ml-4">Pick 6 numbers</span>
                    </div>
                    {selectedDays.length < 6 && (
                      <div className="text-xs text-[var(--tronado-gold)]">
                        {6 - selectedDays.length} more required
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-7 sm:grid-cols-8 gap-4">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button 
                        key={day} 
                        onClick={() => handleDaySelect(day)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-base transition-all duration-200`}
                        style={{
                          background: selectedDays.includes(day) ? 'var(--tronado-gold)' : '#1f2937',
                          border: selectedDays.includes(day) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          color: selectedDays.includes(day) ? 'var(--tronado-dark)' : 'white'
                        }}
                      >
                        {day.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Months Selection */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-baseline">
                      <span className="text-white text-xl font-medium">Months</span>
                      <span className="text-[var(--tronado-gold)] text-sm ml-4">Pick 1 number</span>
                    </div>
                    {selectedMonth === 0 && (
                      <div className="text-xs text-[var(--tronado-gold)]">
                        1 required
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <button 
                        key={month} 
                        onClick={() => handleMonthSelect(month)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-base transition-all duration-200`}
                        style={{
                          background: month === selectedMonth ? '#c42428' : '#1f2937',
                          border: month === selectedMonth ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          color: month === selectedMonth ? 'white' : 'white'
                        }}
                      >
                        {month.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity and Buy Button */}
                <div className="flex items-center justify-between mt-10">
                  <div className="flex items-center border border-[var(--tronado-gold)]/30 rounded-full overflow-hidden">
                    <button 
                      onClick={decrementTicket}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      −
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white font-medium">
                      {ticketQuantity}
                    </div>
                    <button 
                      onClick={incrementTicket}
                      className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button className="bg-[var(--tronado-gold)] hover:bg-[var(--tronado-gold-hover)] text-[var(--tronado-dark)] font-bold py-3 px-8 rounded-full transition-colors text-lg">
                    Quick Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Jackpot Section with Oil Platform removed as requested */}

      {/* Latest Draw Result and FAQs Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-[var(--tronado-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Enhanced Lottery Results */}
            <div className="transition-all duration-300 hover:transform hover:translate-y-[-4px]">
              <EnhancedLotteryResults />
            </div>
            
            {/* Enhanced FAQs */}
            <div className="transition-all duration-300 hover:transform hover:translate-y-[-4px]">
              <EnhancedFAQ />
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Button section removed as requested */}
      
      {/* Next Draw Section removed as requested */}
      
      {/* Play Responsibly Section removed as requested */}
      
      <Footer />
    </div>
  );
}
