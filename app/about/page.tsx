import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-black">
        <h2 className="text-3xl font-bold mb-4 text-amber-500">About Us</h2>
        <p className="max-w-2xl text-center text-lg text-gray-200">
          Experience the future of lottery gaming with transparent, secure, and decentralized draws powered by smart contracts. Tronado Lottery ensures fairness, global access, and instant payouts through the use of the TRDO token. Every draw is openly audited to maintain integrity and trust across the platform.
        </p>
      </main>
      <Footer />
    </div>
  );
} 