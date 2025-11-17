import { api } from "@/src/config/api";
import { DeliveryResponse } from "./dtos/DeliveryResponse";
import { DeliveryStatus } from "./enums/status_enum";

class DeliveriesService {
  public async getDeliveries(
    status?: string,
    search?: string,
    userId?: number
  ): Promise<DeliveryResponse[]> {
    try {
      var response = await api.get<DeliveryResponse[]>("/delivery/search", {
        params: {
          status,
          search,
          userId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDeliveryById(id: string): Promise<DeliveryResponse> {
    try {
      var response = await api.get<DeliveryResponse>(`/delivery/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async updateDeliveryStatus(
    id: string,
    status: DeliveryStatus
  ): Promise<void> {
    try {
      await api.patch(`/delivery/${id}`, { status });
    } catch (error) {
      throw error;
    }
  }
}

export default new DeliveriesService();
