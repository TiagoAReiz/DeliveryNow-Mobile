/**
 * Tipos relacionados a fotos e recibos
 */

export interface Photo {
  uri: string;
  fileName?: string;
  type?: string;
}

export interface ReceiptPhoto {
  id?: string;
  imageUrl: string;
  deliveryId?: string;
  uploadedAt?: string;
}

export interface PhotoUploadRequest {
  deliveryId: string;
  photos: Photo[];
}

