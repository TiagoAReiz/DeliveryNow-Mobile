import deliveriesService from "@/src/services/deliveries/deliveries_service";
import { DeliveryResponse } from "@/src/services/deliveries/dtos/DeliveryResponse";
import { DeliveryStatus } from "@/src/services/deliveries/enums/status_enum";
import { ReceiptResponse } from "@/src/services/receipts/dtos/receipt_response";
import receipt_service from "@/src/services/receipts/receipt_service";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import DeliveryPhoto from "../../../services/receipts/dtos/photo";

export default function DeliveryPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [delivery, setDelivery] = useState<DeliveryResponse>();
  const [localPhotos, setLocalPhotos] = useState<DeliveryPhoto[]>([]);
  const [photos, setPhotos] = useState<ReceiptResponse[]>([]);

  async function getDelivery(id: string) {
    const response = await deliveriesService.getDeliveryById(id);
    setDelivery(response);
  }

  async function markAsDelivered() {
    if (!delivery) return;
    setDelivery({ ...delivery, status: "DELIVERED" });
    deliveriesService.updateDeliveryStatus(
      delivery.id,
      DeliveryStatus.DELIVERED
    );
    Alert.alert("Sucesso", "Entrega marcada como entregue!");
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para tirar fotos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      base64: false,
    });

    if (!result.canceled && delivery) {
      const newPhoto = {
        uri: result.assets[0].uri,
      };
      setLocalPhotos((prev) => [...prev, newPhoto]);
    }
  }

  async function handleRemoveImage(uri: string) {
    setLocalPhotos((prev) => prev.filter((photo) => photo.uri !== uri));
  }

  async function uploadPhotos() {
    if (!delivery) return;
    await receipt_service.uploadReceiptPhotos(delivery.id, localPhotos);
    setLocalPhotos([]);
    getPhotos();
    Alert.alert("Sucesso", "Fotos enviadas com sucesso!");
  }

  async function getPhotos() {
    if (!delivery) return;
    const photos = await receipt_service.getReceiptPhotos(delivery.id);
    setPhotos(photos);
  }

  // Carrega o delivery quando o ID muda
  useEffect(() => {
    const deliveryId = Array.isArray(id) ? id[0] : id;
    if (deliveryId) {
      // Limpa os estados ao trocar de delivery
      setDelivery(undefined);
      setPhotos([]);
      setLocalPhotos([]);

      getDelivery(deliveryId);
    }
  }, [id]);

  // Carrega as fotos quando o delivery estiver disponível
  useEffect(() => {
    if (delivery) {
      getPhotos();
    }
  }, [delivery?.id]); // Usa delivery.id como dependência

  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
        <Pressable
          onPress={() => {
            router.push("/deliveries");
          }}
          className="flex-row items-center mb-6"
        >
          <FontAwesome name="arrow-left" size={24} color="gray" />
          <Text className="text-white font-semibold text-lg">
            {" "}
            {"  "}Voltar
          </Text>
        </Pressable>

        <Text className="text-3xl font-bold text-white mb-6 text-center">
          Detalhes da Entrega
        </Text>

        <View className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-xl">
          <Text className="text-white text-lg font-semibold">
            ID: {delivery?.id}
          </Text>
          <Text className="text-gray-300 mt-2">Nome: {delivery?.name}</Text>
          <Text className="text-gray-300 mt-1">
            Endereço: {delivery?.address}
          </Text>
          <Text
            className={
              "mt-3 rounded-3xl px-4 py-1 w-fit text-white font-semibold " +
              (delivery?.status === "PENDING"
                ? "bg-yellow-800 text-yellow-300"
                : delivery?.status === "DELIVERED"
                  ? "bg-green-800 text-green-300"
                  : delivery?.status === "LATE"
                    ? "bg-red-800 text-red-300"
                    : "bg-gray-700")
            }
          >
            {delivery?.status === "PENDING"
              ? "Pendente"
              : delivery?.status === "DELIVERED"
                ? "Entregue"
                : delivery?.status === "LATE"
                  ? "Atrasado"
                  : delivery?.status}
          </Text>
        </View>

        <Pressable
          onPress={takePhoto}
          className="bg-blue-600 flex-row items-center justify-center p-5 rounded-2xl mb-6 shadow-xl"
        >
          <FontAwesome name="camera" size={24} color="white" className="mr-3" />
          <Text className="text-white text-base">Tirar Foto do Canhoto</Text>
        </Pressable>

        <Text className="text-white text-xl mb-3 font-semibold">
          Fotos do Canhoto já enviadas
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {photos.length === 0 ? (
            <Text className="text-gray-400 mb-6">
              Nenhuma foto enviada ainda.
            </Text>
          ) : (
            photos.map((photo, idx) => (
              <Image
                key={idx}
                source={{ uri: photo.imageUrl }}
                className="w-48 h-48 rounded-2xl mb-4 border border-gray-700 mx-2"
              />
            ))
          )}
        </ScrollView>

        <Text className="text-white text-xl mb-3 font-semibold">
          Imagens a Serem enviadas
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {localPhotos.length === 0 ? (
            <Text className="text-gray-400">Nenhuma foto ainda.</Text>
          ) : (
            localPhotos.map((photo, idx) => (
              <View key={idx}>
                <Image
                  source={{ uri: photo.uri }}
                  className="w-48 h-48 rounded-2xl mr-4 border border-gray-700"
                />
                <Pressable
                  onPress={() => handleRemoveImage(photo.uri)}
                  className="bg-red-500 absolute top-2 right-5 p-2 rounded-full"
                >
                  <FontAwesome name="trash" size={12} color="white" />
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
        <Pressable
          onPress={uploadPhotos}
          className={
            "p-5 mb-10 rounded-2xl shadow-2xl items-center bg-blue-600 "
          }
        >
          <Text className="text-white">Enviar imagens</Text>
        </Pressable>
        <Pressable
          onPress={markAsDelivered}
          disabled={delivery?.status === "DELIVERED"}
          className={
            "p-5 mb-10 rounded-2xl shadow-2xl items-center " +
            (delivery?.status === "DELIVERED" ? "bg-gray-500" : "bg-green-600")
          }
        >
          <Text className="text-white text-base">
            {delivery?.status === "DELIVERED"
              ? "Entrega já realizada"
              : "Marcar como Entregue"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
