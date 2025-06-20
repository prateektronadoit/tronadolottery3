import { motion } from 'framer-motion';

const stats = [
  {
    icon: '🎫',
    value: '50,000',
    label: 'Tickets Sold',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    icon: '🏆',
    value: '1,250',
    label: 'Happy Winners',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: '💰',
    value: '500,000',
    label: 'USDT Distributed',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: '🎰',
    value: '125',
    label: 'Rounds Completed',
    color: 'from-amber-500 to-orange-600'
  },
];

const PlatformStatistics = () => {
  // Animation variants for the section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-r from-black via-[#0F0448] to-black text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Platform Statistics
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 max-w-6xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-gradient-to-br from-[#120d32] to-[#0c0424] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(123,104,238,0.4)]"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStatistics; 