import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import {
  IPromotionScope,
  IPromotionType,
} from "../interfaces/promotion.interface";

@Entity("promotions")
export class Promotion {
  @PrimaryGeneratedColumn("uuid")
  promotionId!: string;

  @Column({ type: "varchar", length: 50 })
  promotion_name!: string;

  @Column({ type: "enum", enum: IPromotionType })
  promotion_type!: IPromotionType;

  @Column({ type: "enum", enum: IPromotionScope })
  promotion_scope!: IPromotionScope;

  // VALUE
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discount_value!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  max_discount!: number;

  // TIME
  @Column({ type: "timestamp with time zone", nullable: false })
  start_date!: Date;

  @Column({ type: "timestamp with time zone", nullable: false })
  end_date!: Date;

  // METADATA
  @Column({ type: "int", default: 0 })
  priority!: number; // The higher the number, the higher the priority

  @Column({ type: "varchar", length: 50 })
  badge_label!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "boolean", default: false })
  is_featured!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createAt!: Date;

  @Column({ type: "timestamp with time zone" })
  expiresAt!: Date;

  @Column({ type: "uuid", nullable: false })
  createdBy!: string;

  // RELATIONSHIP
  @ManyToMany(() => Category, (category) => category.promotions)
  @JoinTable({
    name: "categories_promotions",
    joinColumn: {
      name: "promotion_id",
      referencedColumnName: "promotionId",
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "categoryId",
    },
  })
  categories!: Category[];
}
