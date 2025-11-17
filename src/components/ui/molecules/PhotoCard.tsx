import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Image, Pressable, View, ViewStyle } from 'react-native';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface PhotoCardProps {
  uri: string;
  onActionPress?: () => void;
  actionIcon?: FontAwesomeIconName;
  actionGradient?: string[];
  status?: 'pending' | 'uploaded';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export function PhotoCard({
  uri,
  onActionPress,
  actionIcon = 'trash',
  actionGradient = ['#f43f5e', '#dc2626'],
  status = 'pending',
  size = 'medium',
  style,
}: PhotoCardProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-48 h-48';
      case 'large':
        return 'w-80 h-80';
      default:
        return 'w-64 h-64';
    }
  };

  const borderColor = status === 'uploaded' 
    ? 'border-emerald-500/50' 
    : 'border-amber-500/50';

  const statusIconGradient = status === 'uploaded'
    ? ['#34d399', '#22c55e']
    : actionGradient;

  const statusIcon: FontAwesomeIconName = status === 'uploaded' ? 'check' : actionIcon;

  return (
    <View className="mr-5 relative" style={style}>
      <View className={`rounded-3xl overflow-hidden shadow-2xl border-4 ${borderColor} ${getSizeClass()}`}>
        <Image source={{ uri }} className={getSizeClass()} />
      </View>
      
      {onActionPress && (
        <Pressable
          onPress={onActionPress}
          className="absolute -top-3 -right-3 rounded-full border-4 border-slate-900 overflow-hidden shadow-xl active:scale-90"
        >
          <LinearGradient
            colors={statusIconGradient}
            style={{ padding: status === 'uploaded' ? 12 : 16 }}
          >
            <FontAwesome name={statusIcon} size={16} color="white" />
          </LinearGradient>
        </Pressable>
      )}

      {!onActionPress && status === 'uploaded' && (
        <View className="absolute -top-3 -right-3 rounded-full border-4 border-slate-900 overflow-hidden shadow-xl">
          <LinearGradient
            colors={statusIconGradient}
            style={{ padding: 12 }}
          >
            <FontAwesome name={statusIcon} size={16} color="white" />
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

