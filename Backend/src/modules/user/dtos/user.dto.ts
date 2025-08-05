import { CreateAddressDto } from "../../address/dtos/createAddress.dto";
import { User } from "../entities/user.entity";

export interface CreateUserDto {
  userId: string;
  username: string;
  email: string;
  verified: boolean;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDto {
  email?: string;
  address?: CreateAddressDto;
  updatedAt: Date;
}

export const mapEntityToDto = (user: User): CreateUserDto => {
  return {
    userId: user.userId,
    username: user.username,
    email: user.email,
    verified: user.verified,
    roleId: user.role.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
