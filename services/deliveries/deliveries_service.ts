import { api } from "@/config/api";
import { DeliveryResponse } from "./dtos/DeliveryResponse";

class DeliveriesService {
  public async getDeliveries(): Promise<DeliveryResponse[]> {
    var response = await api.get<DeliveryResponse[]>("/deliveries");
    return response.data;
  }
}

export default new DeliveriesService();
