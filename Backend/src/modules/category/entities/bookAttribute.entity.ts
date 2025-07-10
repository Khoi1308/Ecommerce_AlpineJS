import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("book_attributes")
export class BookAttribute {
  @PrimaryGeneratedColumn("uuid")
  bookId!: string;

  @Column({ type: "varchar", length: 255 })
  book_title!: string;

  @Column({ type: "int", default: 0 })
  book_pages!: number;

  @Column({ type: "date" })
  publish_date!: Date;

  // RELATIONSHIP
  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;
}
