 
        // Import WalletConnect modules
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

        // Contract addresses (Updated with your provided addresses)
        const CONTRACT_ADDRESSES = {
            LOTTERY: '0x6054829D19348Cd06C6EFC0a9912ABC5d6153a63',
            USDT: '0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA'
        };

        // Contract ABIs (Using your provided ABIs)
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

        // BSC Testnet Configuration
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

        // WalletConnect Configuration
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

        // Configure Web3Modal
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

        // Initialize Web3 for utility functions
        window.web3 = new Web3("https://bsc-testnet.publicnode.com");

        // Utility Functions
        function formatBalance(balance) {
            const etherValue = window.web3.utils.fromWei(balance.toString(), 'ether');
            return parseFloat(etherValue).toFixed(2);
        }

        function showStatus(message, type) {
            const statusDiv = document.getElementById('statusMessage');
            if (statusDiv) {
                statusDiv.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            }
        }

        function formatAddress(address) {
            if (!address) return '-';
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
        }

        function hideLoading() {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }

        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            if (notification) {
                notification.textContent = message;
                notification.className = `notification ${type}`;
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 5000);
            } else {
                // Fallback to status message
                showStatus(message, type);
            }
        }

        // Account Watcher
        const unwatch = watchAccount(async (account) => {
            console.log('🔍 Account changed:', account);
            
            if (account.isConnected) {
                currentAccount = account.address;
                isConnected = true;
                
                console.log('✅ Wallet connected:', currentAccount);
                
                // Update UI safely
                safeUpdateElement('wallet-address', formatAddress(currentAccount));
                safeUpdateElement('wallet-text', 'Connected');
                safeUpdateElement('wallet-info', 'block', 'display');
                
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

        // Connect Wallet Button Handler
        document.getElementById('connectBtn').addEventListener('click', async () => {
            try {
                console.log('🔗 Connect button clicked');
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
        });

        // Load Initial Data
        async function loadInitialData() {
            try {
                console.log('📊 Loading initial data for:', currentAccount);
                
                // Load USDT Balance
                await loadUSDTBalance();
                
                // Load BNB Balance
                await loadBNBBalance();
                
                // Load dashboard data
                await loadDashboardData();
                
                // Check user registration
                await loadUserInfo();
                
            } catch (error) {
                console.error('❌ Error loading initial data:', error);
                showNotification('Error loading data: ' + error.message, 'error');
            }
        }

        // Load USDT Balance
        async function loadUSDTBalance() {
            try {
                const balance = await readContract({
                    address: CONTRACT_ADDRESSES.USDT,
                    abi: USDT_ABI,
                    functionName: 'balanceOf',
                    args: [currentAccount],
                });
                
                const formattedBalance = formatBalance(balance);
                safeUpdateElement('usdt-balance', formattedBalance);
                console.log('💰 USDT Balance:', formattedBalance);
            } catch (error) {
                console.error('❌ Error loading USDT balance:', error);
                safeUpdateElement('usdt-balance', '0.00');
            }
        }

        // Load BNB Balance
        async function loadBNBBalance() {
            try {
                const balance = await fetchBalance({
                    address: currentAccount,
                });
                
                const formattedBalance = parseFloat(balance.formatted).toFixed(4);
                safeUpdateElement('wallet-balance', formattedBalance);
                console.log('💎 BNB Balance:', formattedBalance);
            } catch (error) {
                console.error('❌ Error loading BNB balance:', error);
                safeUpdateElement('wallet-balance', '0.0000');
            }
        }

        // Load Dashboard Data
        async function loadDashboardData() {
            try {
                console.log('📈 Loading dashboard data...');
                
                // Get current round ID
                const currentRoundId = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'currentRoundId',
                });
                
                console.log('🎲 Current Round ID:', currentRoundId.toString());
                safeUpdateElement('current-round', currentRoundId.toString());

                if (parseInt(currentRoundId) > 0) {
                    // Get round info
                    const roundInfo = await readContract({
                        address: CONTRACT_ADDRESSES.LOTTERY,
                        abi: LOTTERY_ABI,
                        functionName: 'getRoundInfo',
                        args: [currentRoundId],
                    });
                    
                    console.log('📊 Round Info:', roundInfo);
                    
                    // Update UI elements
                    safeUpdateElement('total-tickets', roundInfo[0].toString());
                    safeUpdateElement('total-tickets-count', roundInfo[0].toString());
                    safeUpdateElement('tickets-sold', roundInfo[2].toString());
                    safeUpdateElement('tickets-unsold', (roundInfo[0] - roundInfo[2]).toString());
                    safeUpdateElement('ticket-price', formatBalance(roundInfo[1]));
                    
                    // Calculate prize pool (75% of total revenue)
                    const prizePool = (roundInfo[2] * roundInfo[1] * BigInt(75)) / BigInt(100);
                    safeUpdateElement('prize-pool', formatBalance(prizePool));

                    // Update draw status
                    safeUpdateElement('draw-status', roundInfo[4] ? 'Completed' : 'Pending');
                    
                    // Set purchase round ID
                    safeUpdateElement('purchase-round-id', currentRoundId.toString(), 'value');
                    safeUpdateElement('claim-round-id', currentRoundId.toString(), 'value');
                    
                    // Load user tickets if connected
                    if (isConnected && currentAccount) {
                        try {
                            const userTickets = await readContract({
                                address: CONTRACT_ADDRESSES.LOTTERY,
                                abi: LOTTERY_ABI,
                                functionName: 'getUserTickets',
                                args: [currentRoundId, currentAccount],
                            });
                            
                            safeUpdateElement('my-tickets-count', userTickets.length.toString());
                            safeUpdateElement('current-round-tickets', userTickets.length.toString());
                            console.log('🎫 User tickets:', userTickets.length);
                        } catch (userTicketsError) {
                            console.warn('⚠️ Could not load user tickets:', userTicketsError);
                            safeUpdateElement('my-tickets-count', '0');
                            safeUpdateElement('current-round-tickets', '0');
                        }
                    }

                    // Generate tickets display
                    await generateTicketsDisplay(currentRoundId, roundInfo[0], roundInfo[2]);
                } else {
                    console.log('⚠️ No active rounds, loading basic data');
                    loadBasicDashboardData();
                }

            } catch (error) {
                console.error('❌ Error loading dashboard data:', error);
                loadBasicDashboardData();
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
                
                console.log('📋 User Info:', userInfo);
                
                // Update registration status elements safely
                safeUpdateElement('user-status', userInfo[0] ? 'Registered' : 'Not Registered', 'value');
                safeUpdateElement('user-sponsor', userInfo[1] === '0x0000000000000000000000000000000000000000' ? 'None' : userInfo[1], 'value');
                safeUpdateElement('user-tickets', userInfo[2].toString(), 'value');
                safeUpdateElement('user-earnings', formatBalance(userInfo[3]) + ' USDT', 'value');
                
                // Calculate total spent for current round
                try {
                    const currentRoundId = await readContract({
                        address: CONTRACT_ADDRESSES.LOTTERY,
                        abi: LOTTERY_ABI,
                        functionName: 'currentRoundId',
                    });
                    
                    if (parseInt(currentRoundId) > 0) {
                        const roundInfo = await readContract({
                            address: CONTRACT_ADDRESSES.LOTTERY,
                            abi: LOTTERY_ABI,
                            functionName: 'getRoundInfo',
                            args: [currentRoundId],
                        });
                        
                        const userTickets = await readContract({
                            address: CONTRACT_ADDRESSES.LOTTERY,
                            abi: LOTTERY_ABI,
                            functionName: 'getUserTickets',
                            args: [currentRoundId, currentAccount],
                        });
                        
                        const totalSpent = BigInt(userTickets.length) * roundInfo[1];
                        safeUpdateElement('total-spent', formatBalance(totalSpent) + ' USDT', 'value');
                    }
                } catch (spentError) {
                    console.warn('⚠️ Could not calculate total spent:', spentError);
                    safeUpdateElement('total-spent', '0.00 USDT', 'value');
                }
                
            } catch (error) {
                console.error('❌ Error loading user info:', error);
                // Set default values
                safeUpdateElement('user-status', 'Not Registered', 'value');
                safeUpdateElement('user-sponsor', 'None', 'value');
                safeUpdateElement('user-tickets', '0', 'value');
                safeUpdateElement('user-earnings', '0.00 USDT', 'value');
                safeUpdateElement('total-spent', '0.00 USDT', 'value');
            }
        }

        // Load Basic Dashboard Data (Demo/Fallback)
        function loadBasicDashboardData() {
            console.log('📊 Loading basic dashboard data...');
            
            const elements = [
                { id: 'current-round', value: '1' },
                { id: 'total-tickets', value: '100' },
                { id: 'total-tickets-count', value: '100' },
                { id: 'tickets-sold', value: '67' },
                { id: 'tickets-unsold', value: '33' },
                { id: 'ticket-price', value: '10' },
                { id: 'prize-pool', value: '750' },
                { id: 'my-tickets-count', value: '0' },
                { id: 'draw-status', value: 'Pending' }
            ];

            elements.forEach(({ id, value }) => {
                safeUpdateElement(id, value);
            });

            generateSampleTickets();
        }

        // Generate Tickets Display
        async function generateTicketsDisplay(roundId, totalTickets, ticketsSold) {
            const ticketsGrid = document.getElementById('tickets-grid');
            if (!ticketsGrid) return;
            
            console.log(`🎫 Generating tickets display for round ${roundId}: ${totalTickets} total, ${ticketsSold} sold`);
            
            ticketsGrid.innerHTML = '';
            
            let userTickets = [];
            let winnerTickets = [];
            
            if (isConnected && currentAccount) {
                try {
                    const userTicketsResult = await readContract({
                        address: CONTRACT_ADDRESSES.LOTTERY,
                        abi: LOTTERY_ABI,
                        functionName: 'getUserTickets',
                        args: [roundId, currentAccount],
                    });
                    userTickets = userTicketsResult.map(ticket => parseInt(ticket));
                    console.log('👤 User tickets:', userTickets);
                    
                    // Check for winners if draw is executed
                    const roundInfo = await readContract({
                        address: CONTRACT_ADDRESSES.LOTTERY,
                        abi: LOTTERY_ABI,
                        functionName: 'getRoundInfo',
                        args: [roundId],
                    });
                    
                    if (roundInfo[4]) { // drawExecuted
                        console.log('🏆 Draw executed, checking for winners...');
                        for (let i = 1; i <= Math.min(parseInt(totalTickets), 100); i++) {
                            try {
                                const rank = await readContract({
                                    address: CONTRACT_ADDRESSES.LOTTERY,
                                    abi: LOTTERY_ABI,
                                    functionName: 'getTicketRank',
                                    args: [roundId, i],
                                });
                                if (parseInt(rank) > 0) {
                                    winnerTickets.push(i);
                                }
                            } catch (error) {
                                continue;
                            }
                        }
                        console.log('🏆 Winner tickets:', winnerTickets);
                    }
                } catch (error) {
                    console.warn('⚠️ Error getting user/winner tickets:', error);
                }
            }
            
            // Generate ticket elements
            const ticketCount = Math.min(parseInt(totalTickets), 200); // Limit for performance
            for (let i = 1; i <= ticketCount; i++) {
                const ticket = document.createElement('div');
                ticket.className = 'ticket';
                ticket.textContent = i.toString().padStart(3, '0');
                ticket.onclick = () => showTicketDetails(roundId, i);
                
                // Determine ticket status
                if (winnerTickets.includes(i)) {
                    ticket.classList.add('winner');
                } else if (userTickets.includes(i)) {
                    ticket.classList.add('my-ticket');
                } else if (i <= parseInt(ticketsSold)) {
                    ticket.classList.add('sold');
                }
                
                ticketsGrid.appendChild(ticket);
            }
            
            if (ticketCount < parseInt(totalTickets)) {
                const moreElement = document.createElement('div');
                moreElement.className = 'ticket';
                moreElement.textContent = '...';
                moreElement.style.opacity = '0.5';
                ticketsGrid.appendChild(moreElement);
            }
        }

        // Generate Sample Tickets (Fallback)
        function generateSampleTickets() {
            const ticketsGrid = document.getElementById('tickets-grid');
            if (!ticketsGrid) return;
            
            console.log('🎫 Generating sample tickets...');
            ticketsGrid.innerHTML = '';
            
            for (let i = 1; i <= 100; i++) {
                const ticket = document.createElement('div');
                ticket.className = 'ticket';
                ticket.textContent = i.toString().padStart(3, '0');
                
                // Random demo status
                if (i <= 67) {
                    ticket.classList.add('sold');
                }
                if ([15, 42, 73].includes(i)) {
                    ticket.classList.add('winner');
                }
                if ([8, 23, 56].includes(i)) {
                    ticket.classList.add('my-ticket');
                }
                
                ticketsGrid.appendChild(ticket);
            }
        }

        // Show Ticket Details
        async function showTicketDetails(roundId, ticketNumber) {
            try {
                console.log(`🔍 Showing details for ticket ${ticketNumber} in round ${roundId}`);
                
                const owner = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getTicketOwner',
                    args: [roundId, ticketNumber],
                });
                
                let rank = 0;
                try {
                    const ticketRank = await readContract({
                        address: CONTRACT_ADDRESSES.LOTTERY,
                        abi: LOTTERY_ABI,
                        functionName: 'getTicketRank',
                        args: [roundId, ticketNumber],
                    });
                    rank = parseInt(ticketRank);
                } catch (error) {
                    console.log('No rank for this ticket');
                }
                
                let prize = 0;
                if (rank > 0) {
                    try {
                        const ticketPrize = await readContract({
                            address: CONTRACT_ADDRESSES.LOTTERY,
                            abi: LOTTERY_ABI,
                            functionName: 'calculateTicketPrize',
                            args: [roundId, ticketNumber],
                        });
                        prize = formatBalance(ticketPrize);
                    } catch (error) {
                        console.log('Could not calculate prize');
                    }
                }
                
                const isMyTicket = owner.toLowerCase() === currentAccount?.toLowerCase();
                const isWinner = rank > 0;
                
                let message = `🎫 Ticket #${ticketNumber}\n`;
                message += `👤 Owner: ${formatAddress(owner)}\n`;
                if (isMyTicket) message += `✅ This is your ticket!\n`;
                if (isWinner) {
                    message += `🏆 Winner! Rank ${rank}\n`;
                    message += `💰 Prize: ${prize} USDT`;
                } else {
                    message += `🎲 Status: ${owner === '0x0000000000000000000000000000000000000000' ? 'Available' : 'Sold'}`;
                }
                
                alert(message);
                
            } catch (error) {
                console.error('❌ Error getting ticket details:', error);
                alert(`🎫 Ticket #${ticketNumber}\n❌ Error loading details`);
            }
        }

        // Reset UI when wallet disconnected
        function resetUI() {
            safeUpdateElement('wallet-address', 'Not Connected');
            safeUpdateElement('wallet-text', 'Connect Wallet');
            safeUpdateElement('wallet-info', 'none', 'display');
            safeUpdateElement('wallet-balance', '0.0000');
            safeUpdateElement('usdt-balance', '0.00');
            
            // Reset user info
            safeUpdateElement('user-status', 'Not Registered', 'value');
            safeUpdateElement('user-sponsor', 'None', 'value');
            safeUpdateElement('user-tickets', '0', 'value');
            safeUpdateElement('user-earnings', '0.00 USDT', 'value');
            safeUpdateElement('total-spent', '0.00 USDT', 'value');
            safeUpdateElement('pending-claims', '0.00 USDT', 'value');
            
            // Reset dashboard
            safeUpdateElement('my-tickets-count', '0');
            safeUpdateElement('current-round-tickets', '0');
            
            // Load basic demo data
            loadBasicDashboardData();
        }

        // Update Ticket Cost
        window.updateTicketCost = function() {
            const numTicketsElement = document.getElementById('num-tickets');
            const ticketPriceElement = document.getElementById('ticket-price');
            const totalCostElement = document.getElementById('total-cost');
            
            if (numTicketsElement && ticketPriceElement && totalCostElement) {
                const numTickets = parseInt(numTicketsElement.value) || 1;
                const ticketPrice = parseFloat(ticketPriceElement.textContent) || 10;
                const totalCost = numTickets * ticketPrice;
                
                totalCostElement.value = `${totalCost.toFixed(5)} USDT`;
            }
        };

        // Purchase Tickets Function
        window.purchaseTickets = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                const roundId = parseInt(document.getElementById('purchase-round-id').value);
                const numberOfTickets = parseInt(document.getElementById('num-tickets').value);

                if (!roundId || !numberOfTickets || numberOfTickets < 1 || numberOfTickets > 10) {
                    showNotification('Please enter valid round ID and number of tickets (1-10)', 'error');
                    return;
                }

                showLoading();
                showNotification('Processing ticket purchase...', 'info');

                // Get round info to calculate cost
                const roundInfo = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getRoundInfo',
                    args: [roundId],
                });

                const ticketPrice = roundInfo[1];
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
                await waitForTransaction({ hash: approveTx.hash });

                // Then purchase tickets
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
                setTimeout(() => {
                    loadInitialData();
                }, 3000);

            } catch (error) {
                hideLoading();
                console.error('❌ Purchase error:', error);
                showNotification('Purchase failed: ' + error.message, 'error');
            }
        };

        // Register User Function
        window.registerUser = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                const sponsorAddress = document.getElementById('sponsor-address').value.trim();
                
                if (!sponsorAddress) {
                    showNotification('Please enter sponsor address', 'error');
                    return;
                }

                // Validate address format
                if (!window.web3.utils.isAddress(sponsorAddress)) {
                    showNotification('Please enter a valid wallet address', 'error');
                    return;
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
                await waitForTransaction({ hash: registerTx.hash });

                hideLoading();
                showNotification('Registration successful! 🎉', 'success');
                
                // Refresh data
                setTimeout(() => {
                    loadInitialData();
                }, 3000);

            } catch (error) {
                hideLoading();
                console.error('❌ Registration error:', error);
                showNotification('Registration failed: ' + error.message, 'error');
            }
        };

        // Check Registration Status
        window.checkRegistrationStatus = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                await loadUserInfo();
                showNotification('Registration status updated', 'success');
                
            } catch (error) {
                console.error('❌ Error checking registration:', error);
                showNotification('Error checking registration: ' + error.message, 'error');
            }
        };

        // Load My Tickets
        window.loadMyTickets = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                const currentRoundId = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'currentRoundId',
                });

                if (parseInt(currentRoundId) === 0) {
                    showNotification('No active rounds', 'warning');
                    return;
                }

                const userTickets = await readContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'getUserTickets',
                    args: [currentRoundId, currentAccount],
                });

                safeUpdateElement('current-round-tickets', userTickets.length.toString());
                
                showNotification(`You have ${userTickets.length} tickets in round ${currentRoundId}`, 'success');
                
                // Also update main dashboard
                safeUpdateElement('my-tickets-count', userTickets.length.toString());
                
            } catch (error) {
                console.error('❌ Error loading my tickets:', error);
                showNotification('Error loading tickets: ' + error.message, 'error');
            }
        };

        // Claim Prize Function
        window.claimPrize = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                const roundId = parseInt(document.getElementById('claim-round-id').value);

                if (!roundId) {
                    showNotification('Please enter valid round ID', 'error');
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
                await waitForTransaction({ hash: claimTx.hash });

                hideLoading();
                showNotification('Prize claimed successfully! 🏆', 'success');
                
                // Refresh data
                setTimeout(() => {
                    loadInitialData();
                }, 3000);

            } catch (error) {
                hideLoading();
                console.error('❌ Claim error:', error);
                showNotification('Claim failed: ' + error.message, 'error');
            }
        };

        // Claim All Prizes (Admin Function)
        window.claimAllPrizes = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                const roundId = parseInt(document.getElementById('claim-round-id').value);

                if (!roundId) {
                    showNotification('Please enter valid round ID', 'error');
                    return;
                }

                showLoading();
                showNotification('Processing claim all prizes...', 'info');

                const claimAllTx = await writeContract({
                    address: CONTRACT_ADDRESSES.LOTTERY,
                    abi: LOTTERY_ABI,
                    functionName: 'claimAllPrizes',
                    args: [roundId],
                });

                console.log('✅ Claim all transaction:', claimAllTx.hash);
                await waitForTransaction({ hash: claimAllTx.hash });

                hideLoading();
                showNotification('All prizes claimed successfully! 🏆', 'success');
                
                // Refresh data
                setTimeout(() => {
                    loadInitialData();
                }, 3000);

            } catch (error) {
                hideLoading();
                console.error('❌ Claim all error:', error);
                showNotification('Claim all failed: ' + error.message, 'error');
            }
        };

        // Check Pending Claims
        window.checkPendingClaims = async function() {
            try {
                if (!isConnected) {
                    showNotification('Please connect your wallet first', 'error');
                    return;
                }

                // This is a demo function since the contract doesn't have a direct pending claims method
                // In a real implementation, you would calculate this based on user's winning tickets
                safeUpdateElement('pending-claims', '0.00 USDT', 'value');
                showNotification('Pending claims checked', 'success');
                
            } catch (error) {
                console.error('❌ Error checking pending claims:', error);
                showNotification('Error checking pending claims: ' + error.message, 'error');
            }
        };

        // Auto refresh data every 30 seconds
        setInterval(() => {
            if (isConnected && currentAccount) {
                loadUSDTBalance();
                loadBNBBalance();
                // Don't auto-reload all data to avoid spam
            }
        }, 30000);

        // Initial setup when page loads
        document.addEventListener('DOMContentLoaded', async function() {
            console.log('🚀 Page loaded, initializing...');
            
            // Check if already connected
            const account = getAccount();
            if (account.isConnected) {
                console.log('🔗 Auto-connecting to existing wallet...');
                currentAccount = account.address;
                isConnected = true;
                safeUpdateElement('wallet-address', formatAddress(currentAccount));
                safeUpdateElement('wallet-text', 'Connected');
                safeUpdateElement('wallet-info', 'block', 'display');
                await loadInitialData();
            } else {
                console.log('💡 No existing wallet connection found');
                loadBasicDashboardData();
            }
            
            // Create particles animation
            createParticles();
            
            // Initialize ticket cost calculator
            updateTicketCost();
        });

        // Export functions for debugging
        window.loadInitialData = loadInitialData;
        window.loadUSDTBalance = loadUSDTBalance;
        window.loadBNBBalance = loadBNBBalance;
        window.loadDashboardData = loadDashboardData;
        window.loadUserInfo = loadUserInfo;

   

  
        // Show/Hide Sections
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all nav items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Add active class to clicked nav item
            event.target.classList.add('active');
        }

        // Create floating particles animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;
            
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size
                const sizes = ['small', 'medium', 'large'];
                particle.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                
                // Random color variation
                const hue = Math.random() * 60 + 15; // Orange to red range
                particle.style.background = `hsl(${hue}, 70%, 60%)`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Copy to clipboard function
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy', 'error');
            });
        }

        // Format large numbers
        function formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        }
   
