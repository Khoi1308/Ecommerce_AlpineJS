import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "avatars" })
export class Avatar {
  @PrimaryGeneratedColumn("uuid")
  avatarId!: string;

  @Column({ default: true })
  is_default!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
