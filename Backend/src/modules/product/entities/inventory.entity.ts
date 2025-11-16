import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { CartItem } from "../../cart/entities/cartItem.entity";
import { OrderItem } from "../../order/entities/order.entity";

@Entity("inventories")
export class Inventory {
  @PrimaryGeneratedColumn("uuid")
  inventoryId!: string;

  @Column({ type: "int", default: 0 })
  quantity_on_stock!: number;

  @Column({ type: "int", default: 0 })
  available_stock!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 }) // Internal -- don't show for customer
  cost_price!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 }) // price after discount
  selling_price!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 }) // = Product.product_price, can override
  referrence_price!: number;

  // Residual of stock
  @Column({ type: "int", default: 0 })
  reserved_stock!: number;

  @Column({ type: "bigint", default: 1 })
  version!: number;

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

  @OneToMany(() => CartItem, (item) => item.inventory)
  cart_items!: CartItem[];

  @OneToMany(() => OrderItem, (item) => item.inventory)
  orderItems!: OrderItem[];
}
