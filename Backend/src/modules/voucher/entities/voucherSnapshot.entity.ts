import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Voucher } from "./voucher.entity";
import { Order } from "../../order/entities/order.entity";

@Entity("orders_vouchers")
export class OrdersVouchers {
  @PrimaryGeneratedColumn("uuid")
  orderVoucherId!: string;

  @Column({ type: "decimal" })
  appliedDiscount!: number;

  // RELATIONSHIP
  @ManyToOne(() => Order, (order) => order.vouchers)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @ManyToOne(() => Voucher, (voucher) => voucher.orders)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;
}
