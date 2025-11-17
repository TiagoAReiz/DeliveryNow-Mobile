import { useState, useEffect } from 'react';
import { Animated, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import receipt_service from '@/src/services/receipts/receipt_service';
import type { Photo, ReceiptPhoto } from '@/src/types/photo';

export function usePhotoCapture(deliveryId?: string, isDelivered?: boolean) {
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<ReceiptPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  // Pulse animation para fotos pendentes
  useEffect(() => {
    let animation: Animated.CompositeAnimation;
    if (localPhotos.length > 0 && !isDelivered && !isUploading) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    }
    return () => {
      animation?.stop();
      pulseAnim.setValue(1);
    };
  }, [localPhotos.length, isDelivered, isUploading]);

  // Fetch uploaded photos
  useEffect(() => {
    if (deliveryId) {
      fetchPhotos();
    }
  }, [deliveryId]);

  async function fetchPhotos() {
    if (!deliveryId) return;
    try {
      const photos = await receipt_service.getReceiptPhotos(deliveryId);
      setUploadedPhotos(photos);
    } catch (err) {
      console.error('Erro ao carregar fotos:', err);
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        '📸 Permissão Necessária',
        'Precisamos de acesso à câmera para você fotografar os comprovantes de entrega.',
        [{ text: 'Ok', style: 'default' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      base64: false,
    });

    if (!result.canceled && deliveryId) {
      const newPhoto: Photo = {
        uri: result.assets[0].uri,
      };
      setLocalPhotos((prev) => [...prev, newPhoto]);
    }
  }

  async function removePhoto(uri: string) {
    Alert.alert(
      '🗑️ Remover Foto',
      'Tem certeza que deseja remover esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setLocalPhotos((prev) => prev.filter((photo) => photo.uri !== uri));
          },
        },
      ]
    );
  }

  async function uploadPhotos() {
    if (isUploading || !deliveryId || localPhotos.length === 0) return;

    try {
      setIsUploading(true);
      pulseAnim.setValue(1);
      await receipt_service.uploadReceiptPhotos(deliveryId, localPhotos);
      setLocalPhotos([]);
      await fetchPhotos();
      Alert.alert('✨ Sucesso!', 'Fotos enviadas e salvas com sucesso!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar as fotos');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }

  const canUpload = localPhotos.length > 0 && !isUploading && !isDelivered;
  const hasUploadedPhotos = uploadedPhotos.length > 0;

  return {
    localPhotos,
    uploadedPhotos,
    isUploading,
    canUpload,
    hasUploadedPhotos,
    pulseAnim,
    takePhoto,
    removePhoto,
    uploadPhotos,
    refreshPhotos: fetchPhotos,
  };
}

