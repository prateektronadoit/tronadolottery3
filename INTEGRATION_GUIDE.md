# BSC Testnet Smart Contract Integration Guide

## Overview

This guide provides step-by-step instructions for integrating the BSC Testnet smart contract at address `0x6054829D19348Cd06C6EFC0a9912ABC5d6153a63` with your React/Next.js application using MetaMask and Wagmi.

## Contract Details

- **Contract Address**: `0x6054829D19348Cd06C6EFC0a9912ABC5d6153a63`
- **Network**: BSC Testnet (Chain ID: 97)
- **Token**: USDT Test Token (`0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA`)

## Key Features Implemented

### 🎯 Prize Pool Calculation
- **75% of total revenue** goes to prize pool (matching reference code)
- Formula: `(ticketsSold * ticketPrice * 75) / 100`
- Displayed with "USDT" suffix for clarity

### 💰 Balance Tracking
- Real-time BNB balance display
- USDT token balance tracking
- USDT allowance monitoring for ticket purchases

### 🎫 Ticket Management
- Purchase tickets with USDT
- View user's tickets in current round
- Ticket status tracking (sold, available, user's tickets, winners)

### 🏆 Prize System
- Individual prize claiming
- Bulk prize claiming for all tickets
- Prize calculation based on ticket rank

### 👤 User Registration
- Sponsor-based registration system
- User information tracking
- Registration status monitoring

## Prerequisites

1. **MetaMask Extension**: Install MetaMask browser extension
2. **BSC Testnet Network**: Add BSC Testnet to MetaMask
3. **Test BNB**: Get test BNB from BSC Testnet faucet
4. **Test USDT**: Get test USDT tokens

## Setup Instructions

### 1. Add BSC Testnet to MetaMask

1. Open MetaMask
2. Click on the network dropdown (usually shows "Ethereum Mainnet")
3. Click "Add network" → "Add network manually"
4. Enter the following details:
   - **Network Name**: BSC Testnet
   - **New RPC URL**: `https://data-seed-prebsc-1-s1.binance.org:8545/`
   - **Chain ID**: `97`
   - **Currency Symbol**: `tBNB`
   - **Block Explorer URL**: `https://testnet.bscscan.com`

### 2. Get Test Tokens

1. **Test BNB**: Visit [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)
2. **Test USDT**: Use the contract's USDT token at `0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA`

### 3. Project Setup

The project is already configured with:
- Next.js 14
- Wagmi v2
- RainbowKit
- Viem
- TypeScript

## Integration Components

### 1. Updated Contract Configuration

The contract address has been updated in `app/hooks/useWallet.ts`:

```typescript
const CONTRACT_ADDRESSES = {
  LOTTERY: '0x6054829D19348Cd06C6EFC0a9912ABC5d6153a63', // Reference contract address
  USDT: '0x7b0ED090071cb486a6ca12F16f49bd1135BDbeDA'  // USDT token address
};
```

### 2. Prize Pool Calculation

The prize pool is calculated as 75% of total revenue:

```typescript
// Calculate prize pool (75% of total revenue) - matching reference code
const totalRevenue = (roundDataArray[1] || BigInt(0)) * BigInt(ticketsSold);
const prizePool = (totalRevenue * BigInt(75)) / BigInt(100);
```

### 3. Web3 Provider Configuration

The `app/providers.tsx` file configures:
- BSC Testnet as the primary network
- Multiple chain support
- RainbowKit wallet connection
- React Query for data management

### 4. Wallet Hook

The `useWallet` hook provides:
- Wallet connection management
- Contract interaction functions
- Balance tracking
- Transaction handling
- Error management

## Available Functions

### Reading Data (View Functions)
- `currentRoundId()` - Get current lottery round
- `getRoundInfo(roundId)` - Get round details
- `getUserInfo(address)` - Get user registration info
- `getUserTickets(roundId, address)` - Get user's tickets
- `balanceOf(address)` - Get USDT balance
- `allowance(owner, spender)` - Get USDT allowance

### Writing Data (Transaction Functions)
- `registerUser(sponsor)` - Register user with sponsor
- `purchaseTickets(roundId, numberOfTickets)` - Buy lottery tickets
- `claimPrize(roundId)` - Claim individual prize
- `claimAllPrizes(roundId)` - Claim all available prizes
- `approve(spender, amount)` - Approve USDT spending

## Usage Examples

### 1. Connect Wallet

```typescript
import { useWallet } from '../hooks/useWallet';

const { isConnected, address } = useWallet();
```

### 2. Register User

```typescript
const { registerUser } = useWallet();

const handleRegister = async () => {
  await registerUser('0x0000000000000000000000000000000000000000'); // No sponsor
};
```

### 3. Purchase Tickets

```typescript
const { purchaseTickets } = useWallet();

const handlePurchase = async () => {
  await purchaseTickets(5); // Buy 5 tickets
};
```

### 4. Check Balances

```typescript
const { bnbBalance, usdtBalance } = useWallet();

console.log(`BNB: ${bnbBalance}`);
console.log(`USDT: ${usdtBalance}`);
```

## Testing the Integration

### 1. Run the Test Page

Visit `/test` in your application to run comprehensive contract tests:

```bash
npm run dev
# Navigate to http://localhost:3000/test
```

### 2. Test Functions

The test page will:
- Verify wallet connection
- Check contract addresses
- Display balances
- Test contract functions
- Show real-time status

### 3. Manual Testing

1. Connect MetaMask to BSC Testnet
2. Ensure you have test BNB and USDT
3. Register as a user
4. Purchase tickets
5. Check ticket ownership
6. Claim prizes (if applicable)

## Error Handling

The integration includes comprehensive error handling:

### Common Errors
- **User Rejection (4001)**: User declined transaction
- **Insufficient Balance**: Not enough USDT/BNB
- **Network Errors**: Wrong network or connection issues
- **Contract Errors**: Function reverts or invalid parameters

### Error Recovery
- Automatic retry for network issues
- User-friendly error messages
- Transaction status tracking
- Balance validation before transactions

## Security Considerations

1. **Never expose private keys** in client-side code
2. **Validate all user inputs** before sending to contract
3. **Use proper error handling** for all transactions
4. **Test thoroughly** on testnet before mainnet
5. **Monitor gas costs** and optimize transactions

## Troubleshooting

### MetaMask Connection Issues
1. Ensure MetaMask is installed and unlocked
2. Check if you're on BSC Testnet
3. Clear browser cache and reload
4. Check MetaMask permissions

### Contract Interaction Issues
1. Verify contract address is correct
2. Check if you have sufficient balance
3. Ensure USDT allowance is set
4. Verify function parameters

### Network Issues
1. Check RPC endpoint availability
2. Try alternative RPC URLs
3. Verify chain ID is correct
4. Check MetaMask network settings

## Development Workflow

1. **Local Development**: Use `npm run dev`
2. **Testing**: Use `/test` page for contract tests
3. **Debugging**: Check browser console for errors
4. **Deployment**: Build with `npm run build`

## Additional Resources

- [BSC Testnet Explorer](https://testnet.bscscan.com)
- [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
- [Viem Documentation](https://viem.sh)

## Support

For issues with:
- **Contract Integration**: Check the test page at `/test`
- **MetaMask**: Refer to MetaMask documentation
- **Network Issues**: Check BSC Testnet status
- **Development**: Review browser console logs

## Next Steps

1. Test all functionality on BSC Testnet
2. Deploy to production when ready
3. Monitor contract interactions
4. Implement additional features as needed
5. Consider mainnet deployment

---

**Note**: This integration is specifically configured for BSC Testnet. For mainnet deployment, update the contract addresses and network configuration accordingly. 