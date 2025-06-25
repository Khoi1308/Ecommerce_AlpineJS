import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { compareValue, hashValue } from "../../../utils/bcrypt";
import { VerificationCode } from "../../auth/entities/verificationCode.entity";
import { Session } from "../../auth/entities/session.entity";
import { Role } from "./role.entity";
import { Order } from "../../order/entities/order.entity";
import { Address } from "./address.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId!: string;

  @Column({ unique: true, nullable: false })
  username!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ default: false })
  verified!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(
    () => VerificationCode,
    (verificationCode) => verificationCode.user,
  )
  verificationCodes!: VerificationCode[];

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  role!: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

  async comparePassword(value: string): Promise<boolean> {
    return compareValue(value, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashValue(this.password);
  }
}
