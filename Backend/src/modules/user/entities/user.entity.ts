import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { compareValue, hashValue } from "../../../utils/bcrypt";
import { VertificationCode } from "../../auth/entities/vertificationCode.entity";

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

  @Column({ default: "user" })
  user_role!: "user" | "admin";

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @CreateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(
    () => VertificationCode,
    (verificationCode) => verificationCode.user,
  )
  verificationCodes!: VertificationCode[];

  async comparePassword(value: string): Promise<boolean> {
    return compareValue(value, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashValue(this.password);
  }
}
