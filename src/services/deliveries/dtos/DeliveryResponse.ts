export interface DeliveryResponse {
  id: string;
  name: string;
  address: AddressResponse;
  status: string;
}

export interface AddressResponse {
  city: string;
  street: string;
  zip: string;
  country: string;
  state: string;
  postalCode: string;
}
