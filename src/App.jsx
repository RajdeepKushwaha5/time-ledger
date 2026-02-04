import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { cn } from './lib/utils';
import { GRID_LAYOUTS, FONT_OPTIONS, COLOR_THEMES } from './lib/config';

// ============ DEVICE DATABASE ============
const DEVICES = {
  // iPhone 16 Series
  'iphone-16-pro-max': { name: 'iPhone 16 Pro Max', width: 1320, height: 2868, os: 'ios' },
  'iphone-16-pro': { name: 'iPhone 16 Pro', width: 1206, height: 2622, os: 'ios' },
  'iphone-16-plus': { name: 'iPhone 16 Plus', width: 1290, height: 2796, os: 'ios' },
  'iphone-16': { name: 'iPhone 16', width: 1179, height: 2556, os: 'ios' },
  // iPhone 15 Series
  'iphone-15-pro-max': { name: 'iPhone 15 Pro Max', width: 1290, height: 2796, os: 'ios' },
  'iphone-15-pro': { name: 'iPhone 15 Pro', width: 1179, height: 2556, os: 'ios' },
  'iphone-15-plus': { name: 'iPhone 15 Plus', width: 1290, height: 2796, os: 'ios' },
  'iphone-15': { name: 'iPhone 15', width: 1179, height: 2556, os: 'ios' },
  // iPhone 14 Series
  'iphone-14-pro-max': { name: 'iPhone 14 Pro Max', width: 1290, height: 2796, os: 'ios' },
  'iphone-14-pro': { name: 'iPhone 14 Pro', width: 1179, height: 2556, os: 'ios' },
  'iphone-14-plus': { name: 'iPhone 14 Plus', width: 1284, height: 2778, os: 'ios' },
  'iphone-14': { name: 'iPhone 14', width: 1170, height: 2532, os: 'ios' },
  // iPhone 13 Series
  'iphone-13-pro-max': { name: 'iPhone 13 Pro Max', width: 1284, height: 2778, os: 'ios' },
  'iphone-13-pro': { name: 'iPhone 13 Pro', width: 1170, height: 2532, os: 'ios' },
  'iphone-13': { name: 'iPhone 13', width: 1170, height: 2532, os: 'ios' },
  'iphone-13-mini': { name: 'iPhone 13 Mini', width: 1080, height: 2340, os: 'ios' },
  // iPhone 12 Series
  'iphone-12-pro-max': { name: 'iPhone 12 Pro Max', width: 1284, height: 2778, os: 'ios' },
  'iphone-12-pro': { name: 'iPhone 12 Pro', width: 1170, height: 2532, os: 'ios' },
  'iphone-12': { name: 'iPhone 12', width: 1170, height: 2532, os: 'ios' },
  'iphone-12-mini': { name: 'iPhone 12 Mini', width: 1080, height: 2340, os: 'ios' },
  // iPhone 11 Series
  'iphone-11-pro-max': { name: 'iPhone 11 Pro Max', width: 1242, height: 2688, os: 'ios' },
  'iphone-11-pro': { name: 'iPhone 11 Pro', width: 1125, height: 2436, os: 'ios' },
  'iphone-11': { name: 'iPhone 11', width: 828, height: 1792, os: 'ios' },
  // iPhone SE & Others
  'iphone-se-3': { name: 'iPhone SE (3rd Gen)', width: 750, height: 1334, os: 'ios' },
  'iphone-se-2': { name: 'iPhone SE (2nd Gen)', width: 750, height: 1334, os: 'ios' },
  'iphone-xr': { name: 'iPhone XR', width: 828, height: 1792, os: 'ios' },
  'iphone-xs-max': { name: 'iPhone XS Max', width: 1242, height: 2688, os: 'ios' },
  'iphone-xs': { name: 'iPhone XS', width: 1125, height: 2436, os: 'ios' },
  'iphone-x': { name: 'iPhone X', width: 1125, height: 2436, os: 'ios' },
  // Samsung Galaxy S Series
  'samsung-s24-ultra': { name: 'Samsung Galaxy S24 Ultra', width: 1440, height: 3120, os: 'android' },
  'samsung-s24-plus': { name: 'Samsung Galaxy S24+', width: 1440, height: 3120, os: 'android' },
  'samsung-s24': { name: 'Samsung Galaxy S24', width: 1080, height: 2340, os: 'android' },
  'samsung-s23-ultra': { name: 'Samsung Galaxy S23 Ultra', width: 1440, height: 3088, os: 'android' },
  'samsung-s23-plus': { name: 'Samsung Galaxy S23+', width: 1080, height: 2340, os: 'android' },
  'samsung-s23': { name: 'Samsung Galaxy S23', width: 1080, height: 2340, os: 'android' },
  'samsung-s22-ultra': { name: 'Samsung Galaxy S22 Ultra', width: 1440, height: 3088, os: 'android' },
  'samsung-s22': { name: 'Samsung Galaxy S22', width: 1080, height: 2340, os: 'android' },
  'samsung-s21-ultra': { name: 'Samsung Galaxy S21 Ultra', width: 1440, height: 3200, os: 'android' },
  'samsung-s21': { name: 'Samsung Galaxy S21', width: 1080, height: 2400, os: 'android' },
  // Samsung Galaxy A Series
  'samsung-a54': { name: 'Samsung Galaxy A54', width: 1080, height: 2340, os: 'android' },
  'samsung-a34': { name: 'Samsung Galaxy A34', width: 1080, height: 2340, os: 'android' },
  // Google Pixel
  'pixel-9-pro-xl': { name: 'Google Pixel 9 Pro XL', width: 1344, height: 2992, os: 'android' },
  'pixel-9-pro': { name: 'Google Pixel 9 Pro', width: 1280, height: 2856, os: 'android' },
  'pixel-9': { name: 'Google Pixel 9', width: 1080, height: 2424, os: 'android' },
  'pixel-8-pro': { name: 'Google Pixel 8 Pro', width: 1344, height: 2992, os: 'android' },
  'pixel-8': { name: 'Google Pixel 8', width: 1080, height: 2400, os: 'android' },
  'pixel-7-pro': { name: 'Google Pixel 7 Pro', width: 1440, height: 3120, os: 'android' },
  'pixel-7': { name: 'Google Pixel 7', width: 1080, height: 2400, os: 'android' },
  'pixel-7a': { name: 'Google Pixel 7a', width: 1080, height: 2400, os: 'android' },
  'pixel-6-pro': { name: 'Google Pixel 6 Pro', width: 1440, height: 3120, os: 'android' },
  'pixel-6': { name: 'Google Pixel 6', width: 1080, height: 2400, os: 'android' },
  // OnePlus
  'oneplus-12': { name: 'OnePlus 12', width: 1440, height: 3168, os: 'android' },
  'oneplus-11': { name: 'OnePlus 11', width: 1440, height: 3216, os: 'android' },
  'oneplus-10-pro': { name: 'OnePlus 10 Pro', width: 1440, height: 3216, os: 'android' },
  // Xiaomi
  'xiaomi-14-ultra': { name: 'Xiaomi 14 Ultra', width: 1440, height: 3200, os: 'android' },
  'xiaomi-14': { name: 'Xiaomi 14', width: 1200, height: 2670, os: 'android' },
  'xiaomi-13': { name: 'Xiaomi 13', width: 1080, height: 2400, os: 'android' },
  // Other Android
  'sony-xperia-1-v': { name: 'Sony Xperia 1 V', width: 1644, height: 3840, os: 'android' },
  'nothing-phone-2': { name: 'Nothing Phone (2)', width: 1080, height: 2412, os: 'android' },
  'generic-1080p': { name: 'Generic 1080 x 2400', width: 1080, height: 2400, os: 'android' },
  'generic-1440p': { name: 'Generic 1440 x 3200', width: 1440, height: 3200, os: 'android' },
};

