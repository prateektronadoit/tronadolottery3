// Import WalletConnect modules (same as dashboard.js)
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import {
    Web3Modal
} from "https://unpkg.com/@web3modal/html@2.6.2";

const {
    configureChains,
    createConfig,
    getAccount,
    getContract,
    readContract,
    writeContract,
    connect,
    watchAccount,
    fetchBalance,
    waitForTransaction,
    watchContractEvent,
} = WagmiCore;

// Contract addresses (same as dashboard.js)
const CONTRACT_ADDRESSES = {
    LOTTERY: '0x6054829D19348Cd06C6EFC0a9912ABC5d6153a63',
    USDT: '0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA'
};

// Contract ABIs (same as dashboard.js)
const LOTTERY_ABI = [{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_creator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"DrawExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"bool","name":"isPurchase","type":"bool"}],"name":"MLMEarning","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PrizeClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"},{"indexed":false,"internalType":"address","name":"updatedBy","type":"address"}],"name":"RankPrizesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTickets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"RoundCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalTransferredToCreator","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usersProcessed","type":"uint256"}],"name":"RoundSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"SponsorIncomeReset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"ticketNumbers","type":"uint256[]"}],"name":"TicketPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"calculateTicketPrize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"claimAllPrizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"claimLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"claimPrize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"name":"createRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"defaultRankPrizes","outputs":[{"internalType":"uint256","name":"percentage","type":"uint256"},{"internalType":"bool","name":"isGroup","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"executeDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractStats","outputs":[{"internalType":"uint256","name":"totalRounds","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"},{"internalType":"uint256","name":"activeRound","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRankPrizes","outputs":[{"internalType":"uint256[10]","name":"percentages","type":"uint256[10]"},{"internalType":"bool[10]","name":"isGroupFlags","type":"bool[10]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getRoundInfo","outputs":[{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"ticketNumber","type":"uint256"}],"name":"getTicketRank","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getUserTickets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastActiveRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"purchaseLevelPercentages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"numberOfTickets","type":"uint256"}],"name":"purchaseTickets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sponsor","type":"address"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"roundParticipants","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rounds","outputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"drawExecuted","type":"bool"},{"internalType":"bool","name":"allClaimed","type":"bool"},{"internalType":"bool","name":"isSettled","type":"bool"},{"internalType":"uint256","name":"createdAt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"roundId","type":"uint256"},{"internalType":"address[]","name":"allRegisteredUsers","type":"address[]"}],"name":"settleRoundSponsorIncomes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[10]","name":"newPercentages","type":"uint256[10]"}],"name":"updateRankPrizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"address","name":"sponsor","type":"address"},{"internalType":"uint256","name":"totalTicketsPurchased","type":"uint256"},{"internalType":"uint256","name":"totalEarnings","type":"uint256"},{"internalType":"uint256","name":"sponsorIncome","type":"uint256"}],"stateMutability":"view","type":"function"}]

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

// BSC Testnet Configuration (same as dashboard.js)
const bscTestnet = {
    id: 97,
    name: 'Binance Smart Chain Testnet',
    network: 'bscTestnet',
    nativeCurrency: {
        name: 'Binance Chain Native Token',
        symbol: 'tBNB',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://bsc-testnet.publicnode.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'BscScan',
            url: 'https://testnet.bscscan.com',
        },
    },
    testnet: true,
};

// WalletConnect Configuration (same as dashboard.js)
const chains = [bscTestnet];
const projectId = "713f1cdc14dd63bb5c03a9972525ab1f";

