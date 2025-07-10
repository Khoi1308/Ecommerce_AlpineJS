import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("shipping")
export class Shipping {
  @PrimaryGeneratedColumn("uuid")
  shippingId!: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  shipping_name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  shipping_price!: string;
}
