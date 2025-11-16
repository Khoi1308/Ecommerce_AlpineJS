import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Voucher } from "./voucher.entity";

@Entity("user_voucher_claims")
export class UserVoucherClaim {
  @PrimaryGeneratedColumn("uuid")
  claimId!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
  expiresAt!: Date; // Personal expiry

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @Column({ type: "boolean", default: true })
  is_used!: boolean;

  // RELATIONSHOP
  @ManyToOne(() => Voucher, (v) => v.claims)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;
}

@Entity("user_voucher_usage")
export class UserVoucherUsage {
  @PrimaryGeneratedColumn("uuid")
  usageId!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "int", default: 1 })
  usage_count!: number;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  last_used_at!: Date;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Voucher, (v) => v.usages)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;
}