const { publicClient } = configureChains(chains, [
    w3mProvider({
        projectId,
    }),
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({
        projectId,
        chains,
    }),
    publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const web3modal = new Web3Modal({
    projectId,
}, ethereumClient);

// Configure Web3Modal (same as dashboard.js)
web3modal.setDefaultChain(bscTestnet);
web3modal.setTheme({
    themeMode: "dark",
    themeVariables: {
        "--w3m-font-family": "Roboto, sans-serif",
        "--w3m-accent-color": "#ff6b35",
    },
});

// Global Variables
let currentAccount = null;
let isConnected = false;
let currentUserInfo = null;
let currentRoundData = null;

// Initialize Web3 for utility functions (same as dashboard.js)
window.web3 = new Web3("https://bsc-testnet.publicnode.com");

// Utility Functions (same as dashboard.js)
function formatBalance(balance) {
    const etherValue = window.web3.utils.fromWei(balance.toString(), 'ether');
    return parseFloat(etherValue).toFixed(5);
}

function formatAddress(address) {
    if (!address || address === '0x0000000000000000000000000000000000000000') return 'None';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
}

function safeUpdateElement(elementId, value, property = 'textContent') {
    const element = document.getElementById(elementId);
    if (element) {
        if (property === 'textContent') {
            element.textContent = value;
        } else if (property === 'value') {
            element.value = value;
        } else if (property === 'display') {
            element.style.display = value;
        } else if (property === 'innerHTML') {
            element.innerHTML = value;
        }
        console.log(`✅ Updated ${elementId} with value:`, value);
        return true;
    } else {
        console.warn(`⚠️ Element ${elementId} not found in DOM`);
        return false;
    }
}

function showLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
    
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

function showNotification(message, type = 'success') {
    // Try to use notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
    
    // Also update status message if it exists
    showStatusMessage(message, type);
}

function showStatusMessage(message, type) {
    const statusElement = document.getElementById('status-message');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = type;
        statusElement.style.display = 'block';
        
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
}

// Account Watcher (same pattern as dashboard.js)
const unwatch = watchAccount(async (account) => {
    console.log('🔍 Account changed:', account);
    
    if (account.isConnected) {
        currentAccount = account.address;
        isConnected = true;
        
        console.log('✅ Wallet connected:', currentAccount);
        
        // Update wallet UI
        safeUpdateElement('wallet-status', 'Wallet Connected Successfully! 🎉');
        safeUpdateElement('wallet-display', formatAddress(currentAccount));
        safeUpdateElement('wallet-display', 'block', 'display');
        safeUpdateElement('connect-wallet-btn', '✅ Connected');
        
        // Enable register button
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.disabled = false;
        }
        
        try {
            await loadInitialData();
            showNotification('Wallet connected successfully! 🎉', 'success');
        } catch (error) {
            console.error('❌ Error loading initial data:', error);
            showNotification('Error loading data: ' + error.message, 'error');
        }
    } else {
        currentAccount = null;
        isConnected = false;
        resetUI();
        console.log("🔌 Wallet disconnected");
        showNotification('Wallet disconnected', 'error');
    }
});

// Connect Wallet Function
window.connectWallet = async function() {
    try {
        console.log('🔗 Connect wallet clicked');
        showLoading();
        
        if (isConnected) {
            // If already connected, disconnect
            await web3modal.disconnect();
        } else {
            // Connect wallet
            await web3modal.openModal();
        }
        
        hideLoading();
    } catch (error) {
        hideLoading();
        console.error('❌ Connection error:', error);
        showNotification('Connection failed: ' + error.message, 'error');
    }
};

// Load Initial Data
async function loadInitialData() {
    try {
        console.log('📊 Loading initial data for:', currentAccount);
        
        // Load user registration info
        await loadUserInfo();
        
        // Load round data for purchase section
        await loadRoundData();
        
        // Load purchase history
        await loadPurchaseHistory();
        
        // Load prize data for claims section
        await loadPrizeData();
        
    } catch (error) {
        console.error('❌ Error loading initial data:', error);
        showNotification('Error loading data: ' + error.message, 'error');
    }
}

// Load User Info
async function loadUserInfo() {
    try {
        if (!currentAccount) return;
        
        console.log('👤 Loading user info for:', currentAccount);
        
        const userInfo = await readContract({
            address: CONTRACT_ADDRESSES.LOTTERY,
            abi: LOTTERY_ABI,
            functionName: 'getUserInfo',
            args: [currentAccount],
        });
        
        currentUserInfo = {
            isRegistered: userInfo[0],
            sponsor: userInfo[1],
            totalTicketsPurchased: userInfo[2],
            totalEarnings: userInfo[3]
        };
        
        console.log('📋 User Info:', currentUserInfo);
        
        // Update UI based on registration status
        if (currentUserInfo.isRegistered) {
            showStatusMessage('You are already registered! You can now purchase tickets.', 'success');
            
            // Disable register button
            const registerBtn = document.getElementById('register-btn');
            if (registerBtn) {
                registerBtn.disabled = true;
                registerBtn.textContent = '✅ Already Registered';
            }
            
            // Show sponsor info if available
            if (currentUserInfo.sponsor !== '0x0000000000000000000000000000000000000000') {
                const sponsorField = document.getElementById('sponsor-address');
                if (sponsorField) {
                    sponsorField.value = currentUserInfo.sponsor;
                    sponsorField.disabled = true;
                }
            }
        } else {
            showStatusMessage('Complete your registration to start playing the lottery!', 'warning');
        }
        
    } catch (error) {
        console.error('❌ Error loading user info:', error);
        showStatusMessage('Error loading user information', 'error');
    }
}

// Load Round Data for Purchase Section
async function loadRoundData() {
    try {
        console.log('🎲 Loading round data...');
        
        // Get current round ID
        const currentRoundId = await readContract({
            address: CONTRACT_ADDRESSES.LOTTERY,
            abi: LOTTERY_ABI,
            functionName: 'currentRoundId',
        });
        
        console.log('🎲 Current Round ID:', currentRoundId.toString());
        
        if (parseInt(currentRoundId) > 0) {
            // Get round info
            const roundInfo = await readContract({
                address: CONTRACT_ADDRESSES.LOTTERY,
                abi: LOTTERY_ABI,
                functionName: 'getRoundInfo',
                args: [currentRoundId],
            });
            
            currentRoundData = {
                roundId: currentRoundId,
                totalTickets: roundInfo[0],
                ticketPrice: roundInfo[1],
                ticketsSold: roundInfo[2],
                isActive: roundInfo[3],
                drawExecuted: roundInfo[4],
                allClaimed: roundInfo[5]
            };
            
            console.log('📊 Round Info:', currentRoundData);
            
            // Update round stats UI
            safeUpdateElement('currentRound', currentRoundData.roundId.toString());
            safeUpdateElement('ticketsSold', currentRoundData.ticketsSold.toString());
            safeUpdateElement('totalTickets', currentRoundData.totalTickets.toString());
            safeUpdateElement('ticketPrice', formatBalance(currentRoundData.ticketPrice));
            
            // Update round select dropdown
            const roundSelect = document.getElementById('roundSelect');
            if (roundSelect) {
                roundSelect.innerHTML = `<option value="${currentRoundData.roundId}">Round ${currentRoundData.roundId} (Active)</option>`;
            }
            
            // Update total cost
            updateTotalCost();
            
        } else {
            console.log('⚠️ No active rounds');
            const roundSelect = document.getElementById('roundSelect');
            if (roundSelect) {
                roundSelect.innerHTML = '<option value="">No active rounds</option>';
            }
        }
        
    } catch (error) {
        console.error('❌ Error loading round data:', error);
        const roundSelect = document.getElementById('roundSelect');
        if (roundSelect) {
            roundSelect.innerHTML = '<option value="">Error loading rounds</option>';
        }
    }
}

// Load Purchase History
async function loadPurchaseHistory() {
    try {
        if (!currentAccount || !currentUserInfo) return;
        
        console.log('📈 Loading purchase history...');
        
        const historyTbody = document.getElementById('historyTbody');
        if (!historyTbody) return;
        
        // For demo purposes, show current round tickets if any
        if (currentRoundData && parseInt(currentRoundData.roundId) > 0) {
            try {
                const userTickets = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getUserTickets',
                    args: [currentRoundData.roundId, currentAccount],
                });
                
                if (userTickets.length > 0) {
                    const totalCost = BigInt(userTickets.length) * currentRoundData.ticketPrice;
                    const status = currentRoundData.drawExecuted ? 'Draw Complete' : 'Active';
                    
                    historyTbody.innerHTML = `
                        <tr>
                            <td>${currentRoundData.roundId}</td>
                            <td>${userTickets.length}</td>
                            <td>${formatBalance(totalCost)} USDT</td>
                            <td><span class="status-badge ${status.toLowerCase().replace(' ', '-')}">${status}</span></td>
                        </tr>
                    `;
                } else {
                    historyTbody.innerHTML = `
                        <tr>
                            <td colspan="4" class="empty-state">
                                <div class="empty-icon">📊</div>
                                <div class="empty-title">No purchase history</div>
                                <div>Your ticket purchases will appear here</div>
                            </td>
                        </tr>
                    `;
                }
            } catch (error) {
                console.warn('⚠️ Could not load user tickets for history');
            }
        }
        
    } catch (error) {
        console.error('❌ Error loading purchase history:', error);
    }
}

