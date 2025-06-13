import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { verificationCodeType } from "../../../config/verificationCodeTypes";

@Entity("vertification_codes")
export class VertificationCode {
  @PrimaryGeneratedColumn("uuid")
  verificationId!: string;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "enum", enum: verificationCodeType })
  type!: verificationCodeType;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createAt!: Date;

  @Column()
  expiresAt!: Date;
}
