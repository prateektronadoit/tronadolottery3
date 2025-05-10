'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyAge() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Check if they've already verified their age
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      router.push('/home');
    }
  }, [router]);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('ageVerified', 'true');
      router.push('/home');
    } else {
      router.push('/404');
    }
  };
  
  const handleNotificationOk = () => {
    setShowNotification(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative text-white">
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button 
              onClick={handleNotificationOk}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" 
              aria-label="Close notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">!</span>
              </div>
            </div>
            
            <h2 className="text-gray-800 text-2xl font-bold text-center mb-4">Notification</h2>
            
            <p className="text-gray-600 text-center mb-8">
              Please note that you have denied the authorization to obtain your location information, which will prevent us from identifying your geographical location in a timely manner. You will, therefore, not be able to engage in any gaming activities. If you want to resolve this issue, please enable the location permission in your browser and refresh the page before trying again.
            </p>
            
            <div className="flex justify-center">
              <button 
                onClick={handleNotificationOk}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-12 rounded-full transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/3d-ship-sailing-blue-ocean.png"
          alt="Ocean Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Image 
          src="/Logo.png" 
          alt="Tronado Lottery Logo" 
          width={150} 
          height={75} 
          className="mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
        />
      </div>
      
      {/* Main Content Container with flex column layout */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 space-y-12 mt-20">
        {/* Hero Text */}
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-3">
            DARE TO IMAGINE!
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg">
            WIN TRDO 100 MILLION
          </h2>
        </div>
        
        {/* Age Verification Box */}
        <div className="text-center px-4 w-full mt-16">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">AGE VERIFICATION</h2>
          <p className="mb-8">You must be 18 years or older to enter this website</p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleVerify(true)}
              className="px-10 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition-colors"
            >
              I am 18 or older
            </button>
            
            <button
              onClick={() => handleVerify(false)}
              className="px-10 py-3 bg-transparent border border-white/50 hover:border-white text-white font-bold rounded-full transition-colors"
            >
              Exit
            </button>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-4 justify-center mt-4 px-4 xs:px-0">
            <div className="flex items-center">
              <div className="bg-red-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-1">18</div>
              <span className="text-xs">PLAY RIGHT BE SAFEGUARDED</span>
            </div>
            <p className="text-xs md:border-l md:border-white/20 md:pl-2">THE GAME L.L.C. - GCGRA Licensed Operator</p>
          </div>
          
          <div className="mt-2 flex flex-col items-center">
            <p className="text-xs text-white/60 max-w-lg mt-4">
              When using this Tronado Lottery website, kindly note that we employ cookies to gather your personal information, ensuring proper website functionality and enhancing the quality of our services for your benefit.
            </p>
            
            {/* <div className="flex gap-4 mt-4">
              <button className="px-4 py-1 rounded-full bg-transparent border border-white/20 text-xs hover:bg-white/10 transition-colors">
                COOKIES POLICY
              </button>
              <button className="px-6 py-1 rounded-full bg-yellow-500 text-black text-xs font-semibold hover:bg-yellow-600 transition-colors">
                ACCEPT ALL
              </button>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Jackpot Numbers removed as requested */}
    </div>
  );
}
