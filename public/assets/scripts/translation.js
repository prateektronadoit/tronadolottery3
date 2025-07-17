function TranslateInit() {
  if (!window.__GOOGLE_TRANSLATION_CONFIG__) return;
 
  try {
    const translateElement = new google.translate.TranslateElement({
      pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
      includedLanguages: window.__GOOGLE_TRANSLATION_CONFIG__.languages.map(lang => lang.name).join(','),
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    });

    // Store the translate element globally for access
    window.googleTranslateElement = translateElement;

    // Initialize the last detected language
    window.lastDetectedLanguage = getCurrentLanguageFromCookie();

    // Listen for translation changes
    if (window.googleTranslateElement) {
      // Check for language changes periodically
      setInterval(() => {
        try {
          const currentLang = getCurrentLanguageFromCookie();
          if (window.lastDetectedLanguage !== currentLang) {
            window.lastDetectedLanguage = currentLang;
            // Dispatch a custom event that components can listen to
            window.dispatchEvent(new CustomEvent('googleTranslateChanged', {
              detail: { language: currentLang }
            }));
          }
        } catch (error) {
          console.warn('Error checking Google Translate language:', error);
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Error initializing Google Translate:', error);
  }
}

// Helper function to get current language from cookie
function getCurrentLanguageFromCookie() {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    
    const cookieVal = cookies['googtrans'];
    let lang = "";

    if (cookieVal) {
      const parts = cookieVal.split("/");
      if (parts.length === 3) {
        lang = parts[2];
      }
    }

    if (window.__GOOGLE_TRANSLATION_CONFIG__ && !lang) {
      lang = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    return lang;
  } catch (error) {
    console.warn('Error getting language from cookie:', error);
    return window.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage || 'en';
  }
} 