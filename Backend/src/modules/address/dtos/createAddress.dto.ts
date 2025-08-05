export interface CreateAddressDto {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface UpdateAddressDto {
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
