const stats = [
  {
    icon: '🎫',
    value: '50,000',
    label: 'Tickets Sold',
  },
  {
    icon: '🏆',
    value: '1,250',
    label: 'Happy Winners',
  },
  {
    icon: '💰',
    value: '500,000',
    label: 'USDT Distributed',
  },
  {
    icon: '🎰',
    value: '125',
    label: 'Rounds Completed',
  },
];

const PlatformStatistics = () => (
  <section className="py-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-green-400/20 hover:shadow-2xl transition-all">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold mb-1 text-green-400">{stat.value}</div>
            <div className="text-base text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PlatformStatistics; 