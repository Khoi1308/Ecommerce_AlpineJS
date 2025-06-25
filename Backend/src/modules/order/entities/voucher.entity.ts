import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdersVouchers } from "./order.entity";

@Entity("vouchers")
export class Voucher {
  @PrimaryGeneratedColumn("uuid")
  voucherId!: string;

  @Column({ unique: true })
  voucher_code!: string;

  @Column({
    type: "enum",
    enum: ["PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING"],
  })
  voucher_type!: string;

  @Column()
  description!: string;

  // Voucher's value (discount): percent | amount
  @Column({ type: "decimal", precision: 10, scale: 2 })
  voucher_value!: number;

  // Min order's value to recieve voucher
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  min_order_value!: number;

  // Max order's value can discount
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  max_discount!: number;

  // Limit usage
  @Column({ default: 1 })
  voucher_limit!: number;

  // Number of used voucher
  @Column({ default: 0 })
  voucher_used!: number;

  @Column({ default: true })
  is_active!: boolean;

  @OneToMany(() => OrdersVouchers, (orderVoucher) => orderVoucher.voucher)
  orders!: OrdersVouchers[];
}
