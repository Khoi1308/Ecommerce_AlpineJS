import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("order_status_history")
export class OrderStatusHistory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @Column()
  old_status!: string;

  @Column()
  new_status!: string;

  @Column({ nullable: true })
  note!: string;

  @CreateDateColumn()
  changed_at!: Date;
}
