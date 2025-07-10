import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";

@Entity("promotions")
export class Promotion {
  @PrimaryGeneratedColumn("uuid")
  promotionId!: string;

  @Column({ type: "varchar", length: 50 })
  promotion_name!: string;

  // Product discount
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  promotion_discount!: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createAt!: Date;

  @Column({ type: "timestamp with time zone" })
  expiresAt!: Date;

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
