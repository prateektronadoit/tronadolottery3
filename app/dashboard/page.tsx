'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-gray-950 h-screen fixed left-0 top-0 text-orange-500 z-30 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" alt="Crypto Lottery Logo" width={150} height={40} priority />
          </Link>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="py-4">
          <ul>
            <li className="mb-2 px-2">
              <Link href="/dashboard" className="flex items-center p-3 text-white bg-blue-900 rounded">
                <span className="mr-3">🏠</span> Dashboard
              </Link>
            </li>
            <li className="mb-2 px-2">
              <Link href="/registration" className="flex items-center p-3 text-gray-400 hover:text-white hover:bg-blue-900 rounded transition-all duration-200">
                <span className="mr-3">📝</span> Registration
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

// Stat Card component
interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  subtitle: string;
  bgClass?: string;
}

const StatCard = ({ icon, title, value, subtitle, bgClass = "bg-gray-900" }: StatCardProps) => {
  return (
    <div className={`${bgClass} rounded-lg p-6 text-center`}>
      <div className="text-center text-gray-400 mb-2">{icon} {title}</div>
      <div className="text-4xl font-bold text-orange-500 mb-1">{value}</div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </div>
  );
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="md:ml-64 flex-1 bg-gradient-to-b from-black to-blue-950 text-white">
        {/* Header */}
        <header className="py-4 px-4 md:px-6 bg-gradient-to-r from-gray-900 to-blue-900 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="mr-4 text-gray-400 hover:text-white md:hidden"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center">
              <span className="mr-2">🏆</span> Dashboard
            </h1>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-3 md:px-4 rounded-md text-xs md:text-sm transition-all duration-200">
            Connect Wallet
          </button>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-3 md:p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <StatCard 
              icon="🔄"
              title="Current Round" 
              value="1" 
              subtitle="Active lottery round" 
            />
            <StatCard 
              icon="🎫"
              title="Total Tickets" 
              value="100" 
              subtitle="Available in current round" 
            />
            <StatCard 
              icon="🎟️"
              title="Tickets Sold" 
              value="67" 
              subtitle="33 remaining" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard 
              icon="🏆"
              title="Prize Pool" 
              value="750" 
              subtitle="USDT total prizes" 
            />
            <StatCard 
              icon="💵"
              title="Ticket Price" 
              value="10" 
              subtitle="USDT per ticket" 
            />
            <StatCard 
              icon="🎯"
              title="My Tickets" 
              value="0" 
              subtitle="In current round" 
              bgClass="bg-gradient-to-b from-gray-900 to-blue-900"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <StatCard 
              icon="🎲"
              title="Draw Status" 
              value="Pending" 
              subtitle="Current round status" 
            />
            <StatCard 
              icon="📊"
              title="Total Tickets Count" 
              value="100" 
              subtitle="Overall statistics" 
            />
          </div>
          
          {/* Actions */}
          <div className="mt-6 md:mt-10 text-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 md:py-3 px-6 md:px-8 rounded-md text-base md:text-lg transition-all duration-200 shadow-lg">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
