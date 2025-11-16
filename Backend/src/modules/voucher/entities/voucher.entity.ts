import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrdersVouchers } from "./voucherSnapshot.entity";
import {
  IVoucherApplicability,
  IVoucherTarget,
  IVoucherType,
} from "../interfaces/voucher.interface";
import { UserVoucherClaim, UserVoucherUsage } from "./voucherUser.entity";
import { VoucherExcludedProduct } from "./voucherProduct.entity";

@Entity("vouchers")
export class Voucher {
  @PrimaryGeneratedColumn("uuid")
  voucherId!: string;

  @Column({ unique: true })
  voucher_code!: string;

  @Column({
    type: "enum",
    enum: IVoucherType,
    default: IVoucherType.FIXED_AMOUNT,
  })
  voucher_type!: IVoucherType;

  @Column()
  description!: string;

  // VALUE
  @Column({ type: "decimal", precision: 10, scale: 2 }) // Voucher's value (discount): percent | amount
  voucher_value!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true }) // Min order's value to recieve voucher
  min_order_value!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true }) // Max order's value can discount
  max_discount!: number;

  // LIMIT USAGE
  @Column({ default: 1 })
  voucher_limit!: number; // Total limit

  @Column({ default: 0 }) // Number of used voucher
  voucher_used!: number;

  @Column({ type: "int", default: 1 })
  max_usage_per_user!: number;

  // TARGET
  @Column({
    type: "enum",
    enum: IVoucherTarget,
    default: IVoucherTarget.ALL_USERS,
  })
  target_users!: IVoucherTarget;

  // TIME
  @Column({ type: "timestamp with time zone", nullable: true })
  start_date!: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  end_date!: Date;

  // APPLICABILITY
  @Column({
    type: "enum",
    enum: IVoucherApplicability,
    default: IVoucherApplicability.ALL_PRODUCT,
  })
  applicable_to!: IVoucherApplicability;

  // METADATA
  @Column({ type: "varchar", length: 200, nullable: true }) // Vouchers group
  campaign_name!: string;

  @Column({ type: "int", default: 0 })
  priority!: number;

  @Column({ type: "boolean", default: false }) // This voucher can be combined with other vouchers
  is_stackable!: boolean;

  @Column({ type: "text", nullable: true }) // Terms and policy
  terms_conditions!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  createdAt!: Date;

  @Column({ type: "uuid" })
  createdBy!: string;

  @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
  updatesAt!: Date;

  @Column({ type: "boolean", default: false })
  delete_flag!: boolean;

  // RELATIONSHIP
  @OneToMany(() => OrdersVouchers, (orderVoucher) => orderVoucher.voucher)
  orders!: OrdersVouchers[];

  @OneToMany(() => UserVoucherClaim, (claim) => claim.voucher)
  claims!: UserVoucherClaim[];

  @OneToMany(() => UserVoucherUsage, (usage) => usage.voucher)
  usages!: UserVoucherUsage[];

  @OneToMany(() => VoucherExcludedProduct, (ex_product) => ex_product.voucher)
  excluded_products!: VoucherExcludedProduct[;
}
