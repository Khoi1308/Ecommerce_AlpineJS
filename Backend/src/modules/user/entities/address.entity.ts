import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  addressId!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  postalCode!: string;

  @Column()
  country!: string;

  @Column({ default: false })
  is_default!: boolean;
}
