import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Address } from "../../address/entities/address.entity";

@Entity("users_addresses")
export class UserAddress {
  @PrimaryGeneratedColumn("uuid")
  userAddressId!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Address, (address) => address.users) 
  @JoinColumn({ name: "address_id" })
  address!: Address;

  @Column({ default: false })
  is_default?: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;
}
