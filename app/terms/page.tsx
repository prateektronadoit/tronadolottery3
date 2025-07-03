import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
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
        
        <h2 className="text-3xl font-bold mb-4 text-amber-500">Terms & Conditions</h2>
       
        <div className="max-w-2xl w-full bg-gray-800 border border-amber-500 rounded-lg p-6 text-base text-gray-200 shadow-lg mt-6">
          <p className="mb-4">By using Tronado Lottery, you agree to the following:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><b>Eligibility:</b> You must be 18+ and allowed by law to participate in lotteries in your location.</li>
            <li><b>Blockchain-Based:</b> All draws and payouts are processed using smart contracts on the blockchain.</li>
            <li><b>No Refunds:</b> All ticket purchases are final and non-refundable.</li>
            <li><b>Prize Distribution:</b> Winners receive 85% of their prize. The rest is shared with their sponsor chain.</li>
            <li><b>Sponsor System:</b> You may earn from downline activity through a 10-level sponsor system.</li>
            <li><b>No Guarantees:</b> Winnings are random and not guaranteed.</li>
            <li><b>Play Responsibly:</b> Only play with funds you can afford to lose.</li>
            <li><b>Legal Compliance:</b> You are responsible for ensuring your participation is legal in your country.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
} 