import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicyPage() {
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
        
        <h2 className="text-3xl font-bold mb-4 text-amber-500">Privacy Policy</h2>
        <div className="max-w-2xl w-full bg-gray-800 border border-amber-500 rounded-lg p-6 text-base text-gray-200 shadow-lg">
          <p className="mb-4 font-semibold">Tronado Lottery respects your privacy:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><b>No Personal Data:</b> We do not collect names, emails, or personal info.</li>
            <li><b>Wallet Info Only:</b> We use your wallet address to show lottery activity and process rewards.</li>
            <li><b>On-Chain Transparency:</b> All activity is public and stored on the blockchain.</li>
            <li><b>No Sharing:</b> We never sell or share your data with third parties.</li>
            <li><b>Cookies:</b> We may use basic cookies for platform functionality.</li>
            <li><b>Your Responsibility:</b> Keep your wallet and secret phrase secure. We never ask for them.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
} 