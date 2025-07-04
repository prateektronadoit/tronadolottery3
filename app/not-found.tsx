'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative text-white page-animated-background">
      {/* Animated background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="page-fluid-animation"></div>
        <div className="page-floating-elements">
          <div className="page-floating-element"></div>
          <div className="page-floating-element"></div>
          <div className="page-floating-element"></div>
          <div className="page-floating-element"></div>
        </div>
        <div className="page-particles">
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
        </div>
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
