import { Button } from '@/src/components/ui/atoms/Button';
import { GradientBackground } from '@/src/components/ui/atoms/GradientBackground';
import { DeliveryHeader } from '@/src/components/ui/organisms/DeliveryHeader';
import { DeliveryInfoCard } from '@/src/components/ui/organisms/DeliveryInfoCard';
import { PhotoGallery } from '@/src/components/ui/organisms/PhotoGallery';
import { useDeliveryDetails } from '@/src/hooks/useDeliveryDetails';
import { usePhotoCapture } from '@/src/hooks/usePhotoCapture';
import type { Address } from '@/src/types/delivery';
import { DeliveryStatus } from '@/src/types/delivery';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';

export default function DeliveryPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const { delivery, markAsDelivered } = useDeliveryDetails(id);
  
  const {
    localPhotos,
    uploadedPhotos,
    isUploading,
    canUpload,
    hasUploadedPhotos,
    pulseAnim,
    takePhoto,
    removePhoto,
    uploadPhotos,
  } = usePhotoCapture(
    Array.isArray(id) ? id[0] : id,
    delivery?.status === DeliveryStatus.DELIVERED
  );

  const isDelivered = delivery?.status === DeliveryStatus.DELIVERED;
  
  const sendButtonText = isDelivered
    ? 'Entrega já concluída'
    : isUploading
      ? 'Enviando...'
      : localPhotos.length === 0
        ? 'Nenhuma foto para enviar'
        : `Enviar ${localPhotos.length} ${localPhotos.length === 1 ? 'foto' : 'fotos'}`;

  const confirmButtonText = isDelivered ? 'Entrega Concluída' : 'Confirmar Entrega';

  return (
    <View className="flex-1 bg-slate-950">
      <GradientBackground />

      {/* Header Premium */}
      <DeliveryHeader
        deliveryId={delivery?.id}
        status={delivery?.status}
        onBackPress={() => router.push('/deliveries')}
      />

      <ScrollView
        className="flex-1 pt-12 py-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Card de Informações Flutuante */}
        <DeliveryInfoCard
          recipientName={delivery?.name}
          address={delivery?.address as Address}
        />

        {/* Seção: Fotos Enviadas */}
        <PhotoGallery
          title="Fotos Enviadas"
          description="Comprovantes confirmados"
          photos={uploadedPhotos}
          status="uploaded"
          icon="check-square-o"
          emptyIcon="image"
          emptyTitle="Nenhuma foto enviada"
          emptyDescription="Tire fotos e envie para confirmar"
          badgeCount={uploadedPhotos.length}
        />

        {/* Botão Premium de Captura */}
        <Pressable
          onPress={takePhoto}
          className="mx-6 mt-10 active:scale-95"
          disabled={isDelivered}
        >
          <Button
            title="Capturar Canhoto"
            icon="camera"
            disabled={isDelivered}
            onPress={takePhoto}
          />
        </Pressable>

        {/* Seção: Fotos Aguardando Envio */}
        <PhotoGallery
          title="Aguardando Envio"
          description="Pronto para upload"
          photos={localPhotos}
          status="pending"
          onPhotoRemove={removePhoto}
          icon="hourglass-half"
          emptyIcon="camera"
          emptyTitle="Nenhuma foto capturada"
          emptyDescription="Use o botão acima para tirar fotos"
          badgeCount={localPhotos.length}
        />

        {/* Botões de Ação */}
        <View className="px-6 pb-10 mt-6 space-y-5">
          {/* Botão Upload */}
          {!canUpload ? (
            <View className="rounded-3xl border-2 bg-slate-800 border-slate-700 opacity-60">
              <View className="p-6 flex-row items-center justify-center">
                <Text className="text-white font-black text-lg">
                  {sendButtonText}
                </Text>
              </View>
            </View>
          ) : (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Button
                title={sendButtonText}
                icon="cloud-upload"
                onPress={uploadPhotos}
                disabled={!canUpload}
                isLoading={isUploading}
              />
            </Animated.View>
          )}

          {/* Botão Confirmar Entrega */}
          {isDelivered || !hasUploadedPhotos ? (
            <View
              className={`rounded-3xl border-2 bg-slate-800 border-slate-700 my-5 ${
                isDelivered ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <View className="p-6 flex-row items-center justify-center">
                <Text className="text-white font-black text-lg">
                  {confirmButtonText}
                </Text>
              </View>
            </View>
          ) : (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="my-5">
              <Button
                title={confirmButtonText}
                icon="check-square-o"
                variant="success"
                onPress={() => markAsDelivered(hasUploadedPhotos)}
              />
            </Animated.View>
          )}
        </View>
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
