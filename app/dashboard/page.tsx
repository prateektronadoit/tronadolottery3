'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useWallet } from '../hooks/useWallet';
import { createPublicClient, http, formatEther } from 'viem';
import { bscTestnet } from 'wagmi/chains';

// Import contract data from useWallet - Testnet BSCScan
const CONTRACT_ADDRESSES = {
  LOTTERY: '0xc00235bc296c2d8986bbab01967239f8a61c0f88',
  USDT: '0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA'
};

// Create public client for reading contract data
const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
});

// Contract ABIs - Updated with new ABI
const LOTTERY_ABI = [{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_creator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"DrawExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"bool","name":"isPurchase","type":"bool"}],"name":"MLMEarning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PrizeClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"},{"indexed":false,"internalType":"address","name":"updatedBy","type":"address"}],"name":"RankPrizesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTickets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"RoundCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTransferredToCreator","type":"uint256"}],"name":"RoundSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"SponsorIncomeReset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"ticketNumbers","type":"uint256[]"}],"name":"TicketPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"UserRegistered","type":"event"},{"inputs":[],"name":"MaxTicketPerRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"calculateTicketPrize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"claimLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"claimPrize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"createRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"defaultRankPrizes","outputs":[{"internalType":"uint256","name":"percentage","type":"uint256"},{"internalType":"bool","name":"isGroup","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"executeDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"finalizeRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"getAllRegisteredUsersPaginated","outputs":[{"internalType":"address[]","name":"usersList","type":"address[]"},{"internalType":"uint256","name":"totalCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractStats","outputs":[{"internalType":"uint256","name":"totalRounds","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"},{"internalType":"uint256","name":"activeRound","type":"uint256"},{"internalType":"uint256","name":"totalRegisteredUsers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRankPrizes","outputs":[{"internalType":"uint256[10]","name":"percentages","type":"uint256[10]"},{"internalType":"bool[10]","name":"isGroupFlags","type":"bool[10]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"getRegisteredUsers","outputs":[{"internalType":"address[]","name":"usersList","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getRoundClaimProgress","outputs":[{"internalType":"uint256","name":"totalOwners","type":"uint256"},{"internalType":"uint256","name":"ownersClaimed","type":"uint256"},{"internalType":"bool","name":"isComplete","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getRoundFinalizationProgress","outputs":[{"internalType":"uint256","name":"usersProcessed","type":"uint256"},{"internalType":"uint256","name":"totalUsers","type":"uint256"},{"internalType":"bool","name":"isComplete","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getRoundInfo","outputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketRank","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalRegisteredUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getUserSponsorInfo","outputs":[{"internalType":"uint256","name":"sponsorIncome","type":"uint256"},{"internalType":"bool","name":"participatedInRound","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserTickets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isUserInArray","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTicketPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"purchaseLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"numberOfTickets","type":"uint256"}],"name":"purchaseTickets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sponsor","type":"address"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"registeredUsers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundFinalizationProgress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"roundParticipants","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rounds","outputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"},{"internalType":"uint256","name":"createdAt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_MaxTicketPerRound","type":"uint256"}],"name":"setMaxTicketPerRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTicketPurchase","type":"uint256"}],"name":"setMaxTicketPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalOwnersClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalUniqueOwners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"}],"name":"updateRankPrizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"},{"internalType":"uint256","name":"sponsorIncome","type":"uint256"}],"stateMutability":"view","type":"function"}];

// Sidebar component
const Sidebar = ({ 
  isOpen, 
  toggleSidebar, 
  activeSection, 
  setActiveSection 
}: { 
  isOpen: boolean; 
  toggleSidebar: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'registration', icon: '📝', label: 'Registration' },
    { id: 'purchase', icon: '🎫', label: 'Purchase' },
    { id: 'mytickets', icon: '🎟️', label: 'My Tickets' },
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
                  onClick={() => setActiveSection(item.id)}
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

  const { isConnected } = useAccount();
  const {
    address,
    dashboardData,
    loading,
    notification: walletNotification,
    registerUser,
    purchaseTickets,
    claimPrize,
    claimAllPrizes,
    formatAddress,
    getTicketDetails,
    getFallbackUserTickets,
    hasUserPurchasedTicket // NEW FUNCTION
  } = useWallet();

  // Handle URL parameters for direct navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section');
      if (section && ['dashboard', 'registration', 'purchase', 'mytickets', 'claim'].includes(section)) {
        setActiveSection(section);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Load prize data when component mounts or when relevant data changes
  useEffect(() => {
    if (isConnected && address && dashboardData.userInfo) {
      loadPrizeData();
    }
  }, [isConnected, address, dashboardData.userInfo, dashboardData.drawExecuted, dashboardData.myTickets]);

  // NEW EFFECT - Check if user has already purchased a ticket
  useEffect(() => {
    const checkUserTicketPurchase = async () => {
      if (isConnected && address && dashboardData.currentRound) {
        try {
          const hasPurchased = await hasUserPurchasedTicket(dashboardData.currentRound);
          setHasPurchasedTicket(hasPurchased);
        } catch (error) {
          console.error('Error checking user ticket purchase:', error);
          setHasPurchasedTicket(false);
        }
      }
    };

    checkUserTicketPurchase();
  }, [isConnected, address, dashboardData.currentRound, hasUserPurchasedTicket]);

  // Function to handle ticket click and show details
  const handleTicketClick = async (ticketNumber: number) => {
    if (!dashboardData.currentRound) {
      alert('No active round available');
      return;
    }
    
    try {
      // Determine ticket status without calling contract functions
      const isMyTicket = dashboardData.myTickets?.includes(ticketNumber) || false;
      const isSold = ticketNumber <= (dashboardData.ticketsSold || 0);
      const isAvailable = !isSold;
      
      // Create ticket details object without contract calls
      const ticketDetails = {
        ticketNumber,
        owner: isMyTicket ? (address || 'Your Address') : (isSold ? 'Sold to User' : 'Available'),
        rank: 0, // Not calling contract for rank
        prize: '0', // Not calling contract for prize
        isMyTicket,
        isWinner: dashboardData.winningNumber === ticketNumber && dashboardData.drawExecuted,
        isAvailable,
        status: isAvailable ? 'Available' : 'Sold'
      };
      
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
      
      try {
        // Get user tickets for current round
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
          userTickets = [];
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
          try {
            // Get ticket rank (0 = no prize, 1-10 = winning ranks)
            const ticketRank = await publicClient.readContract({
              address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
              abi: LOTTERY_ABI,
              functionName: 'getTicketRank',
              args: [BigInt(currentRound), BigInt(ticketNumber)],
            }) as bigint;
            
            if (parseInt(ticketRank.toString()) > 0) {
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
            }
          } catch (error) {
            console.warn(`Could not check ticket ${ticketNumber} in round ${currentRound}:`, error);
          }
        }
        
        // If current round has prizes, check claim status
        if (roundPrizes.length > 0) {
          // Check if already claimed using localStorage
          const claimedRounds = JSON.parse(localStorage.getItem(`claimedRounds_${address}`) || '[]');
          const isAlreadyClaimed = claimedRounds.includes(currentRound);
          
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
                onClick={() => setActiveSection('purchase')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg md:text-xl transition duration-300 flex items-center justify-center"
              >
                <span className="mr-2">🎫</span>
                Buy Tickets Now
              </button>
              {!dashboardData.isRegistered && (
                <button
                  onClick={() => setActiveSection('registration')}
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
        return (
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Join the Lottery</h2>
              
              {dashboardData.isRegistered ? (
                <div className="text-center">
                  <div className="text-green-500 text-4xl md:text-6xl mb-3 md:mb-4">✅</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Already Registered!</h3>
                  {dashboardData.userInfo && (
                    <div className="space-y-2 text-xs md:text-sm text-gray-300">
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
          </div>
        );

      case 'purchase':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Purchase Tickets</h2>
              
              {!dashboardData.isRegistered ? (
                <div className="text-center text-gray-400">
                  <p className="text-4xl md:text-6xl mb-3 md:mb-4">📝</p>
                  <p className="text-sm md:text-base">Please register first before purchasing tickets</p>
                  <button
                    onClick={() => setActiveSection('registration')}
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
                    onClick={() => setActiveSection('mytickets')}
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
                    disabled={!isConnected || loading || hasPurchasedTicket || !numTickets || parseInt(numTickets) < 1 || parseInt(numTickets) > 50}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 md:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:opacity-50 text-sm md:text-base"
                  >
                    {loading ? 'Processing...' : hasPurchasedTicket ? 'Already Purchased' : `Purchase ${numTickets || '0'} Ticket${parseInt(numTickets) > 1 ? 's' : ''}`}
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
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">My Tickets</h2>
            
            {(!dashboardData.myTickets || dashboardData.myTickets.length === 0) ? (
              <div className="text-center text-gray-400">
                <p className="text-4xl md:text-6xl mb-3 md:mb-4">🎫</p>
                <p className="text-sm md:text-base">No tickets purchased yet</p>
                <button
                  onClick={() => setActiveSection('purchase')}
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
              
              {!dashboardData.drawExecuted ? (
                <div className="text-center text-gray-400">
                  <p className="text-4xl md:text-6xl mb-3 md:mb-4">⏳</p>
                  <p className="text-sm md:text-base">Draw not executed yet. Please wait for the round to complete.</p>
                </div>
              ) : (!dashboardData.myTickets || dashboardData.myTickets.length === 0) ? (
                <div className="text-center text-gray-400">
                  <p className="text-4xl md:text-6xl mb-3 md:mb-4">🎫</p>
                  <p className="text-sm md:text-base">No tickets to claim prizes for</p>
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
                        {prizeData.totalPendingClaims}
                      </div>
                      <div className="text-xs md:text-sm text-gray-300">Pending Claims</div>
                    </div>
                  </div>

                  {/* Prize Cards Section */}
                  {prizeData.foundPrizes ? (
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl font-semibold">Your Prize Cards</h3>
                      
                      {prizeData.prizes.map((prize, index) => {
                        const rankNames = {
                          1: '1st Place', 2: '2nd Place', 3: '3rd Place',
                          4: '4th Place', 5: '5th Place', 6: '6th Place',
                          7: '7th Place', 8: '8th Place', 9: '9th Place', 10: '10th Place'
                        };
                        
                        // Function to get colored rank name
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
                          <div key={index} className={`bg-gray-800 rounded-lg p-4 md:p-6 border-2 ${
                            prize.isAlreadyClaimed ? 'border-green-500' : 'border-blue-500'
                          }`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-3 md:mb-4 gap-2">
                              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                <div className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                                  Round #{prize.roundId}
                                </div>
                                <div className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                                  prize.isAlreadyClaimed 
                                    ? 'bg-green-900 text-green-300' 
                                    : 'bg-blue-900 text-blue-300'
                                }`}>
                                  {prize.isAlreadyClaimed ? 'Claimed' : 'Claimable'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                              <div className="text-center">
                                <div className="text-lg md:text-2xl font-bold text-blue-400">{prize.userTickets}</div>
                                <div className="text-xs md:text-sm text-gray-300">Tickets</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg md:text-2xl font-bold text-green-400">{prize.roundPrizes.length}</div>
                                <div className="text-xs md:text-sm text-gray-300">Winners</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg md:text-2xl font-bold text-yellow-400">
                                  {getColoredRankName(prize.bestRank)}
                                </div>
                                <div className="text-xs md:text-sm text-gray-300">Best Rank</div>
                              </div>
                            </div>
                            
                            {/* Winning Tickets Section */}
                            <div className="mb-4 md:mb-6">
                              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 flex items-center">
                                <span className="mr-2">🏆</span>
                                Your Winning Tickets
                              </h4>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                                {prize.roundPrizes.map((ticketPrize, ticketIndex) => {
                                  // Define rank-based styling
                                  const getRankStyling = (rank: number) => {
                                    switch (rank) {
                                      case 1:
                                        return {
                                          bgClass: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
                                          radialClass: 'radial-gradient-gold',
                                          textClass: 'text-yellow-900',
                                          borderClass: 'border-yellow-300',
                                          shadowClass: 'shadow-lg shadow-yellow-500/30'
                                        };
                                      case 2:
                                        return {
                                          bgClass: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
                                          radialClass: 'radial-gradient-silver',
                                          textClass: 'text-gray-800',
                                          borderClass: 'border-gray-200',
                                          shadowClass: 'shadow-lg shadow-gray-400/30'
                                        };
                                      case 3:
                                        return {
                                          bgClass: 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800',
                                          radialClass: 'radial-gradient-bronze',
                                          textClass: 'text-amber-100',
                                          borderClass: 'border-amber-500',
                                          shadowClass: 'shadow-lg shadow-amber-600/30'
                                        };
                                      default:
                                        return {
                                          bgClass: 'bg-gray-700',
                                          radialClass: '',
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
                                      className={`${styling.bgClass} ${styling.radialClass} ${styling.borderClass} ${styling.shadowClass} rounded-lg p-2 md:p-3 text-center border-2 relative overflow-hidden transition-all duration-300 hover:scale-105`}
                                    >
                                      {/* Radial gradient overlay */}
                                      <div className={`absolute inset-0 ${styling.radialClass} opacity-20`}></div>
                                      
                                      {/* Content */}
                                      <div className="relative z-10">
                                        <div className={`text-sm md:text-lg font-bold ${styling.textClass}`}>
                                      #{ticketPrize.ticketNumber}
                                    </div>
                                        <div className={`text-xs md:text-sm ${styling.textClass} font-semibold`}>
                                          {getColoredRankName(ticketPrize.rank)}
                                    </div>
                                        <div className={`text-xs md:text-sm font-semibold ${styling.textClass}`}>
                                      {formatUSDT(formatEther(BigInt(ticketPrize.prize)))} TRDO
                                    </div>
                                        
                                        {/* Rank indicator */}
                                        {ticketPrize.rank <= 3 && (
                                          <div className="mt-1">
                                            {ticketPrize.rank === 1 && <span className="text-2xl">🥇</span>}
                                            {ticketPrize.rank === 2 && <span className="text-2xl">🥈</span>}
                                            {ticketPrize.rank === 3 && <span className="text-2xl">🥉</span>}
                                  </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* Total Prize Section */}
                            <div className="bg-gray-700 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                <div className="text-center sm:text-left">
                                  <div className="text-lg md:text-2xl font-bold text-green-400">
                                    {formatUSDT(formatEther(BigInt(prize.totalRoundPrize)))} TRDO
                                  </div>
                                  <div className="text-xs md:text-sm text-gray-300">Total Prize Value</div>
                                </div>
                                <button
                                  onClick={() => !prize.isAlreadyClaimed && !claimLoading && handleClaim(prize.roundId)}
                                  disabled={prize.isAlreadyClaimed || claimLoading}
                                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition duration-300 text-sm md:text-base ${
                                    prize.isAlreadyClaimed
                                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                      : claimLoading
                                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                                  }`}
                                >
                                  {prize.isAlreadyClaimed 
                                    ? '✅ Already Claimed' 
                                    : claimLoading 
                                    ? '⏳ Claiming...' 
                                    : '🏆 Claim Prize'
                                  }
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8 md:py-12">
                      <div className="text-4xl md:text-6xl mb-3 md:mb-4">🎫</div>
                      <div className="text-lg md:text-xl font-semibold mb-2">No prizes found</div>
                      <div className="text-sm md:text-base">You haven't won any prizes in this round yet.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
      />
      
      {/* Main Content */}
      <div className="md:ml-64 flex-1 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
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
        notification={notification || walletNotification} 
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
