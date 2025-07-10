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
    <div className="bg-gray-900 rounded-lg p-2 md:p-3 text-center border border-gray-800">
      <div className="text-xs md:text-sm lg:text-base font-medium text-gray-400">{title}</div>
      <div className="text-lg md:text-xl lg:text-2xl font-bold text-orange-500">{value}</div>
      <div className="text-2xl md:text-3xl text-gray-400 mt-1">{icon}</div>
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
    <div className="bg-gradient-to-b from-gray-900 to-blue-950 rounded-lg p-3 md:p-4 lg:p-6 mb-3 md:mb-4 lg:mb-8 border border-gray-800">
      <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 lg:mb-4 flex items-center gap-2">
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
    <div className={`fixed top-3 md:top-4 right-3 md:right-4 p-3 md:p-4 rounded-lg z-50 max-w-sm ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
      <div className="flex items-center justify-between">
        <span className="text-sm md:text-base">{message}</span>
        <button onClick={onClose} className="ml-3 md:ml-4 text-white hover:text-gray-200 text-lg md:text-xl">×</button>
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
      <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
        <div className="text-yellow-300 font-semibold mb-2 text-sm md:text-base">🔗 Connect Your Wallet</div>
        <p className="text-yellow-200 text-xs md:text-sm">
          Connect your MetaMask wallet to start using the lottery platform.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-900 border border-green-600 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
      <div className="text-green-300 font-semibold mb-2 text-sm md:text-base">✅ Wallet Connected Successfully!</div>
      <p className="text-green-200 text-xs md:text-sm">
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
    registerUser,
    purchaseTickets,
    claimPrize,
    claimAllPrizes,
    showNotification,
    formatBalance,
    formatAddress,
    hasUserPurchasedTicket,
    getUserTotalPrize,
    getUserSponsorInfo,
    getUserPrizeData,
    getUserLevelCounts
  } = useWallet();

  // Extract userInfo and isUserRegistered from dashboardData
  const userInfo = dashboardData.userInfo;
  const isUserRegistered = dashboardData.isRegistered;

  // Add console.log to track registration status
  useEffect(() => {
    console.log('📝 Registration Page - User Status:', {
      isUserRegistered,
      userInfo,
      address,
      isConnected
    });
  }, [isUserRegistered, userInfo, address, isConnected]);

  // Track wallet switching
  useEffect(() => {
    if (isConnected && address) {
      setIsWalletSwitching(true);
      const timer = setTimeout(() => {
        setIsWalletSwitching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsWalletSwitching(false);
    }
  }, [address]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sponsorAddress, setSponsorAddress] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [selectedRound, setSelectedRound] = useState(0);
  const [localLoading, setLocalLoading] = useState(false);
  
  // Local notification state for clearing
  const [localNotification, setLocalNotification] = useState(notification);
  
  // NEW STATE - Track if user has already purchased a ticket
  const [hasPurchasedTicket, setHasPurchasedTicket] = useState(false);

  // NEW STATE - Track user level counts
  const [userLevelCounts, setUserLevelCounts] = useState<any[]>([]);
  const [levelCountsLoading, setLevelCountsLoading] = useState(false);

  // NEW STATE - Track wallet switching
  const [isWalletSwitching, setIsWalletSwitching] = useState(false);

  // Update local notification when notification changes
  useEffect(() => {
    setLocalNotification(notification);
  }, [notification]);

  // Function to clear notification
  const clearNotification = () => {
    setLocalNotification(null);
  };

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
    if (userInfo && userInfo.sponsor && userInfo.sponsor !== '0x0000000000000000000000000000000000000000') {
      setSponsorAddress(userInfo.sponsor);
    }
  }, [userInfo]);

  // Combined effect for user-specific data loading with debouncing
  useEffect(() => {
    const loadUserData = async () => {
      if (isConnected && address && selectedRound) {
        try {
          // Check if user has purchased tickets
          const hasPurchased = await hasUserPurchasedTicket(selectedRound);
          setHasPurchasedTicket(hasPurchased);
          
          // Load user level counts if registered
          if (isUserRegistered) {
            setLevelCountsLoading(true);
            const levelCounts = await getUserLevelCounts(address);
            setUserLevelCounts(levelCounts);
            setLevelCountsLoading(false);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setHasPurchasedTicket(false);
          setUserLevelCounts([]);
          setLevelCountsLoading(false);
        }
      } else {
        // Reset state when wallet is not connected or no selected round
        setHasPurchasedTicket(false);
        setUserLevelCounts([]);
        setLevelCountsLoading(false);
      }
    };

    // Add debouncing to prevent rapid state changes
    const timeoutId = setTimeout(loadUserData, 100);
    return () => clearTimeout(timeoutId);
  }, [isConnected, address, selectedRound, isUserRegistered]);

  // Reset local state when wallet changes
  useEffect(() => {
    if (!isConnected || !address) {
      setHasPurchasedTicket(false);
      setUserLevelCounts([]);
      setSponsorAddress('');
      setNumTickets('');
      setSelectedRound(0);
    }
  }, [isConnected, address]);

  // Calculate total cost
  const totalCost = (parseInt(numTickets) || 0) * parseFloat(dashboardData.ticketPrice || '0');

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

    // Validate ticket count
    const ticketCount = parseInt(numTickets);
    if (!ticketCount || ticketCount < 1 || ticketCount > 50) {
      showNotification('Please enter a valid number of tickets (1-50)', 'error');
      return;
    }

    setLocalLoading(true);
    try {
      await purchaseTickets(ticketCount);
      showNotification(`Successfully purchased ${ticketCount} ticket${ticketCount > 1 ? 's' : ''}!`, 'success');
      // Only mark as purchased after successful purchase
      setHasPurchasedTicket(true);
    } catch (error: any) {
      console.error('Purchase error:', error);
      showNotification(error.message || 'Ticket purchase failed', 'error');
      // Don't set hasPurchasedTicket to true if purchase fails
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
      <div className="flex-1 lg:ml-64 p-3 md:p-4 lg:p-6">
        {/* Wallet Switching Overlay */}
        {isWalletSwitching && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white text-lg">Switching Wallet...</p>
              <p className="text-gray-400 text-sm mt-2">Please wait while we update your data</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 lg:mb-8 gap-3">
          <div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:text-orange-500 transition-colors mr-3 md:mr-4"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">Lottery Registration</h1>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Join the lottery and try your luck!</p>
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
            <div className="space-y-3 md:space-y-4">
              {/* Registration Status */}
              {isUserRegistered ? (
                <div className="bg-green-900 border border-green-600 rounded-lg p-3 md:p-4">
                  <div className="text-green-300 font-semibold mb-2 text-sm md:text-base">✅ Already Registered!</div>
                  <p className="text-green-200 text-xs md:text-sm">
                    You are already registered and can purchase tickets.
                    {userInfo && userInfo.sponsor && userInfo.sponsor !== '0x0000000000000000000000000000000000000000' && (
                      <span> Sponsor: {formatAddress(userInfo.sponsor)}</span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="bg-blue-900 border border-blue-600 rounded-lg p-3 md:p-4">
                  <div className="text-blue-300 font-semibold mb-2 text-sm md:text-base">📝 Complete Your Registration</div>
                  <p className="text-blue-200 text-xs md:text-sm">
                    Register to start playing the lottery and purchase tickets.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Sponsor Address (Optional)
                </label>
                <input
                  type="text"
                  value={sponsorAddress}
                  onChange={(e) => setSponsorAddress(e.target.value)}
                  placeholder="Enter sponsor address or leave empty"
                  className="w-full p-2 md:p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-sm md:text-base"
                  disabled={isUserRegistered}
                />
                {isUserRegistered && (
                  <p className="text-xs md:text-sm text-gray-400 mt-1">
                    Sponsor address cannot be changed after registration
                  </p>
                )}
              </div>
              
              {!isUserRegistered && (
                <button 
                  onClick={handleRegisterUser}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-md text-sm md:text-base lg:text-lg transition-all duration-200 flex items-center"
                >
                  {isLoading ? <LoadingSpinner /> : <span className="mr-2">🚀</span>}
                  {isLoading ? 'Registering...' : 'Register Now'}
                </button>
              )}
            </div>
          </Section>
        )}

        {/* User Level Counts Section */}
        {isConnected && isUserRegistered && (
          <Section title="👥 Your Network Levels" icon="📊">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {levelCountsLoading ? (
                <div className="p-6 md:p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                  <p className="text-sm text-gray-400">Loading your network levels...</p>
                </div>
              ) : userLevelCounts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Level</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Level Name</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Count</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {userLevelCounts.map((levelData, index) => (
                        <tr key={index} className="hover:bg-gray-700 transition-colors">
                          <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-white">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-900 text-blue-300">
                              #{levelData.level}
                            </span>
                          </td>
                          <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-white font-medium">
                            {levelData.levelName}
                          </td>
                          <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-white">
                            <span className="font-bold text-green-400">{levelData.count}</span>
                          </td>
                          <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              levelData.count > 0 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {levelData.count > 0 ? 'Active' : 'Empty'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 md:p-8 text-center">
                  <div className="text-gray-400">
                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">👥</div>
                    <div className="text-sm md:text-lg font-semibold">No network levels found</div>
                    <div className="text-xs md:text-sm">Your network levels will appear here once you have referrals</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Level Summary */}
            {userLevelCounts.length > 0 && (
              <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-lg md:text-xl font-bold text-blue-400">
                    {userLevelCounts.filter(level => level.count > 0).length}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300">Active Levels</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-lg md:text-xl font-bold text-green-400">
                    {userLevelCounts.reduce((total, level) => total + level.count, 0)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300">Total Referrals</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-center border border-gray-700">
                  <div className="text-lg md:text-xl font-bold text-purple-400">
                    {userLevelCounts.find(level => level.level === 1)?.count || 0}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300">Direct Referrals</div>
                </div>
              </div>
            )}
          </Section>
        )}

        {/* Purchase Tickets Section */}
        {isConnected && isUserRegistered && (
          <Section title="Purchase Tickets" icon="🎫">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6">
              <StatsCard icon="🎯" title="Current Round" value={dashboardData.currentRound?.toString() || '-'} />
              <StatsCard icon="🎫" title="Tickets Sold" value={dashboardData.ticketsSold?.toString() || '-'} />
              <StatsCard icon="📊" title="Total Tickets" value={dashboardData.totalTickets?.toString() || '-'} />
              <StatsCard icon="💰" title="Price (TRDO)" value={dashboardData.ticketPrice ? formatBalanceDisplay(dashboardData.ticketPrice) : '-'} />
            </div>

            {/* USDT Balance */}
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-gray-300 font-semibold text-sm md:text-base">💰 Your TRDO Balance: {formatBalanceDisplay(usdtBalance)} TRDO</div>
            </div>

            {hasPurchasedTicket ? (
              // User has already purchased tickets
              <div className="text-center text-gray-400 p-6 md:p-8">
                <p className="text-4xl md:text-6xl mb-3 md:mb-4">✅</p>
                <p className="text-sm md:text-base font-semibold text-green-400 mb-2">Tickets Already Purchased!</p>
                <p className="text-xs md:text-sm">You can only purchase tickets once per round. Your tickets are ready for the draw.</p>
              </div>
            ) : (
              // User can purchase a ticket
              <>
                {/* USDT Approval Section */}
                {totalCost > 0 && usdtBalanceNum < totalCost && (
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-yellow-900 border border-yellow-600 rounded-lg">
                    <div className="text-yellow-300 font-semibold mb-2 text-sm md:text-base">⚠️ Insufficient TRDO Balance</div>
                    <p className="text-yellow-200 text-xs md:text-sm mb-3">
                      You need {totalCost.toFixed(4)} TRDO but only have {formatBalanceDisplay(usdtBalance)} TRDO.
                    </p>
                    <button 
                      onClick={() => showNotification('Please add more TRDO to your wallet', 'error')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 md:py-2 px-3 md:px-4 rounded-md flex items-center text-xs md:text-sm"
                    >
                      ⚠️ Insufficient Balance
                    </button>
                  </div>
                )}
                
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">Select Round</label>
                    <select 
                      value={selectedRound} 
                      onChange={(e) => setSelectedRound(Number(e.target.value))}
                      className="w-full p-2 md:p-3 bg-gray-800 border border-gray-700 rounded-md text-white text-sm md:text-base"
                    >
                      <option value={0}>Select Round</option>
                      {dashboardData.currentRound && dashboardData.currentRound > 0 && (
                        <option value={dashboardData.currentRound}>Round {dashboardData.currentRound}</option>
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">Number of Tickets</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={numTickets}
                      onChange={(e) => setNumTickets(e.target.value)}
                      placeholder="Enter number of tickets (1-50)"
                      className="w-full p-2 md:p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-sm md:text-base"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum 50 tickets per user per round</p>
                  </div>
                  
                  <div className="bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-800">
                    <div className="text-gray-300 text-sm md:text-base">
                      <span className="font-semibold">Total Cost: </span>
                      <span className="text-lg md:text-xl text-orange-500">{formatBalanceDisplay(totalCost.toString())} TRDO</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handlePurchaseTickets}
                  disabled={isLoading || isWalletSwitching || !selectedRound || !numTickets || parseInt(numTickets) < 1 || parseInt(numTickets) > 50 || totalCost > usdtBalanceNum}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-md text-sm md:text-base lg:text-lg transition-all duration-200 flex items-center"
                >
                  {isLoading ? <LoadingSpinner /> : <span className="mr-2">🛒</span>}
                  {isLoading ? 'Purchasing...' : isWalletSwitching ? 'Switching Wallet...' : `Purchase ${numTickets || '0'} Ticket${parseInt(numTickets) > 1 ? 's' : ''}`}
                </button>
              </>
            )}
          </Section>
        )}

        {/* Purchase History Section */}
        <Section title="🛒 Purchase History" icon="📊">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Round</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tickets</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {dashboardData.userPurchaseHistory && dashboardData.userPurchaseHistory.length > 0 ? (
                    dashboardData.userPurchaseHistory.map((purchase: any, index: number) => (
                      <tr key={index}>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-white">#{purchase.roundId}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-white">{purchase.ticketsCount}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-white">{purchase.amountPaid} TRDO</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
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
                      <td colSpan={4} className="px-3 md:px-6 py-8 md:py-12 text-center">
                        <div className="text-gray-400">
                          <div className="text-3xl md:text-4xl mb-3 md:mb-4">📊</div>
                          <div className="text-sm md:text-lg font-semibold">No purchase history</div>
                          <div className="text-xs md:text-sm">Your ticket purchases will appear here</div>
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
          <div className="bg-gray-800 rounded-lg p-4 md:p-6">
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">🎉</div>
              <div className="text-lg md:text-xl font-semibold text-white mb-2">No prizes yet</div>
              <div className="text-gray-400 text-sm md:text-base">Purchase tickets to have a chance at winning prizes!</div>
            </div>
          </div>
        </Section>

        {/* Notification */}
        {localNotification && (
          <Notification 
            message={localNotification.message} 
            type={localNotification.type as 'success' | 'error'} 
            onClose={clearNotification} 
          />
        )}
      </div>
    </div>
  );
}
