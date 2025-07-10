'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useWallet } from '../hooks/useWallet';
import { createPublicClient, http, formatEther } from 'viem';
// import { polygon } from 'wagmi/chains';
import { bscTestnet } from 'wagmi/chains';

// Import contract data from useWallet
const CONTRACT_ADDRESSES = {
  LOTTERY: '0xc00235bc296c2d8986bBaB01967239F8A61C0F88',
  USDT: '0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA'
};

// Create public client for reading contract data
// const publicClient = createPublicClient({
//   chain: polygon,
//   transport: http('https://polygon-rpc.com'),
// });

// Create public client for reading contract data
const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
});

// Contract ABIs - Updated with new ABI
const LOTTERY_ABI = [{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_creator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"DrawExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"bool","name":"isPurchase","type":"bool"}],"name":"MLMEarning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PrizeClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"},{"indexed":false,"internalType":"address","name":"updatedBy","type":"address"}],"name":"RankPrizesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTickets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"RoundCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTransferredToCreator","type":"uint256"}],"name":"RoundSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"SponsorIncomeReset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"ticketNumbers","type":"uint256[]"}],"name":"TicketPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"UserRegistered","type":"event"},{"inputs":[],"name":"MaxTicketPerRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"calculateTicketPrize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"claimLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"claimPrize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"createRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"defaultRankPrizes","outputs":[{"internalType":"uint256","name":"percentage","type":"uint256"},{"internalType":"bool","name":"isGroup","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"executeDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"finalizeRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractStats","outputs":[{"internalType":"uint256","name":"totalRounds","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"},{"internalType":"uint256","name":"activeRound","type":"uint256"},{"internalType":"uint256","name":"totalRegisteredUsers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRankPrizes","outputs":[{"internalType":"uint256[10]","name":"percentages","type":"uint256[10]"},{"internalType":"bool[10]","name":"isGroupFlags","type":"bool[10]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getRoundInfo","outputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketRank","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalRegisteredUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserLevelCounts","outputs":[{"internalType":"uint256[10]","name":"","type":"uint256[10]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserTickets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserTotalPrize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isUserInArray","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTicketPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"purchaseLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"numberOfTickets","type":"uint256"}],"name":"purchaseTickets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sponsor","type":"address"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"registeredUsers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundFinalizationProgress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"roundParticipants","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rounds","outputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"},{"internalType":"uint256","name":"createdAt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_MaxTicketPerRound","type":"uint256"}],"name":"setMaxTicketPerRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTicketPurchase","type":"uint256"}],"name":"setMaxTicketPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalOwnersClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalUniqueOwners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"}],"name":"updateRankPrizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"userLevelCounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"},{"internalType":"uint256","name":"sponsorIncome","type":"uint256"},{"internalType":"uint256","name":"RewardSponsorIncome","type":"uint256"}],"stateMutability":"view","type":"function"}];
// Sidebar component
const Sidebar = ({ 
  isOpen, 
  toggleSidebar, 
  activeSection, 
  setActiveSection,
  navigateToSection
}: { 
  isOpen: boolean; 
  toggleSidebar: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  navigateToSection: (section: string) => void;
}) => {
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'registration', icon: '📝', label: 'Registration' },
    { id: 'purchase', icon: '🎫', label: 'Purchase' },
    { id: 'mytickets', icon: '🎟️', label: 'My Tickets' },
    { id: 'rankings', icon: '🏅', label: 'Rankings' },
    { id: 'claim', icon: '🏆', label: 'Claim Prizes' }
  ];

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
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2 px-2">
                <button
                  onClick={() => navigateToSection(item.id)}
                  className={`flex items-center p-3 w-full text-left rounded transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'text-white bg-blue-900' 
                      : 'text-gray-400 hover:text-white hover:bg-blue-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

// Stat Card component
interface StatCardProps {
  icon: string;
  iconImage?: string;
  title: string;
  value: string | number;
  subtitle: string;
  bgClass?: string;
  iconSize?: number;
}

const StatCard = ({ icon, iconImage, title, value, subtitle, bgClass = "bg-opacity-0", iconSize = 80 }: StatCardProps) => {
  return (
    <div className={`relative rounded-xl p-6 border-2 border-blue-500 bg-blue-900/10 ${bgClass} group overflow-hidden transition-all duration-300 hover:border-blue-400 stat-card-fluid`}>
      <div className="stat-card-background"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 via-blue-500/10 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-600/20 opacity-0 group-hover:opacity-100 group-hover:animate-fluid transition-opacity duration-500 ease-in-out"></div>
      <div className="flex items-center mb-4 gap-4">
        {iconImage ? (
          <Image src={`/${iconImage}`} alt={title} width={iconSize} height={iconSize} className="flex-shrink-0" />
        ) : (
          <span className="text-3xl flex-shrink-0">{icon}</span>
        )}
        <div>
          <div className="text-lg text-gray-200 font-medium">{title}</div>
          <div className="text-5xl font-bold text-white mb-1">{value}</div>
          <div className="text-sm text-gray-300">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-8 rounded-lg text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Processing...</p>
      <p className="text-gray-400 text-sm">Please confirm transaction in your wallet</p>
    </div>
  </div>
);

// Notification Component
const Notification = ({ notification, onClose }: { notification: any; onClose: () => void }) => {
  if (!notification) return null;

  const bgColor = notification.type === 'error' ? 'bg-red-500' : 
                  notification.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center`}>
      <span className="mr-2">
        {notification.type === 'error' ? '❌' : 
         notification.type === 'warning' ? '⚠️' : '✅'}
      </span>
      {notification.message}
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        ✕
      </button>
    </div>
  );
};

// Custom formatting function for USDT values
const formatUSDT = (value: string | number): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00';
  
  // If the number has no significant decimal places (like 10.0, 25.0), show only 2 decimal places
  if (num % 1 === 0) {
    return num.toFixed(2);
  }
  
  // If the number has significant decimal places, show up to 5 decimal places
  // Remove trailing zeros after the decimal point
  const formatted = num.toFixed(5);
  return formatted.replace(/\.?0+$/, ''); // Remove trailing zeros
};

