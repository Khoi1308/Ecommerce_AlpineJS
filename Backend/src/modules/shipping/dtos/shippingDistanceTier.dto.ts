export interface CreateShippingDistanceTierDto {
  min_distance: number;
  max_distance: number;
  tier_price: number;
  tier_order: number;
  shipping_rate_id: string;
}
