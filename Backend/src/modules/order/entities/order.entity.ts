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
import { Product } from "../../product/entities/product.entity";
import { Address } from "../../user/entities/address.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  orderId!: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "decimal" })
  total_price!: number;

  @Column({ nullable: false })
  payment_method!: string;

  @Column({ nullable: false })
  status!: string;

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

  @ManyToOne(() => Address, { nullable: true })
  @JoinColumn({ name: "order_address" })
  order_address!: Address | null;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;
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

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "productId" })
  product!: Product;

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
