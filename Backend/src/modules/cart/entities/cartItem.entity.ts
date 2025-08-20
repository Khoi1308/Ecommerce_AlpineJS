import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Inventory } from "../../product/entities/inventory.entity";

@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  cartItemId!: string;

  @Column({ type: "int", default: 0 })
  item_quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  unit_price!: number;

  @Column({ default: false })
  is_selected!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @Column()
  createdBy!: string;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatesAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart!: Cart;

  @ManyToOne(() => Inventory, (inventory) => inventory.cart_items)
  inventory!: Inventory;
}
