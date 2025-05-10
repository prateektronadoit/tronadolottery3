'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

// Canvas-based background effect for the footer
const CryptoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to fullsize
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw crypto symbols
    const cryptoSymbols = [
      { symbol: '₿', color: '#F7931A' }, // Bitcoin
      { symbol: 'Ξ', color: '#627EEA' },  // Ethereum
      { symbol: 'Ł', color: '#345D9D' },  // Litecoin
      { symbol: 'Đ', color: '#C2A633' },  // Dogecoin
      { symbol: '₮', color: '#26A17B' },  // Tether
      { symbol: 'Ꮢ', color: '#23292F' },  // Ripple
      { symbol: '₿', color: '#F7931A' },  // Bitcoin (again)
      { symbol: 'Ξ', color: '#627EEA' }   // Ethereum (again)
    ];
    
    // Floating elements
    const floaters = Array(20).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      size: 10 + Math.random() * 16,
      symbol: cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      opacity: 0.05 + Math.random() * 0.2
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each floating symbol
      floaters.forEach(floater => {
        floater.x += floater.speedX;
        floater.y += floater.speedY;
        floater.rotation += floater.rotationSpeed;
        
        // Wrap around edges
        if (floater.x < -30) floater.x = canvas.width + 30;
        if (floater.x > canvas.width + 30) floater.x = -30;
        if (floater.y < -30) floater.y = canvas.height + 30;
        if (floater.y > canvas.height + 30) floater.y = -30;
        
        // Draw
        ctx.save();
        ctx.translate(floater.x, floater.y);
        ctx.rotate(floater.rotation);
        ctx.font = `${floater.size}px Arial`;
        ctx.fillStyle = floater.symbol.color;
        ctx.globalAlpha = floater.opacity;
        ctx.fillText(floater.symbol.symbol, -floater.size/2, floater.size/2);
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

const CryptoFooter = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-4 overflow-hidden">
      <CryptoBackground />
      <div className="container mx-auto px-4 relative z-10">
        {/* Footer links in a more compact layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3 text-xs">
          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-amber-500">Our Products</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/how-to-play" className="text-gray-300 hover:text-white transition-colors">How to Play</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-amber-500">Information</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/responsible" className="text-gray-300 hover:text-white transition-colors">Play Responsibly</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Lottery Terms</Link></li>
              <li><Link href="/promotions" className="text-gray-300 hover:text-white transition-colors">Promotions</Link></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-amber-500">Contact Us</h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Live Chat 24/7</Link>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@tronadolottery.ae" className="text-gray-300 hover:text-white transition-colors">support@tronadolottery.ae</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <a href="mailto:vip@tronadolottery.ae" className="text-gray-300 hover:text-white transition-colors">vip@tronadolottery.ae</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Middle section with 18+ notice and social icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 border-t border-b border-gray-800 my-2">
          {/* 18+ Notice */}
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-600 flex-shrink-0">
              <span className="text-white text-xs font-bold">18+</span>
            </div>
            <div className="ml-2">
              <p className="text-yellow-400 text-xs font-bold">PLAY RIGHT</p>
              <p className="text-yellow-400 text-xs font-bold">PLAY RESPONSIBLY</p>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-3">
            <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.48 1.5H5.52A4.02 4.02 0 0 0 1.5 5.52v12.96A4.02 4.02 0 0 0 5.52 22.5h12.96a4.02 4.02 0 0 0 4.02-4.02V5.52a4.02 4.02 0 0 0-4.02-4.02zm-7.72 14.4A3.76 3.76 0 0 1 6 12.14a3.76 3.76 0 0 1 3.76-3.76 3.76 3.76 0 0 1 3.76 3.76 3.76 3.76 0 0 1-3.76 3.76zm7.93-9.67a1.39 1.39 0 0 1-1.4-1.4c0-.77.63-1.4 1.4-1.4.77 0 1.4.63 1.4 1.4 0 .77-.63 1.4-1.4 1.4z"/>
              </svg>
            </a>
            <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4.9v14.2A2.9 2.9 0 0 1 19.1 22H4.9A2.9 2.9 0 0 1 2 19.1V4.9A2.9 2.9 0 0 1 4.9 2h14.2A2.9 2.9 0 0 1 22 4.9zM8.6 13.2h2.2v7.2h-2.2v-7.2zm6 7.2h-2.2v-4c0-.9 0-1.6-.9-1.6s-1.1.8-1.1 1.6v4h-2.2v-7.2h2.2v.9c.3-.5 1-.9 2.2-.9 1.5 0 2.2 1 2.2 2.9v4.3zM9.7 11.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"/>
              </svg>
            </a>
            <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.6a9.8 9.8 0 0 1-2.8.8 4.9 4.9 0 0 0 2.1-2.7 9.8 9.8 0 0 1-3.1 1.2 4.9 4.9 0 0 0-8.3 4.5A13.9 13.9 0 0 1 1.7 3.2a4.9 4.9 0 0 0 1.5 6.6A4.9 4.9 0 0 1 1 9v.1a4.9 4.9 0 0 0 3.9 4.8 4.9 4.9 0 0 1-2.2.1 4.9 4.9 0 0 0 4.6 3.4 9.8 9.8 0 0 1-6.1 2.1c-.4 0-.8 0-1.2-.1a13.9 13.9 0 0 0 7.5 2.2c9 0 13.9-7.5 13.9-13.9v-.6a9.5 9.5 0 0 0 2.6-2.5z"/>
              </svg>
            </a>
            <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 7c0-1.8-1.2-3-3-3H4C2.2 4 1 5.2 1 7v10c0 1.8 1.2 3 3 3h16c1.8 0 3-1.2 3-3V7zm-8.9 6L9 16V8l5.1 5z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Legal disclaimer */}
        <div className="text-[10px] text-gray-400 text-center max-w-3xl mx-auto mt-3">
          <p>You must be 18 years or older to register and use this platform. Individuals from restricted jurisdictions are not permitted to register or use this platform.</p>
        </div>
        
        {/* Bottom footer with logo and copyright */}
        <div className="mt-3 pt-2 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center mb-4 md:mb-0 justify-center">
            <Image 
              src="/Logo.png" 
              alt="Tronado Lottery Logo" 
              width={160} 
              height={160} 
              className="mr-3 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]"
            />
            <div className="text-sm">
              {/* Removed Arabic text */}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>© 2025. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
    </footer>
  );
};

export default CryptoFooter;
