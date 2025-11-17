import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Text, View, ViewStyle } from 'react-native';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface EmptyStateProps {
  icon?: FontAwesomeIconName;
  title: string;
  description?: string;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
}

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  iconSize = 50,
  iconColor = '#334155',
  style,
}: EmptyStateProps) {
  return (
    <View className="items-center justify-center mt-20" style={style}>
      <FontAwesome name={icon} size={iconSize} color={iconColor} />
      <Text className="text-slate-500 mt-4 text-lg font-medium text-center">
        {title}
      </Text>
      {description && (
        <Text className="text-slate-600 text-sm mt-2 text-center px-8">
          {description}
        </Text>
      )}
    </View>
  );
}

