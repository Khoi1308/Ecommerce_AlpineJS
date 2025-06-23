import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permission } from "../../permission/entities/permission.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  roleId!: string;

  @Column({ unique: true, nullable: false })
  role_name!: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "roles_permissions",
    joinColumn: { name: "role_id", referencedColumnName: "roleId" },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "permissionId",
    },
  })
  permissions!: Permission[];
}
