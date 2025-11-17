import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { Shadows } from '@/src/constants/shadows';
import { GradientConfigs } from '@/src/constants/gradients';

interface FilterButtonProps extends PressableProps {
  title: string;
  active: boolean;
}

export function FilterButton({ title, active, ...pressableProps }: FilterButtonProps) {
  return (
    <Pressable className="mr-3 active:opacity-80" {...pressableProps}>
      {active ? (
        <LinearGradient
          colors={GradientConfigs.filterActive.colors}
          start={GradientConfigs.filterActive.start}
          end={GradientConfigs.filterActive.end}
          style={[
            Shadows.shadowActive,
            { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999 },
          ]}
        >
          <Text className="text-white font-bold text-sm">{title}</Text>
        </LinearGradient>
      ) : (
        <View className="bg-slate-800/50 rounded-full px-5 py-2 border border-slate-700">
          <Text className="text-slate-400 font-medium text-sm">{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