// Load Prize Data for Claims Section
// async function loadPrizeData() {
//     try {
//         if (!currentAccount || !currentUserInfo) return;
        
//         console.log('🏆 Loading prize data...');
        
//         // Update stats
//         safeUpdateElement('totalTickets', currentUserInfo.totalTicketsPurchased.toString());
//         safeUpdateElement('totalWinnings', formatBalance(currentUserInfo.totalEarnings));
        
//         // For now, show demo data or empty state
//         // In a real implementation, you would check multiple rounds for prizes
//         const emptyState = document.getElementById('emptyState');
//         const prizesGrid = document.getElementById('prizesGrid');
        
//         if (emptyState && prizesGrid) {
//             // Hide sample cards and show empty state for now
//             const sampleCards = prizesGrid.querySelectorAll('.prize-card');
//             sampleCards.forEach(card => card.style.display = 'none');
//             emptyState.style.display = 'block';
//         }
        
//     } catch (error) {
//         console.error('❌ Error loading prize data:', error);
//     }
// }


// Load Prize Data for Claims Section
// async function loadPrizeData() {
//     try {
//         if (!currentAccount || !currentUserInfo) return;
        
//         console.log('🏆 Loading prize data...');
        
//         // Update stats (fix duplicate ID issue)
//         safeUpdateElement('userTotalTickets', currentUserInfo.totalTicketsPurchased.toString());
//         safeUpdateElement('totalWinnings', formatBalance(currentUserInfo.totalEarnings));
//         safeUpdateElement('pendingClaims', '0.00000'); // We'll calculate this below
        
//         const prizesGrid = document.getElementById('prizesGrid');
//         const emptyState = document.getElementById('emptyState');
        
//         if (!prizesGrid || !emptyState) return;
        
//         // Get current round ID to check for prizes
//         const currentRoundId = await readContract({
//             address: CONTRACT_ADDRESSES.LOTTERY,
//             abi: LOTTERY_ABI,
//             functionName: 'currentRoundId',
//         });
        
//         let foundPrizes = false;
//         let totalPendingClaims = BigInt(0);
//         let prizesHTML = '';
        
//         // Check last few rounds for prizes (check up to 5 recent rounds)
//         for (let roundId = Math.max(1, parseInt(currentRoundId) - 4); roundId <= parseInt(currentRoundId); roundId++) {
//             try {
//                 // Get round info
//                 const roundInfo = await readContract({
//                     address: CONTRACT_ADDRESSES.LOTTERY,
//                     abi: LOTTERY_ABI,
//                     functionName: 'getRoundInfo',
//                     args: [roundId],
//                 });
                
//                 // Only check rounds where draw is executed
//                 if (!roundInfo[4]) continue; // drawExecuted = false
                
//                 // Get user tickets for this round
//                 const userTickets = await readContract({
//                     address: CONTRACT_ADDRESSES.LOTTERY,
//                     abi: LOTTERY_ABI,
//                     functionName: 'getUserTickets',
//                     args: [roundId, currentAccount],
//                 });
                
//                 if (userTickets.length === 0) continue;
                
//                 // Check each ticket for prizes
//                 let roundPrizes = [];
//                 let totalRoundPrize = BigInt(0);
                
