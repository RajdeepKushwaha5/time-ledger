// Grid Layout Options
export const GRID_LAYOUTS = {
  circles: {
    name: 'Circles',
    icon: '●',
    borderRadius: '50%',
  },
  squares: {
    name: 'Squares',
    icon: '■',
    borderRadius: '15%',
  },
  rounded: {
    name: 'Rounded',
    icon: '▢',
    borderRadius: '25%',
  },
  dots: {
    name: 'Dots',
    icon: '•',
    borderRadius: '50%',
    scale: 0.6,
  },
};

// Font Options
export const FONT_OPTIONS = {
  inter: {
    name: 'Inter',
    family: "'Inter', system-ui, sans-serif",
    style: 'Modern',
  },
  system: {
    name: 'System',
    family: "system-ui, -apple-system, sans-serif",
    style: 'Native',
  },
  mono: {
    name: 'Mono',
    family: "'SF Mono', 'Fira Code', monospace",
    style: 'Technical',
  },
  serif: {
    name: 'Serif',
    family: "'Georgia', 'Times New Roman', serif",
    style: 'Classic',
  },
};

// Color Themes
export const COLOR_THEMES = {
  minimal: {
    name: 'Minimal',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#FFFFFF',
    accent: '#FFFFFF',
  },
  ocean: {
    name: 'Ocean',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#0EA5E9',
    accent: '#0EA5E9',
  },
  forest: {
    name: 'Forest',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#22C55E',
    accent: '#22C55E',
  },
  sunset: {
    name: 'Sunset',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#F97316',
    accent: '#F97316',
  },
  rose: {
    name: 'Rose',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#F43F5E',
    accent: '#F43F5E',
  },
  purple: {
    name: 'Purple',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#A855F7',
    accent: '#A855F7',
  },
  gold: {
    name: 'Gold',
    lived: '#FFFFFF',
    remaining: '#1C1C1E',
    current: '#EAB308',
    accent: '#EAB308',
  },
};

// Default configuration
export const DEFAULT_CONFIG = {
  gridLayout: 'circles',
  font: 'inter',
  colorTheme: 'minimal',
  showQuotes: true,
  showStreak: true,
};
