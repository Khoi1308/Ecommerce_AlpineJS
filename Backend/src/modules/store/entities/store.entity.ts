import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("stores")
export class Store {
  @PrimaryGeneratedColumn("uuid")
  storeId!: string;

  @Column({ name: "name", type: "varchar", length: 255 })
  store_name!: string;

  @Column()
  location!: string;

  @ManyToMany(() => Product, (product) => product.stores)
  @JoinTable({
    name: "store_product",
    joinColumn: { name: "store_id", referencedColumnName: "storeId" },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "productId",
    },
  })
  products!: Product[];
}
