import { useState, useEffect } from 'react';
import deliveriesService from '@/src/services/deliveries/deliveries_service';
import { DeliveryStatus } from '@/src/types/delivery';
import type { Delivery } from '@/src/types/delivery';
import { Alert } from 'react-native';

export function useDeliveryDetails(deliveryId: string | string[] | undefined) {
  const [delivery, setDelivery] = useState<Delivery | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = Array.isArray(deliveryId) ? deliveryId[0] : deliveryId;
    if (id) {
      fetchDelivery(id);
    }
  }, [deliveryId]);

  async function fetchDelivery(id: string) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await deliveriesService.getDeliveryById(id);
      setDelivery(response);
    } catch (err) {
      setError('Erro ao carregar detalhes da entrega');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function markAsDelivered(hasPhotos: boolean) {
    if (!delivery) return;

    if (!hasPhotos && delivery.status !== DeliveryStatus.DELIVERED) {
      Alert.alert(
        '⚠️ Atenção',
        'Você precisa enviar pelo menos uma foto do canhoto antes de confirmar a entrega.',
        [{ text: 'Entendi', style: 'default' }]
      );
      return;
    }

    if (delivery.status === DeliveryStatus.DELIVERED) return;

    Alert.alert(
      '✅ Confirmar Entrega',
      'Deseja realmente marcar esta entrega como concluída?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'default',
          onPress: async () => {
            try {
              await deliveriesService.updateDeliveryStatus(
                delivery.id,
                DeliveryStatus.DELIVERED
              );
              setDelivery({ ...delivery, status: DeliveryStatus.DELIVERED });
              Alert.alert('🎉 Sucesso!', 'Entrega confirmada com sucesso!');
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível confirmar a entrega');
              console.error(err);
            }
          },
        },
      ]
    );
  }

  function refreshDelivery() {
    const id = Array.isArray(deliveryId) ? deliveryId[0] : deliveryId;
    if (id) {
      fetchDelivery(id);
    }
  }

  return {
    delivery,
    isLoading,
    error,
    markAsDelivered,
    refreshDelivery,
  };
}

