export interface UpdateCartItemDto {
  quantity?: number;
  unit_price?: number;
  is_selected?: boolean;
  updatesAt: Date;
  createBy: string;
}
