import { RequestHandler } from "express";
import { appAssert } from "../utils/appAssert";
import { FORBIDDEN } from "../config/http";
import { PermissionRepository } from "../modules/permission/repositories/permission.repository";
import { RoleRepository } from "../modules/user/repositories/role.repository";

export const permissionsAuthorization = (
  permissionsParam: string | string[],
): RequestHandler => {
  return async (req, res, next) => {
    const permission_repository = new PermissionRepository();
    appAssert(req.roleId, FORBIDDEN, "Role not found");

    // If user is admin
    if (req.roleId === "admin") {
      next();
    }

    // Normalize required permissions to array
    const permissions = Array.isArray(permissionsParam)
      ? permissionsParam
      : [permissionsParam];

    // Get all required permission
    const user_permissions =
      await permission_repository.findAllPermissionsByRoleId(req.roleId);
    appAssert(
      user_permissions,
      FORBIDDEN,
      "Access denied - Haven't permissions",
    );

    // Check if user has all required permissions
    const hasAllPermissions = permissions.every((permission) =>
      user_permissions.includes(permission),
    );

    appAssert(
      hasAllPermissions,
      FORBIDDEN,
      `Access denied - missing required permissions: ${permissions.join(", ")}`,
    );

    next();
  };
};

export const rolesAuthorization = (
  rolesParam: string | string[],
): RequestHandler => {
  return async (req, res, next) => {
    const role_repository = new RoleRepository();

    // If user is admin
    if (req.roleId === "admin") {
      next();
    }

    const user_roles = await role_repository.findOne({
      where: { roleId: req.roleId },
    });
    // If database hasn't this role
    appAssert(user_roles, FORBIDDEN, "Invalid role");

    const roles = Array.isArray(rolesParam) ? rolesParam : [rolesParam];
    const hasRequiredRole = roles.includes(user_roles.role_name);
    appAssert(
      hasRequiredRole,
      FORBIDDEN,
      `Access denied - missing required permissions: ${roles.join(", ")}`,
    );

    next();
  };
};
