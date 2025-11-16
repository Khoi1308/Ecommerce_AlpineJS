import { ShippingScope } from "../interfaces/shipping.interface";

export interface CreateShippingZoneDto {
  zone_name: string;
  free_distance: number;
  shipping_scope: ShippingScope;
}
