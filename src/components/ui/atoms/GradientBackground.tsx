import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { GradientConfigs, type GradientConfig } from '@/src/constants/gradients';

interface GradientBackgroundProps {
  variant?: 'default' | 'alt';
  children?: React.ReactNode;
  gradientConfig?: GradientConfig;
}

export function GradientBackground({ 
  variant = 'default', 
  children,
  gradientConfig 
}: GradientBackgroundProps) {
  const gradient = gradientConfig || 
    (variant === 'alt' ? GradientConfigs.backgroundAlt : GradientConfigs.background);

  return (
    <LinearGradient
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      style={StyleSheet.absoluteFillObject}
    >
      {children}
    </LinearGradient>
  );
}

