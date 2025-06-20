import Image from 'next/image';
import HowItWorks from './HowItWorks';

const features = [
  {
    icon: '/8.png',
    title: '100% Transparent',
    description: 'All draws are conducted on-chain using verifiable smart contracts. No hidden algorithms, no manipulation - pure transparency that you can verify yourself.'
  },
  {
    icon: '/7.png',
    title: 'Instant Payouts',
    description: 'Winners receive payouts automatically through smart contracts. No waiting, no paperwork, no delays - just instant rewards delivered to your wallet.'
  },
  {
    icon: '/6.png',
    title: 'Global Access',
    description: 'Play from anywhere in the world with just a crypto wallet. No geographical restrictions, no complex verification - accessible to everyone.'
  },
  {
    icon: '/5.png',
    title: 'Low Fees',
    description: 'Powered by BSC network for minimal transaction costs. More of your money goes toward prizes, not fees - maximizing your winning potential.'
  },
  {
    icon: '/4.png',
    title: 'Provably Fair',
    description: 'Our drawing mechanism is provably fair and verifiable on blockchain. Every ticket has an equal chance - no house edge, just pure luck.'
  },
  {
    icon: '/3.png',
    title: 'Mobile Optimized',
    description: 'Seamlessly optimized for all devices. Buy tickets, check results, and claim prizes effortlessly on mobile, tablet, or desktop.'
  },
];

const PlatformFeatures = () => (
  <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image 
        src="/bg2.png" 
        alt="Background" 
        fill 
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
    
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Why Choose <span className="text-blue-400">CryptoLottery?</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div key={feature.title} className="bg-black rounded-2xl p-4 md:p-8 flex flex-col items-center text-center border border-blue-500/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-blue-500/20">
            <div className="relative w-24 h-32 md:w-40 md:h-64 mb-0">
              <Image
                src={feature.icon}
                alt={feature.title}
                fill
                className={`object-contain ${feature.icon === '/3.png' ? 'mt-0 -translate-y-3' : 'mt-2'}`}
              />
            </div>
            <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 -mt-2 md:-mt-6">{feature.title}</h3>
            <p className="text-gray-300 text-xs md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
      
      {/* How It Works Section */}
      <div className="mt-20">
        <HowItWorks />
      </div>
    </div>
  </section>
);

export default PlatformFeatures; 