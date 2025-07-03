import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ResponsiblePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-black">
        <h2 className="text-3xl font-bold mb-4 text-amber-500">Play Responsibly</h2>
        <p className="max-w-2xl text-center text-lg text-gray-200 mb-6">
          This platform offers a game of chance with entirely random outcomes. Winnings are not guaranteed. Only participate with funds you can afford to lose.<br/><br/>
          By joining, you confirm you're 18+ and that lottery participation is legal in your jurisdiction.<br/><br/>
          Tronado Lottery is not liable for financial losses or gambling-related consequences.<br/><br/>
          We promote fair play and responsible gaming. If gameplay becomes problematic, seek professional help.<br/><br/>
          <b>Play Responsibly. Play Smart. Stay Safe.</b>
        </p>
      </main>
      <Footer />
    </div>
  );
} 