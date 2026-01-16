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
import { Category } from "../../category/entities/category.entity";
import {
  VoucherApplicableProduct,
  VoucherExcludedProduct,
} from "../../voucher/entities/voucherProduct.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId!: string;

  @Column()
  product_name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 }) // Manufacturer Suggested Retail Price
  product_price!: number;

  // @Column({ type: "decimal" })
  // product_discount!: number;

  @Column({ type: "text", array: true, nullable: true, default: [] })
  img_url!: string[];

  @Column({ type: "text", nullable: true })
  description!: string;

  // Product status
  @Column({ default: true })
  is_active!: boolean;

  @Column({ default: false })
  is_signature!: boolean; // Check product is signature

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatesAt!: Date;

  @ManyToOne(() => Category, (category) => category.categoryId)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  // RELATIONSHIP
  @OneToMany(() => VoucherExcludedProduct, (ex_product) => ex_product.product)
  excluded_products!: VoucherExcludedProduct[];

  @OneToMany(() => VoucherApplicableProduct, (app_prod) => app_prod.product)
  applicable_products!: VoucherApplicableProduct[];
}
