import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import deliveriesService from "@/services/deliveries/deliveries_service";
import { useEffect, useState } from "react";
import { DeliveryResponse } from "@/services/deliveries/dtos/DeliveryResponse";


export default function DeliveryPage() {
  const { id } = useLocalSearchParams();
  const [delivery, setDelivery]= useState<DeliveryResponse>() 
  async function getDelivery(id:string){
    var response = await deliveriesService.getDeliveryById(id);
    setDelivery(response);
  }
  useEffect(() => {
    const deliveryId = Array.isArray(id) ? id[0] : id;
    if (deliveryId) {
      getDelivery(deliveryId);
    }
  }, [id]);
  return (
    <View>
      <Text>Entrega ID: {delivery?.id}</Text>
    </View>
  );
}
