import deliveriesService from "@/services/deliveries/deliveries_service";
import { DeliveryResponse } from "@/services/deliveries/dtos/DeliveryResponse";
import { DeliveryStatus } from "@/services/deliveries/enums/status_enum";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FaSearch, FaTruck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function DeliveriesPage() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<DeliveryResponse[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: "", status: "" });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  type Filters = {
    search: string;
    status: DeliveryStatus | "";
  };

  async function getDeliveries(status?: string, search?: string) {
    const data = await deliveriesService.getDeliveries(status, search);
    setDeliveries(data);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => {
      clearTimeout(handler); // limpa timeout se o usuário digitar outra letra
    };
  }, [filters.search]);

  useEffect(() => {
    getDeliveries(filters.status, debouncedSearch);
  }, [filters.status, debouncedSearch]);

  function getProduct(id: string) {
    router.push(`/deliveries/${id} ` as any);
  }
  function handleStatusFilter(status: DeliveryStatus) {
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

  return (
    <View className="p-4 flex bg-gray-900 h-full gap-6">
      <Text className="text-2xl font-bold text-white text-center">
        Entregas
      </Text>
      <View className="flex-row  bg-gray-700 rounded-lg h-12 justify-center items-center align-middle px-4">
        <FaSearch className="text-gray-400" />
        <TextInput
          onChangeText={handleSearchFilter}
          value={filters.search}
          className="outline-none text-white flex-grow p-3 text-base"
          placeholder="Buscar por nome ou endereço"
        ></TextInput>
      </View>
      <View className="flex flex-row gap-10 text-center justify-center">
        <Pressable
          className={
            filters.status === ""
              ? "bg-blue-700 flex-grow rounded-lg p-1 transition-colors duration-500"
              : "bg-gray-600 flex-grow rounded-lg p-1 transition-colors duration-500"
          }
          onPress={() => handleStatusFilter("" as DeliveryStatus)}
        >
          <Text className="text-center text-white ">Todos</Text>
        </Pressable>
        <Pressable
          className={
            filters.status === DeliveryStatus.DELIVERED
              ? "bg-blue-700 flex-grow rounded-lg p-1 transition-colors duration-500"
              : "bg-gray-600 flex-grow rounded-lg p-1 transition-colors duration-500"
          }
          onPress={() => handleStatusFilter(DeliveryStatus.DELIVERED)}
        >
          <Text className="text-center text-white ">Entregue</Text>
        </Pressable>
        <Pressable
          className={
            filters.status === DeliveryStatus.PENDING
              ? "bg-blue-700 flex-grow rounded-lg p-1 transition-colors duration-500"
              : "bg-gray-600 flex-grow rounded-lg p-1 transition-colors duration-500"
          }
          onPress={() => handleStatusFilter(DeliveryStatus.PENDING)}
        >
          <Text className="text-center text-white ">Pendente</Text>
        </Pressable>
        <Pressable
          className={
            filters.status === DeliveryStatus.LATE
              ? "bg-blue-700 flex-grow rounded-lg p-1 transition-colors duration-500"
              : "bg-gray-600 flex-grow rounded-lg p-1 transition-colors duration-500"
          }
          onPress={() => handleStatusFilter(DeliveryStatus.LATE)}
        >
          <Text className="text-center text-white ">Atrasado</Text>
        </Pressable>
      </View>

      <FlatList
        className=""
        data={deliveries}
        keyExtractor={(item) => item.id}
        onEndReached={() => getDeliveries(20)} // dispara quando chega no final
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => getProduct(item.id)}
            className="w-full bg-gray-800 p-6 my-2 rounded-lg flex flex-row gap-4 items-center"
          >
            <FaTruck className="bg-gray-700 h-12 w-12 p-2 text-white rounded-lg" />
            <View className="flex-col gap-1 flex-grow">
              <Text className="text-white text-base">{item.name}</Text>
              <Text className="text-gray-400">{item.address}</Text>
              <Text
                className={
                  " rounded-3xl px-2 py-0.5 w-fit " +
                  (item.status === DeliveryStatus.PENDING
                    ? "text-yellow-300 bg-yellow-800  "
                    : item.status === DeliveryStatus.DELIVERED
                      ? "text-green-300 bg-green-800 "
                      : item.status === DeliveryStatus.LATE
                        ? "text-red-300 bg-red-800  "
                        : "text-white")
                }
              >
                - {translateStatus(item.status as DeliveryStatus)}
              </Text>
            </View>
            <View className="flex-shrink">
              <IoIosArrowForward className="text-gray-400" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
