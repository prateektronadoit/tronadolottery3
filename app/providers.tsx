'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Wagmi components to prevent SSR issues
const WagmiConfig = dynamic(() => import('wagmi').then(mod => ({ default: mod.WagmiConfig })), {
  ssr: false,
});

const RainbowKitProvider = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => ({ default: mod.RainbowKitProvider })), {
  ssr: false,
});

// BSC Testnet configuration
const bscTestnet = {
  id: 97,
  name: 'BSC Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
    },
  },
  testnet: true,
} as const;

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [wagmiConfig, setWagmiConfig] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      const initializeWagmi = async () => {
        try {
          const { createConfig } = await import('wagmi');
          const { getDefaultWallets } = await import('@rainbow-me/rainbowkit');
          const { bscTestnet } = await import('wagmi/chains');
          const { http } = await import('viem');

          // Configure only BSC testnet
          const chains = [bscTestnet] as const;

          // Configure wallet connectors with custom options
          const { connectors } = getDefaultWallets({
            appName: 'Tronado Lottery',
            projectId: 'fc21f1d3bcd9c06bd3139b0046af7b70',
          });

          // Configure RPC endpoint for BSC testnet
          const config = createConfig({
            connectors,
            transports: {
              [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
            },
            chains,
          });

          setWagmiConfig(config);
        } catch (error) {
          console.error('Error initializing Wagmi:', error);
        }
      };

      initializeWagmi();
    }
  }, []);

  const queryClient = new QueryClient();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || !wagmiConfig) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl"></div>
      </div>
    );
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          initialChain={bscTestnet}
          showRecentTransactions={true}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 