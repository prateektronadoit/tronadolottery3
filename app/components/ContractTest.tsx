'use client';

import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ContractTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  
  const {
    address,
    isConnected,
    dashboardData,
    loading,
    notification,
    bnbBalance,
    usdtBalance,
    usdtAllowance,
    contractAddresses,
    registerUser,
    purchaseTickets,
    claimPrize,
    claimAllPrizes,
    formatAddress,
    getTicketDetails,
  } = useWallet();

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const runContractTests = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      addTestResult('Starting contract integration tests...');
      
      // Test 1: Check if wallet is connected
      if (!isConnected) {
        addTestResult('❌ Wallet not connected. Please connect MetaMask first.');
        return;
      }
      addTestResult('✅ Wallet connected successfully');
      
      // Test 2: Check contract addresses
      addTestResult(`📋 Contract Addresses:`);
      addTestResult(`   Lottery: ${contractAddresses.LOTTERY}`);
      addTestResult(`   USDT: ${contractAddresses.USDT}`);
      
      // Test 3: Check balances
      addTestResult(`💰 Balances:`);
      addTestResult(`   BNB: ${bnbBalance}`);
      addTestResult(`   USDT: ${usdtBalance}`);
      addTestResult(`   USDT Allowance: ${usdtAllowance}`);
      
      // Test 4: Check dashboard data
      addTestResult(`📊 Dashboard Data:`);
      addTestResult(`   Current Round: ${dashboardData.currentRound}`);
      addTestResult(`   Total Tickets: ${dashboardData.totalTickets}`);
      addTestResult(`   Tickets Sold: ${dashboardData.ticketsSold}`);
      addTestResult(`   Ticket Price: ${dashboardData.ticketPrice} USDT`);
      addTestResult(`   Is Registered: ${dashboardData.isRegistered}`);
      addTestResult(`   My Tickets Count: ${dashboardData.myTicketsCount}`);
      
      // Test 5: Check if contract is responding
      if (dashboardData.currentRound > 0) {
        addTestResult('✅ Contract is responding and returning data');
      } else {
        addTestResult('⚠️ Contract may not be responding or no active round');
      }
      
      // Test 6: Test ticket details function (if there are tickets)
      if (dashboardData.myTickets && dashboardData.myTickets.length > 0) {
        addTestResult('🎫 Testing ticket details function...');
        try {
          const ticketDetails = await getTicketDetails(
            dashboardData.currentRound, 
            dashboardData.myTickets[0]
          );
          if (ticketDetails) {
            addTestResult(`✅ Ticket details retrieved: Owner=${formatAddress(ticketDetails.owner)}, Rank=${ticketDetails.rank}, Prize=${ticketDetails.prize}`);
          } else {
            addTestResult('❌ Failed to get ticket details');
          }
        } catch (error) {
          addTestResult(`❌ Error getting ticket details: ${error}`);
        }
      } else {
        addTestResult('ℹ️ No tickets to test ticket details function');
      }
      
      addTestResult('🎉 Contract integration test completed!');
      
    } catch (error) {
      addTestResult(`❌ Test failed with error: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          🔧 Smart Contract Integration Test
        </h2>
        
        <div className="mb-6 text-center">
          <ConnectButton />
        </div>
        
        <div className="mb-6">
          <button
            onClick={runContractTests}
            disabled={!isConnected || isTesting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 mb-4"
          >
            {isTesting ? 'Running Tests...' : 'Run Contract Tests'}
          </button>
          
          <button
            onClick={clearResults}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Clear Results
          </button>
        </div>
        
        {/* Test Results */}
        <div className="bg-black rounded-lg p-4 border border-gray-600">
          <h3 className="text-lg font-semibold mb-4 text-white">Test Results:</h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {testResults.length === 0 ? (
              <p className="text-gray-400">No test results yet. Click "Run Contract Tests" to start.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono text-gray-300">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Current Status */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Current Status:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Wallet Connected:</strong> {isConnected ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Address:</strong> {address ? formatAddress(address) : 'Not connected'}</p>
              <p><strong>Loading:</strong> {loading ? '🔄 Yes' : '✅ No'}</p>
            </div>
            <div>
              <p><strong>Current Round:</strong> {dashboardData.currentRound || 'N/A'}</p>
              <p><strong>Registered:</strong> {dashboardData.isRegistered ? '✅ Yes' : '❌ No'}</p>
              <p><strong>My Tickets:</strong> {dashboardData.myTicketsCount || 0}</p>
            </div>
          </div>
        </div>
        
        {/* Notification Display */}
        {notification && (
          <div className={`mt-4 p-4 rounded-lg ${
            notification.type === 'error' ? 'bg-red-500' : 
            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
          } text-white`}>
            <strong>Notification:</strong> {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractTest; 