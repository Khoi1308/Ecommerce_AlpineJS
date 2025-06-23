import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../user/entities/role.entity";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  permissionId!: string;

  @Column({ unique: true })
  permission_name!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
