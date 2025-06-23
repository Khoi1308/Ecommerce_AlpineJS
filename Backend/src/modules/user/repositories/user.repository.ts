import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppData } from "../../../config/db";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppData.manager);
  }

  // Get user by email or username
  async findByEmailOrUsername(
    username?: string,
    email?: string,
  ): Promise<User | null> {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.username = :username OR user.email = :email", {
        username: username || null,
        email: email || null,
      })
      .getOne();
  }

  // Get user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  // Create user
  async createUser(data: Partial<User>): Promise<User> {
    const user = this.create(data);

    return this.save(user);
  }
}
