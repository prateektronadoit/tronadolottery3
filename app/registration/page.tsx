'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sidebar component (reused from dashboard)
const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-950 h-screen fixed left-0 top-0 text-orange-500">
      <div className="p-4 border-b border-gray-800">
        <Link href="/" className="flex items-center">
          <Image src="/Logo.png" alt="Crypto Lottery Logo" width={150} height={40} priority />
        </Link>
      </div>
      <div className="py-4">
        <ul>
          <li className="mb-2">
            <Link href="/dashboard" className="flex items-center p-3 text-gray-400 hover:text-white hover:bg-blue-900 rounded transition-all duration-200">
              <span className="mr-3">🏠</span> Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/registration" className="flex items-center p-3 text-white bg-blue-900 rounded">
              <span className="mr-3">📝</span> Registration
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value }: { icon: string; title: string; value: string }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-3 text-center">
      <div className="text-lg font-medium text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-orange-500">{value}</div>
      <div className="text-3xl text-gray-400 mt-1">{icon}</div>
    </div>
  );
};

// Section component
const Section = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-blue-950 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
};

export default function Registration() {
  const [referralAddress, setReferralAddress] = useState('0x0000000000000000000000000000000000000000');
  const [numTickets, setNumTickets] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);
  
  // Mock connect wallet function
  const connectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gradient-to-b from-black to-blue-950 text-white p-6">
        {/* Header */}
        <header className="py-4 px-6 bg-gradient-to-r from-gray-900 to-blue-900 rounded-lg mb-8">
          <h1 className="text-2xl font-bold text-white">Join the Lottery</h1>
          <p className="text-gray-300">Register now and start winning big prizes!</p>
        </header>
        
        {/* Registration Section */}
        <Section title="Connect your wallet to get started" icon="🔒">
          <button 
            onClick={connectWallet}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-6 rounded-md text-lg transition-all duration-200 flex items-center"
          >
            <span className="mr-2">🔗</span> Connect MetaMask Wallet
          </button>
          
          <div className="mt-6">
            <label className="block mb-2 text-gray-300">Referral Address (Optional)</label>
            <input 
              type="text" 
              value={referralAddress}
              onChange={(e) => setReferralAddress(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
            <p className="text-sm text-gray-400 mt-1">Enter the wallet address of who referred you</p>
          </div>
          
          <div className="mt-6">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-8 rounded-md text-lg transition-all duration-200 flex items-center">
              <span className="mr-2">🚀</span> Register Now
            </button>
          </div>
        </Section>
        
        {/* Purchase Tickets Section */}
        <Section title="Purchase Tickets" icon="🎫">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatsCard icon="-" title="Current Round" value="-" />
            <StatsCard icon="-" title="Tickets Sold" value="-" />
            <StatsCard icon="-" title="Total Tickets" value="-" />
            <StatsCard icon="-" title="Price (USDT)" value="-" />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-gray-300">Select Round:</label>
            <select className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
              <option>Connect wallet first</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-gray-300">Number of Tickets:</label>
            <div className="flex items-center">
              <input 
                type="number" 
                value={numTickets}
                onChange={(e) => setNumTickets(Number(e.target.value))}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                min="1"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Total Cost:</label>
            <div className="text-xl font-bold text-orange-500">0 USDT</div>
          </div>
          
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-8 rounded-md text-lg transition-all duration-200 flex items-center">
            <span className="mr-2">🛒</span> Purchase Tickets
          </button>
        </Section>
        
        {/* Purchase History Section */}
        <Section title="Purchase History" icon="📊">
          <div className="flex justify-between mb-4">
            <button className="text-blue-500 hover:text-blue-400 flex items-center">
              <span className="mr-1">🔄</span> Refresh
            </button>
          </div>
          
          <table className="w-full mb-4">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left pb-2">Round</th>
                <th className="text-left pb-2">Tickets</th>
                <th className="text-left pb-2">Amount Paid</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
          </table>
          
          <div className="text-center py-8">
            <div className="text-2xl text-gray-400 mb-2">📊</div>
            <h4 className="text-xl font-semibold text-white mb-2">Connect wallet to view history</h4>
            <p className="text-gray-400">Your ticket purchases will appear here</p>
          </div>
        </Section>
        
        {/* Prize Claims Section */}
        <Section title="Prize Claims Center" icon="🏆">
          <p className="text-gray-300 mb-6">
            Connect your wallet to view your lottery winnings and claim your prizes. 
            Check your ticket history and see detailed prize breakdowns for each round.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard icon="0" title="Total Tickets" value="0" />
            <StatsCard icon="0" title="Rounds Played" value="0" />
            <StatsCard icon="0.00000" title="Total Winnings" value="0.00000" />
            <StatsCard icon="0.00000" title="Pending Claims" value="0.00000" />
          </div>
          
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">🎯</span> Your Prize History
            <button className="text-blue-500 hover:text-blue-400 text-sm ml-auto flex items-center">
              <span className="mr-1">🔄</span> Refresh
            </button>
          </h4>
          
          <div className="text-center py-8 bg-gray-900 rounded-lg">
            <div className="text-2xl text-gray-400 mb-2">🎫</div>
            <h4 className="text-xl font-semibold text-white mb-2">No Prizes Found</h4>
            <p className="text-gray-400 px-4">
              You haven't won any lottery prizes yet. Keep playing and good luck! 
              Prizes will appear here once you win in any lottery round.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
