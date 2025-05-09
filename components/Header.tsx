import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <>
      {/* Mobile Navigation Bar - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-cyan-600 z-50 shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
          <Link href="/home" className="flex items-center">
            <Image 
              src="/Logo.png" 
              alt="Tronado Lottery Logo" 
              width={40} 
              height={40} 
            />
            <div className="ml-2 text-white">
              <div className="font-bold text-base uppercase">THE TRONADO</div>
              <div className="text-xs uppercase">LOTTERY</div>
            </div>
          </Link>
          
          {/* Mobile menu toggle button with enhanced styling */}
          <button 
            className="text-white focus:outline-none p-2 rounded hover:bg-cyan-500/40 transition-colors" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'}`}></span>
              <span className={`absolute block h-0.5 bg-white transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-6 top-3'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'}`}></span>
            </div>
          </button>
        </div>
        
        {/* Mobile dropdown menu - with improved animation and visibility */}
        <div 
          className={`bg-cyan-700 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[80vh] opacity-100 border-b border-cyan-500' : 'max-h-0 opacity-0'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="px-4 py-5 space-y-4 shadow-inner">
            <nav>
              <ul className="space-y-4">
                <li className="relative">
                  <Link href="#" className="flex items-center justify-between py-2 px-3 text-white hover:text-yellow-300 hover:bg-cyan-600 transition-all rounded-md font-medium group">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 mr-3 group-hover:bg-yellow-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span>Play Now</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center py-2 px-3 text-white hover:text-yellow-300 hover:bg-cyan-600 transition-all rounded-md font-medium group">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 mr-3 group-hover:bg-yellow-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span>Results & Draws</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center py-2 px-3 text-white hover:text-yellow-300 hover:bg-cyan-600 transition-all rounded-md font-medium group">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 mr-3 group-hover:bg-yellow-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>FAQs</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center py-2 px-3 text-white hover:text-yellow-300 hover:bg-cyan-600 transition-all rounded-md font-medium group">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 mr-3 group-hover:bg-yellow-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span>Play Responsibly</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="flex flex-wrap items-center gap-3 py-4 mt-2 border-t border-cyan-600">
              <button className="flex items-center text-sm bg-transparent px-3 py-2 rounded border border-white/30 hover:bg-white/10 transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>En</span>
              </button>
              
              <button className="bg-transparent border border-white/70 hover:bg-white/10 text-white px-4 py-2 rounded transition-colors text-sm">
                Login
              </button>
              
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden md:block relative bg-cyan-600 text-white">
        {/* Background image carousel */}
        <div className="absolute inset-0 z-0 opacity-20">
          <ImageCarousel 
            images={[
              { src: "/3d-ship-sailing-blue-ocean.png", alt: "Sailing ship" },
              { src: "/offshore-industry-oil-gas-production-platform.png", alt: "Offshore Oil Platform" }
            ]}
            interval={8000}
          />
        </div>
        
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
          {/* Logo and brand name */}
          <Link href="/home" className="flex items-center">
            <Image 
              src="/Logo.png" 
              alt="Tronado Lottery Logo" 
              width={50} 
              height={50} 
            />
            <div className="ml-2">
              <div className="font-bold text-lg uppercase">THE TRONADO</div>
              <div className="text-xs uppercase">LOTTERY</div>
            </div>
          </Link>
          
          {/* Main navigation for desktop */}
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li className="relative group">
                  <Link href="#" className="flex items-center py-1 hover:text-yellow-300 transition-colors font-medium">
                    <span>Play</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-600 hover:text-white">
                        Lucky Day Lottery
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-600 hover:text-white">
                        Scratch Cards
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-600 hover:text-white">
                        Special Draws
                      </Link>
                    </div>
                  </div>
                </li>
                <li><Link href="#" className="py-1 hover:text-yellow-300 transition-colors font-medium">Draws</Link></li>
                <li><Link href="#" className="py-1 hover:text-yellow-300 transition-colors font-medium">FAQs</Link></li>
                <li><Link href="#" className="py-1 hover:text-yellow-300 transition-colors font-medium">Play Responsibly</Link></li>
              </ul>
            </nav>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-sm bg-transparent px-2 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>En</span>
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
      </header>
      
      {/* Mobile Header Spacer - Creates space for fixed header on mobile */}
      <div className="md:hidden h-[64px]"></div>
      
      {/* Mobile menu overlay background - darkens the rest of the page when menu is open */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}
