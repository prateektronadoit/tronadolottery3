'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useWallet } from '../hooks/useWallet';

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-gray-950 h-screen fixed left-0 top-0 text-orange-500 z-30 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" alt="Crypto Lottery Logo" width={150} height={40} priority />
          </Link>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="py-4">
          <ul>
            <li className="mb-2 px-2">
              <Link href="/dashboard" className="flex items-center p-3 text-gray-400 hover:text-white hover:bg-blue-900 rounded transition-all duration-200">
                <span className="mr-3">🏠</span> Dashboard
              </Link>
            </li>
            <li className="mb-2 px-2">
              <Link href="/registration" className="flex items-center p-3 text-white bg-blue-900 rounded">
                <span className="mr-3">📝</span> Registration
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value }: { icon: string; title: string; value: string }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-800">
      <div className="text-lg font-medium text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-orange-500">{value}</div>
      <div className="text-3xl text-gray-400 mt-1">{icon}</div>
    </div>
  );
};

// Section component
const Section = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-blue-950 rounded-lg p-4 md:p-6 mb-4 md:mb-8 border border-gray-800">
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
);

// Notification Component
const Notification = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg z-50 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">×</button>
      </div>
    </div>
  );
};

// Wallet Status Component
const WalletStatus = ({ isConnected, address, formatAddress }: { 
  isConnected: boolean; 
  address: string | undefined; 
  formatAddress: (addr: string | undefined) => string;
}) => {
  if (!isConnected) {
    return (
      <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-6">
        <div className="text-yellow-300 font-semibold mb-2">🔗 Connect Your Wallet</div>
        <p className="text-yellow-200 text-sm">
          Connect your MetaMask wallet to start using the lottery platform.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-900 border border-green-600 rounded-lg p-4 mb-6">
      <div className="text-green-300 font-semibold mb-2">✅ Wallet Connected Successfully!</div>
      <p className="text-green-200 text-sm">
        Connected Address: {formatAddress(address)}
      </p>
    </div>
  );
};

export default function Registration() {
  const { address, isConnected } = useAccount();
  const { 
    dashboardData,
    usdtBalance,
    loading,
    notification,
    userInfo,
    isUserRegistered,
    registerUser,
    purchaseTickets,
    claimPrize,
    claimAllPrizes,
    showNotification,
    setNotification,
    getPurchaseHistory,
    getPrizeData,
    formatBalance,
    formatAddress,
  } = useWallet();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sponsorAddress, setSponsorAddress] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  const [selectedRound, setSelectedRound] = useState(0);
  const [localLoading, setLocalLoading] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Set current round as default when it's loaded
  useEffect(() => {
    if (dashboardData.currentRound && dashboardData.currentRound > 0) {
      setSelectedRound(dashboardData.currentRound);
    }
  }, [dashboardData.currentRound]);

  // Set sponsor address from user info if available
  useEffect(() => {
    if (userInfo && userInfo[1] && userInfo[1] !== '0x0000000000000000000000000000000000000000') {
      setSponsorAddress(userInfo[1]);
    }
  }, [userInfo]);

  // Calculate total cost
  const totalCost = numTickets * parseFloat(dashboardData.ticketPrice || '0');

  // Simple format balance function for display
  const formatBalanceDisplay = (value: string | number | undefined): string => {
    if (!value) return '0.0000';
    return typeof value === 'string' ? value : value.toFixed(4);
  };

  const handleRegisterUser = async () => {
    if (!isConnected) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    setLocalLoading(true);
    try {
      const sponsor = sponsorAddress.trim() || '0x0000000000000000000000000000000000000000';
      await registerUser(sponsor);
      showNotification('Registration successful!', 'success');
    } catch (error: any) {
      console.error('Registration error:', error);
      showNotification(error.message || 'Registration failed', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  const handlePurchaseTickets = async () => {
    if (!selectedRound || selectedRound === 0) {
      showNotification('Please select a round', 'error');
      return;
    }

    setLocalLoading(true);
    try {
      await purchaseTickets(numTickets);
      showNotification(`Successfully purchased ${numTickets} ticket(s)!`, 'success');
    } catch (error: any) {
      console.error('Purchase error:', error);
      showNotification(error.message || 'Ticket purchase failed', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleClaimPrize = async (roundId: number) => {
    setLocalLoading(true);
    try {
      await claimPrize(roundId);
      showNotification('Prize claimed successfully!', 'success');
    } catch (error: any) {
      console.error('Claim error:', error);
      showNotification(error.message || 'Prize claim failed', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleClaimAllPrizes = async () => {
    setLocalLoading(true);
    try {
      await claimAllPrizes();
      showNotification('All prizes claimed successfully!', 'success');
    } catch (error: any) {
      console.error('Claim all error:', error);
      showNotification(error.message || 'Failed to claim all prizes', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = loading || localLoading;
  const usdtBalanceNum = parseFloat(usdtBalance || '0');

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:text-orange-500 transition-colors mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl lg:text-4xl font-bold text-white">Lottery Registration</h1>
            <p className="text-gray-400 mt-1 lg:mt-2">Join the lottery and try your luck!</p>
          </div>
          
          {/* Connect Wallet Button */}
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>

        {/* Wallet Status */}
        <WalletStatus 
          isConnected={isConnected} 
          address={address} 
          formatAddress={formatAddress}
        />
        
        {/* Registration Section */}
        {isConnected && (
          <Section title="User Registration" icon="📝">
            <div className="space-y-4">
              {/* Registration Status */}
              {isUserRegistered ? (
                <div className="bg-green-900 border border-green-600 rounded-lg p-4">
                  <div className="text-green-300 font-semibold mb-2">✅ Already Registered!</div>
                  <p className="text-green-200 text-sm">
                    You are already registered and can purchase tickets.
                    {userInfo && userInfo[1] && userInfo[1] !== '0x0000000000000000000000000000000000000000' && (
                      <span> Sponsor: {formatAddress(userInfo[1])}</span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
                  <div className="text-blue-300 font-semibold mb-2">📝 Complete Your Registration</div>
                  <p className="text-blue-200 text-sm">
                    Register to start playing the lottery and purchase tickets.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sponsor Address (Optional)
                </label>
                <input
                  type="text"
                  value={sponsorAddress}
                  onChange={(e) => setSponsorAddress(e.target.value)}
                  placeholder="Enter sponsor address or leave empty"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500"
                  disabled={isUserRegistered}
                />
                {isUserRegistered && (
                  <p className="text-sm text-gray-400 mt-1">
                    Sponsor address cannot be changed after registration
                  </p>
                )}
              </div>
              
              {!isUserRegistered && (
                <button 
                  onClick={handleRegisterUser}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 md:py-3 px-6 md:px-8 rounded-md text-base md:text-lg transition-all duration-200 flex items-center"
                >
                  {isLoading ? <LoadingSpinner /> : <span className="mr-2">🚀</span>}
                  {isLoading ? 'Registering...' : 'Register Now'}
                </button>
              )}
            </div>
          </Section>
        )}

        {/* Purchase Tickets Section */}
        {isConnected && isUserRegistered && (
          <Section title="Purchase Tickets" icon="🎫">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <StatsCard icon="🎯" title="Current Round" value={dashboardData.currentRound?.toString() || '-'} />
              <StatsCard icon="🎫" title="Tickets Sold" value={dashboardData.ticketsSold?.toString() || '-'} />
              <StatsCard icon="📊" title="Total Tickets" value={dashboardData.totalTickets?.toString() || '-'} />
              <StatsCard icon="💰" title="Price (USDT)" value={dashboardData.ticketPrice ? formatBalanceDisplay(dashboardData.ticketPrice) : '-'} />
            </div>

            {/* USDT Balance */}
            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-gray-300 font-semibold">💰 Your USDT Balance: {formatBalanceDisplay(usdtBalance)} USDT</div>
            </div>

            {/* USDT Approval Section */}
            {totalCost > 0 && usdtBalanceNum < totalCost && (
              <div className="mb-6 p-4 bg-yellow-900 border border-yellow-600 rounded-lg">
                <div className="text-yellow-300 font-semibold mb-2">⚠️ Insufficient USDT Balance</div>
                <p className="text-yellow-200 text-sm mb-3">
                  You need {totalCost.toFixed(4)} USDT but only have {formatBalanceDisplay(usdtBalance)} USDT.
                </p>
                <button 
                  onClick={() => showNotification('Please add more USDT to your wallet', 'error')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md flex items-center"
                >
                  ⚠️ Insufficient Balance
                </button>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Round</label>
                <select 
                  value={selectedRound} 
                  onChange={(e) => setSelectedRound(Number(e.target.value))}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                >
                  <option value={0}>Select Round</option>
                  {dashboardData.currentRound && dashboardData.currentRound > 0 && (
                    <option value={dashboardData.currentRound}>Round {dashboardData.currentRound}</option>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Tickets</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={numTickets}
                  onChange={(e) => setNumTickets(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                />
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="text-gray-300">
                  <span className="font-semibold">Total Cost: </span>
                  <span className="text-xl text-orange-500">{totalCost.toFixed(4)} USDT</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handlePurchaseTickets}
              disabled={isLoading || !selectedRound || totalCost > usdtBalanceNum}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 md:py-3 px-6 md:px-8 rounded-md text-base md:text-lg transition-all duration-200 flex items-center"
            >
              {isLoading ? <LoadingSpinner /> : <span className="mr-2">🛒</span>}
              {isLoading ? 'Purchasing...' : 'Purchase Tickets'}
            </button>
          </Section>
        )}

        {/* Purchase History Section */}
        <Section title="🛒 Purchase History" icon="📊">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Round</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tickets</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {dashboardData.userPurchaseHistory && dashboardData.userPurchaseHistory.length > 0 ? (
                    dashboardData.userPurchaseHistory.map((purchase: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">#{purchase.roundId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{purchase.ticketsCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{purchase.amountPaid} USDT</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            purchase.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {purchase.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <div className="text-4xl mb-4">📊</div>
                          <div className="text-lg font-semibold">No purchase history</div>
                          <div>Your ticket purchases will appear here</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Prize Claims Section */}
        <Section title="🏆 Prize Claims" icon="🏆">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-xl font-semibold text-white mb-2">No prizes yet</div>
              <div className="text-gray-400">Purchase tickets to have a chance at winning prizes!</div>
            </div>
          </div>
        </Section>

        {/* Notification */}
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type as 'success' | 'error'} 
            onClose={() => setNotification(null)} 
          />
        )}
      </div>
    </div>
  );
}
