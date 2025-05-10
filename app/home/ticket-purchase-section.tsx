'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

// Canvas-based background effect component for the ticket purchase section
const LotteryBackgroundEffect = ({ className = '' }: { className?: string }) => {
  return (
    <canvas 
      id="lotteryCanvas"
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
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
        const particleCount = 30;
        
        // Gold color palette
        const goldColors = [
          '#FFD700', // Gold
          '#F5DEB3', // Wheat
          '#DAA520', // GoldenRod
          '#B8860B', // DarkGoldenRod
          '#CD7F32'  // Bronze
        ];
        
        class Particle {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = goldColors[Math.floor(Math.random() * goldColors.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01;
            this.opacity = Math.random() * 0.6 + 0.2;
            
            // Random shapes: circle, diamond, card suits, etc.
            const shapes = ['circle', 'diamond', 'spade', 'heart', 'club', 'star'];
            this.shape = shapes[Math.floor(Math.random() * shapes.length)];
          }
          
          update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Wrap around the screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
          }
          
          draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            
            switch (this.shape) {
              case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
                break;
              case 'diamond':
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size, 0);
                ctx.lineTo(0, this.size);
                ctx.lineTo(-this.size, 0);
                ctx.closePath();
                ctx.fill();
                break;
              case 'spade':
                drawCardSymbol('spade', this.size);
                break;
              case 'heart':
                drawCardSymbol('heart', this.size);
                break;
              case 'club':
                drawCardSymbol('club', this.size);
                break;
              case 'star':
                drawStar(0, 0, 5, this.size, this.size/2);
                break;
            }
            
            ctx.restore();
          }
        }
        
        // Helper function to draw a star
        function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
          let rot = Math.PI / 2 * 3;
          let x = cx;
          let y = cy;
          const step = Math.PI / spikes;
          
          ctx.beginPath();
          
          for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          
          ctx.closePath();
          ctx.fill();
        }
        
        // Helper function to draw card symbols
        function drawCardSymbol(symbol, size) {
          const scale = size / 10;
          
          if (symbol === 'heart') {
            ctx.beginPath();
            ctx.moveTo(0, 2 * scale);
            ctx.bezierCurveTo(0, 0, -5 * scale, -3 * scale, -10 * scale, 2 * scale);
            ctx.bezierCurveTo(-10 * scale, 8 * scale, 0, 12 * scale, 0, 12 * scale);
            ctx.bezierCurveTo(0, 12 * scale, 10 * scale, 8 * scale, 10 * scale, 2 * scale);
            ctx.bezierCurveTo(10 * scale, -3 * scale, 5 * scale, 0, 0, 2 * scale);
            ctx.fill();
          } else if (symbol === 'spade') {
            ctx.beginPath();
            ctx.moveTo(0, -10 * scale);
            ctx.bezierCurveTo(5 * scale, -5 * scale, 10 * scale, 0, 10 * scale, 5 * scale);
            ctx.bezierCurveTo(10 * scale, 10 * scale, 5 * scale, 10 * scale, 0, 5 * scale);
            ctx.bezierCurveTo(-5 * scale, 10 * scale, -10 * scale, 10 * scale, -10 * scale, 5 * scale);
            ctx.bezierCurveTo(-10 * scale, 0, -5 * scale, -5 * scale, 0, -10 * scale);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, 5 * scale);
            ctx.lineTo(3 * scale, 12 * scale);
            ctx.lineTo(-3 * scale, 12 * scale);
            ctx.closePath();
            ctx.fill();
          } else if (symbol === 'club') {
            ctx.beginPath();
            ctx.arc(-5 * scale, -5 * scale, 5 * scale, 0, Math.PI * 2);
            ctx.arc(5 * scale, -5 * scale, 5 * scale, 0, Math.PI * 2);
            ctx.arc(0, 5 * scale, 5 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(3 * scale, 12 * scale);
            ctx.lineTo(-3 * scale, 12 * scale);
            ctx.closePath();
            ctx.fill();
          }
        }
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
        
        // Animation loop
        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw gradient background
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
          gradient.addColorStop(1, 'rgba(30, 30, 30, 0.8)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add some faded gold lines
          ctx.strokeStyle = 'rgba(218, 165, 32, 0.15)';
          ctx.lineWidth = 2;
          
          // Horizontal lines
          for (let i = 0; i < canvas.height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
          }
          
          // Vertical lines
          for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
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
                <div className="md:col-span-4 bg-black/60 backdrop-blur-sm p-5 rounded-lg border border-amber-900/30 flex flex-col items-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-black to-gray-900 border border-amber-700/30">
                    <Image 
                      src="/jackpot-icon.svg" 
                      alt="Jackpot" 
                      width={64} 
                      height={64}
                      className="object-contain"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGRDcwMCI+PHBhdGggZD0iTTEyIDJsMS44NSA2LjhIMjBsLTUuMjMgMy44IDIgNi44TDEyIDE1LjhsLTQuNzcgMy44IDItNi44TDQgOC44aDYuMTVMMTIgMnoiLz48L3N2Zz4=';
                      }}
                    />
                  </div>
                  
                  <h3 className="text-center text-xl font-bold text-gray-300 mb-1">JACKPOT</h3>
                  <p className="text-center text-lg font-bold text-amber-500 mb-4">TRDO</p>
                  <p className="text-center text-4xl md:text-5xl font-bold text-amber-500 mb-2">100,000,000</p>
                  
                  <div className="mt-4 py-1 px-4 rounded-full bg-amber-900/30 border border-amber-700/50">
                    <p className="text-center text-sm text-amber-300">Guaranteed Lucky Chance Draw</p>
                  </div>
                  
                  <p className="mt-4 text-center text-sm text-amber-500">TRDO 100,000 * 7 Winners</p>
                  <p className="mt-2 text-center text-xs text-gray-400">1 Entry for TRDO 50</p>
                  
                  <button className="mt-6 w-full py-3 rounded-md bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 transition-colors text-black font-bold">
                    PLAY
                  </button>
                </div>
                
                {/* Right Column - Ticket Selection */}
                <div className="md:col-span-8 rounded-lg border border-gray-800 bg-black/30 backdrop-blur-sm p-5">
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
