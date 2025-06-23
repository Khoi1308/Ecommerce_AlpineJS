import { Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { AppData } from "../../../config/db";

export class PermissionRepository extends Repository<Permission> {
  constructor() {
    super(Permission, AppData.manager);
  }

  async findAllPermissionsByRoleId(roleId: string): Promise<string[] | null> {
    const permissions = await this.createQueryBuilder("permission")
      .select(["permission.permissionId", "permission.permission_name"])
      .innerJoin(
        "roles_permissions",
        "rp",
        "rp.permission_id = permission.permissionId",
      )
      .where("rp.role_id = :roleId", { roleId })
      .getMany();

    return permissions.length > 0
      ? permissions.map((permission) => permission.permission_name)
      : null;
  }
}
