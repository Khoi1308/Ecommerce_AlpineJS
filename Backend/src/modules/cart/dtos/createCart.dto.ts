export interface AddToCarDto {
  user_id: string;
  inventory_id: string;
  quantity: string;
  idempotency?: string;
}
