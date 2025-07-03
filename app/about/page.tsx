import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-black page-animated-background">
        {/* Optimized Animated Background Elements */}
        <div className="page-fluid-animation"></div>
        <div className="page-floating-elements">
          <div className="page-floating-element"></div>
          <div className="page-floating-element"></div>
          <div className="page-floating-element"></div>
          <div className="page-floating-element"></div>
        </div>
        <div className="page-particles">
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
          <div className="page-particle"></div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-amber-500">About Us</h2>
        <div className="max-w-2xl w-full bg-gray-800 border border-amber-500 rounded-lg p-6 text-base text-gray-200 shadow-lg">
          <p className="mb-4 font-semibold">Tronado Lottery - The Future of Decentralized Gaming:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><b>Transparent Gaming:</b> Experience the future of lottery gaming with transparent, secure, and decentralized draws powered by smart contracts.</li>
            <li><b>Fair Play:</b> Tronado Lottery ensures fairness, global access, and instant payouts through the use of the TRDO token.</li>
            <li><b>Open Auditing:</b> Every draw is openly audited to maintain integrity and trust across the platform.</li>
            <li><b>Blockchain Technology:</b> Built on secure blockchain technology for maximum transparency and security.</li>
            <li><b>Global Access:</b> Available to players worldwide with instant access and no geographical restrictions.</li>
            <li><b>Community Driven:</b> Our platform is built for the community, by the community, ensuring fair and transparent gaming.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
} 