'use client';

import { useState, useEffect } from 'react';
import { useAccount, useDisconnect, useBalance, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther, createPublicClient, http } from 'viem';
import { bscTestnet } from 'wagmi/chains';

// Contract addresses - Updated to match reference code
const CONTRACT_ADDRESSES = {
  LOTTERY: '0xbCcA069b381002bc8036d261a9Ff7F0A9F2f08fe', // Reference contract address
  USDT: '0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA'  // USDT token address
};

// Create public client for reading contract data
const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http('https://data-seed-prebsc-1-s1.binance.org:8545/'),
});

// Contract ABIs - Using the existing ABI which should be compatible
const LOTTERY_ABI = [{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_creator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"DrawExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"bool","name":"isPurchase","type":"bool"}],"name":"MLMEarning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PrizeClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"},{"indexed":false,"internalType":"address","name":"updatedBy","type":"address"}],"name":"RankPrizesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTickets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"RoundCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTransferredToCreator","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usersProcessed","type":"uint256"}],"name":"RoundSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"ticketNumbers","type":"uint256[]"}],"name":"TicketPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"calculateTicketPrize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"claimAllPrizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"claimLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"claimPrize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"createRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"defaultRankPrizes","outputs":[{"internalType":"uint256","name":"percentage","type":"uint256"},{"internalType":"bool","name":"isGroup","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"executeDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractStats","outputs":[{"internalType":"uint256","name":"totalRounds","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"},{"internalType":"uint256","name":"activeRound","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRankPrizes","outputs":[{"internalType":"uint256[10]","name":"percentages","type":"uint256[10]"},{"internalType":"bool[10]","name":"isGroupFlags","type":"bool[10]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getRoundInfo","outputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketRank","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserTickets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastActiveRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"purchaseLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"numberOfTickets","type":"uint256"}],"name":"purchaseTickets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sponsor","type":"address"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"roundParticipants","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rounds","outputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"},{"internalType":"uint256","name":"createdAt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address[]","name":"allRegisteredUsers","type":"address[]"}],"name":"settleRoundSponsorIncomes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"}],"name":"updateRankPrizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"},{"internalType":"uint256","name":"sponsorIncome","type":"uint256"}],"stateMutability":"view","type":"function"}];

