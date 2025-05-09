import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';

export default function Header() {
  return (
    <header className="relative bg-cyan-600 text-white">
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
        
        {/* Main navigation */}
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
  );
}
