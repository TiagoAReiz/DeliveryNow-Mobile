/**
 * Tipos relacionados a deliveries/entregas
 */

export enum DeliveryStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  LATE = 'LATE',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Delivery {
  id: string;
  name: string;
  address: Address | string;
  status: DeliveryStatus | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DeliveryFilters {
  search: string;
  status: DeliveryStatus | '';
}

export interface StatusColorScheme {
  bg: string;
  text: string;
  border: string;
}

export interface StatusInfo {
  gradientColors: string[];
  text: string;
  icon: string;
  shadowStyle: any;
}

