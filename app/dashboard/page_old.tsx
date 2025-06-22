// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useWallet } from '../hooks/useWallet';

// // Notification component
// const Notification = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'warning'; onClose: () => void }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';

//   return (
//     <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 min-w-80`}>
//       <div className="flex justify-between items-center">
//         <span>{message}</span>
//         <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">×</button>
//       </div>
//     </div>
//   );
// };

// // Loading spinner component
// const LoadingSpinner = () => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//   </div>
// );

// // Sidebar component
// const Sidebar = ({ isOpen, toggleSidebar, activeSection, setActiveSection }: { 
//   isOpen: boolean; 
//   toggleSidebar: () => void;
//   activeSection: string;
//   setActiveSection: (section: string) => void;
// }) => {
//   const menuItems = [
//     { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
//     { id: 'registration', icon: '📝', label: 'Registration' },
//     { id: 'purchase', icon: '🎫', label: 'Purchase Tickets' },
//     { id: 'my-tickets', icon: '🎯', label: 'My Tickets' },
//     { id: 'claim', icon: '💰', label: 'Claim Prizes' },
//   ];

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
//           onClick={toggleSidebar}
//         />
//       )}
      
//       {/* Sidebar */}
//       <div 
//         className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-gray-950 h-screen fixed left-0 top-0 text-orange-500 z-30 transition-transform duration-300 ease-in-out`}
//       >
//         <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//           <Link href="/" className="flex items-center">
//             <Image src="/Logo.png" alt="Crypto Lottery Logo" width={150} height={40} priority />
//           </Link>
//           <button 
//             className="md:hidden text-gray-400 hover:text-white"
//             onClick={toggleSidebar}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="py-4">
//           <ul>
//             {menuItems.map((item) => (
//               <li key={item.id} className="mb-2 px-2">
//                 <button
//                   onClick={() => setActiveSection(item.id)}
//                   className={`w-full flex items-center p-3 rounded transition-all duration-200 ${
//                     activeSection === item.id 
//                       ? 'text-white bg-blue-900' 
//                       : 'text-gray-400 hover:text-white hover:bg-blue-900'
//                   }`}
//                 >
//                   <span className="mr-3">{item.icon}</span> {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// // Stat Card component
// interface StatCardProps {
//   icon: string;
//   title: string;
//   value: string | number;
//   subtitle: string;
//   bgClass?: string;
// }

// const StatCard = ({ icon, title, value, subtitle, bgClass = "bg-opacity-0" }: StatCardProps) => {
//   return (
//     <div className={`relative rounded-xl p-6 border-2 border-blue-500 bg-blue-900/10 ${bgClass} group overflow-hidden transition-all duration-300 hover:border-blue-400`}>
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 via-blue-500/10 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
//       <div className="flex items-center mb-4 gap-4 relative z-10">
//         <span className="text-3xl flex-shrink-0">{icon}</span>
//         <div>
//           <div className="text-lg text-gray-200 font-medium">{title}</div>
//           <div className="text-3xl font-bold text-white mb-1">{value}</div>
//           <div className="text-sm text-gray-300">{subtitle}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Ticket Grid component
// const TicketGrid = ({ totalTickets, myTickets, soldTickets, winnerTickets, onTicketClick }: {
//   totalTickets: number;
//   myTickets: number[];
//   soldTickets: number[];
//   winnerTickets: number[];
//   onTicketClick: (ticketNumber: number) => void;
// }) => {
//   const getTicketClass = (ticketNumber: number) => {
//     if (winnerTickets.includes(ticketNumber)) return 'bg-yellow-500 text-black';
//     if (myTickets.includes(ticketNumber)) return 'bg-orange-500 text-white';
//     if (soldTickets.includes(ticketNumber)) return 'bg-gray-600 text-gray-300';
//     return 'bg-gray-800 text-gray-500 hover:bg-gray-700';
//   };

//   return (
//     <div className="tickets-section mt-8">
//       <h3 className="text-center mb-4 text-orange-500 text-xl">🎫 Live Tickets Board</h3>
//       <div className="grid grid-cols-10 gap-2 max-w-4xl mx-auto">
//         {Array.from({ length: totalTickets }, (_, i) => i + 1).map((ticketNumber) => (
//           <button
//             key={ticketNumber}
//             onClick={() => onTicketClick(ticketNumber)}
//             className={`w-10 h-10 rounded text-sm font-bold transition-all duration-200 ${getTicketClass(ticketNumber)}`}
//           >
//             {ticketNumber}
//           </button>
//         ))}
//       </div>
//       <div className="mt-4 text-center text-sm text-gray-400">
//         <span className="text-orange-500">● My Tickets</span> &nbsp;&nbsp;
//         <span className="text-gray-500">● Sold</span> &nbsp;&nbsp;
//         <span className="text-yellow-500">● Winners</span> &nbsp;&nbsp;
//         <span className="text-gray-600">● Available</span>
//       </div>
//     </div>
//   );
// };

// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [sponsorAddress, setSponsorAddress] = useState('');
//   const [purchaseRoundId, setPurchaseRoundId] = useState(1);
//   const [numTickets, setNumTickets] = useState(1);
//   const [claimRoundId, setClaimRoundId] = useState(1);

//   const {
//     address,
//     isConnected,
//     loading,
//     notification,
//     bnbBalance,
//     usdtBalance,
//     dashboardData,
//     registerUser,
//     purchaseTickets,
//     claimPrize,
//     claimAllPrizes,
//     formatAddress,
//     setNotification,
//   } = useWallet();

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleTicketClick = (ticketNumber: number) => {
//     console.log(`Clicked ticket: ${ticketNumber}`);
//     // Could show ticket details or other actions
//   };

//   const handleRegister = async () => {
//     await registerUser(sponsorAddress || '0x0000000000000000000000000000000000000000');
//   };

//   const handlePurchase = async () => {
//     await purchaseTickets(numTickets);
//   };

//   const handleClaim = async (ticketNumber?: number) => {
//     if (ticketNumber) {
//       await claimPrize(ticketNumber);
//     } else {
//       await claimAllPrizes();
//     }
//   };

//   const calculateTotalCost = () => {
//     const ticketPrice = parseFloat(dashboardData.ticketPrice) || 1;
//     return (ticketPrice * numTickets).toFixed(4);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
//       {/* Loading Spinner */}
//       {loading && <LoadingSpinner />}
      
//       {/* Notification */}
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       {/* Mobile Toggle Button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-40 bg-gray-800 text-white p-2 rounded-lg"
//         onClick={toggleSidebar}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <Sidebar 
//         isOpen={sidebarOpen} 
//         toggleSidebar={toggleSidebar}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       {/* Main Content */}
//       <div className="md:ml-64 min-h-screen">
//         {/* Header */}
//         <header className="bg-gray-950 border-b border-gray-800 p-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-white">🎰 CRYPTO LOTTERY</h1>
//             <div className="flex items-center gap-4">
//               {isConnected && (
//                 <div className="text-sm text-gray-300">
//                   <div>BNB: {bnbBalance}</div>
//                   <div>USDT: {usdtBalance}</div>
//                   <div>{formatAddress(address)}</div>
//                 </div>
//               )}
//               <ConnectButton />
//             </div>
//           </div>
//         </header>

//         {/* Content Sections */}
//         <main className="p-6">
//           {/* Dashboard Section */}
//           {activeSection === 'dashboard' && (
//             <section>
//               <h2 className="text-3xl font-bold text-white mb-6">🏠 Dashboard</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 <StatCard
//                   icon="🎲"
//                   title="Current Round"
//                   value={dashboardData.currentRound}
//                   subtitle="Active lottery round"
//                 />
//                 <StatCard
//                   icon="🎫"
//                   title="Total Tickets"
//                   value={dashboardData.totalTickets}
//                   subtitle="Available in current round"
//                 />
//                 <StatCard
//                   icon="💸"
//                   title="Tickets Sold"
//                   value={dashboardData.ticketsSold}
//                   subtitle={`${dashboardData.totalTickets - dashboardData.ticketsSold} remaining`}
//                 />
//                 <StatCard
//                   icon="💰"
//                   title="Prize Pool"
//                   value={`${dashboardData.prizePool} USDT`}
//                   subtitle="Total prizes"
//                 />
//                 <StatCard
//                   icon="💳"
//                   title="Ticket Price"
//                   value={`${dashboardData.ticketPrice} USDT`}
//                   subtitle="Per ticket"
//                 />
//                 <StatCard
//                   icon="🎯"
//                   title="My Tickets"
//                   value={dashboardData.myTicketsCount}
//                   subtitle="In current round"
//                 />
//                 <StatCard
//                   icon="🏆"
//                   title="Draw Status"
//                   value={dashboardData.drawExecuted ? "Complete" : "Pending"}
//                   subtitle="Current round status"
//                 />
//                 <StatCard
//                   icon="📊"
//                   title="Registration"
//                   value={dashboardData.isRegistered ? "✅ Active" : "❌ Required"}
//                   subtitle={dashboardData.isRegistered ? "You're registered" : "Please register"}
//                 />
//               </div>

//               {/* Tickets Visualization */}
//               {dashboardData.totalTickets > 0 && (
//                 <TicketGrid
//                   totalTickets={dashboardData.totalTickets}
//                   myTickets={dashboardData.myTickets}
//                   soldTickets={Array.from({ length: dashboardData.ticketsSold }, (_, i) => i + 1)}
//                   winnerTickets={dashboardData.drawExecuted ? [dashboardData.winningNumber] : []}
//                   onTicketClick={handleTicketClick}
//                 />
//               )}
//             </section>
//           )}

//           {/* Registration Section */}
//           {activeSection === 'registration' && (
//             <section>
//               <h2 className="text-3xl font-bold text-white mb-6">📝 User Registration</h2>
//               <div className="max-w-2xl">
//                 <div className="bg-gray-800 p-6 rounded-lg mb-6">
//                   <div className="mb-4">
//                     <label className="block text-gray-300 mb-2">Sponsor Address (Optional)</label>
//                     <input
//                       type="text"
//                       placeholder="Sponsor address (optional)"
//                       value={sponsorAddress}
//                       onChange={(e) => setSponsorAddress(e.target.value)}
//                       className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
//                     />
//                   </div>
//                   <div className="flex gap-4">
//                     <button
//                       onClick={handleRegister}
//                       disabled={!isConnected || loading}
//                       className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300"
//                     >
//                       Register
//                     </button>
//                   </div>
//                 </div>

//                 {/* User Information */}
//                 {dashboardData.isRegistered && dashboardData.userInfo && (
//                   <div className="bg-gray-800 p-6 rounded-lg">
//                     <h3 className="text-orange-500 text-xl mb-4">📊 User Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-gray-300 mb-1">Registration Status</label>
//                         <div className="p-3 bg-gray-700 rounded text-green-400">✅ Registered</div>
//                       </div>
//                       <div>
//                         <label className="block text-gray-300 mb-1">Sponsor</label>
//                         <div className="p-3 bg-gray-700 rounded text-white">{formatAddress(dashboardData.userInfo.sponsor)}</div>
//                       </div>
//                       <div>
//                         <label className="block text-gray-300 mb-1">Total Tickets Purchased</label>
//                         <div className="p-3 bg-gray-700 rounded text-white">{dashboardData.userInfo.totalTicketsPurchased}</div>
//                       </div>
//                       {/* <div>
//                         <label className="block text-gray-300 mb-1">Total Spent</label>
//                         <div className="p-3 bg-gray-700 rounded text-white">{dashboardData.userInfo.totalSpent} USDT</div>
//                       </div> */}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </section>
//           )}

//           {/* Purchase Section */}
//           {activeSection === 'purchase' && (
//             <section>
//               <h2 className="text-3xl font-bold text-white mb-6">🎫 Purchase Tickets</h2>
//               <div className="max-w-2xl bg-gray-800 p-6 rounded-lg">
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2">Round ID</label>
//                   <input
//                     type="number"
//                     value={purchaseRoundId}
//                     onChange={(e) => setPurchaseRoundId(Number(e.target.value))}
//                     min="1"
//                     className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2">Number of Tickets (1-10)</label>
//                   <input
//                     type="number"
//                     value={numTickets}
//                     onChange={(e) => setNumTickets(Math.min(10, Math.max(1, Number(e.target.value))))}
//                     min="1"
//                     max="10"
//                     className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-gray-300 mb-2">Total Cost</label>
//                   <div className="p-3 bg-gray-700 rounded text-white font-bold">{calculateTotalCost()} USDT</div>
//                 </div>
//                 <button
//                   onClick={handlePurchase}
//                   disabled={!isConnected || !dashboardData.isRegistered || loading}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Purchase Tickets
//                 </button>
//                 {!dashboardData.isRegistered && (
//                   <p className="text-yellow-500 mt-2">Please register first before purchasing tickets.</p>
//                 )}
//               </div>
//             </section>
//           )}

//           {/* My Tickets Section */}
//           {activeSection === 'my-tickets' && (
//             <section>
//               <h2 className="text-3xl font-bold text-white mb-6">🎯 My Tickets</h2>
//               <div className="max-w-4xl">
//                 <div className="bg-gray-800 p-6 rounded-lg mb-6">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                     <StatCard
//                       icon="🎫"
//                       title="Current Round Tickets"
//                       value={dashboardData.myTicketsCount}
//                       subtitle="Your tickets in current round"
//                     />
//                   </div>
                  
//                   {dashboardData.myTickets.length > 0 && (
//                     <div>
//                       <h3 className="text-lg font-medium text-white mb-4">Your Ticket Numbers:</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {dashboardData.myTickets.map((ticketNumber) => (
//                           <div
//                             key={ticketNumber}
//                             className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold"
//                           >
//                             #{ticketNumber}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Claim Section */}
//           {activeSection === 'claim' && (
//             <section>
//               <h2 className="text-3xl font-bold text-white mb-6">💰 Claim Prizes</h2>
//               <div className="max-w-2xl bg-gray-800 p-6 rounded-lg">
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2">Round ID</label>
//                   <input
//                     type="number"
//                     value={claimRoundId}
//                     onChange={(e) => setClaimRoundId(Number(e.target.value))}
//                     min="1"
//                     className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
//                   />
//                 </div>
                
//                 {dashboardData.myTickets.length > 0 && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium text-white mb-4">Claimable Tickets:</h3>
//                     <div className="grid grid-cols-5 gap-2">
//                       {dashboardData.myTickets.map((ticketNumber) => (
//                         <button
//                           key={ticketNumber}
//                           onClick={() => handleClaim(ticketNumber)}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-bold transition-colors"
//                         >
//                           #{ticketNumber}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="text-sm text-gray-400">
//                   Click on a ticket number to claim its prize (if any). Only winning tickets will have claimable prizes.
//                 </div>
//               </div>
//             </section>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
