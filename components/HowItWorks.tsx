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
  <section className="py-16 bg-gradient-to-b from-black via-blue-900/20 to-black text-white" id="how-it-works-section">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-black rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-purple-400/30 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-400 text-black font-bold text-xl mb-4 group-hover:bg-purple-300 group-hover:scale-110 transition-all duration-300">{step.number}</div>
            <div className="w-32 h-32 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Image 
                src={step.image} 
                alt={step.title} 
                width={160} 
                height={160} 
                className="w-full h-full object-contain" 
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-300">{step.title}</h3>
            <p className="text-gray-300 text-base">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks; 