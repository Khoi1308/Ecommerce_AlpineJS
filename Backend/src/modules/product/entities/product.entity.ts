import {
  ChildEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Store } from "../../store/entities/store.entity";

@Entity("products")
@TableInheritance({ column: { type: "varchar", name: "product_type" } })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId!: string;

  @Column()
  product_name!: string;

  @Column({ type: "decimal" })
  product_price!: number;

  @Column({ nullable: true })
  img_url!: string;

  @Column({ type: "decimal" })
  product_discount!: number;

  // store_product relationship
  @ManyToMany(() => Store, (store) => store.products)
  stores!: Store[];
}

@ChildEntity()
export class Book extends Product {
  @Column()
  author!: string;
}

@ChildEntity()
export class Clothing extends Product {
  @Column()
  clothing_size!: string;
}
