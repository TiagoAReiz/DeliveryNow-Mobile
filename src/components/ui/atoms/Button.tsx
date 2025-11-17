import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Shadows } from '@/src/constants/shadows';
import { GradientConfigs, type GradientConfig } from '@/src/constants/gradients';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: 'primary' | 'success' | 'danger' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  icon?: FontAwesomeIconName;
  fullWidth?: boolean;
  gradientConfig?: GradientConfig;
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  icon,
  fullWidth = true,
  disabled,
  gradientConfig,
  ...pressableProps
}: ButtonProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 12, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 20, paddingHorizontal: 32 };
      default:
        return { paddingVertical: 16, paddingHorizontal: 24 };
    }
  };

  const getGradient = (): GradientConfig => {
    if (gradientConfig) return gradientConfig;
    
    switch (variant) {
      case 'success':
        return GradientConfigs.successButton;
      case 'danger':
        return GradientConfigs.dangerButton;
      case 'secondary':
        return { colors: ['#334155', '#1e293b'] };
      default:
        return GradientConfigs.primaryButton;
    }
  };

  const getShadowStyle = () => {
    switch (variant) {
      case 'success':
        return Shadows.shadowEmerald;
      case 'danger':
        return Shadows.shadowRose;
      case 'secondary':
        return {};
      default:
        return Shadows.shadowBtn;
    }
  };

  const gradient = getGradient();
  const sizeStyles = getSizeStyles();
  const shadowStyle = getShadowStyle();

  return (
    <Pressable
      disabled={disabled || isLoading}
      className={`active:scale-[0.98] opacity-100 disabled:opacity-60 ${fullWidth ? 'w-full' : ''}`}
      {...pressableProps}
    >
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={[
          shadowStyle,
          {
            borderRadius: 16,
            ...sizeStyles,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {isLoading ? (
          <FontAwesome
            name="circle-o-notch"
            size={size === 'small' ? 16 : 20}
            color="white"
            className="animate-spin"
          />
        ) : (
          <>
            {icon && (
              <FontAwesome
                name={icon}
                size={size === 'small' ? 16 : 20}
                color="white"
                style={{ marginRight: 8 }}
              />
            )}
            <Text
              className={`text-white font-bold tracking-wide ${
                size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-lg'
              }`}
            >
              {title}
            </Text>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

