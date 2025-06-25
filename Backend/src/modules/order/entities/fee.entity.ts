import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("fees")
export class Fee {
  @PrimaryGeneratedColumn("uuid")
  feeId!: string;

  @Column({ nullable: false })
  fee_name!: string;

  @Column({ type: "enum", enum: ["FIXED", "PERCENTAGE"] })
  fee_type!: string;

  @Column({ type: "decimal" })
  fee_amount!: number;

  @ManyToMany(() => Order, (order) => order.fees)
  orders!: Order[];

  @Column({ default: true })
  is_active!: boolean;
}
