import { Repository } from "typeorm";
import { Avatar } from "../entities/avatar.entity";
import { AppData } from "../../../config/db";
import { appAssert } from "../../../utils/appAssert";
import { NOT_FOUND } from "../../../config/http";

export class AvatarRepository extends Repository<Avatar> {
  constructor() {
    super(Avatar, AppData.manager);
  }

  async findAvatarById(avatar_id: string): Promise<Avatar> {
    const avatar = await this.findOne({
      where: {
        avatarId: avatar_id,
      },
    });
    appAssert(avatar, NOT_FOUND, "Avatar not found");

    return avatar;
  }
}
