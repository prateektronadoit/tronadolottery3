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
              {/* <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">Frequently Asked Questions</Link></li> */}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-amber-500">Information</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/responsible" className="text-gray-300 hover:text-white transition-colors">Play Responsibly</Link></li>
              {/* <li><Link href="/lottery-terms" className="text-gray-300 hover:text-white transition-colors">Lottery Terms</Link></li> */}
            </ul>
          </div>
          
          {/* Contact Us replacement: Responsible Gaming Notice */}
          <div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-600 flex-shrink-0">
              <span className="text-white text-base font-bold">18+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-yellow-400 text-base font-bold leading-tight">PLAY RIGHT</span>
              <span className="text-yellow-400 text-base font-bold leading-tight">PLAY RESPONSIBLY</span>
            </div>
          </div>
            <div className="mt-2 text-[10px] text-gray-400 max-w-xs">You must be 18 years or older to register and use this platform. Individuals from restricted jurisdictions are not permitted to register or use this platform.</div>
          </div>
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
