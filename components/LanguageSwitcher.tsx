'use client';

import { useEffect, useState } from "react";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
    var googleTranslateElement: any;
    var lastDetectedLanguage: string;
  }
  
  interface Window {
    googleTranslateElement: any;
    lastDetectedLanguage: string;
  }
}

// Helper function to parse cookies
function parseCookies() {
  if (typeof document === 'undefined') return {};
  return document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

// Helper function to set cookies
function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Helper function to get current language from Google Translate cookie
function getCurrentLanguageFromCookie() {
  const cookies = parseCookies();
  const cookieVal = cookies[COOKIE_NAME];
  let lang = "";

  if (cookieVal) {
    const parts = cookieVal.split("/");
    if (parts.length === 3) {
      lang = parts[2];
    }
  }

  if (global.__GOOGLE_TRANSLATION_CONFIG__ && !lang) {
    lang = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
  }

  return lang;
}

export const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const updateLanguageFromCookie = () => {
      const lang = getCurrentLanguageFromCookie();
      if (lang !== currentLanguage) {
        setIsSyncing(true);
        setCurrentLanguage(lang);
        // Clear syncing indicator after a short delay
        setTimeout(() => setIsSyncing(false), 500);
      }
    };

    // Initial setup
    updateLanguageFromCookie();
    setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);

    // Listen for Google Translate changes via custom event
    const handleGoogleTranslateChange = (event: CustomEvent) => {
      setIsSyncing(true);
      setCurrentLanguage(event.detail.language);
      setTimeout(() => setIsSyncing(false), 500);
    };

    // Listen for the custom event from translation.js
    window.addEventListener('googleTranslateChanged', handleGoogleTranslateChange as EventListener);

    // Watch for DOM changes that might indicate Google Translate updates
    const observer = new MutationObserver(() => {
      // Check if the language has changed after DOM mutations
      setTimeout(() => {
        const newLang = getCurrentLanguageFromCookie();
        if (newLang !== currentLanguage) {
          setIsSyncing(true);
          setCurrentLanguage(newLang);
          setTimeout(() => setIsSyncing(false), 500);
        }
      }, 100);
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Also check for changes periodically as fallback
    const checkForGoogleTranslateChanges = () => {
      const newLang = getCurrentLanguageFromCookie();
      if (newLang !== currentLanguage) {
        setIsSyncing(true);
        setCurrentLanguage(newLang);
        setTimeout(() => setIsSyncing(false), 500);
      }
    };

    const interval = setInterval(checkForGoogleTranslateChanges, 2000);

    return () => {
      window.removeEventListener('googleTranslateChanged', handleGoogleTranslateChange as EventListener);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [currentLanguage]);

  if (!currentLanguage || !languageConfig) return null;

  const switchLanguage = (lang: string) => () => {
    setIsSyncing(true);
    setCookie(COOKIE_NAME, `/auto/${lang}`);
    window.location.reload();
  };

  const getCurrentLanguageTitle = () => {
    const currentLang = languageConfig.languages.find((ld: LanguageDescriptor) => ld.name === currentLanguage);
    return currentLang ? currentLang.title : 'Language';
  };

  return (
    <div className="relative notranslate">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 border border-gray-600 hover:border-gray-500 ${
          isSyncing ? 'animate-pulse' : ''
        }`}
        disabled={isSyncing}
      >
        <span className="text-lg">🌐</span>
        <span className="text-sm font-medium">{getCurrentLanguageTitle()}</span>
        {isSyncing && (
          <span className="text-xs text-orange-400">🔄</span>
        )}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
          <div className="py-2">
            {languageConfig.languages.map((ld: LanguageDescriptor) => (
              <button
                key={ld.name}
                onClick={() => {
                  switchLanguage(ld.name)();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-150 flex items-center gap-2 ${
                  currentLanguage === ld.name 
                    ? 'text-orange-400 bg-gray-800 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {currentLanguage === ld.name && (
                  <span className="text-orange-400">✓</span>
                )}
                <span className={currentLanguage === ld.name ? 'ml-2' : 'ml-6'}>
                  {ld.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}; 