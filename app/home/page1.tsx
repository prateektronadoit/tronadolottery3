'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { ConnectButton } from '@rainbow-me/rainbowkit';
// import styles from './wheel.module.css';
import PlatformFeatures from '@/components/PlatformFeatures';
import HowItWorks from '@/components/HowItWorks';
import PlatformStatistics from '@/components/PlatformStatistics';

export default function HomePage() {
  // Router for home page redirect
  const router = useRouter();


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Redirect if necessary (using asPath instead of pathname in App Router)
  useEffect(() => {
    // Only redirect if needed
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      router.push('/home');
    }
    setIsAuthenticated(!!localStorage.getItem('token'));
    const handleStorage = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [router]);

 


  const handleRegisterClick = () => {
    router.push('/register');
  };

  // Animation for BLOCKCHAIN LOTTERY color
  const [isPurple, setIsPurple] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPurple(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Full screen hero section with carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Building Background */}
        <div className="absolute inset-0 z-0">
          <Image src="/ibg.png" alt="Background" fill style={{ objectFit: 'cover' }} priority />
        </div>

        

        {/* Coin decorations */}
        {/* Left Bottom Coin */}
        <div className="absolute left-0 bottom-0 z-30 mb-8 ml-4">
          <Image src="/coinL.png" alt="Coin Left" width={700} height={700} className="hidden sm:block w-[32rem] h-[32rem] md:w-[44rem] md:h-[44rem] lg:w-[56rem] lg:h-[56rem]" />
          <Image src="/coinL.png" alt="Coin Left" width={320} height={320} className="block sm:hidden w-64 h-64" />
        </div>
        {/* Right Top Coin */}
        <div className="absolute right-0 top-0 z-30 mt-8 mr-4">
          <Image src="/coinR.png" alt="Coin Right" width={700} height={700} className="hidden sm:block w-[32rem] h-[32rem] md:w-[44rem] md:h-[44rem] lg:w-[56rem] lg:h-[56rem]" />
          <Image src="/coinR.png" alt="Coin Right" width={320} height={320} className="block sm:hidden w-64 h-64" />
        </div>
        {/* Center Top Coin above heading */}
        <div className="absolute left-1/2 z-30" style={{ top: '0%', transform: 'translateX(-50%)' }}>
          <Image src="/coinM.png" alt="Coin Middle" width={600} height={600} className="hidden sm:block w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] lg:w-[52rem] lg:h-[52rem]" />
          <Image src="/coinM.png" alt="Coin Middle" width={260} height={260} className="block sm:hidden w-52 h-52" />
        </div>
        
        {/* Animated sphere1 at bottom left */}
        <div className="absolute left-0 bottom-0 z-40 mb-12 ml-8">
  <Image 
    src="/circle1.png" 
    alt="cicrle 1" 
    width={400} 
    height={500} 
    className="w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] lg:w-[36rem] " 
  />
</div>



        
        {/* Transparent header overlaid on carousel */}
        <div className="absolute top-0 left-0 right-0 z-20 w-full">
          <Header />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <span className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest text-white mb-2 text-center mt-8 drop-shadow-lg" style={{textShadow: '0 8px 24px rgba(0,0,0,0.5)'}}>WIN BIG WITH</span>
              <span
                className={`uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold italic text-center transition-all duration-1000 ${isPurple ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent' : 'text-white'}`}
              >
                BLOCKCHAIN LOTTERY
              </span>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-10">
            Experience the future of lottery gaming with transparent, secure, and decentralized draws powered by smart contracts
            </p>
            <div className="flex flex-row gap-6 justify-center w-full max-w-xl mt-4 relative">
              <button
                className="flex items-center justify-center bg-[#0F0448] hover:bg-blue-400 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => {
                  const howItWorksSection = document.getElementById('how-it-works-section');
                  if (howItWorksSection) howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="mr-2 text-2xl">🎯</span> How It Works
              </button>
              <button
                className="flex items-center justify-center bg-[#0F0448] hover:bg-blue-400 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => {
                  const ticketSection = document.querySelector('section.bg-gray-900');
                  if (ticketSection) ticketSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="mr-2 text-2xl">🎫</span> Buy Tickets Now
              </button>
              {/* Sphere2 to the right of the buttons */}
              <div className="absolute right-[-10rem] top-1/2 -translate-y-1/2 z-40 rounded-full overflow-hidden">
                <Image src="/circle2.png" alt="Sphere 2" width={400} height={400} className="w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] object-cover" />
              </div>
          </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Section */}
      <PlatformStatistics />

      {/* Platform Features Section */}
      <PlatformFeatures />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Mobile-only heading - "going above" */}
      {/* <div className="md:hidden relative z-20 bg-gradient-to-r from-[var(--tronado-gold)] to-yellow-500 py-3 px-4 text-center">
        <h2 className="text-2xl font-bold text-[var(--tronado-dark)] uppercase tracking-wider">going above</h2>
      </div> */}


      
      <Footer />

      {/* Custom animation for slow spin */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 16s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

