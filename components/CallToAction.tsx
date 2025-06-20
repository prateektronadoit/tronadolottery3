import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-blue-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Win Big?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of players who are already winning with the most transparent and fair lottery platform on blockchain. 
            Your next big win is just one click away!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/dashboard" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-900 hover:from-blue-900 hover:to-indigo-950 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200">
              <span className="mr-2">🎯</span> Register Now
            </Link>
            
            <Link href="#how-it-works-section"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white hover:text-blue-950 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200">
              <span className="mr-2">📖</span> Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