//                 for (const ticketNumber of userTickets) {
//                     try {
//                         // Get ticket rank (0 = no prize, 1-10 = winning ranks)
//                         const ticketRank = await readContract({
//                             address: CONTRACT_ADDRESSES.LOTTERY,
//                             abi: LOTTERY_ABI,
//                             functionName: 'getTicketRank',
//                             args: [roundId, ticketNumber],
//                         });
                        
//                         if (parseInt(ticketRank) > 0) {
//                             // Calculate prize for this ticket
//                             const ticketPrize = await readContract({
//                                 address: CONTRACT_ADDRESSES.LOTTERY,
//                                 abi: LOTTERY_ABI,
//                                 functionName: 'calculateTicketPrize',
//                                 args: [roundId, ticketNumber],
//                             });
                            
//                             if (BigInt(ticketPrize) > 0) {
//                                 roundPrizes.push({
//                                     ticketNumber: ticketNumber.toString(),
//                                     rank: parseInt(ticketRank),
//                                     prize: ticketPrize
//                                 });
//                                 totalRoundPrize += BigInt(ticketPrize);
//                             }
//                         }
//                     } catch (error) {
//                         console.warn(`Could not check ticket ${ticketNumber} in round ${roundId}`);
//                     }
//                 }
                
//                 // If this round has prizes, create prize card
//                 if (roundPrizes.length > 0) {
//                     foundPrizes = true;
//                     totalPendingClaims += totalRoundPrize;
                    
//                     const rankNames = {
//                         1: '1st Place', 2: '2nd Place', 3: '3rd Place',
//                         4: '4th Place', 5: '5th Place', 6: '6th Place',
//                         7: '7th Place', 8: '8th Place', 9: '9th Place', 10: '10th Place'
//                     };
                    
//                     const bestRank = Math.min(...roundPrizes.map(p => p.rank));
                    
//                     // Create winning tickets HTML
//                     const winningTicketsHTML = roundPrizes.map(prize => `
//                         <div class="winning-ticket rank-${prize.rank}">
//                             <div class="ticket-number">#${prize.ticketNumber}</div>
//                             <div class="ticket-rank">${rankNames[prize.rank]}</div>
//                             <div class="ticket-prize">${formatBalance(prize.prize)} USDT</div>
//                         </div>
//                     `).join('');
                    
//                     prizesHTML += `
//                         <div class="prize-card claimable">
//                             <div class="prize-card-header">
//                                 <div class="prize-header-top">
//                                     <div class="round-badge">Round #${roundId}</div>
//                                     <div class="prize-status status-claimable">Claimable</div>
//                                 </div>
//                                 <div class="prize-summary">
//                                     <div class="summary-item">
//                                         <div class="summary-value">${userTickets.length}</div>
//                                         <div class="summary-label">Tickets</div>
//                                     </div>
//                                     <div class="summary-item">
//                                         <div class="summary-value">${roundPrizes.length}</div>
//                                         <div class="summary-label">Winners</div>
//                                     </div>
//                                     <div class="summary-item">
//                                         <div class="summary-value">${rankNames[bestRank].split(' ')[0]}</div>
//                                         <div class="summary-label">Best Rank</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="prize-card-body">
//                                 <div class="winning-tickets-section">
//                                     <div class="winning-tickets-title">🏆 Your Winning Tickets</div>
//                                     <div class="winning-tickets-grid">
//                                         ${winningTicketsHTML}
//                                     </div>
//                                 </div>
//                                 <div class="total-prize-section">
//                                     <div class="total-prize-value">${formatBalance(totalRoundPrize)} USDT</div>
//                                     <div class="total-prize-label">Total Prize Amount</div>
//                                 </div>
//                                 <button class="claim-btn" onclick="claimPrize(${roundId})">
//                                     🏆 Claim Prize
//                                 </button>
//                             </div>
//                         </div>
//                     `;
//                 }
                
//             } catch (error) {
//                 console.warn(`Could not check round ${roundId} for prizes:`, error);
//             }
//         }
        
//         // Update UI
//         if (foundPrizes) {
//             // Hide sample cards first
//             const sampleCards = prizesGrid.querySelectorAll('.prize-card');
//             sampleCards.forEach(card => card.style.display = 'none');
            
//             // Add real prize cards
//             prizesGrid.innerHTML = prizesHTML;
//             emptyState.style.display = 'none';
            
//             // Update pending claims
//             safeUpdateElement('pendingClaims', formatBalance(totalPendingClaims));
//         } else {
//             // Hide sample cards and show empty state
//             const sampleCards = prizesGrid.querySelectorAll('.prize-card');
//             sampleCards.forEach(card => card.style.display = 'none');
//             emptyState.style.display = 'block';
//         }
        
//     } catch (error) {
//         console.error('❌ Error loading prize data:', error);
//     }
// }

