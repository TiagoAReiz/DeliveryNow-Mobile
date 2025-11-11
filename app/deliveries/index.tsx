import deliveriesService from "@/services/deliveries/deliveries_service";
import { DeliveryResponse } from "@/services/deliveries/dtos/DeliveryResponse";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FaSearch, FaTruck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function DeliveriesPage() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<DeliveryResponse[]>([]);

  async function getDeliveries() {
    const data = await deliveriesService.getDeliveries();
    setDeliveries(data);
  }

  useEffect(() => {
    getDeliveries();
  }, []);

  function getProduct(id:string){
    router.push(`/deliveries/${id}`);
  }

  return (
    <View className="p-4 flex bg-gray-900 h-full gap-6">
      <Text className="text-2xl font-bold text-white text-center">
        Entregas
      </Text>
      <View className="flex-row  bg-gray-700 rounded-lg h-12 justify-center items-center align-middle px-4">
        <FaSearch className="text-gray-400" />
        <TextInput
          className="outline-none text-white flex-grow p-3 text-base"
          placeholder="Buscar por nome ou endereço"
        ></TextInput>
      </View>
      <View className="flex flex-row gap-10 text-center justify-center">
        <Pressable className="bg-gray-700 flex-grow rounded-lg p-1">
          <Text className="text-center text-white ">Entregue</Text>
        </Pressable>
        <Pressable className="bg-gray-700 flex-grow rounded-lg p-1">
          <Text className="text-center text-white ">Pendente</Text>
        </Pressable>
        <Pressable className="bg-gray-700 flex-grow rounded-lg p-1">
          <Text className="text-center text-white ">Atrasado</Text>
        </Pressable>
      </View>
      <FlatList
        className=""
        data={deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => getProduct(item.id)} className="w-full bg-gray-800 p-6 my-2 rounded-lg flex flex-row gap-4 items-center">
            <FaTruck className="bg-gray-700 h-12 w-12 p-2 text-white rounded-lg" />
            <View className="flex-col gap-1 flex-grow">
              <Text className="text-white text-base">{item.name}</Text>
              <Text className="text-gray-400">{item.address}</Text>
              <Text
                className={
                  " rounded-3xl px-2 py-0.5 w-fit " +
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
            <View className="flex-shrink">
              <IoIosArrowForward className="text-gray-400" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
