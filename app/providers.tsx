'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig } from 'wagmi';
import {
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
  sepolia,
  goerli,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  baseGoerli,
} from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Configure all supported chains
const chains = [
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
  // Testnets
  sepolia,
  goerli,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  baseGoerli,
] as const;

// Configure wallet connectors with custom options
const { connectors } = getDefaultWallets({
  appName: 'Tronado Lottery',
  projectId: 'fc21f1d3bcd9c06bd3139b0046af7b70',
});

// Configure RPC endpoints for each chain
const wagmiConfig = createConfig({
  connectors,
  transports: {
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
    // Testnets
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/demo'),
    [goerli.id]: http('https://eth-goerli.g.alchemy.com/v2/demo'),
    [polygonMumbai.id]: http('https://polygon-mumbai.g.alchemy.com/v2/demo'),
    [arbitrumGoerli.id]: http('https://arb-goerli.g.alchemy.com/v2/demo'),
    [optimismGoerli.id]: http('https://opt-goerli.g.alchemy.com/v2/demo'),
    [baseGoerli.id]: http('https://base-goerli.g.alchemy.com/v2/demo'),
  },
  chains,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          initialChain={mainnet}
          showRecentTransactions={true}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 