import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("inventories")
export class Inventory {
  @PrimaryGeneratedColumn("uuid")
  inventoryId!: string;

  @Column({ type: "int", default: 0 })
  quantity_on_stock!: number;

  @Column({ type: "int", default: 0 })
  available_stock!: number;

  // Residual of stock
  @Column({ type: "int", default: 0 })
  reserved_stock!: number;

  @Column({ type: "varchar", length: 50 })
  sku!: string;

  @Column({ type: "text", array: true, nullable: true, default: [] })
  img_url!: string[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @Column({ type: "uuid" })
  createdBy!: string;

  // RELATIONSHIP
  @ManyToOne(() => Product) // Product - Inventory
  @JoinColumn({ name: "product_id" })
  product!: Product;
}
