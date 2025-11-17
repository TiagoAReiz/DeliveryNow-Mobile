/**
 * Configurações de gradientes com tipos para LinearGradient
 */

export interface GradientConfig {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export const GradientConfigs = {
  // Primary button gradient
  primaryButton: {
    colors: ['#3b82f6', '#4f46e5', '#7c3aed'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  } as GradientConfig,

  // Success button gradient
  successButton: {
    colors: ['#10b981', '#059669', '#10b981'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  } as GradientConfig,

  // Background gradients
  background: {
    colors: ['#020617', '#0f172a', '#020617'],
  } as GradientConfig,

  backgroundAlt: {
    colors: ['#020617', '#0f172a', '#1e1b4b'],
  } as GradientConfig,

  // Header gradient
  header: {
    colors: ['#4f46e5', '#9333ea', '#db2777'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  } as GradientConfig,

  // Icon gradients
  iconIndigo: {
    colors: ['#6366f1', '#9333ea'],
  } as GradientConfig,

  iconPurple: {
    colors: ['#a855f7', '#db2777'],
  } as GradientConfig,

  iconEmerald: {
    colors: ['#10b981', '#16a34a'],
  } as GradientConfig,

  iconAmber: {
    colors: ['#f59e0b', '#ea580c'],
  } as GradientConfig,

  iconBlue: {
    colors: ['#3b82f6', '#8b5cf6'],
  } as GradientConfig,

  // Status badge gradients
  statusPending: {
    colors: ['#fde047', '#f97316'],
  } as GradientConfig,

  statusDelivered: {
    colors: ['#34d399', '#10b981'],
  } as GradientConfig,

  statusLate: {
    colors: ['#fca5a5', '#ef4444'],
  } as GradientConfig,

  // Card gradients
  card: {
    colors: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'],
  } as GradientConfig,

  cardBackground: {
    colors: ['rgba(99, 102, 241, 0.05)', 'rgba(168, 85, 247, 0.05)'],
  } as GradientConfig,

  // Overlay gradient
  overlay: {
    colors: ['rgba(255, 255, 255, 0.15)', 'transparent'],
  } as GradientConfig,

  // Filter button gradient
  filterActive: {
    colors: ['#3b82f6', '#4f46e5', '#7c3aed'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  } as GradientConfig,

  // Capture button gradient
  captureButton: {
    colors: ['#3b82f6', '#4f46e5', '#a855f7'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  } as GradientConfig,

  // Logo gradient
  logo: {
    colors: ['#3b82f6', '#8b5cf6'],
  } as GradientConfig,

  // Danger button gradient
  dangerButton: {
    colors: ['#f43f5e', '#dc2626'],
  } as GradientConfig,
};

