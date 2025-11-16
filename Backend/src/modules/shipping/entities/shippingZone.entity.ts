import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  ShippingScope,
  ShippingStrategy,
} from "../interfaces/shipping.interface";

@Entity("shipping_zones")
export class Shipping {
  @PrimaryGeneratedColumn("uuid")
  zoneId!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  zone_name!: string;

  @Column({
    type: "enum",
    enum: ShippingScope,
    default: ShippingScope.DOMESTIC,
  })
  shipping_scope!: ShippingScope;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  free_distance!: number;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatesAt!: Date;

  // RELATIONSHIP
  @OneToMany(() => ShippingRate, (rate) => rate.shipping_zone)
  rates!: ShippingRate[];
}

@Entity("shipping_rates")
export class ShippingRate {
  @PrimaryGeneratedColumn("uuid")
  rateId!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  rate_name!: string;

  @Column({ type: "enum", enum: ShippingStrategy })
  rate_strategy!: ShippingStrategy;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  base_price!: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  base_distance!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price_per_weight!: number;

  @Column({ type: "int", nullable: true })
  estimated_devivery_time!: number; // unit: minutes

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  max_distance!: number;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  max_weight!: number;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatesAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Shipping, (zone) => zone.rates)
  @JoinColumn({ name: "zone_id" })
  shipping_zone!: Shipping;

  @OneToMany(() => ShippingDistanceTier, (tier) => tier.shipping_rate)
  distance_tiers!: ShippingDistanceTier[];
}

@Entity("shipping_distance_tiers")
export class ShippingDistanceTier {
  @PrimaryGeneratedColumn("uuid")
  tierId!: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  min_distance!: number;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  max_distance!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  tier_price!: number;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "int", default: 0 })
  tier_order!: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => ShippingRate, (rate) => rate.distance_tiers)
  @JoinColumn({ name: "shipping_rate_id" })
  shipping_rate!: ShippingRate;
}
