import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("idempotency_records")
@Index("idx_idempotency_key_expires", ["idempotency_key", "expiresAt"])
@Index("idx_idempotency_expires", ["expiresAt"]) // For cleanup
export class Idempotency {
  @PrimaryGeneratedColumn("uuid")
  idempotencyId!: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  idempotency_key!: string;

  @Column({ type: "jsonb", nullable: false })
  result_data!: Record<string, any>;

  @Column({ type: "timestamp" })
  expiresAt!: Date;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatesAt!: Date;
}