// ============ ICONS ============
const AppleLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const AndroidLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.44-.59-3.04-.92-4.72-.92s-3.28.33-4.72.92L5.15 5.67c-.18-.28-.54-.37-.83-.22-.31.16-.43.54-.27.85L5.89 9.48C2.77 11.25 1 14.19 1 17.5h22c0-3.31-1.77-6.25-4.88-8.02zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
  </svg>
);

const TimeLedgerLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="url(#logo-gradient)"/>
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
        <stop stopColor="#ffffff" stopOpacity="0.15"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    <g fill="#fff">
      <circle cx="10" cy="10" r="2.5"/>
      <circle cx="16" cy="10" r="2.5"/>
      <circle cx="22" cy="10" r="2.5"/>
      <circle cx="10" cy="16" r="2.5"/>
      <circle cx="16" cy="16" r="2.5"/>
      <circle cx="22" cy="16" r="2.5" opacity="0.3"/>
      <circle cx="10" cy="22" r="2.5" opacity="0.3"/>
      <circle cx="16" cy="22" r="2.5" opacity="0.3"/>
      <circle cx="22" cy="22" r="2.5" opacity="0.3"/>
    </g>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ============ MAIN APP ============
export default function App() {
  const [calendarType, setCalendarType] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deviceOS, setDeviceOS] = useState(null);
  const [config, setConfig] = useState(() => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 90);
    return {
      device: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      lifespan: 80,
      goalName: '',
      goalStart: today.toISOString().split('T')[0],
      goalEnd: futureDate.toISOString().split('T')[0],
      // Customization options
      gridLayout: 'circles',
      font: 'inter',
      colorTheme: 'minimal',
      showQuotes: true,
      streak: 0,
    };
  });
  const [copied, setCopied] = useState(false);
  const [deviceSearch, setDeviceSearch] = useState('');

  const handleInstall = (type) => {
    setCalendarType(type);
    setShowDeviceModal(true);
  };

  const handleDeviceSelect = (os) => {
    setDeviceOS(os);
    setShowDeviceModal(false);
    setShowInstallModal(true);
  };

  const closeModals = () => {
    setShowDeviceModal(false);
    setShowInstallModal(false);
    setCalendarType(null);
    setDeviceOS(null);
    setConfig(prev => ({ ...prev, device: '', birthYear: '', birthMonth: '', birthDay: '' }));
    setDeviceSearch('');
  };

  const getWallpaperURL = () => {
    const birth = `${config.birthYear}-${config.birthMonth.padStart(2, '0')}-${config.birthDay.padStart(2, '0')}`;
    const params = new URLSearchParams({
      type: calendarType,
      device: config.device,
      birth: birth,
      lifespan: config.lifespan.toString(),
      goalName: config.goalName,
      goalStart: config.goalStart,
      goalEnd: config.goalEnd,
      headless: 'true',
      // Customization options
      grid: config.gridLayout,
      font: config.font,
      theme: config.colorTheme,
      quotes: config.showQuotes ? 'true' : 'false',
      streak: config.streak.toString(),
    });
    return `${window.location.origin}/wallpaper?${params.toString()}`;
  };

  const isConfigValid = () => {
    if (!config.device) return false;
    if (calendarType === 'life') {
      return config.birthYear && config.birthMonth && config.birthDay;
    }
    if (calendarType === 'goal') {
      return config.goalStart && config.goalEnd;
    }
    if (calendarType === 'multi') {
      return config.birthYear && config.birthMonth && config.birthDay && config.goalStart && config.goalEnd;
    }
    return true;
  };

  const handleCopyURL = async () => {
    if (!isConfigValid()) return;
    await navigator.clipboard.writeText(getWallpaperURL());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredDevices = useMemo(() => {
    const devices = Object.entries(DEVICES).filter(([, d]) => d.os === deviceOS);
    if (!deviceSearch) return devices;
    return devices.filter(([, d]) => 
      d.name.toLowerCase().includes(deviceSearch.toLowerCase())
    );
  }, [deviceOS, deviceSearch]);

  // Generate years, months, days for birthday picker
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============ NAVBAR ============ */}
      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-4">
          <div className="max-w-7xl mx-auto bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/50 rounded-2xl px-4 sm:px-6 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center gap-2.5">
                <TimeLedgerLogo className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">TimeLedger</span>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href="https://www.linkedin.com/in/rajdeepsingh5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/rajdeepsingh5/time-ledger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all"
                  title="GitHub"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ============ HOME PAGE ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-16 lg:pb-24">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6 sm:mb-8">
            <span className="text-white">Your life,</span>
            <br />
            <span className="bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">one glance at a time.</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto px-4 leading-relaxed">
            Turn your lock screen into a daily reminder of time's value.
            <span className="hidden sm:inline"><br /></span>
            <span className="text-zinc-400"> Beautiful calendars that update automatically.</span>
          </p>
        </div>

        {/* Calendar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          <CalendarCard
            title="Life Calendar"
            description="Visualize your life in weeks"
            type="life"
            onClick={() => handleInstall('life')}
          />
          <CalendarCard
            title="Year Calendar"
            description="Track the current year's progress"
            type="year"
            onClick={() => handleInstall('year')}
          />
          <CalendarCard
            title="Goal Calendar"
            description="Count down to your deadline"
            type="goal"
            onClick={() => handleInstall('goal')}
          />
          <CalendarCard
            title="Multi Calendar"
            description="Life + Year + Goal in one view"
            type="multi"
            onClick={() => handleInstall('multi')}
            featured
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-16 sm:mt-24">
        {/* Gradient fade */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col items-center gap-8">
            {/* Logo & Tagline */}
            <div className="flex flex-col items-center gap-3">
              <TimeLedgerLogo className="w-10 h-10 opacity-80" />
              <span className="font-semibold text-lg bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">TimeLedger</span>
              <p className="text-zinc-600 text-sm text-center max-w-xs">Visualize your life, one day at a time.</p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/rajdeepsingh5/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all text-sm"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>@rajdeepsingh5</span>
              </a>
              <a
                href="https://github.com/rajdeepsingh5/time-ledger"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all text-sm"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>Source</span>
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-zinc-700 text-xs">
              © {new Date().getFullYear()} TimeLedger. Made with ♥
            </p>
          </div>
        </div>
      </footer>

      {/* ============ DEVICE SELECTION MODAL ============ */}
      {showDeviceModal && (
        <Modal onClose={closeModals}>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Choose Your Device</h2>
            <p className="text-zinc-400 text-sm sm:text-base mb-8">
              Select your device type to see the installation instructions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleDeviceSelect('ios')}
              className="flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 transition-all"
            >
              <AppleLogo className="w-10 h-10 sm:w-14 sm:h-14" />
              <div>
                <div className="font-bold text-base sm:text-lg">iPhone</div>
                <div className="text-zinc-500 text-xs sm:text-sm">iOS Shortcuts</div>
              </div>
            </button>

            <button
              onClick={() => handleDeviceSelect('android')}
              className="flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 transition-all"
            >
              <AndroidLogo className="w-10 h-10 sm:w-14 sm:h-14" />
              <div>
                <div className="font-bold text-base sm:text-lg">Android</div>
                <div className="text-zinc-500 text-xs sm:text-sm">MacroDroid</div>
              </div>
            </button>
          </div>

          <button
            onClick={closeModals}
            className="w-full text-center text-zinc-500 hover:text-white text-sm font-medium transition-colors"
          >
            Close
          </button>
        </Modal>
      )}

      {/* ============ INSTALLATION MODAL ============ */}
      {showInstallModal && (
        <Modal onClose={closeModals} large>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Installation Steps</h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              First, define your wallpaper settings. Then set up {deviceOS === 'ios' ? 'iOS Shortcuts' : 'MacroDroid'} to automatically update your wallpaper daily.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Step 1: Define Wallpaper */}
            <div>
              <StepHeader number={1} title="Define your Wallpaper" />
              <div className="mt-4 space-y-4">
                {/* Birthday (for Life Calendar) */}
                {calendarType === 'life' && (
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Your Birthday</label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <select
                        value={config.birthYear}
                        onChange={(e) => setConfig({ ...config, birthYear: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                      <select
                        value={config.birthMonth}
                        onChange={(e) => setConfig({ ...config, birthMonth: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Month</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select
                        value={config.birthDay}
                        onChange={(e) => setConfig({ ...config, birthDay: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Day</option>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {/* Goal Config */}
                {calendarType === 'goal' && (
                  <>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Goal Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Product Launch"
                        value={config.goalName}
                        onChange={(e) => setConfig({ ...config, goalName: e.target.value })}
                        className="input-field w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Start Date</label>
                        <input
                          type="date"
                          value={config.goalStart}
                          onChange={(e) => setConfig({ ...config, goalStart: e.target.value })}
                          className="input-field w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">End Date</label>
                        <input
                          type="date"
                          value={config.goalEnd}
                          onChange={(e) => setConfig({ ...config, goalEnd: e.target.value })}
                          className="input-field w-full"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Multi-Calendar Config (needs both life + goal) */}
                {calendarType === 'multi' && (
                  <>
                    <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700">
                      <h4 className="text-sm font-medium text-zinc-300 mb-3">Life Calendar Settings</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={config.birthYear}
                          onChange={(e) => setConfig({ ...config, birthYear: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Year</option>
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <select
                          value={config.birthMonth}
                          onChange={(e) => setConfig({ ...config, birthMonth: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Month</option>
                          {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select
                          value={config.birthDay}
                          onChange={(e) => setConfig({ ...config, birthDay: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Day</option>
                          {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700">
                      <h4 className="text-sm font-medium text-zinc-300 mb-3">Goal Tracker Settings</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Goal name (e.g., Product Launch)"
                          value={config.goalName}
                          onChange={(e) => setConfig({ ...config, goalName: e.target.value })}
                          className="input-field w-full"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={config.goalStart}
                            onChange={(e) => setConfig({ ...config, goalStart: e.target.value })}
                            className="input-field w-full"
                          />
                          <input
                            type="date"
                            value={config.goalEnd}
                            onChange={(e) => setConfig({ ...config, goalEnd: e.target.value })}
                            className="input-field w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Phone Model */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Phone Model</label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search for your phone model..."
                      value={deviceSearch}
                      onChange={(e) => setDeviceSearch(e.target.value)}
                      className="input-field w-full pl-10"
                    />
                  </div>
                  {(deviceSearch || config.device) && (
                    <div className="mt-2 max-h-40 overflow-y-auto rounded-xl bg-zinc-900 border border-zinc-800">
                      {filteredDevices.map(([key, device]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setConfig({ ...config, device: key });
                            setDeviceSearch('');
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors",
                            config.device === key && "bg-zinc-800 text-white"
                          )}
                        >
                          {device.name}
                        </button>
                      ))}
                    </div>
                  )}
                  {config.device && !deviceSearch && (
                    <div className="mt-2 px-4 py-2.5 bg-zinc-900 rounded-xl border border-zinc-700 text-sm">
                      Selected: <span className="font-medium">{DEVICES[config.device]?.name}</span>
                    </div>
                  )}
                </div>

                {/* Customization Options */}
                <div className="pt-4 border-t border-zinc-800">
                  <label className="block text-sm text-zinc-400 mb-3">Customize Appearance</label>
                  
                  {/* Grid Layout */}
                  <div className="mb-4">
                    <label className="block text-xs text-zinc-500 mb-2">Grid Style</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(GRID_LAYOUTS).map(([key, layout]) => (
                        <button
                          key={key}
                          onClick={() => setConfig({ ...config, gridLayout: key })}
                          className={cn(
                            "p-3 rounded-xl border text-center transition-all",
                            config.gridLayout === key
                              ? "bg-white text-black border-white"
                              : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                          )}
                        >
                          <span className="text-lg block mb-1">{layout.icon}</span>
                          <span className="text-xs">{layout.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Selection */}
                  <div className="mb-4">
                    <label className="block text-xs text-zinc-500 mb-2">Font Style</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(FONT_OPTIONS).map(([key, font]) => (
                        <button
                          key={key}
                          onClick={() => setConfig({ ...config, font: key })}
                          className={cn(
                            "p-2 rounded-xl border text-center transition-all",
                            config.font === key
                              ? "bg-white text-black border-white"
                              : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                          )}
                        >
                          <span className="text-xs font-medium">{font.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Theme */}
                  <div className="mb-4">
                    <label className="block text-xs text-zinc-500 mb-2">Color Theme</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(COLOR_THEMES).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => setConfig({ ...config, colorTheme: key })}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                            config.colorTheme === key
                              ? "bg-white text-black border-white"
                              : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                          )}
                          style={{
                            borderColor: config.colorTheme === key ? undefined : theme.current,
                            color: config.colorTheme === key ? undefined : theme.current
                          }}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Options */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.showQuotes}
                        onChange={(e) => setConfig({ ...config, showQuotes: e.target.checked })}
                        className="w-4 h-4 rounded bg-zinc-800 border-zinc-700"
                      />
                      <span className="text-sm text-zinc-300">Daily Quotes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-sm text-zinc-300">Streak:</span>
                      <input
                        type="number"
                        min="0"
                        value={config.streak}
                        onChange={(e) => setConfig({ ...config, streak: parseInt(e.target.value) || 0 })}
                        className="w-16 input-field text-sm px-2 py-1"
                        placeholder="0"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Prerequisites */}
            <div>
              <StepHeader number={2} title="Prerequisites" />
              <div className="mt-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                {deviceOS === 'ios' ? (
                  <p className="text-sm text-zinc-300">
                    Install <a href="https://apps.apple.com/app/shortcuts/id915249334" target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline underline-offset-2">Shortcuts</a> from the App Store (pre-installed on iOS 13+).
                  </p>
                ) : (
                  <p className="text-sm text-zinc-300">
                    Install <a href="https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid" target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline underline-offset-2">MacroDroid</a> from Google Play Store.
                  </p>
                )}
              </div>
            </div>

            {/* Step 3: Setup */}
            <div>
              <StepHeader number={3} title={deviceOS === 'ios' ? 'Setup Shortcut' : 'Setup Macro'} />
              <div className="mt-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                {deviceOS === 'ios' ? (
                  <>
                    <p className="text-sm text-zinc-300">
                      Open <span className="font-semibold text-white">Shortcuts</span> → Tap <span className="font-semibold text-white">+</span> → Name it "TimeLedger"
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Automation:</span> Tap Automation tab → <span className="font-semibold text-white">+</span> → Time of Day → <span className="font-semibold text-white">6:00 AM</span> → Daily
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-zinc-300">
                      Open <span className="font-semibold text-white">MacroDroid</span> → <span className="font-semibold text-white">Add Macro</span>
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Trigger:</span> Date/Time → Day/Time → Set time to <span className="font-semibold text-white">00:01:00</span> → Activate <span className="font-semibold text-white">all weekdays</span>
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Step 4: Configure Actions */}
            <div>
              <StepHeader number={4} title="Configure Actions" />
              <div className="mt-4 space-y-4">
                {/* 4.1 Download Image */}
                <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <h4 className="font-semibold mb-3">4.1 {deviceOS === 'ios' ? 'Open URL' : 'Download Image'}</h4>
                  <ul className="text-sm text-zinc-300 space-y-1.5 list-disc list-inside">
                    {deviceOS === 'ios' ? (
                      <>
                        <li>Add action: Search for <span className="font-semibold text-white">Open URLs</span></li>
                        <li>Paste the URL below into the URL field</li>
                      </>
                    ) : (
                      <>
                        <li>Go to <span className="font-semibold text-white">Web Interactions</span> → <span className="font-semibold text-white">HTTP Request</span></li>
                        <li>Request method: <span className="font-semibold text-white">GET</span></li>
                      </>
                    )}
                  </ul>
                  <div className="mt-3">
                    <label className="block text-xs text-zinc-500 mb-1.5">Paste the URL below:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={isConfigValid() ? getWallpaperURL() : 'Complete step 1 first...'}
                        className="input-field flex-1 text-xs sm:text-sm truncate"
                      />
                      <button
                        onClick={handleCopyURL}
                        disabled={!isConfigValid()}
                        className={cn(
                          "px-3 sm:px-4 rounded-xl font-medium text-sm transition-all flex items-center gap-2",
                          isConfigValid()
                            ? "bg-white text-black hover:bg-zinc-200"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        )}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  {deviceOS === 'android' && (
                    <ul className="text-sm text-zinc-300 space-y-1.5 list-disc list-inside mt-3">
                      <li>Enable: <span className="font-semibold text-white">Block next actions until complete</span></li>
                      <li>Response: Tick <span className="font-semibold text-white">Save HTTP response to file</span></li>
                      <li>Folder & filename: <span className="font-mono text-white">/Download/{calendarType}.png</span></li>
                    </ul>
                  )}
                </div>

                {/* 4.2 Set Wallpaper */}
                <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <h4 className="font-semibold mb-3">4.2 {deviceOS === 'ios' ? 'Wait & Screenshot' : 'Set Wallpaper'}</h4>
                  <ul className="text-sm text-zinc-300 space-y-1.5 list-disc list-inside">
                    {deviceOS === 'ios' ? (
                      <>
                        <li>Add action: <span className="font-semibold text-white">Wait</span> → Set to <span className="font-semibold text-white">3 seconds</span></li>
                        <li>Add action: <span className="font-semibold text-white">Take Screenshot</span></li>
                        <li>Add action: <span className="font-semibold text-white">Set Wallpaper</span> → Screenshot → <span className="font-semibold text-white">Lock Screen</span></li>
                        <li>Toggle OFF <span className="font-semibold text-white">Show Preview</span></li>
                      </>
                    ) : (
                      <>
                        <li>Go to <span className="font-semibold text-white">Device Settings</span> → <span className="font-semibold text-white">Set Wallpaper</span></li>
                        <li>Choose <span className="font-semibold text-white">Image and Screen</span></li>
                        <li>Enter folder & filename: <span className="font-mono text-white">/Download/{calendarType}.png</span></li>
                      </>
                    )}
                  </ul>
                  {deviceOS === 'ios' && (
                    <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-400">
                        <span className="font-semibold">Note:</span> This method opens Safari briefly to capture the wallpaper. It's the most reliable way without a server-side image generator.
                      </p>
                    </div>
                  )}
                  {deviceOS === 'android' && (
                    <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <p className="text-sm text-amber-400">
                        <span className="font-semibold">Important:</span> Use the <span className="font-semibold">exact same folder and filename</span> in both actions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 5: Finalize */}
            <div>
              <StepHeader number={5} title="Finalize" />
              <div className="mt-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                {deviceOS === 'ios' ? (
                  <p className="text-sm text-zinc-300">
                    Give your shortcut a name → Tap <span className="font-semibold text-white">Done</span> → Disable "Ask Before Running" in automation settings.
                  </p>
                ) : (
                  <p className="text-sm text-zinc-300">
                    Give the macro a name → Tap <span className="font-semibold text-white">Create Macro</span>
                  </p>
                )}
              </div>
            </div>

            {/* Testing & Managing */}
            <div>
              <StepHeader number="?" title="Testing & Managing" />
              <div className="mt-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                {deviceOS === 'ios' ? (
                  <>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Test:</span> Open Shortcuts → Select your shortcut → Tap Play
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Stop:</span> Delete the automation from Shortcuts app
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Edit URL:</span> Tap the shortcut → Update the URL → Save
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Test:</span> MacroDroid → Macros → select your macro → More options → <span className="font-semibold text-white">Test macro</span>
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Stop:</span> Toggle off or delete the macro
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Edit URL:</span> Tap the HTTP Request action → Update the URL → Save
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setShowInstallModal(false);
                setShowDeviceModal(true);
              }}
              className="px-6 py-3 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              Back
            </button>
            <button
              onClick={closeModals}
              className="px-6 py-3 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============ COMPONENTS ============

function Modal({ children, onClose, large }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        "relative bg-zinc-950 border border-zinc-800 w-full overflow-y-auto",
        "rounded-t-3xl sm:rounded-2xl",
        "max-h-[90vh]",
        large ? "sm:max-w-2xl" : "sm:max-w-lg",
        "p-6 sm:p-8"
      )}>
        {/* Drag Handle for Mobile */}
        <div className="sm:hidden w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-6" />
        {children}
      </div>
    </div>
  );
}

function CalendarCard({ title, description, type, onClick }) {
  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{title}</h3>
      <p className="text-zinc-500 text-sm mb-4 sm:mb-6">{description}</p>

      {/* Phone Mockup */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-4 sm:mb-6">
        <PhoneMockup type={type} />
      </div>

      {/* Install Button */}
      <button
        onClick={onClick}
        className="w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-2xl transition-all"
      >
        Install
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function PhoneMockup({ type }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', '');
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Generate calendar preview data
  const calendarData = useMemo(() => {
    const currentDate = new Date();
    if (type === 'life') {
      const weeksLived = 35 * 52 + 20; // ~35 years
      const totalWeeks = 80 * 52;
      return { elapsed: weeksLived, total: totalWeeks, columns: 52 };
    }
    if (type === 'year') {
      const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      return { elapsed: dayOfYear, total: 365, columns: 20 };
    }
    // Goal
    return { elapsed: 45, total: 90, columns: 15 };
  }, [type]);

  return (
    <div className="relative bg-zinc-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 border border-zinc-800 shadow-2xl">
      {/* Inner Screen */}
      <div className="relative bg-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
        {/* Status Bar */}
        <div className="absolute top-3 sm:top-4 left-0 right-0 flex justify-between items-center px-6 sm:px-8 text-[8px] sm:text-[10px] text-white/60">
          <span className="font-medium">WOO</span>
          <div className="flex items-center gap-1">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 20.5c4.5 0 8.3-3 9.7-7.2.3-1 .3-2 0-3C20.3 6 16.5 3 12 3S3.7 6 2.3 10.2c-.3 1-.3 2 0 3C3.7 17.5 7.5 20.5 12 20.5z"/>
            </svg>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.48-1.3-.75L4 8.47l-.85-1.48-1.3.75.85 1.48H1v1.5h1.7l-.85 1.48 1.3.75zM19 9.47l.85 1.48 1.3-.75-.85-1.48H22v-1.5h-1.7l.85-1.48-1.3-.75L19 6.47l-.85-1.48-1.3.75.85 1.48H16v1.5h1.7l-.85 1.48 1.3.75.85-1.48z"/>
            </svg>
            <div className="w-5 h-2.5 sm:w-6 sm:h-3 bg-white/60 rounded-sm" />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-black rounded-full border border-zinc-800" />

        {/* Date & Time */}
        <div className="absolute top-12 sm:top-16 left-0 right-0 text-center">
          <div className="text-[10px] sm:text-xs text-zinc-400 font-medium mb-0.5">{dateStr}</div>
          <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{timeStr.slice(0, -2)}</div>
        </div>

        {/* Calendar Grid */}
        <div className="absolute top-28 sm:top-36 left-0 right-0 px-4 sm:px-6">
          <div
            className="grid gap-[2px] sm:gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${calendarData.columns}, 1fr)` }}
          >
            {Array.from({ length: Math.min(calendarData.total, type === 'life' ? 600 : 200) }, (_, i) => {
              const isLived = i < (calendarData.elapsed * (type === 'life' ? 600 : 200) / calendarData.total);
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-full",
                    isLived ? "bg-white" : "bg-zinc-800"
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom UI */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-between items-end px-4 sm:px-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-800 border border-zinc-700" />
          <div className="text-center">
            <div className="text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">TimeLedger</div>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
}

function StepHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white text-black rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
    </div>
  );
}
