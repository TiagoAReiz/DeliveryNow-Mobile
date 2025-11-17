import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface InputProps extends TextInputProps {
  icon?: FontAwesomeIconName;
  iconColor?: string;
}

export function Input({ icon, iconColor = '#64748b', ...textInputProps }: InputProps) {
  return (
    <View className="flex-row items-center bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3.5">
      {icon && (
        <FontAwesome
          name={icon}
          size={18}
          color={iconColor}
          style={{ marginRight: 12 }}
        />
      )}
      <TextInput
        placeholderTextColor="#475569"
        className="flex-1 text-white text-base font-medium"
        {...textInputProps}
      />
    </View>
  );
}

