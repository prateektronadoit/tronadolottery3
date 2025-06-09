import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [playDropdownOpen, setPlayDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('En');
  const [websiteLanguage, setWebsiteLanguage] = useState('english'); // 'english' or 'dubai'
  const [scrolled, setScrolled] = useState(false);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);
  const desktopLangDropdownRef = useRef<HTMLDivElement>(null);
  const playDropdownRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
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

  // Add scroll event listener to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the hero section (height of the viewport)
      const isScrolled = window.scrollY > window.innerHeight - 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // Close dropdowns when clicking outside - only needed for play dropdown now
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {      
      if (playDropdownRef.current && !playDropdownRef.current.contains(event.target as Node)) {
        setPlayDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    setAuth(!!localStorage.getItem('token'));
    // Listen for storage changes (e.g., logout from another tab)
    const handleStorage = () => setAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
    // Close other dropdown if open
    if (playDropdownOpen) setPlayDropdownOpen(false);
  };
  
  const togglePlayDropdown = () => {
    setPlayDropdownOpen(!playDropdownOpen);
    // Close other dropdown if open
    if (languageDropdownOpen) setLanguageDropdownOpen(false);
  };
  
  const changeLanguage = (lang: string, langCode: string) => {
    setSelectedLanguage(lang);
    setWebsiteLanguage(langCode);
    setLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    setProfileMenuOpen(false);
    disconnect();
    router.push('/home');
  };

  return (
    <>
      {/* Mobile Navigation Bar - Only visible on mobile */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--tronado-dark)]/90 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center px-4 py-3">
          <Link href="/home" className="flex items-center">
            <Image 
              src="/Logo.png" 
              alt="Tronado Lottery Logo" 
              width={150} 
              height={150} 
              className="drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-transform hover:scale-105 duration-300"
            />
            <div className="ml-2 text-white">
              <div className="font-bold text-base"></div>
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
          className={`bg-cyan-700/90 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
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
            
            <div className="flex flex-wrap items-center justify-between w-full gap-3 py-4 mt-2 border-t border-cyan-600">
              {/* Register Now Button for Mobile or Profile Icon */}
              {!auth ? (
                <button 
                  className="w-full bg-[var(--tronado-gold)] hover:bg-[var(--tronado-gold-hover)] text-[var(--tronado-dark)] font-medium py-2 px-4 rounded-md shadow transition-all duration-200 flex items-center justify-center"
                  onClick={() => router.push('/register')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Register Now
                </button>
              ) : (
                <div className="relative flex flex-col items-center w-full gap-2">
                  <button
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center focus:outline-none border-2 border-[var(--tronado-gold)]"
                    onClick={() => setProfileMenuOpen((open) => !open)}
                    aria-label="Profile"
                  >
                    <Image src="/profile.png" alt="Profile" width={32} height={32} className="rounded-full object-cover" />
                  </button>
                  <div className="mt-2 w-full flex justify-center">
                    <ConnectButton />
                  </div>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-30 py-2">
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
                        onClick={() => setProfileMenuOpen(false)}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                      {isConnected && address ? (
                        <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-800">
                          <span className="block font-mono truncate">{address}</span>
                        </div>
                      ) : null}
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Navigation Bar - Only visible on desktop */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--tronado-dark)]/90 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/home" className="flex items-center">
              <Image 
                src="/Logo.png" 
                alt="Tronado Lottery Logo" 
                width={130} 
                height={130} 
                className="drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-transform hover:scale-105 duration-300"
              />
            </Link>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li className="relative" ref={playDropdownRef}>
                  <button 
                    onClick={togglePlayDropdown}
                    className="flex items-center py-1 hover:text-[var(--tronado-gold)] active:text-[var(--tronado-gold)] transition-colors font-medium bg-transparent focus:outline-none text-white"
                    aria-expanded={playDropdownOpen}
                  >
                    <span>Play</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`absolute left-0 mt-2 w-48 bg-[var(--tronado-dark)] rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200 ${playDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  >
                    <div className="py-1">
                      <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-[var(--tronado-gold)] hover:text-[var(--tronado-dark)]">
                        Lucky Day Lottery
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-[var(--tronado-gold)] hover:text-[var(--tronado-dark)]">
                        Scratch Cards
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-[var(--tronado-gold)] hover:text-[var(--tronado-dark)]">
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
            
            <div className="flex items-center space-x-4 ml-auto">
              {/* Register Now Button for Desktop or Profile Icon */}
              {!auth ? (
                <button 
                  className="bg-[var(--tronado-gold)] hover:bg-[var(--tronado-gold-hover)] text-[var(--tronado-dark)] font-medium py-2 px-4 rounded-md shadow transition-all duration-200 flex items-center justify-center"
                  onClick={() => router.push('/register')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Register Now
                </button>
              ) : (
                <div className="relative flex flex-col items-center gap-2">
                  <button
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center focus:outline-none border-2 border-[var(--tronado-gold)]"
                    onClick={() => setProfileMenuOpen((open) => !open)}
                    aria-label="Profile"
                  >
                    <Image src="/profile.png" alt="Profile" width={32} height={32} className="rounded-full object-cover" />
                  </button>
                  <div className="mt-2 w-full flex justify-center">
                    <ConnectButton />
                  </div>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-30 py-2">
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
                        onClick={() => setProfileMenuOpen(false)}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                      {isConnected && address ? (
                        <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-800">
                          <span className="block font-mono truncate">{address}</span>
                        </div>
                      ) : null}
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Header Spacer - Creates space for fixed header on mobile */}
      <div className="md:hidden h-[64px]"></div>
    </>
  );
}
