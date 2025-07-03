import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HowToPlayPage() {
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
        
        <h2 className="text-3xl font-bold mb-4 text-amber-500">How to Play</h2>
        <div className="max-w-2xl w-full bg-gray-800 border border-amber-500 rounded-lg p-6 text-base text-gray-200 shadow-lg">
          <p className="mb-4 font-semibold">Follow these simple steps to start playing:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li><b>Connect Your Wallet:</b> Link your crypto wallet (e.g., MetaMask) to the Tronado platform.</li>
            <li><b>Approve TRDO:</b> Authorize the use of TRDO tokens to buy lottery tickets.</li>
            <li><b>Age Verification:</b> Confirm that you're 18+ before accessing the dashboard.</li>
            <li><b>Buy Tickets:</b> Choose how many tickets to purchase and view them under "My Tickets".</li>
            <li><b>Check Results:</b> View your ranks and prize claims in the "Claim" section.</li>
            <li><b>Claim Rewards:</b> If you've won, claim your rewards directly in the dashboard interface.</li>
          </ol>
          <p className="text-sm text-gray-400">
            <b>Note:</b> Ticket rank logic and prize distribution are outlined clearly for full transparency (e.g., Rank 1 gets 15% of the prize pool, Rank 6 appears 19 times, etc.)
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 