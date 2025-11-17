/**
 * Paleta de cores e gradientes centralizados da aplicação
 */

export const AppColors = {
  // Background colors
  background: {
    primary: '#020617',    // slate-950
    secondary: '#0f172a',  // slate-900
    tertiary: '#1e1b4b',   // indigo-950
    card: '#1e293b',       // slate-800
  },

  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#e2e8f0',  // slate-200
    tertiary: '#cbd5e1',   // slate-300
    muted: '#64748b',      // slate-500
    disabled: '#475569',   // slate-600
  },

  // Brand colors
  brand: {
    primary: '#3b82f6',    // blue-500
    secondary: '#4f46e5',  // indigo-600
    accent: '#8b5cf6',     // violet-500
    purple: '#a855f7',     // purple-500
    pink: '#db2777',       // pink-600
  },

  // Status colors
  status: {
    pending: {
      main: '#f59e0b',     // amber-500
      light: '#fbbf24',    // amber-400
      dark: '#d97706',     // amber-600
      bg: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.5)',
    },
    delivered: {
      main: '#10b981',     // emerald-500
      light: '#34d399',    // emerald-400
      dark: '#059669',     // emerald-600
      bg: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.5)',
    },
    late: {
      main: '#ef4444',     // red-500
      light: '#f87171',    // red-400
      dark: '#dc2626',     // red-600
      bg: 'rgba(239, 68, 68, 0.2)',
      border: 'rgba(239, 68, 68, 0.5)',
    },
  },

  // Functional colors
  error: '#ef4444',        // red-500
  success: '#10b981',      // emerald-500
  warning: '#f59e0b',      // amber-500
  info: '#3b82f6',         // blue-500

  // Border colors
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',
    secondary: '#334155',  // slate-700
    active: '#4f46e5',     // indigo-600
  },

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Gradients = {
  // Primary gradients
  primary: ['#3b82f6', '#4f46e5', '#7c3aed'],
  primaryHorizontal: ['#3b82f6', '#4f46e5', '#a855f7'],
  
  // Background gradients
  background: ['#020617', '#0f172a', '#020617'],
  backgroundAlt: ['#020617', '#0f172a', '#1e1b4b'],
  
  // Header gradient
  header: ['#4f46e5', '#9333ea', '#db2777'],
  
  // Button gradients
  button: {
    primary: ['#3b82f6', '#4f46e5', '#7c3aed'],
    success: ['#10b981', '#059669', '#10b981'],
    danger: ['#f43f5e', '#dc2626'],
    warning: ['#f59e0b', '#ea580c'],
  },
  
  // Icon gradients
  icon: {
    indigo: ['#6366f1', '#9333ea'],
    purple: ['#a855f7', '#db2777'],
    emerald: ['#10b981', '#16a34a'],
    amber: ['#f59e0b', '#ea580c'],
    blue: ['#3b82f6', '#8b5cf6'],
  },
  
  // Status gradients
  status: {
    pending: ['#fde047', '#f97316'],
    delivered: ['#34d399', '#10b981'],
    late: ['#fca5a5', '#ef4444'],
  },
  
  // Card gradients
  card: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'],
  cardAlt: ['rgba(99, 102, 241, 0.05)', 'rgba(168, 85, 247, 0.05)'],
  
  // Overlay gradients
  overlay: ['rgba(255, 255, 255, 0.15)', 'transparent'],
};

export const ShadowColors = {
  indigo: '#4f46e5',
  emerald: '#10b981',
  amber: '#f97316',
  rose: '#ef4444',
  gray: '#6b7280',
  blue: '#3b82f6',
};

