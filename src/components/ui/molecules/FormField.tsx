import { Text, View } from 'react-native';
import { Input } from '../atoms/Input';
import type { ComponentProps } from 'react';

interface FormFieldProps extends ComponentProps<typeof Input> {
  label: string;
  error?: string;
  required?: boolean;
}

export function FormField({ label, error, required, ...inputProps }: FormFieldProps) {
  return (
    <View className="mb-5">
      <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <Input {...inputProps} />
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
}

