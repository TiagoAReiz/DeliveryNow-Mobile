import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { GradientConfigs } from '@/src/constants/gradients';
import { formatFullAddress } from '@/src/utils/formatters';
import type { Address } from '@/src/types/delivery';

interface DeliveryInfoCardProps {
  recipientName?: string;
  address?: Address | string;
}

export function DeliveryInfoCard({ recipientName, address }: DeliveryInfoCardProps) {
  const formattedAddress = formatFullAddress(address as Address);

  return (
    <View className="mx-6 -mt-8 bg-slate-900/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-slate-700/50 overflow-hidden">
      {/* Background sutil do card */}
      <LinearGradient
        colors={GradientConfigs.cardBackground.colors}
        style={StyleSheet.absoluteFillObject}
      />

      <View className="p-8 space-y-6">
        {/* Destinatário */}
        <View className="flex-row items-start">
          <Avatar
            icon="user"
            size="medium"
            gradientConfig={GradientConfigs.iconIndigo}
            style={{ marginRight: 20 }}
          />
          <View className="flex-1">
            <Text className="text-indigo-400 text-xs font-black mb-2 tracking-widest uppercase">
              Destinatário
            </Text>
            <Text className="text-white font-bold text-xl leading-tight">
              {recipientName || 'Carregando...'}
            </Text>
          </View>
        </View>

        <View className="h-px bg-slate-800/50 my-2" />

        {/* Endereço */}
        <View className="flex-row items-start">
          <Avatar
            icon="map-marker"
            size="medium"
            gradientConfig={GradientConfigs.iconPurple}
            style={{ marginRight: 20 }}
          />
          <View className="flex-1">
            <Text className="text-purple-400 text-xs font-black mb-2 tracking-widest uppercase">
              Endereço de Entrega
            </Text>

            {formattedAddress ? (
              <>
                <Text className="text-white font-semibold text-base leading-relaxed">
                  {formattedAddress.street}
                </Text>
                <Text className="text-slate-300 font-normal text-sm leading-relaxed">
                  {formattedAddress.cityState}
                </Text>
                <Text className="text-slate-300 font-normal text-sm leading-relaxed">
                  {formattedAddress.postalCode}
                </Text>
              </>
            ) : (
              <Text className="text-white font-semibold text-base leading-relaxed">
                {address && typeof address === 'string' 
                  ? address 
                  : recipientName 
                    ? 'Endereço não informado' 
                    : 'Carregando...'}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

