import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ResponsiblePage() {
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
        
        <h2 className="text-3xl font-bold mb-4 text-amber-500">Play Responsibly</h2>
        <div className="max-w-2xl w-full bg-gray-800 border border-amber-500 rounded-lg p-6 text-base text-gray-200 shadow-lg">
          <p className="mb-4 font-semibold">Important Information for Responsible Gaming:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><b>Game of Chance:</b> This platform offers a game of chance with entirely random outcomes. Winnings are not guaranteed.</li>
            <li><b>Affordable Losses:</b> Only participate with funds you can afford to lose.</li>
            <li><b>Age Requirement:</b> By joining, you confirm you're 18+ and that lottery participation is legal in your jurisdiction.</li>
            <li><b>No Liability:</b> Tronado Lottery is not liable for financial losses or gambling-related consequences.</li>
            <li><b>Fair Play:</b> We promote fair play and responsible gaming practices.</li>
            <li><b>Seek Help:</b> If gameplay becomes problematic, seek professional help immediately.</li>
          </ul>
          <p className="mt-4 text-center font-bold text-amber-400">
            Play Responsibly. Play Smart. Stay Safe.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 