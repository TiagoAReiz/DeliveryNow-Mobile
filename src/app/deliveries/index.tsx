import { useAuth } from "@/src/provider/auth-context";
import deliveriesService from "@/src/services/deliveries/deliveries_service";
import { DeliveryResponse } from "@/src/services/deliveries/dtos/DeliveryResponse";
import { DeliveryStatus } from "@/src/services/deliveries/enums/status_enum";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function DeliveriesPage() {
  const { onLogout, authState } = useAuth();
  const userId = authState?.userId;
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<DeliveryResponse[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: "", status: "" });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  type Filters = {
    search: string;
    status: DeliveryStatus | "";
  };

  async function getDeliveries(
    status?: string,
    search?: string,
    userId?: Number
  ) {
    const data = await deliveriesService.getDeliveries(status, search, userId);
    setDeliveries(data);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.search]);

  useEffect(() => {
    getDeliveries(filters.status, debouncedSearch, userId as Number);
  }, [filters.status, debouncedSearch, userId]);

  useFocusEffect(() => {
    getDeliveries(filters.status, debouncedSearch, userId as Number);
  });

  function getProduct(id: string) {
    router.push(`/deliveries/${id} ` as any);
  }

  function handleStatusFilter(status: DeliveryStatus | "") {
    setFilters((prev) => ({ ...prev, status }));
  }

  function handleSearchFilter(search: string) {
    setFilters((prev) => ({ ...prev, search }));
  }

  function translateStatus(status: DeliveryStatus): string {
    switch (status) {
      case DeliveryStatus.DELIVERED:
        return "Entregue";
      case DeliveryStatus.PENDING:
        return "Pendente";
      case DeliveryStatus.LATE:
        return "Atrasado";
      default:
        return status;
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case DeliveryStatus.PENDING:
        return {
          bg: "rgba(245, 158, 11, 0.2)", // amber-500/20
          text: "#fbbf24", // amber-400
          border: "rgba(245, 158, 11, 0.5)",
        };
      case DeliveryStatus.DELIVERED:
        return {
          bg: "rgba(16, 185, 129, 0.2)", // emerald-500/20
          text: "#34d399", // emerald-400
          border: "rgba(16, 185, 129, 0.5)",
        };
      case DeliveryStatus.LATE:
        return {
          bg: "rgba(239, 68, 68, 0.2)", // red-500/20
          text: "#f87171", // red-400
          border: "rgba(239, 68, 68, 0.5)",
        };
      default:
        return {
          bg: "rgba(107, 114, 128, 0.2)",
          text: "#9ca3af",
          border: "rgba(107, 114, 128, 0.5)",
        };
    }
  };

  const FilterButton = ({
    title,
    active,
    onPress,
  }: {
    title: string;
    active: boolean;
    onPress: () => void;
  }) => (
    <Pressable onPress={onPress} className="mr-3 active:opacity-80">
      {active ? (
        /* CORREÇÃO AQUI: Padding e Radius movidos para style */
        <LinearGradient
          colors={["#3b82f6", "#4f46e5", "#7c3aed"]} // Blue to Purple
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.shadowActive,
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

  return (
    <View className="flex-1 bg-slate-950">
      {/* Background Geral */}
      <LinearGradient
        colors={["#020617", "#0f172a", "#020617"]} // Slate 950 -> 900 -> 950
        className="absolute inset-0"
      />

      {/* Header Compacto com Gradiente */}
      <View className="pt-14 pb-6 px-6 z-10">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">
              Bem-vindo de volta
            </Text>
            <Text className="text-3xl font-black text-white">Entregas</Text>
          </View>
          <Pressable
            onPress={onLogout}
            className="bg-slate-800/80 p-3 rounded-full border border-slate-700 active:bg-red-500/20 active:border-red-500/50"
          >
            <FontAwesome name="sign-out" size={20} color="#f87171" />
          </Pressable>
        </View>

        {/* Barra de Busca Glassmorphism */}
        <View className="flex-row items-center bg-white/5 rounded-2xl px-4 h-12 border border-white/10 mb-6">
          <FontAwesome name="search" size={18} color="#94a3b8" />
          <TextInput
            onChangeText={handleSearchFilter}
            value={filters.search}
            className="flex-1 ml-3 text-white text-base font-medium"
            placeholder="Buscar por nome ou endereço..."
            placeholderTextColor="#64748b"
          />
        </View>

        {/* Filtros Horizontais */}
        <View className="flex-row">
          <FilterButton
            title="Todos"
            active={filters.status === ""}
            onPress={() => handleStatusFilter("")}
          />
          <FilterButton
            title="Pendente"
            active={filters.status === DeliveryStatus.PENDING}
            onPress={() => handleStatusFilter(DeliveryStatus.PENDING)}
          />
          <FilterButton
            title="Entregue"
            active={filters.status === DeliveryStatus.DELIVERED}
            onPress={() => handleStatusFilter(DeliveryStatus.DELIVERED)}
          />
          <FilterButton
            title="Atrasado"
            active={filters.status === DeliveryStatus.LATE}
            onPress={() => handleStatusFilter(DeliveryStatus.LATE)}
          />
        </View>
      </View>

      {/* Lista de Entregas */}
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const statusStyle = getStatusColor(item.status);
          return (
            <Pressable
              onPress={() => getProduct(item.id)}
              className="mb-4 active:scale-[0.98] transition-transform"
            >
              {/* Card com Borda Gradiente Sutil */}
              <LinearGradient
                colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"]}
                style={{ borderRadius: 24, padding: 1 }} // CORREÇÃO AQUI
              >
                <View className="bg-slate-900/90 rounded-3xl p-5 backdrop-blur-md">
                  <View className="flex-row items-center">
                    {/* Ícone do Caminhão */}
                    <View className="bg-indigo-500/10 rounded-2xl p-3 mr-4 border border-indigo-500/20">
                      <FontAwesome name="truck" size={20} color="#818cf8" />
                    </View>

                    {/* Infos Centrais */}
                    <View className="flex-1">
                      <Text
                        className="text-white font-bold text-lg mb-1"
                        numberOfLines={1}
                      >
                        {item.name}
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
                          {item.address}
                        </Text>
                      </View>
                    </View>

                    {/* Seta */}
                    <FontAwesome
                      name="chevron-right"
                      size={14}
                      color="#475569"
                    />
                  </View>

                  {/* Badge de Status e ID (Footer do Card) */}
                  <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-white/5">
                    <Text className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                      #{String(item.id).substring(0, 8)}
                    </Text>
                    <View
                      className="px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: statusStyle.bg,
                        borderColor: statusStyle.border,
                      }}
                    >
                      <Text
                        style={{ color: statusStyle.text }}
                        className="text-xs font-bold"
                      >
                        {translateStatus(item.status as DeliveryStatus)}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <FontAwesome name="inbox" size={50} color="#334155" />
            <Text className="text-slate-500 mt-4 text-lg font-medium">
              Nenhuma entrega encontrada
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shadowActive: {
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
