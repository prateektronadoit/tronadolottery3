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
  iconImage?: string;
  title: string;
  value: string | number;
  subtitle: string;
  bgClass?: string;
}

const StatCard = ({ icon, iconImage, title, value, subtitle, bgClass = "bg-gradient-to-b from-blue-900 to-blue-700" }: StatCardProps) => {
  return (
    <div className={`${bgClass} rounded-lg p-6 text-center shadow-lg border border-blue-700`}>
      <div className="text-center text-gray-200 mb-2 flex items-center justify-center space-x-2">
        {iconImage ? (
          <Image src={`/${iconImage}`} alt={title} width={40} height={40} className="inline-block mb-1" />
        ) : (
          <span className="text-2xl">{icon}</span>
        )}
        <span>{title}</span>
      </div>
      <div className="text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-300">{subtitle}</div>
    </div>
  );
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myTickets, setMyTickets] = useState<number[]>([15, 42, 56, 73]); // Example: ticket numbers 15, 42, 56, 73 belong to the user
  const [soldTickets, setSoldTickets] = useState<number[]>([8, 23]); // Example: ticket numbers 8, 23 are sold
  const [winnerTickets, setWinnerTickets] = useState<number[]>([]); // Example: no winners yet
  
  // Total number of tickets available in the current round
  const totalTickets = 100;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Function to get ticket status class
  const getTicketStatusClass = (ticketNumber: number) => {
    if (myTickets.includes(ticketNumber)) {
      return "bg-blue-600 hover:bg-blue-700 text-white"; // Light blue for my tickets
    } else if (winnerTickets.includes(ticketNumber)) {
      return "bg-yellow-500 hover:bg-yellow-600 text-black"; // Yellow for winners
    } else if (soldTickets.includes(ticketNumber)) {
      return "bg-orange-500 hover:bg-orange-600 text-white"; // Orange for sold tickets
    } else {
      return "bg-gray-700 hover:bg-gray-600 text-gray-300"; // Gray for available tickets
    }
  };
  
  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="md:ml-64 flex-1 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
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
              icon=""
              iconImage="18.png"
              title="Current Round" 
              value="1" 
              subtitle="Active lottery round" 
            />
            <StatCard 
              icon=""
              iconImage="15.png"
              title="Total Tickets" 
              value="100" 
              subtitle="Available in current round" 
            />
            <StatCard 
              icon=""
              iconImage="14.png"
              title="Tickets Sold" 
              value="67" 
              subtitle="33 remaining" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard 
              icon=""
              iconImage="11.png"
              title="Prize Pool" 
              value="750" 
              subtitle="USDT total prizes" 
            />
            <StatCard 
              icon=""
              iconImage="19.png"
              title="Ticket Price" 
              value="10" 
              subtitle="USDT per ticket" 
            />
            <StatCard 
              icon=""
              iconImage="16.png"
              title="My Tickets" 
              value={myTickets.length} 
              subtitle="In current round" 
              bgClass="bg-gradient-to-b from-blue-900 to-blue-700"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <StatCard 
              icon=""
              iconImage="13.png"
              title="Draw Status" 
              value="Pending" 
              subtitle="Current round status" 
            />
            <StatCard 
              icon=""
              iconImage="17.png"
              title="Total Tickets Count" 
              value="100" 
              subtitle="Overall statistics" 
            />
          </div>
          
          {/* Live Tickets Board */}
          <div className="mt-8 relative overflow-hidden rounded-lg">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/dbg.png"
                alt="Dashboard Background"
                fill
                style={{ objectFit: 'cover' }}
                priority
                quality={100}
              />
            </div>
            
            <div className="relative z-10 h-full">
              <h2 className="text-xl font-bold mb-4 text-center">🎫 Live Tickets Board</h2>
              
              {/* Ticket Grid */}
              <div className="grid grid-cols-10 gap-2">
              {Array.from({length: totalTickets}, (_, i) => i + 1).map((ticketNumber) => (
                <button 
                  key={ticketNumber}
                  className={`${getTicketStatusClass(ticketNumber)} aspect-square rounded flex items-center justify-center transition-all duration-200 text-sm font-mono`}
                >
                  {String(ticketNumber).padStart(3, '0')}
                </button>
              ))}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center">
                <span className="block w-4 h-4 bg-blue-600 rounded mr-2"></span>
                <span>• My Tickets</span>
              </div>
              <div className="flex items-center">
                <span className="block w-4 h-4 bg-orange-500 rounded mr-2"></span>
                <span>• Sold</span>
              </div>
              <div className="flex items-center">
                <span className="block w-4 h-4 bg-yellow-500 rounded mr-2"></span>
                <span>• Winners</span>
              </div>
              <div className="flex items-center">
                <span className="block w-4 h-4 bg-gray-700 rounded mr-2"></span>
                <span>• Available</span>
              </div>
              </div>
            </div>
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
