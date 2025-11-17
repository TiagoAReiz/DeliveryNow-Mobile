import { StyleSheet } from 'react-native';
import { ShadowColors } from './colors';

/**
 * Estilos de sombra reutilizáveis para toda a aplicação
 */
export const Shadows = StyleSheet.create({
  // Button shadows
  shadowBtn: {
    shadowColor: ShadowColors.indigo,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  // Glow effects
  shadowGlow: {
    shadowColor: ShadowColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 5,
  },

  // Active state shadows
  shadowActive: {
    shadowColor: ShadowColors.indigo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // Status shadows
  shadowIndigo: {
    shadowColor: ShadowColors.indigo,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },

  shadowEmerald: {
    shadowColor: ShadowColors.emerald,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },

  shadowAmber: {
    shadowColor: ShadowColors.amber,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },

  shadowRose: {
    shadowColor: ShadowColors.rose,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },

  shadowGray: {
    shadowColor: ShadowColors.gray,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },

  // Card shadows
  shadowCard: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },

  shadowCardHover: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
});

