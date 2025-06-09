'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAccount, useChainId, useDisconnect } from 'wagmi';

// Chain ID to name mapping
const CHAIN_NAMES: { [key: number]: string } = {
  1: 'Ethereum',
  137: 'Polygon',
  42161: 'Arbitrum',
  10: 'Optimism',
  8453: 'Base',
  56: 'BSC',
  43114: 'Avalanche',
  250: 'Fantom',
  324: 'zkSync',
  59144: 'Linea',
  534352: 'Scroll',
  1101: 'Polygon zkEVM',
  5000: 'Mantle',
  42220: 'Celo',
  100: 'Gnosis',
  // Testnets
  11155111: 'Sepolia',
  5: 'Goerli',
  80001: 'Mumbai',
  421613: 'Arbitrum Goerli',
  420: 'Optimism Goerli',
  84531: 'Base Goerli',
};

// Chain ID to explorer mapping
const CHAIN_EXPLORERS: { [key: number]: string } = {
  1: 'https://etherscan.io',
  137: 'https://polygonscan.com',
  42161: 'https://arbiscan.io',
  10: 'https://optimistic.etherscan.io',
  8453: 'https://basescan.org',
  56: 'https://bscscan.com',
  43114: 'https://snowtrace.io',
  250: 'https://ftmscan.com',
  324: 'https://explorer.zksync.io',
  59144: 'https://lineascan.build',
  534352: 'https://scrollscan.com',
  1101: 'https://zkevm.polygonscan.com',
  5000: 'https://explorer.mantle.xyz',
  42220: 'https://explorer.celo.org',
  100: 'https://gnosisscan.io',
  // Testnets
  11155111: 'https://sepolia.etherscan.io',
  5: 'https://goerli.etherscan.io',
  80001: 'https://mumbai.polygonscan.com',
  421613: 'https://goerli.arbiscan.io',
  420: 'https://goerli-optimism.etherscan.io',
  84531: 'https://goerli.basescan.org',
};

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [authSuccess, setAuthSuccess] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Password validation logic
  const passwordRequirements = [
    {
      label: 'At least 8 characters',
      test: (pw: string) => pw.length >= 8,
    },
    {
      label: 'One uppercase letter',
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: 'One lowercase letter',
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: 'One special character',
      test: (pw: string) => /[\W_]/.test(pw),
    },
    {
      label: 'One digit',
      test: (pw: string) => /\d/.test(pw),
    },
  ];
  const isPasswordValid = passwordRequirements.every(r => r.test(password));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      fullname: formData.get('fullname'),
      referenceId: formData.get('referenceId'),
      walletAddress: address,
      chainId,
      chainName: CHAIN_NAMES[chainId] || 'Unknown',
    };

    try {
      if (showSignUp) {
        // Registration (no wallet connection required)
        const response = await fetch('http://3.108.64.157:3000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            fullname: data.fullname,
            referenceId: data.referenceId,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Registration failed');
        }

        // Registration successful
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('fullname', data.fullname as string);
        setShowSignUp(false);
        setAuthSuccess(true);
        router.push('/home');
      } else {
        // Login
        const response = await fetch('http://3.108.64.157:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Login failed');
        }

        // Store the token
        localStorage.setItem('token', result.access_token);

        // Redirect to homepage
        setAuthSuccess(true);
        router.push('/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthSuccess(false);
    setShowSignUp(true);
    setProfileMenuOpen(false);
    disconnect();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Cross (close) button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold focus:outline-none z-20"
        onClick={() => router.push('/home')}
        aria-label="Close"
      >
        &times;
      </button>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/Logo.png"
            alt="Tronado Logo"
            width={150}
            height={75}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            {showSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>

        {/* If authenticated, show profile icon with dropdown */}
        {authSuccess ? (
          <div className="flex flex-col items-center space-y-4 mt-8">
            <div className="relative">
              <button
                className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center focus:outline-none border-2 border-[var(--tronado-gold)]"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-label="Profile"
              >
                {/* Simple user icon SVG */}
                <svg className="w-7 h-7 text-[var(--tronado-gold)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-30 py-2">
                  {isConnected ? (
                    <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-800">
                      <span className="block font-mono truncate">{address}</span>
                    </div>
                  ) : (
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                      onClick={() => { setProfileMenuOpen(false); }}
                    >
                      Connect Wallet
                    </button>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Toggle buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowSignUp(true)}
                className={`px-4 py-2 rounded-lg ${
                  showSignUp
                    ? 'bg-[var(--tronado-gold)] text-black'
                    : 'bg-gray-700 text-white'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setShowSignUp(false)}
                className={`px-4 py-2 rounded-lg ${
                  !showSignUp
                    ? 'bg-[var(--tronado-gold)] text-black'
                    : 'bg-gray-700 text-white'
                }`}
              >
                Sign In
              </button>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-center font-medium">{error}</div>
              )}

              <div className="rounded-md shadow-sm space-y-4">
                {showSignUp && (
                  <>
                    <div>
                      <label htmlFor="fullname" className="sr-only">
                        Full Name
                      </label>
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        required={showSignUp}
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-[var(--tronado-gold)] focus:border-[var(--tronado-gold)]"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="referenceId" className="sr-only">
                        Reference ID
                      </label>
                      <input
                        id="referenceId"
                        name="referenceId"
                        type="text"
                        required={showSignUp}
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-[var(--tronado-gold)] focus:border-[var(--tronado-gold)]"
                        placeholder="Reference ID"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-[var(--tronado-gold)] focus:border-[var(--tronado-gold)]"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-[var(--tronado-gold)] focus:border-[var(--tronado-gold)]"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    ref={passwordRef}
                  />
                  {/* Password requirements box */}
                  {showSignUp && passwordFocused && (
                    <div className="mt-2 p-3 rounded-lg bg-gray-800 border border-[var(--tronado-gold)] text-sm text-white shadow-lg animate-fade-in">
                      <div className="font-semibold mb-1 text-[var(--tronado-gold)]">Password must contain:</div>
                      <ul className="space-y-1">
                        {passwordRequirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className={`inline-block w-4 h-4 rounded-full border-2 ${req.test(password) ? 'bg-green-500 border-green-500' : 'bg-gray-700 border-gray-500'}`}></span>
                            {req.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {showSignUp && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    {isConnected && address && (
                      <div className="text-center text-sm text-gray-400">
                        <p>Connected Wallet:</p>
                        <p className="font-mono">{address}</p>
                        <p className="mt-1">
                          Network: {CHAIN_NAMES[chainId] || 'Unknown'} ({chainId})
                        </p>
                        {CHAIN_EXPLORERS[chainId] && (
                          <a
                            href={`${CHAIN_EXPLORERS[chainId]}/address/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--tronado-gold)] hover:text-[var(--tronado-gold-hover)] mt-2 inline-block"
                          >
                            View on Explorer
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading || (showSignUp && !isPasswordValid)}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[var(--tronado-gold)] hover:bg-[var(--tronado-gold-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--tronado-gold)] disabled:opacity-60"
                >
                  {loading
                    ? showSignUp
                      ? 'Creating account...'
                      : 'Signing in...'
                    : showSignUp
                    ? 'Sign up'
                    : 'Sign in'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 