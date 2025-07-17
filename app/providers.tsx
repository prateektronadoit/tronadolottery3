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

// Polygon Mainnet configuration with multiple RPC endpoints
const polygon = {
  id: 137,
  name: 'Polygon',
  network: 'polygon',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://polygon-rpc.com',
        'https://rpc-mainnet.maticvigil.com',
        'https://rpc-mainnet.matic.network',
        'https://polygon.llamarpc.com',
        'https://polygon.rpc.blxrbdn.com'
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
    },
  },
  testnet: false,
} as const;

// BSC Testnet configuration
// const bscTestnet = {
//   id: 97,
//   name: 'BSC Testnet',
//   network: 'bsc-testnet',
//   nativeCurrency: {
//     name: 'BNB',
//     symbol: 'tBNB',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'BSCScan Testnet',
//       url: 'https://testnet.bscscan.com',
//     },
//   },
//   testnet: true,
// } as const;

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
          const { polygon } = await import('wagmi/chains');
          const { http, fallback } = await import('viem');

          // Configure only Polygon mainnet
          const chains = [polygon] as const;

          // Configure wallet connectors with custom options
          const { connectors } = getDefaultWallets({
            appName: 'Tronado Lottery',
            projectId: 'fc21f1d3bcd9c06bd3139b0046af7b70',
          });

          // Configure RPC endpoints with fallback for better reliability
          const config = createConfig({
            connectors,
            transports: {
              [polygon.id]: fallback([
                http('https://polygon-rpc.com', { 
                  batch: { 
                    batchSize: 10,
                    wait: 50 
                  },
                  retryCount: 3,
                  retryDelay: 1000
                }),
                http('https://rpc-mainnet.maticvigil.com', { 
                  batch: { 
                    batchSize: 10,
                    wait: 50 
                  },
                  retryCount: 3,
                  retryDelay: 1000
                }),
                http('https://rpc-mainnet.matic.network', { 
                  batch: { 
                    batchSize: 10,
                    wait: 50 
                  },
                  retryCount: 3,
                  retryDelay: 1000
                }),
                http('https://polygon.llamarpc.com', { 
                  batch: { 
                    batchSize: 10,
                    wait: 50 
                  },
                  retryCount: 3,
                  retryDelay: 1000
                }),
                http('https://polygon.rpc.blxrbdn.com', { 
                  batch: { 
                    batchSize: 10,
                    wait: 50 
                  },
                  retryCount: 3,
                  retryDelay: 1000
                })
              ]),
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });

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
          initialChain={polygon}
          showRecentTransactions={true}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 