// Comprehensive Prize Display Component
const ComprehensivePrizeDisplay = ({ 
  roundId, 
  getUserPrizeData, 
  getUserTotalPrize, 
  getUserSponsorInfo,
  setNotification,
  myTicketsCount
}: { 
  roundId: number;
  getUserPrizeData: (roundId: number) => Promise<any>;
  getUserTotalPrize: (roundId: number) => Promise<string>;
  getUserSponsorInfo: (roundId: number) => Promise<any>;
  setNotification: (notification: { message: string; type: 'success' | 'error' | 'warning' | 'info' } | null) => void;
  myTicketsCount: number;
}) => {
  const [prizeData, setPrizeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSponsorPopup, setShowSponsorPopup] = useState(false);
  const [showDistributionPopup, setShowDistributionPopup] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [isClaimed, setIsClaimed] = useState<boolean | null>(null);
  const { claimPrize, getUserLevelCounts } = useWallet();
  const { address } = useAccount();
  const [userLevelCounts, setUserLevelCounts] = useState<any[]>([]);
  const [levelCountsLoading, setLevelCountsLoading] = useState(false);

  // Fetch user level counts when popup opens (only once per open)
  useEffect(() => {
    if (showSponsorPopup && address && userLevelCounts.length === 0) {
      setLevelCountsLoading(true);
      getUserLevelCounts(address)
        .then((counts) => setUserLevelCounts(counts))
        .catch(() => setUserLevelCounts([]))
        .finally(() => setLevelCountsLoading(false));
    }
    // Do NOT include getUserLevelCounts in the dependency array to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSponsorPopup, address]);

  // Function to check claim status
  const checkClaimStatus = async () => {
    if (!address || !roundId) {
      setIsClaimed(null);
      return;
    }
    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'isClaimed',
        args: [address as `0x${string}`, BigInt(roundId)],
      }) as boolean;
      setIsClaimed(result);
    } catch (err) {
      setIsClaimed(null);
    }
  };

  useEffect(() => {
    checkClaimStatus();
  }, [address, roundId]);

  // Claim handler for this component
  const handleClaimPrize = async () => {
    console.log('Clicked');
    if (!roundId) {
      setNotification({ type: 'error', message: 'Invalid round ID' });
      return;
    }
    setClaimLoading(true);
    setNotification({ type: 'info', message: 'Processing prize claim...' });
    try {
      await claimPrize(roundId);
      setNotification({ type: 'success', message: 'Prize claimed successfully! 🏆' });
      // Immediately re-check claim status after claiming
      await checkClaimStatus();
    } catch (error: any) {
      let errorMessage = 'Claim failed';
      if (error.message?.includes('user rejected')) {
        errorMessage = 'Transaction was cancelled by user';
      } else if (error.message?.includes('no prize')) {
        errorMessage = 'No prize available to claim';
      } else if (error.message?.includes('already claimed')) {
        errorMessage = 'Prize already claimed';
      } else {
        errorMessage = 'Claim failed: ' + error.message;
      }
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setClaimLoading(false);
    }
  };

  useEffect(() => {
    const loadPrizeData = async () => {
      if (!roundId || roundId === 0) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getUserPrizeData(roundId);
        setPrizeData(data);
      } catch (err: any) {
        console.error('Error loading prize data:', err);
        setError(err.message || 'Failed to load prize data');
      } finally {
        setLoading(false);
      }
    };

    loadPrizeData();
  }, [roundId, getUserPrizeData]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p className="text-sm text-gray-400">Loading prize data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-600 rounded-lg p-4 text-center">
        <p className="text-sm text-red-300">Error: {error}</p>
      </div>
    );
  }

  if (!prizeData) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-400">No prize data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Prize Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-center border border-gray-700">
          <div className="text-lg md:text-xl font-bold text-green-400">
            {prizeData.totalPrize}
          </div>
          <div className="text-xs md:text-sm text-gray-300">Total Prize</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-center border border-gray-700">
          <div className="text-lg md:text-xl font-bold text-purple-400">
            {prizeData.sponsorIncome}
          </div>
          <div className="text-xs md:text-sm text-gray-300">Sponsor Income</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-3 md:p-4 text-center border border-gray-700">
          <div className="text-lg md:text-xl font-bold text-blue-400">
            {prizeData.netPrize}
          </div>
          <div className="text-xs md:text-sm text-gray-300">Net Prize</div>
        </div>
      </div>

      {/* Participation Status */}
      {myTicketsCount > 0 && (
        <div className="rounded-lg p-3 md:p-4 text-center bg-green-900 border border-green-600">
          <div className="text-sm md:text-base font-semibold text-green-300">
            ✅ Participated in Round
          </div>
        </div>
      )}

      {/* Prize Calculation Breakdown */}
      <div className="bg-gray-900 rounded-lg p-3 md:p-4 border border-gray-700">
        <h5 className="text-sm md:text-base font-semibold mb-2 md:mb-3 text-gray-300">
          💡 Prize Calculation Breakdown
        </h5>
        <div className="space-y-2 text-xs md:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Winning Prize:</span>
            <span className="text-green-400">{prizeData.netPrize} TRDO</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sponsor Income:</span>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">{prizeData.sponsorIncome} TRDO</span>
              <button 
                onClick={() => setShowSponsorPopup(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded-full transition duration-200"
              >
                Level Wise HeadCounts
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Claim Distribution received from the heads (15%):</span>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">{prizeData.rewardSponsorIncome} TRDO</span>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold">
            <span className="text-gray-300">Total Claimable Amount (demo):</span>
            <span className="text-blue-400">{prizeData.totalPrize} TRDO</span>
          </div>
          <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold">
            <span className="text-gray-300">Total Received Amount:</span>
            <span className="text-blue-400">{prizeData.totalReceived} TRDO</span>
          </div>

          {/* Claim Prize Button - Only show if user has tickets */}
          {myTicketsCount > 0 && (
            <div className="flex flex-col items-end mt-4 gap-2">
              <button
                onClick={handleClaimPrize}
                disabled={claimLoading || isClaimed === true}
                className={`font-bold px-6 py-2 rounded-lg text-base shadow-md transition duration-300 flex items-center gap-2 ${
                  claimLoading || isClaimed === true
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                }`}
              >
                {claimLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Claiming...
                  </>
                ) : isClaimed === true ? (
                  <>
                    <span className="mr-2">✅</span>
                    Claimed
                  </>
                ) : (
                  <>
                    <span className="mr-2">🏆</span>
                    Claim Prize
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sponsor Income Network Level Popup */}
      {showSponsorPopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-30">
          <div className="bg-white rounded-xl p-5 mt-16 mr-8 border shadow-2xl max-w-xs w-full relative animate-slide-in-right">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowSponsorPopup(false)}
            >
              &times;
            </button>
            <h4 className="text-lg md:text-xl font-semibold mb-4 text-purple-700 text-center flex items-center justify-center gap-2">
              <span role='img' aria-label='chart'>📊</span>
              <span>Your Network Levels</span>
            </h4>
            {levelCountsLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                <span className="ml-2 text-sm text-gray-500">Loading levels...</span>
              </div>
            ) : userLevelCounts.length > 0 ? (
              <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="py-2 px-2 text-left text-gray-700 font-semibold">Level</th>
                        <th className="py-2 px-2 text-left text-gray-700 font-semibold">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userLevelCounts.map((level: any, index: number) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-purple-50">
                          <td className="py-2 px-2 text-gray-800 font-medium">
                            Level {level.level}
                          </td>
                          <td className="py-2 px-2 text-gray-800">
                            {level.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-lg md:text-xl font-bold text-blue-600">
                      {userLevelCounts.reduce((total, level) => total + level.count, 0)}
                    </div>
                    <div className="text-xs text-gray-500">Total Network</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-lg md:text-xl font-bold text-green-600">
                      {userLevelCounts.filter(level => level.count > 0).length}
                    </div>
                    <div className="text-xs text-gray-500">Active Levels</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">
                No level data available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sponsorAddress, setSponsorAddress] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<{
    ticketNumber: number;
    owner: string;
    rank: number;
    prize: string;
    isMyTicket: boolean;
    isWinner: boolean;
    isAvailable: boolean;
    status: string;
  } | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const [claimLoading, setClaimLoading] = useState(false);
  const [prizeData, setPrizeData] = useState<{
    foundPrizes: boolean;
    totalPendingClaims: string;
    prizes: Array<{
      roundId: number;
      userTickets: number;
      roundPrizes: Array<{
        ticketNumber: string;
        rank: number;
        prize: string;
      }>;
      totalRoundPrize: string;
      isAlreadyClaimed: boolean;
      bestRank: number;
    }>;
  }>({
    foundPrizes: false,
    totalPendingClaims: '0',
    prizes: []
  });

  // NEW STATE - Track if user has already purchased a ticket
  const [hasPurchasedTicket, setHasPurchasedTicket] = useState(false);

  // NEW STATE - Track user level counts
  const [userLevelCounts, setUserLevelCounts] = useState<any[]>([]);
  const [levelCountsLoading, setLevelCountsLoading] = useState(false);
  
  // NEW STATE - Track claim status for each round
  const [claimStatus, setClaimStatus] = useState<{[roundId: number]: boolean}>({});
  const [claimStatusLoading, setClaimStatusLoading] = useState(false);
  
  // NEW STATE - Track total prize amount
  const [totalPrizeAmount, setTotalPrizeAmount] = useState('0');
  const [prizeLoading, setPrizeLoading] = useState(false);
  
  // NEW STATE - Track claim status from contract
  const [isClaimedFromContract, setIsClaimedFromContract] = useState<boolean | null>(null);
  
  // NEW STATE - Track referral link
  const [referralLink, setReferralLink] = useState('');
  const [showReferralCopied, setShowReferralCopied] = useState(false);
  
  // NEW STATE - Track wallet switching
  const [isWalletSwitching, setIsWalletSwitching] = useState(false);

  // NEW STATE - Track if URL parameters have been processed
  const [urlProcessed, setUrlProcessed] = useState(false);

  // Unified loading state for all sections
  const [sectionLoading, setSectionLoading] = useState(false);

  const {
    address,
    isConnected 
  } = useAccount();

  const { 
    dashboardData,
    loading,
    registerUser,
    purchaseTickets,
    claimPrize,
    claimAllPrizes,
    showNotification,
    formatAddress,
    formatBalance,
    hasUserPurchasedTicket,
    getUserTotalPrize,
    getUserSponsorInfo,
    getUserPrizeData,
    getUserLevelCounts,
    checkIsClaimed
  } = useWallet();

  // Add console.log to track dashboardData changes
  useEffect(() => {
    console.log('🏠 Dashboard - dashboardData updated:', {
      isRegistered: dashboardData.isRegistered,
      userInfo: dashboardData.userInfo,
      currentRound: dashboardData.currentRound,
      address: address
    });
  }, [dashboardData, address]);

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

  // Handle URL parameters for direct navigation and referral
  useEffect(() => {
    if (typeof window !== 'undefined' && !urlProcessed) {
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section');
      const refId = urlParams.get('refId');
      
      // Set section from URL parameter if valid
      if (section && ['dashboard', 'registration', 'purchase', 'mytickets', 'claim', 'rankings'].includes(section)) {
        setActiveSection(section);
      }
      
      // Handle referral parameter - only redirect to registration if:
      // 1. There's a refId parameter
      // 2. The refId is not the zero address
      // 3. There's no explicit section parameter OR the user is not registered
      if (refId && refId !== '0x0000000000000000000000000000000000000000') {
        setSponsorAddress(refId);
        
        // Only redirect to registration if no explicit section is set or user is not registered
        if (!section && (!dashboardData.isRegistered || !isConnected)) {
          setActiveSection('registration');
        }
      }
      
      setUrlProcessed(true);
    }
  }, [dashboardData.isRegistered, isConnected, urlProcessed]);

  // Reset URL processed flag when URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      setUrlProcessed(false);
    };
    
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to update URL with current section
  const updateURLWithSection = (section: string) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('section', section);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Function to navigate to a section and update URL
  const navigateToSection = (section: string) => {
    setActiveSection(section);
    
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (section === 'dashboard') {
        url.searchParams.delete('section');
      } else {
        url.searchParams.set('section', section);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Update URL when activeSection changes
  useEffect(() => {
    if (activeSection && activeSection !== 'dashboard') {
      updateURLWithSection(activeSection);
    } else if (activeSection === 'dashboard') {
      // Remove section parameter for dashboard (default section)
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('section');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [activeSection]);

  // Function to generate referral link
  const generateReferralLink = () => {
    if (typeof window !== 'undefined' && address) {
      const baseUrl = window.location.origin;
      const referralUrl = `${baseUrl}/dashboard?section=registration&refId=${address}`;
      setReferralLink(referralUrl);
    }
  };

  // Function to copy referral link
  const copyReferralLink = async () => {
    if (referralLink) {
      try {
        await navigator.clipboard.writeText(referralLink);
        setShowReferralCopied(true);
        setTimeout(() => setShowReferralCopied(false), 2000);
        setNotification({ type: 'success', message: 'Referral link copied to clipboard! 📋' });
      } catch (err) {
        setNotification({ type: 'error', message: 'Failed to copy referral link' });
      }
    }
  };

  // Load prize data when component mounts or when relevant data changes
  useEffect(() => {
    if (isConnected && address && dashboardData.userInfo) {
      loadPrizeData();
    }
  }, [isConnected, address, dashboardData.userInfo, dashboardData.drawExecuted, dashboardData.myTickets]);

  // Combined effect for user-specific data loading with debouncing
  useEffect(() => {
    const loadUserData = async () => {
      if (isConnected && address && dashboardData.currentRound) {
        try {
          // Check if user has purchased tickets
          const hasPurchased = await hasUserPurchasedTicket(dashboardData.currentRound);
          setHasPurchasedTicket(hasPurchased);
          
          // Load user level counts if registered
          if (dashboardData.isRegistered) {
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
        // Reset state when wallet is not connected or no current round
        setHasPurchasedTicket(false);
        setUserLevelCounts([]);
        setLevelCountsLoading(false);
      }
    };

    // Add debouncing to prevent rapid state changes
    const timeoutId = setTimeout(loadUserData, 100);
    return () => clearTimeout(timeoutId);
  }, [isConnected, address, dashboardData.currentRound, dashboardData.isRegistered]);

  // Reset local state when wallet changes
  useEffect(() => {
    if (!isConnected || !address) {
      setHasPurchasedTicket(false);
      setUserLevelCounts([]);
      setClaimStatus({});
      setTotalPrizeAmount('0');
      setIsClaimedFromContract(null);
      setReferralLink('');
      setShowReferralCopied(false);
    }
  }, [isConnected, address]);





  // Unified loading system - triggers on section change or wallet change
  useEffect(() => {
    if (isConnected && address) {
      setSectionLoading(true);
      // Reset loading after a short delay to allow data to load
      const timer = setTimeout(() => {
        setSectionLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeSection, address]);

  // Generate referral link when address changes
  useEffect(() => {
    if (address) {
      generateReferralLink();
    }
  }, [address]);

  // Function to get total prize amount for current round
  const getTotalPrizeAmount = async () => {
    if (!isConnected || !address || !dashboardData.currentRound) {
      setTotalPrizeAmount('0');
      return;
    }

    setPrizeLoading(true);
    try {
      console.log(`🔍 Getting total prize for Round ${dashboardData.currentRound} and user ${address}`);
      const totalPrize = await getUserTotalPrize(dashboardData.currentRound, address);
      const prizeValue = parseFloat(formatEther(BigInt(totalPrize || '0')));
      
      console.log(`💰 Total prize found: ${prizeValue} TRDO`);
      setTotalPrizeAmount(prizeValue.toFixed(4));
    } catch (error) {
      console.error('❌ Error getting total prize:', error);
      setTotalPrizeAmount('0');
    } finally {
      setPrizeLoading(false);
    }
  };

  // Load claim status for each round when prize data is available
  useEffect(() => {
    const loadClaimStatus = async () => {
      if (isConnected && address && prizeData.foundPrizes && prizeData.prizes.length > 0) {
        setClaimStatusLoading(true);
        try {
          console.log('🔍 Loading claim status for all rounds...');
          console.log('📊 Prize data:', prizeData.prizes);
          const newClaimStatus: {[roundId: number]: boolean} = {};
          
          // Check claim status for each round
          for (const prize of prizeData.prizes) {
            console.log(`🔍 Checking claim status for Round ${prize.roundId} with address ${address}`);
            const isClaimed = await checkIsClaimed(address, prize.roundId);
            newClaimStatus[prize.roundId] = isClaimed;
            console.log(`Round ${prize.roundId} claim status:`, isClaimed);
          }
          
          setClaimStatus(newClaimStatus);
          console.log('📊 Final claim status loaded:', newClaimStatus);
          
          // Debug: Check if any prizes should show claim buttons
          const hasUnclaimedPrizes = prizeData.prizes.some((prize: any) => !newClaimStatus[prize.roundId]);
          console.log('🎯 Has unclaimed prizes:', hasUnclaimedPrizes);
          
        } catch (error) {
          console.error('❌ Error loading claim status:', error);
        } finally {
          setClaimStatusLoading(false);
        }
      }
    };

    loadClaimStatus();
  }, [isConnected, address, prizeData.foundPrizes, prizeData.prizes]);

  // NEW EFFECT - Check claim status from contract for current round
  useEffect(() => {
    const checkContractClaimStatus = async () => {
      if (isConnected && address && dashboardData.currentRound) {
        try {
          console.log('🔍 Checking contract claim status for current round...');
          const isClaimed = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
            abi: LOTTERY_ABI,
            functionName: 'isClaimed',
            args: [address as `0x${string}`, BigInt(dashboardData.currentRound)],
          }) as boolean;
          
          setIsClaimedFromContract(isClaimed);
          console.log('📊 Contract claim status:', isClaimed);
        } catch (error) {
          console.error('❌ Error checking contract claim status:', error);
          setIsClaimedFromContract(null);
        }
      }
    };

    checkContractClaimStatus();
  }, [isConnected, address, dashboardData.currentRound]);

  // Function to handle ticket click and show details
  const handleTicketClick = async (ticketNumber: number) => {
    if (!dashboardData.currentRound) {
      alert('No active round available');
      return;
    }
    
    try {
      // Determine ticket status
      const isMyTicket = dashboardData.myTickets?.includes(ticketNumber) || false;
      const isSold = ticketNumber <= (dashboardData.ticketsSold || 0);
      const isAvailable = !isSold;
      
      let rank = 0;
      let prize = '0';
      let owner = isMyTicket ? (address || 'Your Address') : (isSold ? 'Sold to User' : 'Available');
      
      // Get actual rank and prize data from contract if draw is executed
      if (dashboardData.drawExecuted && isSold) {
        try {
          // Get ticket rank
          const ticketRank = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
            abi: LOTTERY_ABI,
            functionName: 'getTicketRank',
            args: [BigInt(dashboardData.currentRound), BigInt(ticketNumber)],
          }) as bigint;
          
          rank = Number(ticketRank);
          
          // Get ticket prize if it has a rank
          if (rank > 0) {
            const ticketPrize = await publicClient.readContract({
              address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
              abi: LOTTERY_ABI,
              functionName: 'calculateTicketPrize',
              args: [BigInt(dashboardData.currentRound), BigInt(ticketNumber)],
            }) as bigint;
            
            prize = formatUSDT(formatEther(ticketPrize));
          }
          
          // Get ticket owner
          const ticketOwner = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
            abi: LOTTERY_ABI,
            functionName: 'getTicketOwner',
            args: [BigInt(dashboardData.currentRound), BigInt(ticketNumber)],
          }) as string;
          
          owner = ticketOwner;
          
        } catch (contractError) {
          console.warn(`Could not get contract data for ticket ${ticketNumber}:`, contractError);
        }
      }
      
      // Create ticket details object with real data
      const ticketDetails = {
        ticketNumber,
        owner,
        rank,
        prize,
        isMyTicket,
        isWinner: dashboardData.winningNumber === ticketNumber && dashboardData.drawExecuted,
        isAvailable,
        status: isAvailable ? 'Available' : 'Sold'
      };
      
      console.log('🎫 Ticket details:', ticketDetails);
      setSelectedTicket(ticketDetails);
      setShowTicketModal(true);
      
    } catch (error) {
      console.error('Error showing ticket details:', error);
      alert('Error showing ticket details');
    }
  };

  // Function to get ticket status class
  const getTicketStatusClass = (ticketNumber: number) => {
    // Add null checks to prevent runtime errors
    const myTickets = dashboardData.myTickets || [];
    const ticketsSold = dashboardData.ticketsSold || 0;
    const winningNumber = dashboardData.winningNumber || 0;
    const drawExecuted = dashboardData.drawExecuted || false;
    
    if (myTickets.includes(ticketNumber)) {
      return "bg-blue-600 hover:bg-blue-700 text-white"; // Light blue for my tickets
    } else if (winningNumber === ticketNumber && drawExecuted) {
      return "bg-yellow-500 hover:bg-yellow-600 text-black"; // Yellow for winners
    } else if (ticketNumber <= ticketsSold) {
      return "bg-orange-500 hover:bg-orange-600 text-white"; // Orange for sold tickets
    } else {
      return "bg-gray-700 hover:bg-gray-600 text-gray-300"; // Gray for available tickets
    }
  };

  const handleRegister = async () => {
    await registerUser(sponsorAddress || '0x0000000000000000000000000000000000000000');
  };

  const handlePurchase = async () => {
    // Validate ticket count
    const ticketCount = parseInt(numTickets);
    if (!ticketCount || ticketCount < 1 || ticketCount > 50) {
      setNotification({ type: 'error', message: 'Please enter a valid number of tickets (1-50)' });
      return;
    }
    
    try {
      // Purchase the specified number of tickets
      await purchaseTickets(ticketCount);
      
      // Only mark as purchased after successful purchase
      setHasPurchasedTicket(true);
      setNotification({ type: 'success', message: `Successfully purchased ${ticketCount} ticket${ticketCount > 1 ? 's' : ''}!` });
    } catch (error: any) {
      console.error('Purchase failed:', error);
      // Don't set hasPurchasedTicket to true if purchase fails
      setNotification({ type: 'error', message: error.message || 'Ticket purchase failed' });
    }
  };

  const handleClaim = async (roundId?: number) => {
    try {
      if (!isConnected) {
        setNotification({ type: 'error', message: 'Please connect your wallet first' });
        return;
      }

      if (!roundId) {
        setNotification({ type: 'error', message: 'Invalid round ID' });
        return;
      }

      setClaimLoading(true);
      setNotification({ type: 'info', message: 'Processing prize claim...' });
      
      await claimPrize(roundId);
      
      setNotification({ type: 'success', message: 'Prize claimed successfully! 🏆' });
      
      // Mark round as claimed in localStorage (exact same as register.js)
      try {
        const claimedRounds = JSON.parse(localStorage.getItem(`claimedRounds_${address}`) || '[]');
        if (!claimedRounds.includes(roundId)) {
          claimedRounds.push(roundId);
          localStorage.setItem(`claimedRounds_${address}`, JSON.stringify(claimedRounds));
          console.log(`Round ${roundId} marked as claimed in localStorage`);
        }
      } catch (error) {
        console.warn('Could not update localStorage for claimed round');
      }
      
      // Refresh data after successful claim (exact same as register.js)
      setTimeout(() => {
        loadPrizeData();
      }, 3000);

    } catch (error: any) {
      console.error('❌ Claim error:', error);
      
      let errorMessage = 'Claim failed';
      if (error.message?.includes('user rejected')) {
        errorMessage = 'Transaction was cancelled by user';
      } else if (error.message?.includes('no prize')) {
        errorMessage = 'No prize available to claim';
      } else if (error.message?.includes('already claimed')) {
        errorMessage = 'Prize already claimed';
      } else {
        errorMessage = 'Claim failed: ' + error.message;
      }
      
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setClaimLoading(false);
    }
  };

  // Load Prize Data Function - Using exact logic from register.js but only current round
  const loadPrizeData = async () => {
    try {
      if (!address || !dashboardData.userInfo) return;
      
      console.log('🏆 Loading current round pending claims...');
      
      let totalPendingClaims = 0;
      let prizes: any[] = [];
      
      // Only check current round
      const currentRound = dashboardData.currentRound || 1;
      
      // Check if draw is executed for current round
      if (!dashboardData.drawExecuted) {
        console.log('Draw not executed yet for current round');
        setPrizeData({
          foundPrizes: false,
          totalPendingClaims: '0',
          prizes: []
        });
        return;
      }
      
      // Additional check to ensure we have valid round data
      if (!dashboardData.ticketsSold || dashboardData.ticketsSold === 0) {
        console.log('No tickets sold in current round');
        setPrizeData({
          foundPrizes: false,
          totalPendingClaims: '0',
          prizes: []
        });
        return;
      }
      
      try {
        // Get user tickets for current round - handle the error gracefully
        let userTickets: bigint[] = [];
        try {
          userTickets = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
            abi: LOTTERY_ABI,
            functionName: 'getUserTickets',
            args: [BigInt(currentRound), address as `0x${string}`],
          }) as bigint[];
          
          console.log('🎫 User tickets for current round:', userTickets.length);
        } catch (userTicketsError) {
          console.warn('⚠️ Could not load user tickets:', userTicketsError);
          // If getUserTickets fails, try to get tickets from dashboardData.myTickets
          if (dashboardData.myTickets && dashboardData.myTickets.length > 0) {
            userTickets = dashboardData.myTickets.map((ticket: any) => BigInt(ticket));
            console.log('🎫 Using dashboardData.myTickets as fallback:', userTickets.length);
          } else {
          userTickets = [];
          }
        }
        
        if (userTickets.length === 0) {
          console.log('No tickets found for current round');
          setPrizeData({
            foundPrizes: false,
            totalPendingClaims: '0',
            prizes: []
          });
          return;
        }
        
        // Check each ticket for prizes in current round
        let roundPrizes = [];
        let totalRoundPrize = BigInt(0);
        
        for (const ticketNumber of userTickets) {
          // Only check tickets that are within the sold range
          if (parseInt(ticketNumber.toString()) > (dashboardData.ticketsSold || 0)) {
            console.log(`Skipping ticket ${ticketNumber} - not sold yet (only ${dashboardData.ticketsSold} sold)`);
            continue;
          }
          
          try {
            // First check if the ticket exists and is sold
            const ticketOwner = await publicClient.readContract({
              address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
              abi: LOTTERY_ABI,
              functionName: 'getTicketOwner',
              args: [BigInt(currentRound), BigInt(ticketNumber)],
            }) as string;
            
            // Only check rank if ticket is owned by someone (not zero address)
            if (ticketOwner && ticketOwner !== '0x0000000000000000000000000000000000000000') {
          try {
            // Get ticket rank (0 = no prize, 1-10 = winning ranks)
            const ticketRank = await publicClient.readContract({
              address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
              abi: LOTTERY_ABI,
              functionName: 'getTicketRank',
              args: [BigInt(currentRound), BigInt(ticketNumber)],
            }) as bigint;
            
            if (parseInt(ticketRank.toString()) > 0) {
                  try {
              // Calculate prize for this ticket
              const ticketPrize = await publicClient.readContract({
                address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
                abi: LOTTERY_ABI,
                functionName: 'calculateTicketPrize',
                args: [BigInt(currentRound), BigInt(ticketNumber)],
              }) as bigint;
              
              if (BigInt(ticketPrize) > 0) {
                roundPrizes.push({
                  ticketNumber: ticketNumber.toString(),
                  rank: parseInt(ticketRank.toString()),
                  prize: ticketPrize.toString()
                });
                totalRoundPrize += BigInt(ticketPrize);
              }
                  } catch (prizeError) {
                    console.warn(`Could not calculate prize for ticket ${ticketNumber} in round ${currentRound}:`, prizeError);
                  }
                }
              } catch (rankError) {
                // If getTicketRank fails, it might mean the ticket has no rank (not a winner)
                // or the function doesn't exist in this contract version
                console.log(`Ticket ${ticketNumber} has no rank in round ${currentRound} (not a winner or function not available)`);
                
                // Try alternative approach - check if this is the winning ticket
                try {
                  if (dashboardData.winningNumber === parseInt(ticketNumber.toString())) {
                    // This is the winning ticket, give it rank 1
                    const ticketPrize = await publicClient.readContract({
                      address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
                      abi: LOTTERY_ABI,
                      functionName: 'calculateTicketPrize',
                      args: [BigInt(currentRound), BigInt(ticketNumber)],
                    }) as bigint;
                    
                    if (BigInt(ticketPrize) > 0) {
                      roundPrizes.push({
                        ticketNumber: ticketNumber.toString(),
                        rank: 1, // Winning ticket gets rank 1
                        prize: ticketPrize.toString()
                      });
                      totalRoundPrize += BigInt(ticketPrize);
                    }
                  }
                } catch (altError) {
                  console.warn(`Alternative prize check failed for ticket ${ticketNumber}:`, altError);
                }
              }
            } else {
              console.log(`Ticket ${ticketNumber} is not owned by anyone in round ${currentRound}`);
            }
          } catch (error) {
            console.warn(`Could not check ticket ${ticketNumber} in round ${currentRound}:`, error);
          }
        }
        
        // If current round has prizes, check claim status
        if (roundPrizes.length > 0) {
          // Check if already claimed using the isClaimed function
          let isAlreadyClaimed = false;
          try {
            isAlreadyClaimed = await publicClient.readContract({
              address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
              abi: LOTTERY_ABI,
              functionName: 'isClaimed',
              args: [BigInt(currentRound), address as `0x${string}`],
            }) as boolean;
            console.log(`🏆 User claim status for round ${currentRound}:`, isAlreadyClaimed);
          } catch (claimError) {
            console.warn('⚠️ Could not check claim status, using localStorage fallback:', claimError);
            // Fallback to localStorage
          const claimedRounds = JSON.parse(localStorage.getItem(`claimedRounds_${address}`) || '[]');
            isAlreadyClaimed = claimedRounds.includes(currentRound);
          }
          
          // Only add to pending claims if not claimed yet
          if (!isAlreadyClaimed) {
            totalPendingClaims = Number(totalRoundPrize);
          }
          
          const rankNames = {
            1: '1st Place', 2: '2nd Place', 3: '3rd Place',
            4: '4th Place', 5: '5th Place', 6: '6th Place',
            7: '7th Place', 8: '8th Place', 9: '9th Place', 10: '10th Place'
          };
          
          const bestRank = Math.min(...roundPrizes.map((p: any) => p.rank));
          
          prizes.push({
            roundId: currentRound,
            userTickets: userTickets.length,
            roundPrizes,
            totalRoundPrize: totalRoundPrize.toString(),
            isAlreadyClaimed,
            bestRank
          });
        }
        
      } catch (error) {
        console.warn(`Could not check current round ${currentRound} for prizes:`, error);
      }
      
      // Convert totalPendingClaims from wei to USDT
      const formattedPendingClaims = formatUSDT(formatEther(BigInt(totalPendingClaims)));
      
      setPrizeData({
        foundPrizes: prizes.length > 0,
        totalPendingClaims: formattedPendingClaims,
        prizes
      });
      
    } catch (error) {
      console.error('❌ Error loading current round prize data:', error);
      setPrizeData({
        foundPrizes: false,
        totalPendingClaims: '0',
        prizes: []
      });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        if (sectionLoading) {
          return (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl">Loading dashboard data...</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch your lottery information</p>
            </div>
          );
        }
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
              <StatCard 
                icon=""
                iconImage="18.png"
                title="Current Round" 
                value={dashboardData.currentRound || 0} 
                subtitle="Active lottery round" 
              />
              <StatCard 
                icon=""
                iconImage="15.png"
                title="Total Tickets" 
                value={dashboardData.totalTickets || 0} 
                subtitle="Available in current round"
                iconSize={80} 
              />
              <StatCard 
                icon=""
                iconImage="14.png"
                title="Tickets Sold" 
                value={dashboardData.ticketsSold || 0} 
                subtitle={`${(dashboardData.totalTickets || 0) - (dashboardData.ticketsSold || 0)} remaining`} 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
              <StatCard 
                icon=""
                iconImage="11.png"
                title="Prize Pool" 
                value={formatUSDT(dashboardData.prizePool || '0')}
                subtitle="TRDO total prizes" 
              />
              <StatCard 
                icon=""
                iconImage="19.png"
                title="Ticket Price" 
                value={formatUSDT(dashboardData.ticketPrice || '0')} 
                subtitle="TRDO per ticket" 
              />
              <StatCard 
                icon=""
                iconImage="16.png"
                title="My Tickets" 
                value={dashboardData.myTicketsCount || 0} 
                subtitle="In current round"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
              <StatCard 
                icon=""
                iconImage="13.png"
                title="Draw Status" 
                value={dashboardData.drawExecuted ? "Completed" : "Pending"} 
                subtitle="Current round status" 
              />
              <StatCard 
                icon=""
                iconImage="17.png"
                title="Total Tickets Count" 
                value={dashboardData.totalTickets || 0} 
                subtitle="Overall statistics" 
              />
            </div>

            {/* Live Tickets Board */}
            <div className="mt-6 md:mt-8 relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/dbg.png"
                  alt="Dashboard Background"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  quality={100}
                />
              </div>
              
              <div className="relative z-10 p-3 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-white">🎫 Live Tickets Board</h2>
                
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1 md:gap-2 mb-4 md:mb-6">
                  {Array.from({length: dashboardData.totalTickets || 0}, (_, i) => i + 1).map((ticketNumber) => (
                    <button 
                      key={ticketNumber}
                      className={`${getTicketStatusClass(ticketNumber)} aspect-square rounded flex items-center justify-center transition-all duration-200 text-xs md:text-sm font-mono`}
                      onClick={() => handleTicketClick(ticketNumber)}
                    >
                      {String(ticketNumber).padStart(3, '0')}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-white">
                  <div className="flex items-center">
                    <span className="block w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded mr-1 md:mr-2"></span>
                    <span>My Tickets</span>
                  </div>
                  <div className="flex items-center">
                    <span className="block w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded mr-1 md:mr-2"></span>
                    <span>Sold</span>
                  </div>
                  <div className="flex items-center">
                    <span className="block w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded mr-1 md:mr-2"></span>
                    <span>Winners</span>
                  </div>
                  <div className="flex items-center">
                    <span className="block w-3 h-3 md:w-4 md:h-4 bg-gray-700 rounded mr-1 md:mr-2"></span>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigateToSection('purchase')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg md:text-xl transition duration-300 flex items-center justify-center"
              >
                <span className="mr-2">🎫</span>
                Buy Tickets Now
              </button>
              {!dashboardData.isRegistered && (
                <button
                  onClick={() => navigateToSection('registration')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg md:text-xl transition duration-300 flex items-center justify-center"
                >
                  <span className="mr-2">📝</span>
                  Register First
                </button>
              )}
            </div>
          </>
        );

      case 'registration':
        if (sectionLoading) {
        return (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl">Loading registration data...</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch your registration information</p>
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Join the Lottery</h2>
              
              {dashboardData.isRegistered ? (
                <div className="text-center">
                  <div className="text-green-500 text-4xl md:text-6xl mb-3 md:mb-4">✅</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Already Registered!</h3>
                  {dashboardData.userInfo && (
                    <div className="space-y-2 text-xs md:text-sm text-gray-300 mb-4">
                      <p><strong>Sponsor:</strong> {formatAddress(dashboardData.userInfo.sponsor)}</p>
                      <p><strong>Total Tickets:</strong> {dashboardData.userInfo.totalTicketsPurchased || 0}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2 text-sm md:text-base">Sponsor Address (Optional)</label>
                    <input
                      type="text"
                      placeholder="Sponsor address (optional)"
                      value={sponsorAddress}
                      onChange={(e) => setSponsorAddress(e.target.value)}
                      className="w-full p-2 md:p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                    />
                  </div>
                  <button
                    onClick={handleRegister}
                    disabled={!isConnected || loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 md:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:opacity-50 text-sm md:text-base"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Referral Link Section - Only show if user is registered */}
            {dashboardData.isRegistered && (
              <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-center flex items-center justify-center">
                  <span className="mr-2">🔗</span>
                  Your Referral Link
                </h3>
                
                <div className="space-y-3 md:space-y-4">
                  <p className="text-sm md:text-base text-gray-300 text-center">
                    Share this link with friends to earn sponsor income when they register!
                  </p>
                  
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs md:text-sm text-gray-400">Your Address:</span>
                      <span className="text-xs md:text-sm font-mono text-blue-400">{formatAddress(address || '')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-1 p-2 md:p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 text-xs md:text-sm font-mono"
                        placeholder="Generating referral link..."
                      />
                      <button
                        onClick={copyReferralLink}
                        disabled={!referralLink}
                        className={`px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold transition duration-300 text-xs md:text-sm flex items-center ${
                          !referralLink
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : showReferralCopied
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {showReferralCopied ? (
                          <>
                            <span className="mr-1">✅</span>
                            Copied!
                          </>
                        ) : (
                          <>
                            <span className="mr-1">📋</span>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-gray-400 mb-2">
                      When someone uses your referral link:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                      <div className="bg-green-900 border border-green-600 rounded-lg p-2">
                        <span className="text-green-400 font-semibold">✅</span>
                        <span className="text-gray-300">They get auto-filled sponsor</span>
                      </div>
                      <div className="bg-blue-900 border border-blue-600 rounded-lg p-2">
                        <span className="text-blue-400 font-semibold">💰</span>
                        <span className="text-gray-300">You earn sponsor income</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'purchase':
        if (sectionLoading) {
          return (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl">Loading purchase data...</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch ticket information</p>
            </div>
          );
        }
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Purchase Tickets</h2>
              
              {!dashboardData.isRegistered ? (
                <div className="text-center text-gray-400">
                  <p className="text-4xl md:text-6xl mb-3 md:mb-4">📝</p>
                  <p className="text-sm md:text-base">Please register first before purchasing tickets</p>
                  <button
                    onClick={() => navigateToSection('registration')}
                    className="mt-3 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded text-sm md:text-base"
                  >
                    Register Now
                  </button>
                </div>
              ) : hasPurchasedTicket ? (
                // User has already purchased tickets
                <div className="text-center text-gray-400">
                  <p className="text-4xl md:text-6xl mb-3 md:mb-4">✅</p>
                  <p className="text-sm md:text-base font-semibold text-green-400 mb-2">Tickets Already Purchased!</p>
                  <p className="text-xs md:text-sm">You can only purchase tickets once per round. Your tickets are ready for the draw.</p>
                  <button
                    onClick={() => navigateToSection('mytickets')}
                    className="mt-3 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded text-sm md:text-base"
                  >
                    View My Tickets
                  </button>
                </div>
              ) : (
                // User can purchase a ticket
                <>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2 text-sm md:text-base">Number of Tickets</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={numTickets}
                      onChange={(e) => setNumTickets(e.target.value)}
                      placeholder="Enter number of tickets (1-50)"
                      className="w-full p-2 md:p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum 50 tickets per user per round</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4 mb-4">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Price per ticket:</span>
                      <span>{formatUSDT(dashboardData.ticketPrice || '0')} TRDO</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Number of tickets:</span>
                      <span>{numTickets || '0'}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-sm md:text-base border-t border-gray-700 pt-2 mt-2">
                      <span>Total cost:</span>
                      <span>{formatUSDT((parseFloat(dashboardData.ticketPrice || '0') * (parseInt(numTickets) || 0)).toString())} TRDO</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePurchase}
                    disabled={!isConnected || loading || isWalletSwitching || hasPurchasedTicket || !numTickets || parseInt(numTickets) < 1 || parseInt(numTickets) > 50}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 md:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:opacity-50 text-sm md:text-base"
                  >
                    {loading ? 'Processing...' : isWalletSwitching ? 'Switching Wallet...' : hasPurchasedTicket ? 'Already Purchased' : `Purchase ${numTickets || '0'} Ticket${parseInt(numTickets) > 1 ? 's' : ''}`}
                  </button>
                </>
              )}
            </div>

            {/* Purchase History Section */}
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h3 className="text-lg md:text-xl font-bold flex items-center">
                  <span className="mr-2">📊</span>
                  Purchase History
                </h3>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg flex items-center text-sm md:text-base"
                  onClick={() => window.location.reload()}
                >
                  <span className="mr-2">🔄</span>
                  Refresh
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Round</th>
                      <th className="py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Tickets</th>
                      <th className="py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Amount Paid</th>
                      <th className="py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.userPurchaseHistory && dashboardData.userPurchaseHistory.length > 0 ? (
                      dashboardData.userPurchaseHistory.map((purchase: any, index: number) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{purchase.roundId}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{purchase.ticketsCount}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{purchase.amountPaid}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{purchase.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 md:py-8 text-center text-gray-400">
                          <div className="text-3xl md:text-4xl mb-2">📊</div>
                          <div className="text-sm md:text-lg font-semibold mb-1">No purchase history</div>
                          <div className="text-xs md:text-sm">Your ticket purchases will appear here</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'mytickets':
        if (sectionLoading) {
          return (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl">Loading my tickets...</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch your ticket information</p>
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">My Tickets</h2>
            
            {(!dashboardData.myTickets || dashboardData.myTickets.length === 0) ? (
              <div className="text-center text-gray-400">
                <p className="text-4xl md:text-6xl mb-3 md:mb-4">🎫</p>
                <p className="text-sm md:text-base">No tickets purchased yet</p>
                <button
                  onClick={() => navigateToSection('purchase')}
                  className="mt-3 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded text-sm md:text-base"
                >
                  Buy Tickets
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-6">
                  {dashboardData.myTickets.map((ticketNumber: number) => (
                    <div
                      key={ticketNumber}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm md:text-xl font-bold ${
                        dashboardData.drawExecuted && dashboardData.winningNumber === ticketNumber
                          ? 'bg-yellow-500 text-black animate-pulse'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {String(ticketNumber).padStart(3, '0')}
                    </div>
                  ))}
                </div>
                
                {dashboardData.drawExecuted && (
                  <div className="text-center">
                    {/* <button
                      onClick={() => handleClaim()}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      Claim All Prizes
                    </button> */}
                  </div>
                )}
              </>
            )}
          </div>
        );

      case 'claim':
        if (sectionLoading) {
          return (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl">Loading claim data...</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch your prize information</p>
            </div>
          );
        }
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-xl md:text-2xl font-bold">🏆 Claim Prizes</h2>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg flex items-center text-sm md:text-base"
                  onClick={() => {
                    loadPrizeData();
                    setNotification({ type: 'info', message: 'Refreshing prize data...' });
                  }}
                >
                  <span className="mr-2">🔄</span>
                  Refresh
                </button>
              </div>
              
              {sectionLoading ? (
                <div className="text-center text-gray-400 py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
                  <p className="text-lg md:text-xl">Loading claim data...</p>
                  <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch your prize information</p>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {/* Prize Statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-gray-800 rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-blue-400">{dashboardData.userInfo?.totalTicketsPurchased || 0}</div>
                      <div className="text-xs md:text-sm text-gray-300">Total Tickets</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-green-400">
                        {formatUSDT(dashboardData.userInfo?.totalEarnings || '0')}
                      </div>
                      <div className="text-xs md:text-sm text-gray-300">Total Winnings</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-yellow-400">
                        {isClaimedFromContract === true ? '0' : prizeData.totalPendingClaims}
                      </div>
                      <div className="text-xs md:text-sm text-gray-300">Pending Claims</div>
                    </div>
                  </div>

                  {/* Comprehensive Prize Data Section */}
                  <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                      <span className="mr-2">💰</span>
                      Prize Breakdown & Sponsor Income
                    </h3>
                    
                    {/* Current Round Prize Data */}
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-blue-400">
                        Round #{dashboardData.currentRound} - Current Round
                      </h4>
                      <ComprehensivePrizeDisplay 
                        roundId={dashboardData.currentRound}
                        getUserPrizeData={getUserPrizeData}
                        getUserTotalPrize={getUserTotalPrize}
                        getUserSponsorInfo={getUserSponsorInfo}
                        setNotification={setNotification}
                        myTicketsCount={dashboardData.myTicketsCount || 0}
                      />
                    </div>

                    {/* User Sponsor Income Summary */}
                    <div className="bg-gray-900 rounded-lg p-3 md:p-4 border border-gray-600">
                      <h4 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-purple-400">
                        📊 Your Sponsor Income Summary
                      </h4>
                      <div className="text-center">
                        <div className="text-lg md:text-xl font-bold text-purple-400">
                          {dashboardData.userInfo?.sponsorIncome || '0.00'}
                        </div>
                        <div className="text-xs md:text-sm text-gray-300">Total Sponsor Income</div>
                      </div>
                    </div>
                  </div>

                  

                  {/* Simplified Prize Claims Section */}
                  
                </div>
              )}
            </div>
          </div>
        );

      case 'rankings':
        if (sectionLoading) {
          return (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl">Loading rankings data...</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Please wait while we fetch ticket rankings</p>
            </div>
          );
        }
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">🏅 Rankings & Winning Tickets</h2>
              <button 
                onClick={() => {
                  loadPrizeData();
                  setNotification({ type: 'info', message: 'Refreshing rankings data...' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
              >
                <span className="mr-2">🔄</span>
                Refresh
              </button>
            </div>
            {/* Test getTicketRank Button */}
            <TestGetTicketRankButton />
            
            {sectionLoading ? (
              <div className="text-center text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-sm md:text-base">Loading ticket rankings...</p>
              </div>
            ) : !dashboardData.drawExecuted ? (
              <div className="text-center text-gray-400">
                <p className="text-4xl md:text-6xl mb-3 md:mb-4">⏳</p>
                <p className="text-sm md:text-base">Draw not executed yet. Please wait for the round to complete.</p>
              </div>
            ) : (!dashboardData.myTickets || dashboardData.myTickets.length === 0) ? (
              <div className="text-center text-gray-400">
                <p className="text-4xl md:text-6xl mb-3 md:mb-4">🎫</p>
                <p className="text-sm md:text-base">No tickets to show rankings for</p>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {/* Rankings Summary */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                    <span className="mr-2">📊</span>
                    Rankings Summary
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-blue-400">{dashboardData.myTickets.length}</div>
                      <div className="text-sm text-gray-300">Total Tickets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-green-400">
                        {prizeData.foundPrizes ? prizeData.prizes.reduce((total, prize) => total + prize.roundPrizes.length, 0) : 0}
                      </div>
                      <div className="text-sm text-gray-300">Winning Tickets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                        {prizeData.foundPrizes && prizeData.prizes.length > 0 ? 
                          Math.min(...prizeData.prizes[0].roundPrizes.map((p: any) => p.rank)) : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-300">Best Rank</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Rankings */}
                  {prizeData.foundPrizes ? (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold">🏆 Your Winning Tickets & Rankings</h3>
                      
                      {prizeData.prizes.map((prize, index) => {
                        const rankNames = {
                          1: '1st Place', 2: '2nd Place', 3: '3rd Place',
                          4: '4th Place', 5: '5th Place', 6: '6th Place',
                          7: '7th Place', 8: '8th Place', 9: '9th Place', 10: '10th Place'
                        };
                        
                        const getColoredRankName = (rank: number) => {
                          const rankName = rankNames[rank as keyof typeof rankNames];
                          if (rank === 1) {
                            return <span className="text-yellow-400 font-bold">{rankName}</span>;
                          } else if (rank === 2) {
                            return <span className="text-gray-300 font-bold">{rankName}</span>;
                          } else if (rank === 3) {
                            return <span className="text-amber-600 font-bold">{rankName}</span>;
                          } else {
                            return <span className="text-gray-300 font-semibold">{rankName}</span>;
                          }
                        };
                        
                        return (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-blue-400">Round #{prize.roundId}</h4>
                            <div className="text-sm text-gray-300">
                              {prize.roundPrizes.length} winning ticket{prize.roundPrizes.length > 1 ? 's' : ''}
                              </div>
                            </div>
                            
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {prize.roundPrizes.map((ticketPrize, ticketIndex) => {
                                  const getRankStyling = (rank: number) => {
                                    switch (rank) {
                                      case 1:
                                        return {
                                          bgClass: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
                                          textClass: 'text-yellow-900',
                                          borderClass: 'border-yellow-300',
                                          shadowClass: 'shadow-lg shadow-yellow-500/30'
                                        };
                                      case 2:
                                        return {
                                          bgClass: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
                                          textClass: 'text-gray-800',
                                          borderClass: 'border-gray-200',
                                          shadowClass: 'shadow-lg shadow-gray-400/30'
                                        };
                                      case 3:
                                        return {
                                          bgClass: 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800',
                                          textClass: 'text-amber-100',
                                          borderClass: 'border-amber-500',
                                          shadowClass: 'shadow-lg shadow-amber-600/30'
                                        };
                                      default:
                                        return {
                                          bgClass: 'bg-gray-700',
                                          textClass: 'text-gray-300',
                                          borderClass: 'border-gray-600',
                                          shadowClass: 'shadow-md'
                                        };
                                    }
                                  };

                                  const styling = getRankStyling(ticketPrize.rank);
                                  
                                  return (
                                    <div 
                                      key={ticketIndex} 
                                  className={`${styling.bgClass} ${styling.borderClass} ${styling.shadowClass} rounded-lg p-3 md:p-4 text-center border-2 transition-all duration-300 hover:scale-105 cursor-pointer`}
                                  onClick={() => handleTicketClick(parseInt(ticketPrize.ticketNumber))}
                                >
                                  <div className={`text-lg md:text-xl font-bold ${styling.textClass} mb-2`}>
                                      #{ticketPrize.ticketNumber}
                                    </div>
                                  <div className={`text-sm md:text-base font-semibold ${styling.textClass} mb-2`}>
                                          {getColoredRankName(ticketPrize.rank)}
                                    </div>
                                  <div className={`text-sm md:text-base font-bold ${styling.textClass} mb-2`}>
                                      {formatUSDT(formatEther(BigInt(ticketPrize.prize)))} TRDO
                                    </div>
                                        
                                        {/* Rank indicator */}
                                        {ticketPrize.rank <= 3 && (
                                    <div className="text-2xl md:text-3xl">
                                      {ticketPrize.rank === 1 && <span>🥇</span>}
                                      {ticketPrize.rank === 2 && <span>🥈</span>}
                                      {ticketPrize.rank === 3 && <span>🥉</span>}
                                  </div>
                                        )}
                                    </div>
                                  );
                                })}
                            </div>
                            
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-lg md:text-xl font-bold text-green-400">
                                    {formatUSDT(formatEther(BigInt(prize.totalRoundPrize)))} TRDO
                                  </div>
                                <div className="text-sm text-gray-300">Total Prize Value</div>
                                </div>
                              <div className="flex items-center gap-3">
                                                              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                claimStatus[prize.roundId] 
                                  ? 'bg-green-900 text-green-300' 
                                  : 'bg-blue-900 text-blue-300'
                              }`}>
                                {claimStatus[prize.roundId] ? '✅ Claimed' : '💰 Claimable'}
                              </div>
                                
                                {/* Claim Button */}
                                {/* {!claimStatus[prize.roundId] && (
                                <button
                                    onClick={() => !claimLoading && handleClaim(prize.roundId)}
                                    disabled={claimLoading}
                                    className={`px-4 py-2 rounded-lg font-semibold transition duration-300 text-sm ${
                                      claimLoading
                                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                                  }`}
                                >
                                    {claimLoading ? '⏳ Claiming...' : '🏆 Claim'}
                                </button>
                                )} */}
                              </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8 md:py-12">
                    <div className="text-4xl md:text-6xl mb-3 md:mb-4">🏅</div>
                    <div className="text-lg md:text-xl font-semibold mb-2">No rankings found</div>
                      <div className="text-sm md:text-base">You haven't won any prizes in this round yet.</div>
                    </div>
                  )}
                </div>
              )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        navigateToSection={navigateToSection}
      />
      
      {/* Main Content */}
      <div className="md:ml-64 flex-1 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
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
        <header className="py-3 md:py-4 px-3 md:px-6 bg-gradient-to-r from-gray-900 to-blue-900 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="mr-3 md:mr-4 text-gray-400 hover:text-white md:hidden"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white flex items-center">
              <span className="mr-2">🏆</span> 
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
          </div>
          <ConnectButton />
        </header>
        
        {/* Dashboard Content */}
        <div className="p-3 md:p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Notifications */}
      <Notification 
          notification={notification}
        onClose={() => setNotification(null)} 
      />

      {/* Ticket Details Modal */}
      {selectedTicket && showTicketModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowTicketModal(false);
            setSelectedTicket(null);
          }}
        >
          <div 
            className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700 text-white w-full max-w-sm md:w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold">🎫 Ticket Details</h2>
              <button 
                className="text-gray-400 hover:text-white text-xl md:text-2xl font-bold"
                onClick={() => {
                  setShowTicketModal(false);
                  setSelectedTicket(null);
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm md:text-base">Ticket Number:</span>
                <span className="font-mono text-sm md:text-base">#{selectedTicket.ticketNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm md:text-base">Owner:</span>
                <span className="font-mono text-sm md:text-base">{formatAddress(selectedTicket.owner)}</span>
              </div>
              
              {selectedTicket.isMyTicket && (
                <div className="text-green-400 text-center font-semibold text-sm md:text-base">
                  ✅ This is your ticket!
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm md:text-base">Status:</span>
                <span className={`font-semibold text-sm md:text-base ${
                  selectedTicket.status === 'Available' ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {selectedTicket.status}
                </span>
              </div>
              
              {/* Show rank and prize if draw is executed and ticket has a rank */}
              {selectedTicket.rank > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm md:text-base">Rank:</span>
                    <span className="font-semibold text-sm md:text-base text-yellow-400">
                      {selectedTicket.rank === 1 ? '🥇 1st Place' :
                       selectedTicket.rank === 2 ? '🥈 2nd Place' :
                       selectedTicket.rank === 3 ? '🥉 3rd Place' :
                       `${selectedTicket.rank}${selectedTicket.rank === 1 ? 'st' : selectedTicket.rank === 2 ? 'nd' : selectedTicket.rank === 3 ? 'rd' : 'th'} Place`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm md:text-base">Prize:</span>
                    <span className="font-semibold text-sm md:text-base text-green-400">
                      {selectedTicket.prize} TRDO
                    </span>
                  </div>
                </>
              )}
              
              {/* Show if it's the winning ticket */}
              {selectedTicket.isWinner && (
                <div className="text-center bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg p-2 md:p-3">
                  <div className="text-yellow-400 font-bold text-sm md:text-base">
                    🎉 WINNING TICKET! 🎉
                  </div>
                  <div className="text-yellow-300 text-xs md:text-sm">
                    This ticket won the jackpot!
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-6 flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg transition duration-300 text-sm md:text-base"
                onClick={() => {
                  setShowTicketModal(false);
                  setSelectedTicket(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Replace TestGetTicketOwnerButton with this component:
function TestGetTicketRankButton() {
  const { address } = useAccount();
  // const { dashboardData } = useWallet();
  // const [loading, setLoading] = useState(false);

   //Testing env
   const handleTest = async () => {
    // if (!dashboardData.currentRound || !dashboardData.totalTickets) {
    //   console.log('No current round or total tickets');
    //   return;
    // }
    // setLoading(true);
    // const roundId = dashboardData.currentRound;
    // const totalTickets = dashboardData.myTicketsCount;
    // console.log('Adiii:', totalTickets);
    // console.log('Adiii:', roundId);  

    // for (let ticketNumber = 1; ticketNumber <= 1; ticketNumber++) {
      try {
        console.log('claim tickets rank');
        const rank = await publicClient.readContract({
          address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
          abi: LOTTERY_ABI,
          functionName: 'isClaimed',
          args: [address as `0x${string}`, 3]
        });
        // console.log('getTicketRank:', { roundId, ticketNumber, rank: rank?.toString() });
        console.log('getTicketRank:', rank);
      } catch (err) {
        console.error('Error calling getTicketRank:', err);
      }
    // }
  };


  return (
    <button
      onClick={handleTest}
      // disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center mt-2"
    >
      {'Testing getTicketRank...'}
    </button>
  );
}