const USDT_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

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

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [dashboardData, setDashboardData] = useState<any>({
    currentRound: 0,
    totalTickets: 0,
    ticketsSold: 0,
    ticketPrice: '0',
    prizePool: '0',
    drawExecuted: false,
    winningNumber: 0,
    myTicketsCount: 0,
    myTickets: [],
    isRegistered: false,
    userInfo: null,
    userPurchaseHistory: []
  });

  // Get BNB balance
  const { data: bnbBalance } = useBalance({
    address: address,
  });

  // Get USDT balance
  const { data: usdtBalance } = useBalance({
    address,
    token: CONTRACT_ADDRESSES.USDT as `0x${string}`,
  });

  // Contract reads
  const { data: currentRoundId } = useReadContract({
    address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
    abi: LOTTERY_ABI,
    functionName: 'currentRoundId',
  });

  const { data: roundData } = useReadContract({
    address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
    abi: LOTTERY_ABI,
    functionName: 'getRoundInfo',
    args: [currentRoundId || BigInt('1')],
    query: {
      enabled: !!currentRoundId,
    },
  });

  const { data: usdtAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.USDT as `0x${string}`,
    abi: USDT_ABI,
    functionName: 'allowance',
    args: [address, CONTRACT_ADDRESSES.LOTTERY],
    query: {
      enabled: !!address,
    },
  });

  const { data: userInfo } = useReadContract({
    address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
    abi: LOTTERY_ABI,
    functionName: 'getUserInfo',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const { data: userTickets, error: userTicketsError } = useReadContract({
    address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
    abi: LOTTERY_ABI,
    functionName: 'getUserTickets',
    args: [currentRoundId || BigInt('1'), address],
    query: {
      enabled: !!address && !!currentRoundId,
    },
  });

  // Write contract functions
  const { writeContract: writeContractLottery } = useWriteContract();
  const { writeContract: writeContractUsdt } = useWriteContract();

  // Fallback function to get user tickets using getTicketOwner
  const getFallbackUserTickets = async (roundId: bigint, userAddress: string, ticketsSold: number) => {
    const tickets: bigint[] = [];
    try {
      console.log(`🔍 Fallback: Searching through ${ticketsSold} sold tickets for user ${userAddress}...`);
      
      // Only check sold tickets to avoid unnecessary calls
      for (let i = 1; i <= Math.min(ticketsSold, 100); i++) { // Limit to 100 for performance
        try {
          const ticketOwner = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
            abi: LOTTERY_ABI,
            functionName: 'getTicketOwner',
            args: [roundId, BigInt(i)],
          }) as string;
          
          if (ticketOwner.toLowerCase() === userAddress.toLowerCase()) {
            tickets.push(BigInt(i));
          }
        } catch (ticketError) {
          console.warn(`Could not check ticket ${i} owner:`, ticketError);
          continue;
        }
      }
      
      console.log('🎫 Found user tickets via fallback method:', tickets.length);
      return tickets;
    } catch (fallbackError) {
      console.warn('⚠️ Fallback method failed:', fallbackError);
      return [];
    }
  };

  // Update dashboard data when contract data changes
  useEffect(() => {
    if (currentRoundId && roundData) {
      let tickets: number[] = [];
      
      // Handle userTickets with error fallback
      if (userTicketsError) {
        console.warn('⚠️ getUserTickets failed, will use fallback method:', userTicketsError);
        // We'll handle the fallback in a separate effect or when needed
        tickets = [];
      } else if (userTickets) {
        tickets = (userTickets as bigint[]).map(t => Number(t));
      }
      
      const roundDataArray = roundData as any[];
      const ticketPrice = formatUSDT(formatEther(roundDataArray[1] || BigInt(0)));
      const totalTickets = Number(roundDataArray[0] || BigInt(0));
      const ticketsSold = Number(roundDataArray[2] || BigInt(0));
      
      // Calculate prize pool (75% of total revenue) - matching reference code
      const totalRevenue = (roundDataArray[1] || BigInt(0)) * BigInt(ticketsSold);
      const prizePool = (totalRevenue * BigInt(75)) / BigInt(100);
      
      setDashboardData({
        currentRound: Number(currentRoundId),
        totalTickets,
        ticketPrice,
        ticketsSold,
        prizePool: formatUSDT(formatEther(prizePool)),
        isActive: roundDataArray[3],
        drawExecuted: roundDataArray[4],
        allClaimed: roundDataArray[5],
        isSettled: roundDataArray[6],
        winningNumber: Number(roundDataArray[7] || BigInt(0)),
        myTicketsCount: tickets.length,
        myTickets: tickets,
        isRegistered: userInfo ? (userInfo as any[])[0] : false,
        userInfo: userInfo ? {
          sponsor: (userInfo as any[])[1],
          totalTicketsPurchased: Number((userInfo as any[])[2]),
          totalEarnings: formatUSDT(formatEther((userInfo as any[])[3] || BigInt(0)))
        } : null,
        userPurchaseHistory: tickets.length > 0 ? [{
          roundId: Number(currentRoundId),
          ticketsCount: tickets.length,
          amountPaid: formatUSDT(formatEther(BigInt(tickets.length) * (roundDataArray[1] || BigInt(0)))),
          status: roundDataArray[4] ? 'Draw Complete' : 'Active'
        }] : []
      });
    }
  }, [currentRoundId, roundData, userTickets, userTicketsError, userInfo]);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const registerUser = async (sponsor: string) => {
    if (!address) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      await writeContractLottery({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'registerUser',
        args: [sponsor as `0x${string}`],
      });

      showNotification('Registration submitted! Please confirm the transaction in your wallet.', 'success');
    } catch (error: any) {
      console.error('Registration failed:', error);
      showNotification(error.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const purchaseTickets = async (numTickets: number) => {
    if (!address) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    if (!currentRoundId) {
      showNotification('No active round found', 'error');
      return;
    }

    try {
      setLoading(true);
      
      // First, check if we need to approve USDT spending
      const requiredAmount = parseEther((Number(dashboardData.ticketPrice) * numTickets).toString());
      // if (!usdtAllowance || usdtAllowance < requiredAmount) {
      if (!usdtAllowance || (typeof usdtAllowance === 'bigint' && usdtAllowance < requiredAmount)) {
        // Approve USDT spending
        await writeContractUsdt({
          address: CONTRACT_ADDRESSES.USDT as `0x${string}`,
          abi: USDT_ABI,
          functionName: 'approve',
          args: [CONTRACT_ADDRESSES.LOTTERY as `0x${string}`, requiredAmount],
        });
        
        showNotification('USDT approval submitted! Please confirm in your wallet.', 'success');
        // Wait a bit for approval to be processed
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Purchase tickets
      await writeContractLottery({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'purchaseTickets',
        args: [currentRoundId, BigInt(numTickets)],
      });

      showNotification('Ticket purchase submitted! Please confirm the transaction in your wallet.', 'success');
    } catch (error: any) {
      console.error('Ticket purchase failed:', error);
      showNotification(error.message || 'Ticket purchase failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const claimPrize = async (roundId: number) => {
    if (!address) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    try {
      setLoading(true);
      await writeContractLottery({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'claimPrize',
        args: [BigInt(roundId)],
      });

      showNotification('Prize claim submitted! Please confirm the transaction in your wallet.', 'success');
    } catch (error: any) {
      console.error('Prize claim failed:', error);
      showNotification(error.message || 'Prize claim failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const claimAllPrizes = async () => {
    if (!address) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    if (!currentRoundId) {
      showNotification('No active round found', 'error');
      return;
    }

    try {
      setLoading(true);
      await writeContractLottery({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'claimAllPrizes',
        args: [currentRoundId],
      });

      showNotification('All prizes claim submitted! Please confirm the transaction in your wallet.', 'success');
    } catch (error: any) {
      console.error('All prizes claim failed:', error);
      showNotification(error.message || 'All prizes claim failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatBalance = (balance: bigint | undefined, decimals = 18) => {
    if (!balance) return '0';
    return formatEther(balance);
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getPurchaseHistory = () => {
    return dashboardData.userPurchaseHistory;
  };

  const getPrizeData = async () => {
    // This would fetch prize data for the current round
    return {
      roundId: dashboardData.currentRound,
      prizePool: dashboardData.prizePool,
      drawExecuted: dashboardData.drawExecuted
    };
  };

  const getTicketOwner = async (roundId: number, ticketNumber: number) => {
    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'getTicketOwner',
        args: [BigInt(roundId), BigInt(ticketNumber)],
      });
      return result as string;
    } catch (error) {
      console.error('Error getting ticket owner:', error);
      return null;
    }
  };

  const getTicketRank = async (roundId: number, ticketNumber: number) => {
    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'getTicketRank',
        args: [BigInt(roundId), BigInt(ticketNumber)],
      });
      return result as bigint;
    } catch (error) {
      console.error('Error getting ticket rank:', error);
      return null;
    }
  };

  const calculateTicketPrize = async (roundId: number, ticketNumber: number) => {
    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LOTTERY as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'calculateTicketPrize',
        args: [BigInt(roundId), BigInt(ticketNumber)],
      });
      return result as bigint;
    } catch (error) {
      console.error('Error calculating ticket prize:', error);
      return null;
    }
  };

  const getTicketDetails = async (roundId: number, ticketNumber: number) => {
    try {
      const [owner, rank, prize] = await Promise.all([
        getTicketOwner(roundId, ticketNumber),
        getTicketRank(roundId, ticketNumber),
        calculateTicketPrize(roundId, ticketNumber)
      ]);
      
      return {
        owner: owner as string | null,
        rank: rank ? Number(rank) : 0,
        prize: prize ? formatEther(prize as bigint) : '0'
      };
    } catch (error) {
      console.error('Error getting ticket details:', error);
      return null;
    }
  };

  return {
    // State
    address,
    isConnected,
    loading,
    notification,
    dashboardData,
    
    // Balances
    bnbBalance: formatBalance(bnbBalance?.value),
    usdtBalance: formatBalance(usdtBalance?.value),
    usdtAllowance: formatBalance(usdtAllowance as bigint | undefined),
    
    // Actions
    disconnect,
    registerUser,
    purchaseTickets,
    claimPrize,
    claimAllPrizes,
    
    // Utilities
    formatBalance,
    formatAddress,
    getPurchaseHistory,
    getPrizeData,
    getTicketDetails,
    showNotification,
    getFallbackUserTickets,
    
    // Contract addresses for reference
    contractAddresses: CONTRACT_ADDRESSES
  };
};
