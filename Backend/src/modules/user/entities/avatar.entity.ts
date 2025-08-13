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

  @Column({ type: "text", array: true, nullable: true, default: [] })
  img_url!: string[];

  @Column({ default: true })
  is_default!: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.avatars)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
