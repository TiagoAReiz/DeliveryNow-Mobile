import { api } from "@/src/config/api";
import DeliveryPhoto from "./dtos/photo";
import { ReceiptResponse } from "./dtos/receipt_response";

class ReceiptService {
  public async uploadReceiptPhotos(
    deliveryId: string,
    photos: DeliveryPhoto[]
  ): Promise<void> {
    try {
      for (const photo of photos) {
        const formData = new FormData();
        formData.append("image", {
          uri: photo.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        } as any);
        await api.post(`/receipt/send/${deliveryId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  public async getReceiptPhotos(
    deliveryId: string
  ): Promise<ReceiptResponse[]> {
    try {
      const response = await api.get<ReceiptResponse[]>(
        `/receipt/delivery/${deliveryId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default new ReceiptService();
