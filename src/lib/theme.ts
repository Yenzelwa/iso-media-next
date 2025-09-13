/**
 * Centralized Theme Configuration
 * All theme colors and styles managed in one place
 */

export const siteTheme = {
  // Main background gradient for pages
  background: {
    main: "bg-gradient-to-b from-black via-gray-900 to-black",
   // main:"bg-neutral",
    // For components that need the actual CSS values
    mainCSS: "linear-gradient(to bottom, #000000, #1f2937, #000000)",
  },
  
  // Primary brand colors
  colors: {
    primary: {
      red: {
        50: "red-50",
        100: "red-100", 
        200: "red-200",
        300: "red-300",
        400: "red-400",
        500: "red-500",
        600: "red-600", // Main brand red
        700: "red-700",
        800: "red-800",
        900: "red-900",
      }
    },
    
    // Neutral colors for consistent grays
    neutral: {
      50: "gray-50",
      100: "gray-100",
      200: "gray-200",
      300: "gray-300",
      400: "gray-400",
      500: "gray-500",
      600: "gray-600",
      700: "gray-700",
      800: "gray-800",
      900: "gray-900",
    }
  },

  // Common gradient combinations
  gradients: {
    primary: "bg-gradient-to-r from-red-600 to-red-700",
    primaryHover: "bg-gradient-to-r from-red-700 to-red-800",
    subtle: "bg-gradient-to-r from-red-600/20 to-red-800/10",
    card: "bg-gradient-to-br from-gray-900/95 to-slate-900/95",
    overlay: "bg-black/50",
  },

  // Text colors
  text: {
    primary: "text-white",
    secondary: "text-gray-400", 
    muted: "text-gray-500",
    accent: "text-red-400",
    accentHover: "text-red-300",
  },

  // Border colors
  borders: {
    default: "border-gray-700/50",
    accent: "border-red-500/30",
    accentHover: "border-red-500/50",
  }
} as const;

// Tailwind class generators
export const themeClasses = {
  // Page background
  pageBackground: () => siteTheme.background.main,
  
  // Button styles
  primaryButton: () => `${siteTheme.gradients.primary} hover:${siteTheme.gradients.primaryHover.replace('bg-gradient-to-r', '')} ${siteTheme.text.primary}`,
  
  // Card backgrounds
  cardBackground: () => `${siteTheme.gradients.card} backdrop-blur-xl ${siteTheme.borders.default}`,
  
  // Modal/popup backgrounds
  modalOverlay: () => `${siteTheme.gradients.overlay} backdrop-blur-sm`,
  modalContent: () => `${siteTheme.gradients.card} backdrop-blur-xl rounded-3xl ${siteTheme.borders.default} shadow-2xl`,
} as const;