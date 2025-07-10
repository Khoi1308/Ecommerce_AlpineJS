import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promotion } from "./promotion.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  categoryId!: string;

  @Column({ type: "varchar", length: 50 })
  category_name!: string;

  @Column({ type: "text", nullable: true })
  category_description!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: string;

  // RELATIONSHIP
  @ManyToMany(() => Promotion, (promotion) => promotion.categories) // Category - Promotion
  promotions!: Promotion[];
}
