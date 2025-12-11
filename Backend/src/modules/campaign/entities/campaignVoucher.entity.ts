import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Campaign } from "./campaign.entity";
import { Voucher } from "../../voucher/entities/voucher.entity";

@Entity("campaign_vouchers")
export class CampainVoucher {
  @PrimaryGeneratedColumn("uuid")
  campaignVoucherId!: string;

  @Column({ type: "boolean", default: false })
  is_featured_in_campaign!: boolean;

  @Column({ type: "int", default: 0 })
  display_order!: number;

  @Column({ type: "int", nullable: false })
  campaign_usage_limit!: number;

  @Column({ type: "int", default: 0 })
  campaign_usage_count!: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Campaign, (campaign) => campaign.campaign_vouchers)
  @JoinColumn({ name: "campaign_id" })
  campaign!: Campaign;

  @ManyToOne(() => Voucher, (voucher) => voucher.campaign_vouchers)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;
}
