import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from "typeorm";
import { Store } from "../../store/entities/store.entity";
import { OrderItem } from "../../order/entities/order.entity";

@Entity("products")
@TableInheritance({ column: { type: "varchar", name: "product_type" } })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId!: string;

  @Column()
  product_name!: string;

  @Column({ type: "decimal" })
  product_price!: number;

  @Column({ type: "text" })
  description!: string;

  @Column()
  product_type!: string;

  @Column({ type: "text", array: true, nullable: true, default: [] })
  img_url!: string[];

  @Column({ type: "decimal" })
  product_discount!: number;

  // Inventory management
  @Column({ type: "int", default: 0 })
  stock_quantity!: number; // Number of product in stock

  @Column({ type: "int", default: 0 })
  reversed_quantity!: number; // Number of product in order

  // Product status
  @Column({ default: true })
  is_active!: boolean;

  @Column({ default: false })
  is_signature!: boolean; // Product is signature

  // store_product relationship
  @ManyToMany(() => Store, (store) => store.products)
  stores!: Store[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems!: OrderItem[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatesAt!: Date;
}

@ChildEntity()
export class Book extends Product {
  @Column()
  author!: string;
}

@ChildEntity()
export class Clothing extends Product {
  @Column()
  clothing_size!: string;
}