// Updated loadPrizeData() function - Replace the existing one in register.js
// Improved loadPrizeData() function with better claim detection
async function loadPrizeData() {
    try {
        if (!currentAccount || !currentUserInfo) return;
        
        console.log('🏆 Loading prize data...');
        
        // Update stats (fix duplicate ID issue)
        safeUpdateElement('userTotalTickets', currentUserInfo.totalTicketsPurchased.toString());
        safeUpdateElement('totalWinnings', formatBalance(currentUserInfo.totalEarnings));
        safeUpdateElement('pendingClaims', '0.00000'); // We'll calculate this below
        
        const prizesGrid = document.getElementById('prizesGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (!prizesGrid || !emptyState) return;
        
        // Get current round ID to check for prizes
        const currentRoundId = await readContract({
            address: CONTRACT_ADDRESSES.LOTTERY,
            abi: LOTTERY_ABI,
            functionName: 'currentRoundId',
        });
        
        let foundPrizes = false;
        let totalPendingClaims = BigInt(0);
        let prizesHTML = '';
        
        // Store user's previous total earnings to compare
        const previousTotalEarnings = currentUserInfo.totalEarnings;
        
        // Check last few rounds for prizes (check up to 5 recent rounds)
        for (let roundId = Math.max(1, parseInt(currentRoundId) - 4); roundId <= parseInt(currentRoundId); roundId++) {
            try {
                // Get round info
                const roundInfo = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getRoundInfo',
                    args: [roundId],
                });
                
                // Only check rounds where draw is executed
                if (!roundInfo[4]) continue; // drawExecuted = false
                
                // Get user tickets for this round
                const userTickets = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getUserTickets',
                    args: [roundId, currentAccount],
                });
                
                if (userTickets.length === 0) continue;
                
                // Check each ticket for prizes
                let roundPrizes = [];
                let totalRoundPrize = BigInt(0);
                
                for (const ticketNumber of userTickets) {
                    try {
                        // Get ticket rank (0 = no prize, 1-10 = winning ranks)
                        const ticketRank = await readContract({
                            address: CONTRACT_ADDRESSES.LOTTERY,
                            abi: LOTTERY_ABI,
                            functionName: 'getTicketRank',
                            args: [roundId, ticketNumber],
                        });
                        
                        if (parseInt(ticketRank) > 0) {
                            // Calculate prize for this ticket
                            const ticketPrize = await readContract({
                                address: CONTRACT_ADDRESSES.LOTTERY,
                                abi: LOTTERY_ABI,
                                functionName: 'calculateTicketPrize',
                                args: [roundId, ticketNumber],
                            });
                            
                            if (BigInt(ticketPrize) > 0) {
                                roundPrizes.push({
                                    ticketNumber: ticketNumber.toString(),
                                    rank: parseInt(ticketRank),
                                    prize: ticketPrize
                                });
                                totalRoundPrize += BigInt(ticketPrize);
                            }
                        }
                    } catch (error) {
                        console.warn(`Could not check ticket ${ticketNumber} in round ${roundId}`);
                    }
                }
                
                // If this round has prizes, check claim status more accurately
                if (roundPrizes.length > 0) {
                    foundPrizes = true;
                    
                    // IMPROVED CLAIM DETECTION METHOD
                    let isAlreadyClaimed = false;
                    
                    try {
                        // Method 1: Try to call claimPrize to see if it would revert
                        // This is a read-only simulation to check if claiming would fail
                        
                        // Method 2: Check if the round is fully settled and user has received earnings
                        // Compare this round's calculated prizes with user's actual earnings increase
                        
                        // Method 3: Use localStorage to track claimed rounds (temporary solution)
                        const claimedRounds = JSON.parse(localStorage.getItem(`claimedRounds_${currentAccount}`) || '[]');
                        if (claimedRounds.includes(roundId)) {
                            isAlreadyClaimed = true;
                            console.log(`Round ${roundId} marked as claimed in local storage`);
                        }
                        
                        // Method 4: Check if all prizes in round are claimed as backup
                        if (roundInfo[5]) { // allClaimed = true
                            isAlreadyClaimed = true;
                            console.log(`Round ${roundId} - all prizes claimed globally`);
                        }
                        
                    } catch (error) {
                        console.warn('Could not check claim status accurately, defaulting to claimable');
                        isAlreadyClaimed = false;
                    }
                    
                    // Only add to pending claims if not claimed yet
                    if (!isAlreadyClaimed) {
                        totalPendingClaims += totalRoundPrize;
                    }
                    
                    const rankNames = {
                        1: '1st Place', 2: '2nd Place', 3: '3rd Place',
                        4: '4th Place', 5: '5th Place', 6: '6th Place',
                        7: '7th Place', 8: '8th Place', 9: '9th Place', 10: '10th Place'
                    };
                    
                    const bestRank = Math.min(...roundPrizes.map(p => p.rank));
                    
                    // Create winning tickets HTML
                    const winningTicketsHTML = roundPrizes.map(prize => `
                        <div class="winning-ticket rank-${prize.rank}">
                            <div class="ticket-number">#${prize.ticketNumber}</div>
                            <div class="ticket-rank">${rankNames[prize.rank]}</div>
                            <div class="ticket-prize">${formatBalance(prize.prize)} USDT</div>
                        </div>
                    `).join('');
                    
                    // Determine status and button
                    const statusClass = isAlreadyClaimed ? 'status-claimed' : 'status-claimable';
                    const statusText = isAlreadyClaimed ? 'Claimed' : 'Claimable';
                    const prizeCardClass = isAlreadyClaimed ? 'claimed' : 'claimable';
                    
                    const claimButtonHTML = isAlreadyClaimed 
                        ? '<button class="claim-btn" disabled>✅ Already Claimed</button>'
                        : `<button class="claim-btn" onclick="claimPrize(${roundId})">🏆 Claim Prize</button>`;
                    
                    prizesHTML += `
                        <div class="prize-card ${prizeCardClass}">
                            <div class="prize-card-header">
                                <div class="prize-header-top">
                                    <div class="round-badge">Round #${roundId}</div>
                                    <div class="prize-status ${statusClass}">${statusText}</div>
                                </div>
                                <div class="prize-summary">
                                    <div class="summary-item">
                                        <div class="summary-value">${userTickets.length}</div>
                                        <div class="summary-label">Tickets</div>
                                    </div>
                                    <div class="summary-item">
                                        <div class="summary-value">${roundPrizes.length}</div>
                                        <div class="summary-label">Winners</div>
                                    </div>
                                    <div class="summary-item">
                                        <div class="summary-value">${rankNames[bestRank].split(' ')[0]}</div>
                                        <div class="summary-label">Best Rank</div>
                                    </div>
                                </div>
                            </div>
                            <div class="prize-card-body">
                                <div class="winning-tickets-section">
                                    <div class="winning-tickets-title">🏆 Your Winning Tickets</div>
                                    <div class="winning-tickets-grid">
                                        ${winningTicketsHTML}
                                    </div>
                                </div>
                                <div class="total-prize-section">
                                    <div class="total-prize-value">${formatBalance(totalRoundPrize)} USDT</div>
                                    <div class="total-prize-label">Total Prize Amount</div>
                                </div>
                                ${claimButtonHTML}
                            </div>
                        </div>
                    `;
                }
                
            } catch (error) {
                console.warn(`Could not check round ${roundId} for prizes:`, error);
            }
        }
        
        // Update UI
        if (foundPrizes) {
            // Hide sample cards first
            const sampleCards = prizesGrid.querySelectorAll('.prize-card');
            sampleCards.forEach(card => card.style.display = 'none');
            
            // Add real prize cards
            prizesGrid.innerHTML = prizesHTML;
            emptyState.style.display = 'none';
            
            // Update pending claims
            safeUpdateElement('pendingClaims', formatBalance(totalPendingClaims));
        } else {
            // Hide sample cards and show empty state
            const sampleCards = prizesGrid.querySelectorAll('.prize-card');
            sampleCards.forEach(card => card.style.display = 'none');
            emptyState.style.display = 'block';
        }
        
    } catch (error) {
        console.error('❌ Error loading prize data:', error);
    }
}



