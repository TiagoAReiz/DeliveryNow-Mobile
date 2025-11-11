import { DeliveryResponse } from "@/services/deliveries/dtos/DeliveryResponse";
import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FlatList, Text, View } from "react-native";

export default function DeliveriesPage() {
  const [deliveries] = useState<DeliveryResponse[]>([
    {
      id: "1",
      name: "Pedido 1",
      status: "Pendente",
      address: "Rua A, 123",
      deliveryDate: "2025-11-10",
    },
    {
      id: "2",
      name: "Pedido 2",
      status: "Entregue",
      address: "Rua B, 456",
      deliveryDate: "2025-11-09",
    },
    {
      id: "3",
      name: "Pedido 3",
      status: "Atrasado",
      address: "Rua C, 789",
      deliveryDate: "2025-11-11",
    },
  ]);

  return (
    <View className="p-4 flex bg-gray-900 h-full gap-6">
      <Text className="text-2xl font-bold text-white text-center">
        Entregas
      </Text>
      <FlatList
        className=""
        data={deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="w-full bg-gray-800 p-6 my-2 rounded-lg flex flex-row gap-4 items-center  ">
            <FaTruck className="bg-gray-500 h-12 w-12 p-2 text-white rounded-lg" />
            <View className="flex-col gap-1">
              <Text className="text-white text-base">{item.name}</Text>
              <Text className="text-gray-400">{item.address}</Text>
              <Text
                className={
                  " rounded-3xl px-2 py-0.5 " +
                  (item.status === "Pendente"
                    ? "text-yellow-300 bg-yellow-800  "
                    : item.status === "Entregue"
                      ? "text-green-300 bg-green-800 "
                      : item.status === "Atrasado"
                        ? "text-red-300 bg-red-800  "
                        : "text-white")
                }
              >
                - {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
