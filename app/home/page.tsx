'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';

export default function HomePage() {
  // Router for home page redirect
  const router = useRouter();

  // State for selected days and months
  const [selectedDays, setSelectedDays] = useState<number[]>([20, 28]);
  const [selectedMonth, setSelectedMonth] = useState<number>(5);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Combined Header and Hero with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Background */}
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
        
        {/* Header Navigation */}
        <div className="relative z-10 pt-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo and brand name */}
              <Link href="/home" className="flex items-center">
                <Image 
                  src="/Logo.png" 
                  alt="Tronado Lottery Logo" 
                  width={50} 
                  height={50} 
                />
                <div className="ml-2 text-white">
                  <div className="font-bold text-lg uppercase">THE TRONADO</div>
                  <div className="text-xs uppercase">LOTTERY</div>
                </div>
              </Link>
              
              {/* Main navigation */}
              <div className="flex items-center space-x-6">
                <nav className="text-white">
                  <ul className="flex space-x-6">
                    <li className="relative group">
                      <Link href="#" className="flex items-center py-1 hover:text-yellow-300 transition-colors font-medium">
                        <span>Play</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    </li>
                    <li><Link href="#" className="py-1 hover:text-yellow-300 transition-colors font-medium">Draws</Link></li>
                    <li><Link href="#" className="py-1 hover:text-yellow-300 transition-colors font-medium">FAQs</Link></li>
                    <li><Link href="#" className="py-1 hover:text-yellow-300 transition-colors font-medium">Play Responsibly</Link></li>
                  </ul>
                </nav>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-sm bg-transparent px-2 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-xs">En</span>
                  </button>
                  
                  <button className="bg-transparent border border-white/70 hover:bg-white/10 text-white px-4 py-1 rounded transition-colors text-sm">
                    Login
                  </button>
                  
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded transition-colors text-sm font-medium">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center relative z-10 -mt-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg max-w-4xl">
            DARE TO IMAGINE!<br /> 
            <span className="text-yellow-400">WIN AED 100 MILLION</span>
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
              <div className="md:col-span-5 p-6 flex flex-col justify-center items-center text-center bg-[#fffdf9]">
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
                  <div className="text-[#333333] text-xl font-bold inline-block mr-2">AED</div>
                  <div className="text-[#e85d4b] text-5xl md:text-6xl font-bold inline-block">
                    100,000,000
                  </div>
                </div>
                
                <div className="bg-[#fff1d0] text-center py-1 px-5 rounded-full text-[#976c14] font-medium mt-6 mb-2">
                  Guaranteed Lucky Chance Draw
                </div>
                
                <div className="text-[#c17d19] text-lg font-semibold mb-4">
                  AED 100,000 * 7 Winners
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  1 Entry for AED 50
                </div>
                
                <button className="w-full bg-[#ffd670] hover:bg-[#ffc440] text-gray-800 font-bold py-3 rounded-full transition-colors">
                  PLAY
                </button>
              </div>
              
              {/* Right Side - Ticket Selection */}
              <div className="md:col-span-7 bg-white p-5 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Draw Date: Saturday 22:00, 17/05/2025</div>
                    <div className="flex gap-1">
                      <div className="text-center">
                        <div className="bg-gray-100 px-2 py-1 rounded">
                          <span className="font-bold text-gray-800">08</span>
                          <span className="text-xs text-gray-500 block">D</span>
                        </div>
                      </div>
                      <div className="text-gray-400 flex items-center">:</div>
                      <div className="text-center">
                        <div className="bg-gray-100 px-2 py-1 rounded">
                          <span className="font-bold text-gray-800">20</span>
                          <span className="text-xs text-gray-500 block">H</span>
                        </div>
                      </div>
                      <div className="text-gray-400 flex items-center">:</div>
                      <div className="text-center">
                        <div className="bg-gray-100 px-2 py-1 rounded">
                          <span className="font-bold text-gray-800">16</span>
                          <span className="text-xs text-gray-500 block">M</span>
                        </div>
                      </div>
                      <div className="text-gray-400 flex items-center">:</div>
                      <div className="text-center">
                        <div className="bg-gray-100 px-2 py-1 rounded">
                          <span className="font-bold text-gray-800">20</span>
                          <span className="text-xs text-gray-500 block">S</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0">
                    <h3 className="text-sm font-bold text-gray-700 mr-2">Buy A Ticket Quickly</h3>
                    <button className="flex items-center border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs">Easy Pick</span>
                    </button>
                  </div>
                </div>
                
                {/* Days Selection */}
                <div className="mb-6">
                  <div className="mb-3 flex justify-between items-center">
                    <div>
                      <span className="text-lg font-medium text-[#555]">Days</span>
                      <span className="text-sm text-[#997950] ml-3">Pick 6 numbers</span>
                    </div>
                    {selectedDays.length < 6 && (
                      <div className="text-xs bg-[#fff8e8] text-[#997950] px-2 py-1 rounded-md">
                        {6 - selectedDays.length} more required
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button 
                        key={day} 
                        onClick={() => handleDaySelect(day)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${!selectedDays.includes(day) ? 'text-[#997950] hover:bg-gray-50 border border-[#e9e9e9]' : ''}`}
                        style={{
                          background: selectedDays.includes(day) ? '#d4a017' : '#fff',
                          border: selectedDays.includes(day) ? 'none' : '1px solid #e9e9e9',
                          color: selectedDays.includes(day) ? 'white' : '#997950'
                        }}
                      >
                        {day.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Months Selection */}
                <div className="mb-6">
                  <div className="mb-3 flex justify-between items-center">
                    <div>
                      <span className="text-lg font-medium text-[#555]">Months</span>
                      <span className="text-sm text-[#997950] ml-3">Pick 1 number</span>
                    </div>
                    {selectedMonth === 0 && (
                      <div className="text-xs bg-[#fff8e8] text-[#997950] px-2 py-1 rounded-md">
                        1 more required
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <button 
                        key={month} 
                        onClick={() => handleMonthSelect(month)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${month !== selectedMonth ? 'text-[#997950] hover:bg-gray-50 border border-[#e9e9e9]' : ''}`}
                        style={{
                          background: month === selectedMonth ? '#d4a017' : '#fff',
                          border: month === selectedMonth ? 'none' : '1px solid #e9e9e9',
                          color: month === selectedMonth ? 'white' : '#997950'
                        }}
                      >
                        {month.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity and Quick Buy */}
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center">
                    <div className="flex items-center border border-[#e5e5e5] rounded-full overflow-hidden bg-white shadow-sm w-[120px] h-[50px]">
                      <button 
                        onClick={decrementTicket}
                        className="w-10 h-10 text-[#999] flex items-center justify-center hover:bg-gray-50 transition-colors text-xl">
                        −
                      </button>
                      <span className="w-10 text-center text-[#555] text-xl font-medium">{ticketQuantity}</span>
                      <button 
                        onClick={incrementTicket}
                        className="w-10 h-10 text-[#999] flex items-center justify-center hover:bg-gray-50 transition-colors text-xl">
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button className="bg-[#ffd670] hover:bg-[#ffc440] text-[#333] font-bold py-3 px-12 rounded-full transition-colors text-lg shadow-sm">
                    Quick Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scratch Cards Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">SCRATCH CARDS</h2>
          <div className="game-hulm-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Mission Million */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="absolute top-2 left-2 w-14 h-14 z-10">
                  <Image src="/scratch-cards/new-tag.png" alt="New" width={56} height={56} className="tag-icon" />
                </div>
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/mission-million.png" alt="Mission Million" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #267399', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">50</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#267399'}}>
                  WIN AED 1,000,000
                </div>
              </div>
            </div>

            {/* Golden Dynasty */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="absolute top-2 left-2 w-14 h-14 z-10">
                  <Image src="/scratch-cards/new-tag.png" alt="New" width={56} height={56} className="tag-icon" />
                </div>
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/golden-dynasty.png" alt="Golden Dynasty" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #43438b', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">20</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#43438b'}}>
                  WIN AED 300,000
                </div>
              </div>
            </div>

            {/* Fortune Festival */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="absolute top-2 left-2 w-14 h-14 z-10">
                  <Image src="/scratch-cards/new-tag.png" alt="New" width={56} height={56} className="tag-icon" />
                </div>
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/fortune-festival.png" alt="Fortune Festival" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #db3a33', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">10</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#db3a33'}}>
                  WIN AED 100,000
                </div>
              </div>
            </div>

            {/* Karak Kash */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="absolute top-2 left-2 w-14 h-14 z-10">
                  <Image src="/scratch-cards/new-tag.png" alt="New" width={56} height={56} className="tag-icon" />
                </div>
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/karak-kash.png" alt="Karak Kash" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #d27e15', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">5</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#d27e15'}}>
                  WIN AED 50,000
                </div>
              </div>
            </div>
            
            {/* Lucky 7 */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/lucky-7.jpg" alt="Lucky 7" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #af3719', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">50</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#af3719'}}>
                  WIN AED 1,000,000
                </div>
              </div>
            </div>

            {/* Mega Sajjs */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/mega-sajjs.jpg" alt="Mega Sajjs" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #1671d0', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">20</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#1671d0'}}>
                  WIN AED 300,000
                </div>
              </div>
            </div>

            {/* Copper Cups */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/copper-cups.jpg" alt="Copper Cups" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #66553d', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">10</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#66553d'}}>
                  WIN AED 100,000
                </div>
              </div>
            </div>

            {/* Oasis Bonanza */}
            <div className="hulm-item-outer">
              <div className="hulm-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer relative group">
                <div className="icon-container relative h-48 overflow-hidden">
                  <Image src="/scratch-cards/oasis-bonanza.jpg" alt="Oasis Bonanza" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="game-price text-center font-extrabold text-white py-2 px-4 text-xl" 
                  style={{WebkitTextStroke: '4px #198c0b', textShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                  <span className="">AED</span>
                  <span className="">5</span>
                </div>
                <div className="game-aed text-center font-bold text-white py-2 text-sm" style={{backgroundColor: '#198c0b'}}>
                  WIN AED 50,000
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
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 6+1</span>
                    <div className="flex gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">0</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 6+0</span>
                    <div className="flex gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">1</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 5+1</span>
                    <div className="flex gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">3</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 5+0, 4+1</span>
                    <div className="flex gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">61</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Match 3+1, 2+1, 1+1, 0+1</span>
                    <div className="flex gap-8">
                      <span className="text-gray-600">Winners</span>
                      <span className="text-gray-800 font-semibold">5,697</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-center text-yellow-600 mb-4">LUCKY CHANCE RESULTS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">DG8391804</span>
                      <span className="text-yellow-600 font-semibold">AED 100,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">CT7084766</span>
                      <span className="text-yellow-600 font-semibold">AED 100,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">BB2695605</span>
                      <span className="text-yellow-600 font-semibold">AED 100,000</span>
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