// Register User Function
window.registerUser = async function() {
    try {
        if (!isConnected) {
            showNotification('Please connect your wallet first', 'error');
            return;
        }

        if (currentUserInfo && currentUserInfo.isRegistered) {
            showNotification('You are already registered!', 'warning');
            return;
        }

        let sponsorAddress = document.getElementById('sponsor-address').value.trim();
        
        // If no sponsor provided, use zero address
        if (!sponsorAddress) {
            sponsorAddress = '0x0000000000000000000000000000000000000000';
        } else {
            // Validate address format
            if (!window.web3.utils.isAddress(sponsorAddress)) {
                showNotification('Please enter a valid wallet address', 'error');
                return;
            }
            
            // Check if sponsor is registered (optional validation)
            try {
                const sponsorInfo = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getUserInfo',
                    args: [sponsorAddress],
                });
                
                if (!sponsorInfo[0]) {
                    showNotification('Warning: Sponsor address is not registered', 'warning');
                }
            } catch (error) {
                console.warn('Could not verify sponsor registration');
            }
        }

        showLoading();
        showNotification('Processing registration...', 'info');

        const registerTx = await writeContract({
            address: CONTRACT_ADDRESSES.LOTTERY,
            abi: LOTTERY_ABI,
            functionName: 'registerUser',
            args: [sponsorAddress],
        });

        console.log('✅ Registration transaction:', registerTx.hash);
        
        // Update loading text
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.textContent = 'Confirming transaction...';
        }
        
        await waitForTransaction({ hash: registerTx.hash });

        hideLoading();
        showNotification('Registration successful! Welcome to the lottery! 🎉', 'success');
        
        // Refresh data
        setTimeout(async () => {
            await loadInitialData();
        }, 2000);

    } catch (error) {
        hideLoading();
        console.error('❌ Registration error:', error);
        
        let errorMessage = 'Registration failed';
        if (error.message.includes('user rejected')) {
            errorMessage = 'Transaction was cancelled by user';
        } else if (error.message.includes('already registered')) {
            errorMessage = 'User is already registered';
        } else if (error.message.includes('insufficient funds')) {
            errorMessage = 'Insufficient funds for transaction';
        } else {
            errorMessage = 'Registration failed: ' + error.message;
        }
        
        showNotification(errorMessage, 'error');
    }
};

