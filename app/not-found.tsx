'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative text-white">
      {/* Background with gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--tronado-dark)] bg-opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-indigo-900/40 to-black/70"></div>
        
        {/* Light particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Light ray from top */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[120%] h-[40%] bg-gradient-to-b from-blue-300/20 to-transparent rotate-180 opacity-50 rounded-full blur-2xl"></div>
      </div>
      
      {/* Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Image 
          src="/Logo.png" 
          alt="Tronado Lottery Logo" 
          width={160} 
          height={160} 
          className="mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
        />
        <div className="text-center mt-2">
          <h1 className="text-xl font-bold text-yellow-400">TRONADO LOTTERY</h1>
          {/* Removed Arabic text */}
        </div>
      </div>
      
      {/* Access Denied Content */}
      <div className="relative z-10 text-center px-4 mx-auto max-w-md">
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">ACCESS DENIED</h2>
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl">18+</div>
          </div>
          <p className="mb-8 text-lg">
            This content is only available to users who are 18 years or older.
          </p>
          
          <Link href="/verify-age">
            <div className="inline-block px-10 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition-colors">
              Return to Age Verification
            </div>
          </Link>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-red-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-1">18</div>
          <span className="text-xs">PLAY RIGHT BE SAFEGUARDED</span>
        </div>
        {/* <p className="text-xs text-white/60">
          THE GAME L.L.C. - GCGRA Licensed Operator
        </p> */}
      </div>
    </div>
  );
}
