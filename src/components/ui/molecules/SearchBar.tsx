import { FontAwesome } from '@expo/vector-icons';
import { TextInput, TextInputProps, View } from 'react-native';

interface SearchBarProps extends Omit<TextInputProps, 'placeholder'> {
  placeholder?: string;
  iconColor?: string;
}

export function SearchBar({ 
  placeholder = 'Buscar...',
  iconColor = '#94a3b8',
  ...textInputProps 
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-white/5 rounded-2xl px-4 h-12 border border-white/10">
      <FontAwesome name="search" size={18} color={iconColor} />
      <TextInput
        className="flex-1 ml-3 text-white text-base font-medium"
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        {...textInputProps}
      />
    </View>
  );
}

