import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/fluid-animation.css';

const CallToAction = () => {
  return (
    <section className="py-16 bg-[#0a0024] fluid-background relative">
      <div className="fluid-animation"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Win Big?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of players who are already winning with the most transparent and fair lottery platform on blockchain. 
            Your next big win is just one click away!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/dashboard?section=purchase" 
              className="inline-flex items-center justify-center bg-[#ffa200] hover:bg-[#ffb733] text-white font-bold py-4 px-8 rounded-full text-xl shadow-[0_4px_16px_rgba(255,162,0,0.5)] border border-[#ffa200] hover:border-[#ffb733] transition-all duration-300 cursor-pointer group">
              <span className="text-2xl mr-3 group-hover:text-yellow-200 transition-colors duration-300">🎫</span>
              <span className="group-hover:text-yellow-200 transition-colors duration-300">Buy Tickets Now</span>
            </Link>
            
            <Link href="/dashboard" 
              className="inline-flex items-center justify-center bg-[#16072d] hover:bg-[#291352] text-white font-bold py-4 px-8 rounded-full text-xl shadow-[0_4px_16px_rgba(156,25,233,0.5)] border border-[#3d2b59] hover:border-purple-500 transition-all duration-300 cursor-pointer group">
              <span className="text-2xl mr-3 group-hover:text-purple-300 transition-colors duration-300">🎯</span>
              <span className="group-hover:text-purple-300 transition-colors duration-300">Register Now</span>
            </Link>
            
            <Link href="#how-it-works-section"
              className="inline-flex items-center justify-center bg-transparent border-2 border-purple-400 hover:bg-[#291352] text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 group hover:border-purple-300">
              <span className="text-2xl mr-3 group-hover:text-purple-300 transition-colors duration-300">📖</span>
              <span className="group-hover:text-purple-300 transition-colors duration-300">Learn More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
