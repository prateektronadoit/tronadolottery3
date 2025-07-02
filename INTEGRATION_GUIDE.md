# Polygon Mainnet Smart Contract Integration Guide

## Overview

This guide provides step-by-step instructions for integrating the Polygon Mainnet smart contract at address `0xA4a6FA7bc08E25F525709Ee50CB8351559294a21` with your React/Next.js application using MetaMask and Wagmi.

## Contract Details

- **Contract Address**: `0xA4a6FA7bc08E25F525709Ee50CB8351559294a21`
- **Network**: Polygon Mainnet (Chain ID: 137)
- **Token**: USDT Token (`0x8d60f559C2461F193913afd10c2d09a09FBa0Bf3`)

## Key Features Implemented

### 🎯 Prize Pool Calculation
- **75% of total revenue** goes to prize pool (matching reference code)
- Formula: `(ticketsSold * ticketPrice * 75) / 100`
- Displayed with "USDT" suffix for clarity

### 💰 Balance Tracking
- Real-time MATIC balance display
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
2. **Polygon Mainnet Network**: Add Polygon to MetaMask
3. **MATIC**: Get MATIC for gas fees
4. **USDT**: Get USDT tokens for ticket purchases

## Setup Instructions

### 1. Add Polygon to MetaMask

1. Open MetaMask
2. Click on the network dropdown (usually shows "Ethereum Mainnet")
3. Click "Add network" → "Add network manually"
4. Enter the following details:
   - **Network Name**: Polygon
   - **New RPC URL**: `https://polygon-rpc.com`
   - **Chain ID**: `137`
   - **Currency Symbol**: `MATIC`
   - **Block Explorer URL**: `https://polygonscan.com`

### 2. Get Tokens

1. **MATIC**: Purchase MATIC from exchanges or use Polygon faucets
2. **USDT**: Purchase USDT from exchanges or use the contract's USDT token at `0x8d60f559C2461F193913afd10c2d09a09FBa0Bf3`

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
  LOTTERY: '0xA4a6FA7bc08E25F525709Ee50CB8351559294a21', // Reference contract address
  USDT: '0x8d60f559C2461F193913afd10c2d09a09FBa0Bf3'  // USDT token address
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
- Polygon Mainnet as the primary network
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
const { maticBalance, usdtBalance } = useWallet();

console.log(`MATIC: ${maticBalance}`);
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

1. Connect MetaMask to Polygon Mainnet
2. Ensure you have MATIC and USDT
3. Register as a user
4. Purchase tickets
5. Check ticket ownership
6. Claim prizes (if applicable)

## Error Handling

The integration includes comprehensive error handling:

### Common Errors
- **User Rejection (4001)**: User declined transaction
- **Insufficient Balance**: Not enough USDT/MATIC
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
2. Check if you're on Polygon Mainnet
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

- [Polygon Explorer](https://polygonscan.com)
- [Polygon Documentation](https://docs.polygon.technology)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
- [Viem Documentation](https://viem.sh)

## Support

For issues with:
- **Contract Integration**: Check the test page at `/test`
- **MetaMask**: Refer to MetaMask documentation
- **Network Issues**: Check Polygon Mainnet status
- **Development**: Review browser console logs

## Next Steps

1. Test all functionality on Polygon Mainnet
2. Deploy to production when ready
3. Monitor contract interactions
4. Implement additional features as needed
5. Consider additional network deployments

---

**Note**: This integration is specifically configured for Polygon Mainnet. The contract is already deployed and ready for production use. 