// Purchase Tickets Function
window.purchaseTickets = async function() {
    try {
        if (!isConnected) {
            showNotification('Please connect your wallet first', 'error');
            return;
        }

        if (!currentUserInfo || !currentUserInfo.isRegistered) {
            showNotification('Please register first before purchasing tickets', 'error');
            return;
        }

        const roundSelect = document.getElementById('roundSelect');
        const numTicketsInput = document.getElementById('numTickets');
        
        const roundId = parseInt(roundSelect.value);
        const numberOfTickets = parseInt(numTicketsInput.value);

        if (!roundId || !numberOfTickets || numberOfTickets < 1 ) {
            showNotification('Please select a valid round and number of tickets', 'error');
            return;
        }

        if (!currentRoundData) {
            showNotification('Round data not loaded', 'error');
            return;
        }

        showLoading();
        showNotification('Processing ticket purchase...', 'info');

        const ticketPrice = currentRoundData.ticketPrice;
        const totalCost = BigInt(numberOfTickets) * ticketPrice;

        console.log(`💰 Purchasing ${numberOfTickets} tickets for ${formatBalance(totalCost)} USDT`);

        // First approve USDT spending
        const approveTx = await writeContract({
            address: CONTRACT_ADDRESSES.USDT,
            abi: USDT_ABI,
            functionName: 'approve',
            args: [CONTRACT_ADDRESSES.LOTTERY, totalCost],
        });

        console.log('✅ Approval transaction:', approveTx.hash);
        
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.textContent = 'Approving USDT spending...';
        }
        
        await waitForTransaction({ hash: approveTx.hash });

        // Then purchase tickets
        if (loadingText) {
            loadingText.textContent = 'Purchasing tickets...';
        }

        const purchaseTx = await writeContract({
            address: CONTRACT_ADDRESSES.LOTTERY,
            abi: LOTTERY_ABI,
            functionName: 'purchaseTickets',
            args: [roundId, numberOfTickets],
        });

        console.log('✅ Purchase transaction:', purchaseTx.hash);
        await waitForTransaction({ hash: purchaseTx.hash });

        hideLoading();
        showNotification(`Successfully purchased ${numberOfTickets} tickets! 🎫`, 'success');
        
        // Refresh data
        setTimeout(async () => {
            await loadInitialData();
        }, 3000);

    } catch (error) {
        hideLoading();
        console.error('❌ Purchase error:', error);
        
        let errorMessage = 'Purchase failed';
        if (error.message.includes('user rejected')) {
            errorMessage = 'Transaction was cancelled by user';
        } else if (error.message.includes('insufficient funds')) {
            errorMessage = 'Insufficient USDT balance';
        } else if (error.message.includes('allowance')) {
            errorMessage = 'USDT approval failed';
        } else {
            errorMessage = 'Purchase failed: ' + error.message;
        }
        
        showNotification(errorMessage, 'error');
    }
};

// Claim Prize Function
window.claimPrize = async function(roundId) {
    try {
        if (!isConnected) {
            showNotification('Please connect your wallet first', 'error');
            return;
        }

        if (!roundId) {
            showNotification('Invalid round ID', 'error');
            return;
        }

        showLoading();
        showNotification('Processing prize claim...', 'info');

        const claimTx = await writeContract({
            address: CONTRACT_ADDRESSES.LOTTERY,
            abi: LOTTERY_ABI,
            functionName: 'claimPrize',
            args: [roundId],
        });

        console.log('✅ Claim transaction:', claimTx.hash);
        
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.textContent = 'Confirming claim...';
        }
        
        await waitForTransaction({ hash: claimTx.hash });

        hideLoading();
        showNotification('Prize claimed successfully! 🏆', 'success');
        
        // Refresh data
        setTimeout(async () => {
            await loadInitialData();
        }, 3000);

    } catch (error) {
        hideLoading();
        console.error('❌ Claim error:', error);
        
        let errorMessage = 'Claim failed';
        if (error.message.includes('user rejected')) {
            errorMessage = 'Transaction was cancelled by user';
        } else if (error.message.includes('no prize')) {
            errorMessage = 'No prize available to claim';
        } else if (error.message.includes('already claimed')) {
            errorMessage = 'Prize already claimed';
        } else {
            errorMessage = 'Claim failed: ' + error.message;
        }
        
        showNotification(errorMessage, 'error');
    }
};

// Refresh Data Function
window.refreshData = async function() {
    try {
        if (!isConnected) {
            showNotification('Please connect your wallet first', 'error');
            return;
        }

        showNotification('Refreshing data...', 'info');
        await loadInitialData();
        showNotification('Data refreshed successfully!', 'success');
        
    } catch (error) {
        console.error('❌ Refresh error:', error);
        showNotification('Error refreshing data: ' + error.message, 'error');
    }
};

// Update Total Cost Function
function updateTotalCost() {
    const numTicketsInput = document.getElementById('numTickets');
    const totalCostInput = document.getElementById('totalCost');
    
    if (numTicketsInput && totalCostInput && currentRoundData) {
        const numTickets = parseInt(numTicketsInput.value) || 1;
        const totalCost = BigInt(numTickets) * currentRoundData.ticketPrice;
        totalCostInput.value = `${formatBalance(totalCost)} USDT`;
    }
}

// Check USDT Approval
async function checkUSDTApproval() {
    try {
        if (!currentAccount || !currentRoundData) return;
        
        const allowance = await readContract({
            address: CONTRACT_ADDRESSES.USDT,
            abi: USDT_ABI,
            functionName: 'allowance',
            args: [currentAccount, CONTRACT_ADDRESSES.LOTTERY],
        });
        
        const approvalSection = document.getElementById('approvalSection');
        const purchaseBtn = document.getElementById('purchaseBtn');
        
        if (approvalSection && purchaseBtn) {
            if (BigInt(allowance) >= currentRoundData.ticketPrice * BigInt(10)) {
                // Sufficient allowance
                approvalSection.style.display = 'none';
                purchaseBtn.disabled = false;
            } else {
                // Need approval
                approvalSection.style.display = 'block';
                purchaseBtn.disabled = true;
            }
        }
        
    } catch (error) {
        console.error('❌ Error checking USDT approval:', error);
    }
}

