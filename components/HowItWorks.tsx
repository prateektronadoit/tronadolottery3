import Image from 'next/image';

const steps = [
  {
    number: 1,
    image: '/1.png',
    title: 'Connect Your Wallet',
    description: 'Connect your MetaMask wallet to Polygon Mainnet. Make sure you have some MATIC for gas fees and USDT for ticket purchases. It\'s quick and secure!'
  },
  {
    number: 2,
    image: '/2.png',
    title: 'Approve USDT',
    description: 'Approve USDT spending for the lottery contract. This is a one-time approval that allows you to purchase multiple tickets without repeated approvals.'
  },
  {
    number: 3,
    image: '/9.png',
    title: 'Buy Tickets',
    description: 'Choose your round and select how many tickets to buy (1-10 per transaction). Each ticket gives you a chance to win amazing prizes in the draw.'
  },
  {
    number: 4,
    image: '/11.png',
    title: 'Wait for Draw',
    description: 'Once all tickets are sold, the smart contract automatically conducts a fair and transparent draw to select winners. Everything is verifiable on-chain.'
  },
  {
    number: 5,
    image: '/12.png',
    title: 'Claim Prizes',
    description: 'If you win, claim your prize directly from the smart contract. Winners are automatically eligible for instant payouts - no waiting, no hassle.'
  },
];

const HowItWorks = () => (
  <section className="py-16 bg-transparent text-white" id="how-it-works-section">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        How It Works
      </h2>
      
      <div className="flex flex-col items-center gap-6 max-w-6xl mx-auto">
        {/* Mobile view - vertical layout */}
        <div className="sm:hidden flex flex-col items-center space-y-14 px-4">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center w-full"
            >
              <div className="bg-black rounded-full shadow-xl w-[320px] h-[320px] flex flex-col items-center justify-between py-8 text-center border border-blue-500/30 relative">
                <div className="mt-2">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent px-2">
                    {step.number} - {step.title.toUpperCase()}
                  </h3>
                </div>
                
                <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    width={100} 
                    height={100} 
                    className="object-contain" 
                  />
                </div>
                
                <div className="px-6 max-w-[240px] mb-6">
                  <p className="text-gray-300 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop view - horizontal layout */}
        <div className="hidden sm:flex flex-col items-center gap-6 max-w-6xl mx-auto">
          {/* First row - 3 pills */}
          <div className="flex flex-wrap justify-center gap-5 w-full">
            {steps.slice(0, 2).map((step, idx) => (
              <div key={idx} className="bg-black rounded-full shadow-xl w-full sm:w-[450px] md:w-[550px] px-12 py-6 flex items-center space-x-4 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
                <div className="flex-shrink-0 w-24 h-24 relative mt-[-10px]">
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    width={120} 
                    height={120} 
                    className="object-contain translate-y-[-5px]" 
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-blue-400 mb-1">{step.number} - {step.title.toUpperCase()}</h3>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
            
            {/* Step 3 - Buy Tickets - Higher and Bigger */}
            <div className="bg-black rounded-full shadow-xl w-full sm:w-[480px] md:w-[580px] px-12 py-7 flex items-center space-x-4 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 mt-[-15px]">
              <div className="flex-shrink-0 w-28 h-28 relative mt-[-15px]">
                <Image 
                  src={steps[2].image} 
                  alt={steps[2].title} 
                  width={140} 
                  height={140} 
                  className="object-contain translate-y-[-10px]" 
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-blue-400 mb-1">{steps[2].number} - {steps[2].title.toUpperCase()}</h3>
                <p className="text-gray-300 text-sm">{steps[2].description}</p>
              </div>
            </div>
          </div>
          
          {/* Second row - 2 pills */}
          <div className="flex flex-wrap justify-center gap-5 w-full">
            {/* Step 4 - Wait for Draw - Bigger and Higher */}
            <div className="bg-black rounded-full shadow-xl w-full sm:w-[480px] md:w-[580px] px-12 py-7 flex items-center space-x-4 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 mt-[-10px]">
              <div className="flex-shrink-0 w-28 h-28 relative mt-[-15px]">
                <Image 
                  src={steps[3].image} 
                  alt={steps[3].title} 
                  width={140} 
                  height={140} 
                  className="object-contain translate-y-[-10px]" 
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-blue-400 mb-1">{steps[3].number} - {steps[3].title.toUpperCase()}</h3>
                <p className="text-gray-300 text-sm">{steps[3].description}</p>
              </div>
            </div>
            
            {/* Step 5 - Claim Prizes - Lower */}
            <div className="bg-black rounded-full shadow-xl w-full sm:w-[450px] md:w-[550px] px-12 py-6 flex items-center space-x-4 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 mt-[10px]">
              <div className="flex-shrink-0 w-24 h-24 relative mt-[-5px]">
                <Image 
                  src={steps[4].image} 
                  alt={steps[4].title} 
                  width={120} 
                  height={120} 
                  className="object-contain" 
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-blue-400 mb-1">{steps[4].number} - {steps[4].title.toUpperCase()}</h3>
                <p className="text-gray-300 text-sm">{steps[4].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* YouTube Video Button */}
      <div className="flex justify-center mt-12">
        <a 
          href="https://www.youtube.com/watch?v=KPXSjLRbKsI&t=1s" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-red-500/30"
        >
          <svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Watch How It Works Video
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;