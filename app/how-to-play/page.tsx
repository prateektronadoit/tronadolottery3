import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-black">
        <h2 className="text-3xl font-bold mb-4 text-amber-500">How to Play</h2>
        <ol className="max-w-2xl text-left text-lg text-gray-200 list-decimal list-inside space-y-3 mb-6">
          <li>Connect Your Wallet – Link your crypto wallet (e.g., MetaMask) to the Tronado platform.</li>
          <li>Approve TRDO – Authorize the use of TRDO tokens to buy lottery tickets.</li>
          <li>Age Verification – Confirm that you're 18+ before accessing the dashboard.</li>
          <li>Buy Tickets – Choose how many tickets to purchase and view them under "My Tickets".</li>
          <li>Check Results – View your ranks and prize claims in the "Claim" section.</li>
          <li>Claim Rewards – If you've won, claim your rewards directly in the dashboard interface.</li>
        </ol>
        <p className="max-w-2xl text-left text-base text-gray-400">
          Ticket rank logic and prize distribution are outlined clearly for full transparency (e.g., Rank 1 gets 15% of the prize pool, Rank 6 appears 19 times, etc.)
        </p>
      </main>
      <Footer />
    </div>
  );
} 