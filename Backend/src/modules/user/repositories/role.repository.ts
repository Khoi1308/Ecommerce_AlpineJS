import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { AppData } from "../../../config/db";

export class RoleRepository extends Repository<Role> {
  constructor() {
    super(Role, AppData.manager);
  }
}
