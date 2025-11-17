import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { View, ViewStyle } from 'react-native';
import { GradientConfigs, type GradientConfig } from '@/src/constants/gradients';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface AvatarProps {
  icon: FontAwesomeIconName;
  iconSize?: number;
  iconColor?: string;
  size?: 'small' | 'medium' | 'large';
  gradientConfig?: GradientConfig;
  showBorder?: boolean;
  style?: ViewStyle;
}

export function Avatar({
  icon,
  iconSize,
  iconColor = 'white',
  size = 'medium',
  gradientConfig,
  showBorder = true,
  style,
}: AvatarProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return { container: 'p-2', icon: iconSize || 20 };
      case 'large':
        return { container: 'p-6', icon: iconSize || 40 };
      default:
        return { container: 'p-4', icon: iconSize || 28 };
    }
  };

  const gradient = gradientConfig || GradientConfigs.iconIndigo;
  const sizes = getSizeClasses();

  return (
    <View
      className={`rounded-2xl overflow-hidden ${showBorder ? 'border border-white/10' : ''}`}
      style={style}
    >
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={{ padding: size === 'small' ? 8 : size === 'large' ? 24 : 16 }}
      >
        <FontAwesome name={icon} size={sizes.icon} color={iconColor} />
      </LinearGradient>
    </View>
  );
}

