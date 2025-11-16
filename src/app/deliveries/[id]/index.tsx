import deliveriesService from "@/src/services/deliveries/deliveries_service";
import { DeliveryResponse } from "@/src/services/deliveries/dtos/DeliveryResponse";
import { DeliveryStatus } from "@/src/services/deliveries/enums/status_enum";
import { ReceiptResponse } from "@/src/services/receipts/dtos/receipt_response";
import receipt_service from "@/src/services/receipts/receipt_service";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DeliveryPhoto from "../../../services/receipts/dtos/photo";

export default function DeliveryPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [delivery, setDelivery] = useState<DeliveryResponse>();
  const [localPhotos, setLocalPhotos] = useState<DeliveryPhoto[]>([]);
  const [photos, setPhotos] = useState<ReceiptResponse[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  const sendButtonText =
    delivery?.status === "DELIVERED"
      ? "Entrega já concluída"
      : isUploading
        ? "Enviando..."
        : localPhotos.length === 0
          ? "Nenhuma foto para enviar"
          : `Enviar ${localPhotos.length} ${
              localPhotos.length === 1 ? "foto" : "fotos"
            }`;

  const isSendButtonDisabled =
    delivery?.status === "DELIVERED" || localPhotos.length === 0 || isUploading;
  const canMarkAsDelivered = photos.length !== 0;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;
    if (
      localPhotos.length > 0 &&
      delivery?.status !== "DELIVERED" &&
      !isUploading
    ) {
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
  }, [localPhotos.length, delivery?.status, isUploading, pulseAnim]);

  async function getDelivery(id: string) {
    const response = await deliveriesService.getDeliveryById(id);
    setDelivery(response);
  }

  async function markAsDelivered() {
    if (!canMarkAsDelivered && delivery?.status !== "DELIVERED") {
      Alert.alert(
        "⚠️ Atenção",
        "Você precisa enviar pelo menos uma foto do canhoto antes de confirmar a entrega.",
        [{ text: "Entendi", style: "default" }]
      );
      return;
    }
    if (!delivery || delivery?.status === "DELIVERED") return;

    Alert.alert(
      "✅ Confirmar Entrega",
      "Deseja realmente marcar esta entrega como concluída?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "default",
          onPress: () => {
            setDelivery({ ...delivery, status: "DELIVERED" });
            deliveriesService.updateDeliveryStatus(
              delivery.id,
              DeliveryStatus.DELIVERED
            );
            Alert.alert("🎉 Sucesso!", "Entrega confirmada com sucesso!");
          },
        },
      ]
    );
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "📸 Permissão Necessária",
        "Precisamos de acesso à câmera para você fotografar os comprovantes de entrega.",
        [{ text: "Ok", style: "default" }]
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
    Alert.alert(
      "🗑️ Remover Foto",
      "Tem certeza que deseja remover esta foto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            setLocalPhotos((prev) => prev.filter((photo) => photo.uri !== uri));
          },
        },
      ]
    );
  }

  async function uploadPhotos() {
    if (isUploading) return;
    if (!delivery) return;
    setIsUploading(true);
    pulseAnim.setValue(1);
    await receipt_service.uploadReceiptPhotos(delivery.id, localPhotos);
    setLocalPhotos([]);
    getPhotos();
    Alert.alert("✨ Sucesso!", "Fotos enviadas e salvas com sucesso!");
    setIsUploading(false);
  }

  async function getPhotos() {
    if (!delivery) return;
    const photos = await receipt_service.getReceiptPhotos(delivery.id);
    setPhotos(photos);
  }

  useEffect(() => {
    const deliveryId = Array.isArray(id) ? id[0] : id;
    if (deliveryId) {
      setDelivery(undefined);
      setPhotos([]);
      setLocalPhotos([]);
      getDelivery(deliveryId);
    }
  }, [id]);

  useEffect(() => {
    if (delivery) {
      getPhotos();
    }
  }, [delivery?.id]);

  const getStatusInfo = () => {
    switch (delivery?.status) {
      case "PENDING":
        return {
          gradientColors: ["#fde047", "#f97316"], // amber-400 to orange-500
          text: "Pendente",
          icon: "clock-o",
          shadowStyle: styles.shadowAmber,
        };
      case "DELIVERED":
        return {
          gradientColors: ["#34d399", "#10b981"], // emerald-400 to green-500
          text: "Entregue",
          icon: "check-circle",
          shadowStyle: styles.shadowEmerald,
        };
      case "LATE":
        return {
          gradientColors: ["#fca5a5", "#ef4444"], // rose-400 to red-500
          text: "Atrasado",
          icon: "exclamation-triangle",
          shadowStyle: styles.shadowRose,
        };
      default:
        return {
          gradientColors: ["#9ca3af", "#6b7280"], // gray-400 to gray-500
          text: delivery?.status || "",
          icon: "info-circle",
          shadowStyle: styles.shadowGray,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View className="flex-1 bg-slate-950">
      {/* 1. Background Geral da Tela (LinearGradient Real) */}
      <LinearGradient
        colors={["#020617", "#0f172a", "#020617"]} // slate-950 -> slate-900 -> slate-950
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header Premium */}
      <View className="pt-14 pb-10 px-6 shadow-2xl">
        {/* 2. Background do Header (LinearGradient Real) */}
        <LinearGradient
          colors={["#4f46e5", "#9333ea", "#db2777"]} // indigo-600 -> purple-600 -> pink-600
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        {/* Overlay escuro para legibilidade */}
        <View className="absolute inset-0 bg-black/10" />

        <Pressable
          onPress={() => router.push("/deliveries")}
          className="flex-row items-center mb-8 active:opacity-70 z-10"
        >
          <View className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 mr-3 border border-white/30">
            <FontAwesome name="arrow-left" size={18} color="white" />
          </View>
          <Text className="text-white font-bold text-base tracking-wider uppercase">
            Voltar
          </Text>
        </Pressable>

        <View className="flex-row items-center justify-between z-10">
          <View className="flex-1">
            <Text className="text-white/90 text-xs font-bold tracking-widest mb-2 uppercase">
              Entrega
            </Text>
            <Text className="text-white font-black text-3xl tracking-tight">
              #
              {delivery?.id
                ? String(delivery.id).substring(0, 8).toUpperCase()
                : "..."}
            </Text>
          </View>

          {/* Badge de Status */}
          <View
            style={statusInfo.shadowStyle}
            className="rounded-3xl overflow-hidden"
          >
            <LinearGradient
              colors={statusInfo.gradientColors}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 16,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <FontAwesome name={statusInfo.icon} size={20} color="white" />
              <Text className="text-white font-black ml-3 text-base">
                {statusInfo.text}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 pt-12" showsVerticalScrollIndicator={false}>
        {/* Card de Informações Flutuante */}
        <View className="mx-6 -mt-8 bg-slate-900/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Background sutil do card */}
          <LinearGradient
            colors={["rgba(99, 102, 241, 0.05)", "rgba(168, 85, 247, 0.05)"]}
            style={StyleSheet.absoluteFillObject}
          />

          <View className="p-8 space-y-5">
            {/* Destinatário */}
            <View className="flex-row items-start">
              {/* 3. Ícone com Gradiente Real */}
              <View className="mr-5 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/50">
                <LinearGradient
                  colors={["#6366f1", "#9333ea"]} // indigo-500 -> purple-600
                  style={{ padding: 16 }}
                >
                  <FontAwesome name="user" size={24} color="white" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-indigo-400 text-xs font-black mb-2 tracking-widest uppercase">
                  Destinatário
                </Text>
                <Text className="text-white font-bold text-xl leading-tight">
                  {delivery?.name || "Carregando..."}
                </Text>
              </View>
            </View>

            <View className="h-px bg-slate-800/50 my-3" />

            {/* Endereço */}
            <View className="flex-row items-start">
              <View className="mr-5 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/50">
                <LinearGradient
                  colors={["#a855f7", "#db2777"]} // purple-500 -> pink-600
                  style={{ padding: 16 }}
                >
                  <FontAwesome name="map-marker" size={24} color="white" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-purple-400 text-xs font-black mb-2 tracking-widest uppercase">
                  Endereço de Entrega
                </Text>
                <Text className="text-white font-semibold text-base leading-relaxed">
                  {delivery?.address || "Carregando..."}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Seção: Fotos Enviadas */}
        <View className="mt-12 px-6">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center flex-1">
              <View className="mr-4 rounded-2xl overflow-hidden shadow-lg shadow-emerald-500/50">
                <LinearGradient
                  colors={["#10b981", "#16a34a"]} // emerald-500 -> green-600
                  style={{ padding: 12 }}
                >
                  <FontAwesome name="check-square-o" size={22} color="white" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-white font-black text-xl">
                  Fotos Enviadas
                </Text>
                <Text className="text-slate-400 text-sm mt-1">
                  Comprovantes confirmados
                </Text>
              </View>
            </View>
            <View className="bg-emerald-500/20 rounded-full px-4 py-2 border border-emerald-500/50">
              <Text className="text-emerald-400 font-black text-lg">
                {photos.length}
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4 py-4"
          >
            {photos.length === 0 ? (
              <View className="bg-slate-900/50 rounded-3xl p-12 border-2 border-dashed border-slate-700/50 items-center justify-center w-80 mr-4">
                <View className="bg-slate-800 rounded-full p-6 mb-4">
                  <FontAwesome name="image" size={40} color="#475569" />
                </View>
                <Text className="text-slate-500 text-center font-bold text-base">
                  Nenhuma foto enviada
                </Text>
                <Text className="text-slate-600 text-center text-sm mt-2">
                  Tire fotos e envie para confirmar
                </Text>
              </View>
            ) : (
              photos.map((photo, idx) => (
                <View key={idx} className="mr-5 relative">
                  <View className="rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/30 border-4 border-emerald-500/50">
                    <Image
                      source={{ uri: photo.imageUrl }}
                      className="w-64 h-64"
                    />
                  </View>
                  <View className="absolute -top-3 -right-3 rounded-full border-4 border-slate-900 overflow-hidden shadow-xl">
                    <LinearGradient
                      colors={["#34d399", "#22c55e"]} // emerald-400 -> green-500
                      style={{ padding: 12 }}
                    >
                      <FontAwesome name="check" size={16} color="white" />
                    </LinearGradient>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* Botão Premium de Captura */}
        <Pressable
          onPress={takePhoto}
          className="mx-6 mt-10 active:scale-95"
          disabled={delivery?.status === "DELIVERED"}
        >
          <View
            style={styles.shadowIndigo}
            className="rounded-3xl overflow-hidden"
          >
            <LinearGradient
              colors={["#3b82f6", "#4f46e5", "#a855f7"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.15)", "transparent"]}
                style={StyleSheet.absoluteFillObject}
              />
              <View className="p-6 flex-row items-center justify-center">
                <View className="bg-white/20 rounded-full p-4 mr-4 border-2 border-white/30">
                  <FontAwesome name="camera" size={28} color="white" />
                </View>
                <View>
                  <Text className="text-white font-black text-xl">
                    Capturar Canhoto
                  </Text>
                  <Text className="text-white/80 text-sm mt-1">
                    Tire a foto do comprovante
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Pressable>

        {/* Seção: Fotos Aguardando Envio */}
        <View className="mt-8 px-6">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center flex-1">
              <View className="mr-4 rounded-2xl overflow-hidden shadow-lg shadow-amber-500/50">
                <LinearGradient
                  colors={["#f59e0b", "#ea580c"]} // amber-500 -> orange-600
                  style={{ padding: 12 }}
                >
                  <FontAwesome name="hourglass-half" size={22} color="white" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-white font-black text-xl">
                  Aguardando Envio
                </Text>
                <Text className="text-slate-400 text-sm mt-1">
                  Pronto para upload
                </Text>
              </View>
            </View>
            <View className="bg-amber-500/20 rounded-full px-4 py-2 border border-amber-500/50">
              <Text className="text-amber-400 font-black text-lg">
                {localPhotos.length}
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6  py-4"
          >
            {localPhotos.length === 0 ? (
              <View className="bg-slate-900/50 rounded-3xl p-12 border-2 border-dashed border-slate-700/50 items-center justify-center w-80 mr-4">
                <View className="bg-slate-800 rounded-full p-6 mb-4">
                  <FontAwesome name="camera" size={40} color="#475569" />
                </View>
                <Text className="text-slate-500 text-center font-bold text-base">
                  Nenhuma foto capturada
                </Text>
                <Text className="text-slate-600 text-center text-sm mt-2">
                  Use o botão acima para tirar fotos
                </Text>
              </View>
            ) : (
              localPhotos.map((photo, idx) => (
                <View key={idx} className="mr-5 relative">
                  <View className="rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/30 border-4 border-amber-500/50">
                    <Image source={{ uri: photo.uri }} className="w-64 h-64" />
                  </View>
                  <Pressable
                    onPress={() => handleRemoveImage(photo.uri)}
                    className="absolute -top-3 -right-3 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl active:scale-90"
                  >
                    <LinearGradient
                      colors={["#f43f5e", "#dc2626"]} // rose-500 -> red-600
                      style={{ padding: 16 }}
                    >
                      <FontAwesome name="trash" size={16} color="white" />
                    </LinearGradient>
                  </Pressable>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* Botões de Ação */}
        <View className="px-6 pb-10 mt-6 space-y-5">
          {/* Botão Upload */}
          {isSendButtonDisabled ? (
            <View className="rounded-3xl border-2 bg-slate-800 border-slate-700 opacity-60 mb-5">
              <View className="p-6 flex-row items-center justify-center">
                <FontAwesome name="cloud-upload" size={24} color="white" />
                <Text className="text-white font-black text-lg ml-4">
                  {sendButtonText}
                </Text>
              </View>
            </View>
          ) : (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Pressable
                onPress={uploadPhotos}
                className="active:scale-95 mb-5"
              >
                <View
                  style={styles.shadowIndigo}
                  className="rounded-3xl overflow-hidden"
                >
                  <LinearGradient
                    colors={["#3b82f6", "#4f46e5", "#a855f7"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{
                      borderWidth: 2,
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <LinearGradient
                      colors={["rgba(255, 255, 255, 0.15)", "transparent"]}
                      style={StyleSheet.absoluteFillObject}
                    />
                    <View className="p-6 flex-row items-center justify-center">
                      <FontAwesome
                        name={isUploading ? "spinner" : "cloud-upload"}
                        size={24}
                        color="white"
                      />
                      <Text className="text-white font-black text-lg ml-4">
                        {sendButtonText}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </Pressable>
            </Animated.View>
          )}

          {/* Botão Confirmar Entrega */}
          {delivery?.status === "DELIVERED" || !canMarkAsDelivered ? (
            <View
              className={`rounded-3xl border-2 bg-slate-800 border-slate-700 ${
                delivery?.status === "DELIVERED" ? "opacity-100" : "opacity-60"
              }`}
            >
              <View className="p-6 flex-row items-center justify-center">
                <FontAwesome
                  name={
                    delivery?.status === "DELIVERED"
                      ? "check-circle"
                      : "check-square-o"
                  }
                  size={24}
                  color="white"
                />
                <Text className="text-white font-black text-lg ml-4">
                  {delivery?.status === "DELIVERED"
                    ? "Entrega Concluída"
                    : "Confirmar Entrega"}
                </Text>
              </View>
            </View>
          ) : (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Pressable onPress={markAsDelivered} className="active:scale-95">
                <View
                  style={styles.shadowEmerald}
                  className="rounded-3xl overflow-hidden"
                >
                  <LinearGradient
                    colors={["#10b981", "#059669", "#10b981"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{
                      borderWidth: 2,
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <LinearGradient
                      colors={["rgba(255, 255, 255, 0.15)", "transparent"]}
                      style={StyleSheet.absoluteFillObject}
                    />
                    <View className="p-6 flex-row items-center justify-center">
                      <FontAwesome
                        name="check-square-o"
                        size={24}
                        color="white"
                      />
                      <Text className="text-white font-black text-lg ml-4">
                        Confirmar Entrega
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </Pressable>
            </Animated.View>
          )}
        </View>
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowIndigo: {
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },
  shadowEmerald: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },
  shadowAmber: {
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  shadowRose: {
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  shadowGray: {
    shadowColor: "#6b7280",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
});
