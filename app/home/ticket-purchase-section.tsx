'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

// Canvas-based background effect component for the ticket purchase section
const LotteryBackgroundEffect = ({ className = '' }: { className?: string }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-400/15 to-purple-500/20"></div>
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px, 40px 40px',
        backgroundPosition: '0 0, 10px 10px' 
      }}></div>
      <canvas 
        id="lotteryCanvas"
        className={`absolute inset-0 ${className}`}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

// Script to be executed client-side for the canvas animation
const CanvasScript = () => {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('lotteryCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Set canvas dimensions to match parent container
        const resizeCanvas = () => {
          const parent = canvas.parentElement;
          if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
          }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        const particles = [];
        const particleCount = 50;
        
        // Lighter color palette with gold and lucky-themed colors
        const colorPalette = [
          '#FFD700', // Gold
          '#F5DEB3', // Wheat
          '#87CEEB', // Sky Blue
          '#E6E6FA', // Lavender
          '#98FB98', // Pale Green
          '#FFA07A', // Light Salmon
          '#FFFACD'  // Lemon Chiffon
        ];
        
        class Particle {
          x: number;
          y: number;
          radius: number;
          color: string;
          speedX: number;
          speedY: number;
          opacity: number;
          shape: string;
          rotate: number;
          rotateSpeed: number;
          
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 4 + 2;
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            this.speedX = (Math.random() - 0.5) * 0.7;
            this.speedY = (Math.random() - 0.5) * 0.7;
            this.opacity = 0.3 + Math.random() * 0.4;
            this.shape = Math.random() > 0.3 ? 'circle' : (Math.random() > 0.5 ? 'star' : 'diamond');
            this.rotate = Math.random() * Math.PI * 2;
            this.rotateSpeed = (Math.random() - 0.5) * 0.02;
          }
          
          update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotate += this.rotateSpeed;
            
            // Boundary check with wrap-around
            if (this.x < -this.radius * 2) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius * 2) this.x = -this.radius;
            if (this.y < -this.radius * 2) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius * 2) this.y = -this.radius;
          }
          
          draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotate);
            
            if (this.shape === 'circle') {
              ctx.beginPath();
              ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
              ctx.fill();
            } else if (this.shape === 'star') {
              // Draw a small star
              this.drawStar(0, 0, this.radius * 1.5, this.radius * 0.6, 5);
            } else if (this.shape === 'diamond') {
              // Draw a diamond
              ctx.beginPath();
              ctx.moveTo(0, -this.radius * 1.5);
              ctx.lineTo(this.radius, 0);
              ctx.lineTo(0, this.radius * 1.5);
              ctx.lineTo(-this.radius, 0);
              ctx.closePath();
              ctx.fill();
            }
            
            ctx.restore();
            ctx.globalAlpha = 1;
          }
          
          drawStar(x, y, outerRadius, innerRadius, points) {
            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (i * Math.PI) / points;
              ctx.lineTo(x + radius * Math.sin(angle), y + radius * Math.cos(angle));
            }
            ctx.closePath();
            ctx.fill();
          }
        }
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
        
        function animate() {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Add light background with gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, 'rgba(245, 245, 255, 0.01)');
          gradient.addColorStop(1, 'rgba(230, 230, 250, 0.01)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add some light grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          
          // Draw lucky clover pattern in background
          for (let x = 0; x < canvas.width; x += 80) {
            for (let y = 0; y < canvas.height; y += 80) {
              if (Math.random() > 0.85) {
                ctx.fillStyle = 'rgba(255, 215, 0, 0.03)';
                drawClover(x + 40 * Math.random(), y + 40 * Math.random(), 5 + Math.random() * 5);
              }
            }
          }
          
          function drawClover(x, y, size) {
            for (let i = 0; i < 4; i++) {
              ctx.beginPath();
              const angle = (i * Math.PI) / 2;
              const leafX = x + Math.cos(angle) * size;
              const leafY = y + Math.sin(angle) * size;
              ctx.arc(leafX, leafY, size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          // Update and draw particles
          particles.forEach(particle => {
            particle.update();
            particle.draw();
          });
          
          requestAnimationFrame(animate);
        }
        
        animate();
      });
    `}} />
  );
};

// Enhanced Ticket Purchase Section with Black and Gold Theme
export default function EnhancedTicketPurchaseSection() {
  // State for selected days and months
  const [selectedDays, setSelectedDays] = useState<number[]>([20, 28]);
  const [selectedMonth, setSelectedMonth] = useState<number>(5);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  
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
    
    // Reset animation after 500ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, []);
  
  // Handle day selection with exactly 6 selections required
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
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative">
          {/* Black and Gold Themed Ticket Purchase Section */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ 
            background: '#000',
            boxShadow: '0 0 30px rgba(218, 165, 32, 0.3)'
          }}>
            {/* Dynamic Background Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <LotteryBackgroundEffect />
            </div>
            
            {/* Golden border effect */}
            <div className="absolute inset-0 pointer-events-none" style={{ 
              border: '1px solid rgba(218, 165, 32, 0.5)',
              boxShadow: 'inset 0 0 10px rgba(218, 165, 32, 0.3)'
            }}></div>
            
            {/* Main content */}
            <div className="relative z-10 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column - Jackpot Information */}
                <div className="md:col-span-4 p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-gradient-to-b from-indigo-900/60 to-blue-900/70 border-r border-indigo-300/20 rounded-l-lg shadow-inner">
                  <div className="mb-8 relative -mt-6">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 opacity-40 blur-sm"></div>
                    <Image 
                      src="/Logo.png" 
                      alt="Tronado Lottery Logo" 
                      width={280} 
                      height={140} 
                      className="mx-auto relative z-10 -mt-8"
                    />
                  </div>
                  
                  <h3 className="text-center text-xl font-bold text-gray-200 mb-1 drop-shadow-md">JACKPOT</h3>
                  <p className="text-center text-lg font-bold text-amber-300 mb-4 drop-shadow-md">TRDO</p>
                  <p className="text-center text-4xl md:text-5xl font-bold text-amber-300 mb-2 drop-shadow-lg">100,000,000</p>
                  
                  <div className="mt-4 py-1 px-4 rounded-full bg-amber-500/20 border border-amber-300/50 shadow-inner">
                    <p className="text-center text-sm text-amber-200 font-medium">Guaranteed Lucky Chance Draw</p>
                  </div>
                  
                  <p className="mt-4 text-center text-sm text-amber-300 font-medium drop-shadow-md">TRDO 100,000 * 7 Winners</p>
                  <p className="mt-2 text-center text-xs text-gray-300">1 Entry for TRDO 50</p>
                  
                  <button className="mt-6 w-full py-3 rounded-md bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                    PLAY
                  </button>
                </div>
                
                {/* Right Column - Ticket Selection */}
                <div className="md:col-span-8 rounded-lg border border-indigo-200/30 bg-white/10 backdrop-blur-sm p-5 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Buy A Ticket Quickly</h2>
                    <div className="flex items-center space-x-3">
                      <button 
                        className={`p-2 ${isDeleting ? 'text-red-500' : 'text-gray-400 hover:text-amber-300'} transition-colors`}
                        onClick={clearSelections}
                        style={{ transform: isDeleting ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.2s ease' }}
                        aria-label="Clear all selections"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button 
                        className={`flex items-center space-x-2 bg-gradient-to-r from-amber-700/50 to-amber-600/50 hover:from-amber-700/70 hover:to-amber-600/70 border border-amber-600/30 text-amber-300 rounded-full px-4 py-2 transition-all duration-200 ${isAnimating ? 'scale-95' : ''}`}
                        onClick={handleEasyButton}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="font-medium">Easy Pick</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Days Selection */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-baseline">
                        <span className="text-white text-lg font-medium">Days</span>
                        <span className="text-amber-400/80 text-sm ml-3">Pick 6 numbers</span>
                      </div>
                      {selectedDays.length < 6 && (
                        <div className="text-xs text-amber-400/80">
                          {6 - selectedDays.length} more required
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-2 md:gap-3">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <button 
                          key={day} 
                          onClick={() => handleDaySelect(day)}
                          className={`relative aspect-square rounded-full flex items-center justify-center text-base transition-all duration-300`}
                          style={{
                            background: selectedDays.includes(day) 
                              ? 'linear-gradient(135deg, #d4a017, #ffd700)' 
                              : 'rgba(50, 50, 50, 0.5)',
                            color: selectedDays.includes(day) ? 'black' : 'rgba(255, 255, 255, 0.8)',
                            transform: selectedDays.includes(day) ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: selectedDays.includes(day) 
                              ? '0 0 15px rgba(255, 215, 0, 0.4)' 
                              : 'none',
                          }}
                        >
                          {day.toString().padStart(2, '0')}
                          {selectedDays.includes(day) && (
                            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Months Selection */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-baseline">
                        <span className="text-white text-lg font-medium">Months</span>
                        <span className="text-amber-400/80 text-sm ml-3">Pick 1 number</span>
                      </div>
                      {selectedMonth === 0 && (
                        <div className="text-xs text-amber-400/80">
                          1 required
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <button 
                          key={month} 
                          onClick={() => handleMonthSelect(month)}
                          className={`relative aspect-square rounded-full flex items-center justify-center text-base transition-all duration-300`}
                          style={{
                            background: month === selectedMonth 
                              ? 'linear-gradient(135deg, #c42428, #e83a3e)' 
                              : 'rgba(50, 50, 50, 0.5)',
                            color: month === selectedMonth ? 'white' : 'rgba(255, 255, 255, 0.8)',
                            transform: month === selectedMonth ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: month === selectedMonth 
                              ? '0 0 15px rgba(196, 36, 40, 0.4)' 
                              : 'none',
                          }}
                        >
                          {month.toString().padStart(2, '0')}
                          {month === selectedMonth && (
                            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity and Buy Button */}
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center bg-gray-900/80 rounded-full overflow-hidden border border-gray-700">
                      <button 
                        onClick={decrementTicket}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-amber-300 transition-colors"
                      >
                        −
                      </button>
                      <div className="w-10 h-10 flex items-center justify-center text-white font-medium">
                        {ticketQuantity}
                      </div>
                      <button 
                        onClick={incrementTicket}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-amber-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20">
                      Quick Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements - playing card symbols in the corners */}
            <div className="absolute top-3 left-3 text-3xl text-amber-500/20">♠</div>
            <div className="absolute top-3 right-3 text-3xl text-amber-500/20">♥</div>
            <div className="absolute bottom-3 left-3 text-3xl text-amber-500/20">♣</div>
            <div className="absolute bottom-3 right-3 text-3xl text-amber-500/20">♦</div>
          </div>
        </div>
      </div>
      
      {/* Client-side script for canvas animation */}
      <CanvasScript />
    </div>
  );
}
