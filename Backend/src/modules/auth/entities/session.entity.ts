import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("sessions")
@Index("idx_sessions_expires_at", ["expiresAt"])
export class Session {
  @PrimaryGeneratedColumn("uuid")
  sessionId!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Index("idx_sessions_user_agent")
  userAgent?: string;

  @Column({
    type: "timestamp",
  })
  expiresAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @Index("idx_sessions_user_id")
  user!: User;
}
