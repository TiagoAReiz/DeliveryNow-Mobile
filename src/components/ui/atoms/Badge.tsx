import { Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export function Badge({
  text,
  backgroundColor = 'rgba(107, 114, 128, 0.2)',
  textColor = '#9ca3af',
  borderColor = 'rgba(107, 114, 128, 0.5)',
  size = 'medium',
  style,
}: BadgeProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-0.5';
      case 'large':
        return 'px-4 py-2';
      default:
        return 'px-3 py-1';
    }
  };

  const getTextSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-[10px]';
      case 'large':
        return 'text-sm';
      default:
        return 'text-xs';
    }
  };

  return (
    <View
      className={`rounded-full border ${getSizeClasses()}`}
      style={[
        {
          backgroundColor,
          borderColor,
        },
        style,
      ]}
    >
      <Text
        style={{ color: textColor }}
        className={`${getTextSizeClass()} font-bold`}
      >
        {text}
      </Text>
    </View>
  );
}

