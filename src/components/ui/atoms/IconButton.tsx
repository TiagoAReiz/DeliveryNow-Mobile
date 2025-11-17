import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface IconButtonProps extends PressableProps {
  icon: FontAwesomeIconName;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  style?: ViewStyle;
}

export function IconButton({
  icon,
  iconSize,
  iconColor = 'white',
  backgroundColor = '#1e293b',
  borderColor = '#334155',
  size = 'medium',
  rounded = true,
  style,
  ...pressableProps
}: IconButtonProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'p-2';
      case 'large':
        return 'p-4';
      default:
        return 'p-3';
    }
  };

  const getIconSize = () => {
    if (iconSize) return iconSize;
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <Pressable
      className={`${rounded ? 'rounded-full' : 'rounded-xl'} border ${getSizeClass()} active:opacity-70`}
      style={[{ backgroundColor, borderColor }, style]}
      {...pressableProps}
    >
      <FontAwesome name={icon} size={getIconSize()} color={iconColor} />
    </Pressable>
  );
}

