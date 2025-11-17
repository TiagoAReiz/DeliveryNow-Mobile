import { ActivityIndicator, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = 'large', 
  color = '#fff',
  fullScreen = false 
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={color} />;
}

