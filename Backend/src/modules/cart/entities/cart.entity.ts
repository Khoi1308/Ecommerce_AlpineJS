import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { CartItem } from "./cartItem.entity";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  cartId!: string;

  @OneToMany(() => CartItem, (item) => item.cart)
  cart_items!: CartItem[];

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;
}
