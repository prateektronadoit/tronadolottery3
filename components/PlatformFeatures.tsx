const features = [
  {
    icon: '🔒',
    title: '100% Transparent',
    description: 'All draws are conducted on-chain using verifiable smart contracts. No hidden algorithms, no manipulation - pure transparency that you can verify yourself.'
  },
  {
    icon: '⚡',
    title: 'Instant Payouts',
    description: 'Winners receive payouts automatically through smart contracts. No waiting, no paperwork, no delays - just instant rewards delivered to your wallet.'
  },
  {
    icon: '🌍',
    title: 'Global Access',
    description: 'Play from anywhere in the world with just a crypto wallet. No geographical restrictions, no complex verification - accessible to everyone.'
  },
  {
    icon: '💰',
    title: 'Low Fees',
    description: 'Powered by BSC network for minimal transaction costs. More of your money goes toward prizes, not fees - maximizing your winning potential.'
  },
  {
    icon: '🎯',
    title: 'Provably Fair',
    description: 'Our drawing mechanism is provably fair and verifiable on blockchain. Every ticket has an equal chance - no house edge, just pure luck.'
  },
  {
    icon: '📱',
    title: 'Mobile Optimized',
    description: 'Seamlessly optimized for all devices. Buy tickets, check results, and claim prizes effortlessly on mobile, tablet, or desktop.'
  },
];

const PlatformFeatures = () => (
  <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Why Choose <span className="text-blue-400">CryptoLottery?</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-blue-500/20 hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PlatformFeatures; 