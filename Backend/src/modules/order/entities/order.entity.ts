import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Fee } from "./fee.entity";
import { Voucher } from "./voucher.entity";
import { Address } from "../../user/entities/address.entity";
import { Shipping } from "./shipping.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  orderId!: string;

  @Column({ type: "decimal" })
  total_price!: number;

  @Column({ nullable: false })
  payment_method!: string;

  @Column({ nullable: false })
  status!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToMany(() => Fee)
  @JoinTable({
    name: "orders_fees",
    joinColumn: { name: "order_id", referencedColumnName: "orderId" },
    inverseJoinColumn: { name: "fee_id", referencedColumnName: "feeId" },
  })
  fees!: Fee[];

  @OneToMany(() => OrdersVouchers, (orderVoucher) => orderVoucher.order)
  vouchers!: OrdersVouchers[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems!: OrderItem[];

  @ManyToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address!: Address | null;

  @ManyToOne(() => Shipping)
  @JoinColumn({ name: "shipping_id" })
  shipping!: Shipping;
}

@Entity("orders_vouchers")
export class OrdersVouchers {
  @PrimaryGeneratedColumn("uuid")
  orderVoucherId!: string;

  @ManyToOne(() => Order, (order) => order.vouchers)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @ManyToOne(() => Voucher, (voucher) => voucher.orders)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;

  @Column({ type: "decimal" })
  appliedDiscount!: number;
}

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  orderItemId!: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  unit_price!: number; // Product's price at created order

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price!: number;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;
}
