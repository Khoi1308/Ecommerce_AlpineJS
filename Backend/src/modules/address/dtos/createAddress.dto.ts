export interface CreateAddressDto {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  is_default?: boolean;
}
