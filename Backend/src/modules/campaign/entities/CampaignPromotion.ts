import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Campaign } from "./campaign.entity";
import { Promotion } from "../../promotion/entities/promotion.entity";

export class CampaignPromotion {
  @PrimaryGeneratedColumn("uuid")
  campaign_promotionId!: string;

  @Column({ type: "boolean", default: false })
  is_featured_in_campaign!: boolean;

  @Column({ type: "int", default: 0 })
  display_order!: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  campaign_badge_label!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  campaign_badge_color!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @Column({ type: "uuid" })
  createdBy!: string;

  // RELATIONSHIP
  @ManyToOne(() => Campaign, (cam) => cam.campaign_promotions)
  @JoinColumn({ name: "campaign_id" })
  campaign!: Campaign;

  @ManyToOne(() => Promotion, (cam) => cam.campaign_promotions)
  @JoinColumn({ name: "promotion_id" })
  promotion!: Promotion;
}
