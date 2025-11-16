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

import { Address } from "../../address/entities/address.entity";
import { Inventory } from "../../product/entities/inventory.entity";
import { ShippingRate } from "../../shipping/entities/shippingZone.entity";
import { OrdersVouchers } from "../../voucher/entities/voucherSnapshot.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  orderId!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal_price!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  shipping_fee!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discount_amount!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price!: number;

  // SHIPPING INFOMATION
  @Column({ type: "decimal", precision: 8, scale: 2 })
  shipping_distance!: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  shipping_weight!: number;

  @Column({ type: "int" })
  estimate_delivery_time!: number;

  @Column({ default: "PENDING" })
  order_status!: string; // PENDING/CONFIRMED/SHIPPED/COMPLETED/CANCELED

  @Column({ default: "UNPAID" })
  payment_status!: string; // UNPAID/PARTIALLY_PAID/PAID/REFUNDED/FAILED

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

  @ManyToOne(() => ShippingRate)
  @JoinColumn({ name: "shipping_rate_id" })
  shipping!: ShippingRate;
}

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  orderItemId!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  unit_price!: number; // Product's price at created order

  @Column({ type: "bigint", default: 0 })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price!: number;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @ManyToOne(() => Inventory, (inventory) => inventory.orderItems)
  @JoinColumn({ name: "inventory_id" })
  inventory!: Inventory;
}
