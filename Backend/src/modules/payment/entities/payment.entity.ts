import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { UserPaymentMethod } from "./payment_method.entity";

@Entity("payment")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  paymentId!: string;

  @ManyToOne(() => Order, { nullable: false })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => UserPaymentMethod, { nullable: true, eager: true })
  @JoinColumn({ name: "payment_method_id" })
  userPaymentMethod?: UserPaymentMethod;

  @Column("numeric", { precision: 12, scale: 2 })
  amount!: string;

  @Column({ length: 3, default: "VND" })
  currency_code!: string;

  @Column({ default: "PENDING" })
  status!: string;

  @Column({ nullable: true, unique: true })
  transaction_id?: string;

  @Column({ type: "timestamptz", nullable: true })
  paid_at?: Date;

  @Column({ type: "text", nullable: true })
  failed_reason?: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}
