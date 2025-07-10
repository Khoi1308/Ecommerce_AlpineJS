import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("clothing_attributes")
export class ClothingAttribute {
  @PrimaryGeneratedColumn("uuid")
  clothingId!: string;

  @Column({ type: "varchar", length: 10 })
  clothing_size!: string;

  @Column({ type: "varchar", length: 50 })
  clothing_color!: string;

  @Column({ type: "varchar", length: 50 })
  clothing_material!: string;

  // RELATIONSHIP
  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;
}
