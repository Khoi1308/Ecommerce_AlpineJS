import { ShippingStrategy } from "../interfaces/shipping.interface";

export interface CreateShippingRateDto {
  rate_name: string;
  rate_stratrgy: ShippingStrategy;
  base_price: number;
  base_distance: number;
  price_per_weight: number;
  estimated_devivery_time: number;
  max_distance: number;
  max_weight: number;
  // Shipping zone
  zone_id: string;
}
