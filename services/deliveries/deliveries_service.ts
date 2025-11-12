import { api } from "@/config/api";
import { DeliveryResponse } from "./dtos/DeliveryResponse";

class DeliveriesService {
  public async getDeliveries(
    status?: string,
    search?: string
  ): Promise<DeliveryResponse[]> {
    var response = await api.get<DeliveryResponse[]>("/delivery/search", {
      params: {
        status,
        search,
      },
    });
    return response.data;
  }

  public async getDeliveryById(id: string): Promise<DeliveryResponse> {
    var response = await api.get<DeliveryResponse>(`/delivery/${id}`);
    return response.data;
  }
  public async updateDeliveryStatus(id: string, status: string): Promise<void> {
    await api.patch(`/delivery/${id}`, { status });
  }
}

export default new DeliveriesService();
