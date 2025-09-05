import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("banners")
export class Banner {
  @PrimaryGeneratedColumn("uuid")
  bannerId!: string;

  @Column()
  img_url!: string;

  @Column({ type: "int" })
  banner_order!: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  @Column()
  createdBy!: string;

  @Column({ default: false })
  delete_flag!: boolean;
}
