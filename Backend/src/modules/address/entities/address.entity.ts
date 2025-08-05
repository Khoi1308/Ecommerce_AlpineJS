import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAddress } from "../../user/entities/userAddress.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  addressId!: string;

  @OneToMany(() => UserAddress, (user) => user.address)
  users!: UserAddress[];

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  postalCode!: string;

  @Column()
  country!: string;
}
