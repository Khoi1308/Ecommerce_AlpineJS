import {
  IVoucherApplicability,
  IVoucherTarget,
  IVoucherType,
} from "../interfaces/voucher.interface";
import { IsDate, IsInt, IsUUID } from "class-validator";

export class CreateVoucherDto {
  voucher_code!: string;
  voucher_name!: string;
  voucher_type?: IVoucherType;
  description?: string;
  voucher_value!: number;
  min_order_value!: number;
  max_discount!: number;
  voucher_limit!: number;
  @IsInt()
  voucher_used!: number;
  max_usage_per_user?: number;
  target_users!: IVoucherTarget;
  @IsDate()
  start_date!: Date;
  @IsDate()
  end_date!: Date;
  applicable_to?: IVoucherApplicability;
  priority?: number;
  is_stackable?: boolean;
  // Relationship product
  applicable_product_ids?: string[];
  excluded_product_ids?: string[];
  // Relationship category
  applicable_category_ids?: string[];
  excluded_category_ids?: string[];
  // Relationship campaign
  campaign_ids?: string[];
  @IsUUID()
  createdBy!: string;
}
