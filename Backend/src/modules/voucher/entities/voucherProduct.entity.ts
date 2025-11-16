import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Voucher } from "./voucher.entity";

@Entity("voucher_excluded_products")
export class VoucherExcludedProduct {
  @PrimaryGeneratedColumn("uuid")
  excludedId!: string;

  @Column({ type: "text", nullable: false })
  exclusion_reason!: string;

  // RELATIONSHIP
  @ManyToOne(() => Voucher, (v) => v.excluded_products)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;
}