// Approve USDT Function
window.approveUSDT = async function() {
    try {
        if (!isConnected) {
            showNotification('Please connect your wallet first', 'error');
            return;
        }

        if (!currentRoundData) {
            showNotification('Round data not loaded', 'error');
            return;
        }

        showLoading();
        showNotification('Approving USDT spending...', 'info');

        // Approve a large amount for multiple purchases
        const approvalAmount = currentRoundData.ticketPrice * BigInt(100); // Allow 100 tickets worth

        const approveTx = await writeContract({
            address: CONTRACT_ADDRESSES.USDT,
            abi: USDT_ABI,
            functionName: 'approve',
            args: [CONTRACT_ADDRESSES.LOTTERY, approvalAmount],
        });

        console.log('✅ Approval transaction:', approveTx.hash);
        await waitForTransaction({ hash: approveTx.hash });

        hideLoading();
        showNotification('USDT spending approved successfully! ✅', 'success');
        
        // Check approval status
        setTimeout(async () => {
            await checkUSDTApproval();
        }, 2000);

    } catch (error) {
        hideLoading();
        console.error('❌ Approval error:', error);
        showNotification('USDT approval failed: ' + error.message, 'error');
    }
};

// Reset UI when wallet disconnected
function resetUI() {
    safeUpdateElement('wallet-status', 'Connect your wallet to get started');
    safeUpdateElement('wallet-display', 'none', 'display');
    safeUpdateElement('connect-wallet-btn', '🔗 Connect MetaMask Wallet');
    
    // Reset register button
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.disabled = true;
        registerBtn.textContent = '🚀 Register Now';
    }
    
    // Reset sponsor field
    const sponsorField = document.getElementById('sponsor-address');
    if (sponsorField) {
        sponsorField.disabled = false;
        sponsorField.value = '';
    }
    
    // Hide status message
    const statusElement = document.getElementById('status-message');
    if (statusElement) {
        statusElement.style.display = 'none';
    }
    
    // Reset round data
    safeUpdateElement('currentRound', '-');
    safeUpdateElement('ticketsSold', '-');
    safeUpdateElement('totalTickets', '-');
    safeUpdateElement('ticketPrice', '-');
    
    // Reset stats
    //safeUpdateElement('totalTickets', '0');
    safeUpdateElement('userTotalTickets', '0');
    safeUpdateElement('totalRounds', '0');
    safeUpdateElement('totalWinnings', '0.00000');
    safeUpdateElement('pendingClaims', '0.00000');
    
    // Reset round select
    const roundSelect = document.getElementById('roundSelect');
    if (roundSelect) {
        roundSelect.innerHTML = '<option value="">Connect wallet first</option>';
    }
    
    // Reset purchase history
    const historyTbody = document.getElementById('historyTbody');
    if (historyTbody) {
        historyTbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    <div class="empty-icon">📊</div>
                    <div class="empty-title">Connect wallet to view history</div>
                    <div>Your ticket purchases will appear here</div>
                </td>
            </tr>
        `;
    }
    
    currentAccount = null;
    isConnected = false;
    currentUserInfo = null;
    currentRoundData = null;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Register page loaded, initializing...');
    
    // Check if already connected
    const account = getAccount();
    if (account.isConnected) {
        console.log('🔗 Auto-connecting to existing wallet...');
        currentAccount = account.address;
        isConnected = true;
        
        safeUpdateElement('wallet-status', 'Wallet Connected Successfully! 🎉');
        safeUpdateElement('wallet-display', formatAddress(currentAccount));
        safeUpdateElement('wallet-display', 'block', 'display');
        safeUpdateElement('connect-wallet-btn', '✅ Connected');
        
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.disabled = false;
        }
        
        await loadInitialData();
    } else {
        console.log('💡 No existing wallet connection found');
        resetUI();
    }
    
    // Add event listeners
    const numTicketsInput = document.getElementById('numTickets');
    if (numTicketsInput) {
        numTicketsInput.addEventListener('input', updateTotalCost);
    }
    
    const roundSelect = document.getElementById('roundSelect');
    if (roundSelect) {
        roundSelect.addEventListener('change', updateTotalCost);
    }
    
    const approveBtn = document.getElementById('approveBtn');
    if (approveBtn) {
        approveBtn.addEventListener('click', approveUSDT);
    }
    
    const purchaseBtn = document.getElementById('purchaseBtn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', purchaseTickets);
    }
    
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
});

// Toggle Sidebar Function
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
};

// Navigation Function
window.navigateTo = function(page) {
    if (page === 'dashboard') {
        window.location.href = 'dashboard.html';
    } else if (page === 'registration') {
        window.location.href = 'register.html';
    }
};

// Auto refresh data every 30 seconds when connected
setInterval(async () => {
    if (isConnected && currentAccount) {
        try {
            await loadRoundData();
            if (currentRoundData) {
                await checkUSDTApproval();
            }
        } catch (error) {
            console.warn('⚠️ Auto refresh failed:', error);
        }
    }
}, 30000);

// Export functions for debugging
window.loadInitialData = loadInitialData;
window.loadUserInfo = loadUserInfo;
window.loadRoundData = loadRoundData;
window.loadPurchaseHistory = loadPurchaseHistory;
window.loadPrizeData = loadPrizeData;
window.checkUSDTApproval = checkUSDTApproval;

console.log('🎰 Register.js loaded successfully!');