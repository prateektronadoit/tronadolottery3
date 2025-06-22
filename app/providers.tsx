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

// BSC Testnet configuration (same as lottery registration)
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
          const { mainnet, polygon, arbitrum, optimism, base, bsc, avalanche, fantom, zkSync, linea, scroll, polygonZkEvm, mantle, celo, gnosis, sepolia, goerli, polygonMumbai, arbitrumGoerli, optimismGoerli, baseGoerli } = await import('wagmi/chains');
          const { http } = await import('viem');

          // Configure all supported chains
          const chains = [
            // Testnets (prioritize BSC testnet)
            bscTestnet,
            sepolia,
            goerli,
            polygonMumbai,
            arbitrumGoerli,
            optimismGoerli,
            baseGoerli,
            // Mainnets
            mainnet,
            polygon,
            arbitrum,
            optimism,
            base,
            bsc,
            avalanche,
            fantom,
            zkSync,
            linea,
            scroll,
            polygonZkEvm,
            mantle,
            celo,
            gnosis,
          ] as const;

          // Configure wallet connectors with custom options
          const { connectors } = getDefaultWallets({
            appName: 'Tronado Lottery',
            projectId: 'fc21f1d3bcd9c06bd3139b0046af7b70',
          });

          // Configure RPC endpoints for each chain
          const config = createConfig({
            connectors,
            transports: {
              // Testnets (prioritize BSC testnet)
              [bscTestnet.id]: http('https://bsc-testnet.publicnode.com'),
              [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/demo'),
              [goerli.id]: http('https://eth-goerli.g.alchemy.com/v2/demo'),
              [polygonMumbai.id]: http('https://polygon-mumbai.g.alchemy.com/v2/demo'),
              [arbitrumGoerli.id]: http('https://arb-goerli.g.alchemy.com/v2/demo'),
              [optimismGoerli.id]: http('https://opt-goerli.g.alchemy.com/v2/demo'),
              [baseGoerli.id]: http('https://base-goerli.g.alchemy.com/v2/demo'),
              // Mainnets
              [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/demo'),
              [polygon.id]: http('https://polygon-mainnet.g.alchemy.com/v2/demo'),
              [arbitrum.id]: http('https://arb-mainnet.g.alchemy.com/v2/demo'),
              [optimism.id]: http('https://opt-mainnet.g.alchemy.com/v2/demo'),
              [base.id]: http('https://base-mainnet.g.alchemy.com/v2/demo'),
              [bsc.id]: http('https://bsc-dataseed.binance.org'),
              [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
              [fantom.id]: http('https://rpc.ftm.tools'),
              [zkSync.id]: http('https://mainnet.era.zksync.io'),
              [linea.id]: http('https://rpc.linea.build'),
              [scroll.id]: http('https://rpc.scroll.io'),
              [polygonZkEvm.id]: http('https://zkevm-rpc.com'),
              [mantle.id]: http('https://rpc.mantle.xyz'),
              [celo.id]: http('https://forno.celo.org'),
              [gnosis.id]: http('https://rpc.gnosischain.com'),
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