import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Voucher } from "./voucher.entity";
import { Product } from "../../product/entities/product.entity";

@Entity("voucher_excluded_products")
export class VoucherExcludedProduct {
  @PrimaryGeneratedColumn("uuid")
  excluded_productId!: string;

  @Column({ type: "text", nullable: false })
  exclusion_reason!: string;

  // RELATIONSHIP
  @ManyToOne(() => Voucher, (v) => v.excluded_products)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;

  @ManyToOne(() => Product, (p) => p.excluded_products)
  @JoinColumn({ name: "product_id" })
  product!: Product;
}

@Entity("voucher_applicable_products")
export class VoucherApplicableProduct {
  @PrimaryGeneratedColumn("uuid")
  applicable_productId!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Voucher, (v) => v.applicable_products)
  @JoinColumn({ name: "voucher_id" })
  voucher!: Voucher;

  @ManyToOne(() => Product, (p) => p.applicable_products)
  @JoinColumn({ name: "product_id" })
  product!: Product;
}
