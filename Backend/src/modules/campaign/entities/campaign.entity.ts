import {
  Column,
  OneToMany,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CampainVoucher } from "./campaignVoucher.entity";
import { CampaignPromotion } from "./CampaignPromotion";

@Entity("campaigns")
export class Campaign {
  @PrimaryGeneratedColumn("uuid")
  campaignId!: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  campaign_name!: string;

  @Column({ type: "varchar", length: 200, nullable: false, unique: true })
  campaign_slug!: string;

  // TIME
  @CreateDateColumn({ type: "timestamp with time zone" })
  start_date!: Date;

  @Column({ type: "timestamp with time zone", nullable: false })
  end_date!: Date;

  // SETTING
  @Column({ type: "boolean", default: false })
  allow_stacking!: boolean; // Allow to stack in campaign

  @Column({ type: "boolean", default: false })
  allow_external_promotions!: boolean; // Allow to stack external promotions in campaign

  @Column({ type: "boolean", default: true })
  allow_vouchers!: boolean; // Without free shipping voucher

  @Column({ type: "boolean", default: true })
  allow_shipping_voucher!: boolean;

  // DISPLAY
  @Column({ type: "text", array: true })
  banner_img!: string[];

  // STATUS
  @Column({ type: "boolean", default: false })
  is_active!: boolean;

  @Column({ type: "boolean", default: false })
  is_featured!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  @Column({ type: "uuid" })
  createdBy!: string;

  // RELATIONSHIP
  @OneToMany(() => CampainVoucher, (c) => c.campaign)
  campaign_vouchers!: CampainVoucher[];

  @OneToMany(() => CampaignPromotion, (c) => c.campaign)
  campaign_promotions!: CampaignPromotion[];
}
