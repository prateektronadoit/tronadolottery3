'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import Header from '@/components/Header';

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
        {/* Carousel Background running behind header */}
        <div className="absolute inset-0 z-0">
          <ImageCarousel 
            images={[
              { src: "/3d-ship-sailing-blue-ocean.png", alt: "Sailing ship" },
              { src: "/offshore-industry-oil-gas-production-platform.png", alt: "Offshore Oil Platform" }
            ]}
            interval={6000}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/70 via-cyan-700/40 to-transparent"></div>
        </div>
        
        {/* Transparent header overlaid on carousel */}
        <div className="absolute top-0 left-0 right-0 z-20 w-full">
          <Header />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center relative z-10 -mt-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg max-w-4xl">
            DARE TO IMAGINE!<br /> 
            <span className="text-yellow-400">WIN TRDO 100 MILLION</span>
          </h2>
          <button className="bg-white hover:bg-yellow-400 hover:text-white text-cyan-800 px-12 py-3 rounded-full font-bold text-xl transition-colors mt-6 shadow-lg">
            Play Now
          </button>
        </div>
      </section>

      {/* Lottery Ticket Selection Section - styled to exactly match the reference image */}
      <section className="bg-[#faf6eb] py-8" style={{ backgroundImage: "url('/home-luckday-bg.jpg')", backgroundSize: "cover" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Side - Jackpot Information */}
              <div className="md:col-span-5 p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-[#fffdf9]">
                <div className="mb-3">
                  <Image 
                    src="/Logo.png" 
                    alt="Lucky Day Logo" 
                    width={100} 
                    height={50} 
                  />
                </div>
                
                <h2 className="text-3xl font-bold text-[#333333] mt-2 mb-1">JACKPOT</h2>
                <div>
                  <div className="text-[#333333] text-xl font-bold inline-block mr-2">TRDO</div>
                  <div className="text-[#e85d4b] text-5xl md:text-6xl font-bold inline-block">
                    100,000,000
                  </div>
                </div>
                
                <div className="bg-[#fff1d0] text-center py-1 px-5 rounded-full text-[#976c14] font-medium mt-6 mb-2">
                  Guaranteed Lucky Chance Draw
                </div>
                
                <div className="text-[#c17d19] text-lg font-semibold mb-4">
                  TRDO 100,000 * 7 Winners
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  1 Entry for TRDO 50
                </div>
                
                <button className="w-full bg-[#ffd670] hover:bg-[#ffc440] text-gray-800 font-bold py-3 rounded-full transition-colors">
                  PLAY
                </button>
              </div>
              
              {/* Right Side - Ticket Selection */}
              <div className="md:col-span-7 bg-white p-4 sm:p-5 md:p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-xl font-medium text-[#333]">Buy A Ticket Quickly</div>
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
                      className={`flex items-center space-x-2 border border-[#d4a017] text-[#333] rounded-full px-4 py-2 hover:bg-gray-50 transition-colors ${isAnimating ? 'bg-gray-100' : ''}`}
                      onClick={handleEasyButton}
                      style={{ transition: 'all 0.2s ease' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d4a017]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <span className="text-[#555] text-xl font-medium">Days</span>
                      <span className="text-[#997950] text-sm ml-4">Pick 6 numbers</span>
                    </div>
                    {selectedDays.length < 6 && (
                      <div className="text-xs text-[#997950]">
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
                          background: selectedDays.includes(day) ? '#d4a017' : 'white',
                          border: selectedDays.includes(day) ? 'none' : '1px solid rgba(0,0,0,0.1)',
                          color: selectedDays.includes(day) ? 'white' : '#555'
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
                      <span className="text-[#555] text-xl font-medium">Months</span>
                      <span className="text-[#997950] text-sm ml-4">Pick 1 number</span>
                    </div>
                    {selectedMonth === 0 && (
                      <div className="text-xs text-[#997950]">
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
                          background: month === selectedMonth ? '#c42428' : 'white',
                          border: month === selectedMonth ? 'none' : '1px solid rgba(0,0,0,0.1)',
                          color: month === selectedMonth ? 'white' : '#555'
                        }}
                      >
                        {month.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity and Buy Button */}
                <div className="flex items-center justify-between mt-10">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                    <button 
                      onClick={decrementTicket}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center bg-white text-gray-800 font-medium">
                      {ticketQuantity}
                    </div>
                    <button 
                      onClick={incrementTicket}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button className="bg-[#ffc14a] hover:bg-[#edb445] text-[#333] font-bold py-3 px-8 rounded-full transition-colors text-lg">
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
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            {/* Draw Results */}
            <div className="w-full lg:w-3/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">LATEST DRAW RESULT</h2>
                <a href="#" className="text-gray-500 hover:text-gray-700 flex items-center">
                  More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">Saturday 22:00, 03/05/2025</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {[3, 10, 16, 17, 24, 27].map((num) => (
                    <div key={num} className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-lg">
                      {num}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                    12
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 6+1</span>
                    <div className="flex gap-4 sm:gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">0</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 6+0</span>
                    <div className="flex gap-4 sm:gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">1</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 5+1</span>
                    <div className="flex gap-4 sm:gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">3</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 5+0, 4+1</span>
                    <div className="flex gap-4 sm:gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">61</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 3+1, 2+1, 1+1, 0+1</span>
                    <div className="flex gap-4 sm:gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">5,697</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-center text-yellow-600 mb-4">LUCKY CHANCE RESULTS</h3>
                  <div className="space-y-3 px-2 sm:px-0">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium text-sm sm:text-base">DG8391804</span>
                      <span className="text-yellow-600 font-semibold text-sm sm:text-base">TRDO 100,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">CT7084766</span>
                      <span className="text-yellow-600 font-semibold">TRDO 100,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">BB2695605</span>
                      <span className="text-yellow-600 font-semibold">TRDO 100,000</span>
                    </div>
                    <div className="text-center text-gray-600 mt-2">...</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div className="w-full lg:w-2/5">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">FAQs</h2>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-lg shadow-md text-center text-white relative">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 font-bold text-2xl">FAQ</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">FREQUENTLY</h3>
                <h3 className="text-2xl font-bold mb-4">ASKED QUESTIONS</h3>
                <button className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-md mt-4 transition-colors duration-200">
                  View FAQs
                </button>
              </div>
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
