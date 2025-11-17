import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../atoms/IconButton';
import { formatDeliveryId } from '@/src/utils/formatters';
import { getStatusInfo } from '@/src/utils/statusUtils';
import type { DeliveryStatus } from '@/src/types/delivery';

interface DeliveryHeaderProps {
  deliveryId?: string;
  status?: DeliveryStatus | string;
  onBackPress: () => void;
  onLogoutPress?: () => void;
  showLogout?: boolean;
}

export function DeliveryHeader({
  deliveryId,
  status,
  onBackPress,
  onLogoutPress,
  showLogout = false,
}: DeliveryHeaderProps) {
  const formattedId = deliveryId ? formatDeliveryId(deliveryId) : '...';
  const statusInfo = status ? getStatusInfo(status) : null;

  return (
    <View className="pt-14 pb-10 px-6 shadow-2xl">
      {/* Background do Header */}
      <LinearGradient
        colors={['#4f46e5', '#9333ea', '#db2777']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Overlay escuro para legibilidade */}
      <View className="absolute inset-0 bg-black/10" />

      <View className="flex-row items-center justify-between mb-8 z-10">
        <Pressable
          onPress={onBackPress}
          className="flex-row items-center active:opacity-70"
        >
          <View className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 mr-3 border border-white/30">
            <FontAwesome name="arrow-left" size={18} color="white" />
          </View>
          <Text className="text-white font-bold text-base tracking-wider uppercase">
            Voltar
          </Text>
        </Pressable>

        {showLogout && onLogoutPress && (
          <IconButton
            icon="sign-out"
            iconColor="#f87171"
            backgroundColor="rgba(30, 41, 59, 0.8)"
            borderColor="#334155"
            onPress={onLogoutPress}
          />
        )}
      </View>

      <View className="flex-row items-center justify-between z-10">
        <View className="flex-1">
          <Text className="text-white/90 text-xs font-bold tracking-widest mb-2 uppercase">
            Entrega
          </Text>
          <Text className="text-white font-black text-3xl tracking-tight">
            #{formattedId}
          </Text>
        </View>

        {/* Badge de Status */}
        {statusInfo && (
          <View
            style={statusInfo.shadowStyle}
            className="rounded-3xl overflow-hidden"
          >
            <LinearGradient
              colors={statusInfo.gradientColors}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <FontAwesome name={statusInfo.icon as any} size={20} color="white" />
              <Text className="text-white font-black ml-3 text-base">
                {statusInfo.text}
              </Text>
            </LinearGradient>
          </View>
        )}
      </View>
    </View>
  );
}

