import React from 'react';
import Image from 'next/image';
import '../styles/fluid-animation.css';

const Testimonials = () => {
  return (
    <section className="py-16 bg-[#0a0024] fluid-background relative">
      <div className="fluid-animation"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">What Our Winners Say</h2>
          <p className="text-gray-300 text-lg">Real testimonials from our community of winners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-black rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Image 
                src="/bullseye.png" 
                alt="Bullseye Target" 
                width={96} 
                height={96} 
                className="object-contain" 
              />
            </div>
            <p className="text-gray-300 italic mb-6 text-center">
              "I won 5000 USDT in my first week! The transparency and instant payout made me a believer. This is the future of lottery gaming."
            </p>
            <div className="text-center">
              <p className="text-white font-semibold">Alex Chen</p>
              <p className="text-blue-400 text-sm">Winner - Round 47</p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-black rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Image 
                src="/diamond.png" 
                alt="Diamond" 
                width={96} 
                height={96} 
                className="object-contain" 
              />
            </div>
            <p className="text-gray-300 italic mb-6 text-center">
              "Finally, a lottery system I can trust! Being able to verify everything on blockchain gives me complete confidence in the fairness."
            </p>
            <div className="text-center">
              <p className="text-white font-semibold">Sarah Kim</p>
              <p className="text-blue-400 text-sm">Winner - Round 52</p>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-black rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Image 
                src="/rocket.png" 
                alt="Rocket" 
                width={96} 
                height={96} 
                className="object-contain" 
              />
            </div>
            <p className="text-gray-300 italic mb-6 text-center">
              "The user experience is amazing! Simple to use, fast transactions, and when I won, the payout was instant. Love this platform!"
            </p>
            <div className="text-center">
              <p className="text-white font-semibold">Mike Rodriguez</p>
              <p className="text-blue-400 text-sm">Winner - Round 38</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
