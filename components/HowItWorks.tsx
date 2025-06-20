import Image from 'next/image';

const steps = [
  {
    number: 1,
    image: '/1.png',
    title: 'Connect Your Wallet',
    description: 'Connect your MetaMask wallet to the BSC Testnet. Make sure you have some BNB for gas fees and USDT for ticket purchases. It\'s quick and secure!'
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
        {/* First row - 3 pills */}
        <div className="flex flex-wrap justify-center gap-5 w-full">
          {steps.slice(0, 3).map((step, idx) => (
            <div key={idx} className="bg-black rounded-full shadow-xl w-full sm:w-[350px] md:w-[400px] px-8 py-6 flex items-center space-x-4 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 relative">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  width={80} 
                  height={80} 
                  className="object-contain" 
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-purple-400 mb-1">{step.number} - {step.title.toUpperCase()}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Second row - 2 pills */}
        <div className="flex flex-wrap justify-center gap-5 w-full">
          {steps.slice(3, 5).map((step, idx) => (
            <div key={idx + 3} className="bg-black rounded-full shadow-xl w-full sm:w-[350px] md:w-[400px] px-8 py-6 flex items-center space-x-4 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 relative">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  width={80} 
                  height={80} 
                  className="object-contain" 
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-purple-400 mb-1">{step.number} - {step.title.toUpperCase()}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks; 