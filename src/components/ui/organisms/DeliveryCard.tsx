import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { StatusBadge } from '../molecules/StatusBadge';
import { formatAddress, formatDeliveryId } from '@/src/utils/formatters';
import type { Delivery } from '@/src/types/delivery';

interface DeliveryCardProps {
  delivery: Delivery;
  onPress: (id: string) => void;
}

export function DeliveryCard({ delivery, onPress }: DeliveryCardProps) {
  const formattedAddress = formatAddress(delivery.address);
  const formattedId = formatDeliveryId(delivery.id);

  return (
    <Pressable
      onPress={() => onPress(delivery.id)}
      className="mb-4 active:scale-[0.98] transition-transform"
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
        style={{ borderRadius: 24, padding: 1 }}
      >
        <View className="bg-slate-900/90 rounded-3xl p-5 backdrop-blur-md">
          <View className="flex-row items-center">
            <View className="bg-indigo-500/10 rounded-2xl p-3 mr-4 border border-indigo-500/20">
              <FontAwesome name="truck" size={20} color="#818cf8" />
            </View>

            <View className="flex-1">
              <Text
                className="text-white font-bold text-lg mb-1"
                numberOfLines={1}
              >
                {delivery.name}
              </Text>
              <View className="flex-row items-center mb-2">
                <FontAwesome
                  name="map-marker"
                  size={12}
                  color="#64748b"
                />
                <Text
                  className="text-slate-400 text-xs ml-1.5 flex-1"
                  numberOfLines={1}
                >
                  {formattedAddress}
                </Text>
              </View>
            </View>

            <FontAwesome
              name="chevron-right"
              size={14}
              color="#475569"
            />
          </View>

          {/* Badge de Status e ID (Footer do Card) */}
          <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-white/5">
            <Text className="text-slate-600 text-xs font-bold uppercase tracking-wider">
              #{formattedId}
            </Text>
            <StatusBadge status={delivery.status} />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

