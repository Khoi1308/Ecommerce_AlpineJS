import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { CreateAvatarDto, UpdateAvatarDto } from "../dtos/avatar.ts";
import { Avatar } from "../entities/avatar.entity";
import { User } from "../entities/user.entity";
import { AvatarRepository } from "../repositories/avatar.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private user_repostory: UserRepository;
  private avatar_repository: AvatarRepository;

  constructor() {
    this.user_repostory = new UserRepository();
    this.avatar_repository = new AvatarRepository();
  }

  async findUser(user_id: string): Promise<User> {
    const user = await this.user_repostory.findOne({
      where: {
        userId: user_id,
      },
      relations: ["role"],
    });
    appAssert(user, NOT_FOUND, "User not found");

    return user;
  }

  async findAllByUserId(user_id: string): Promise<Avatar[]> {
    const user = await this.user_repostory.find({ where: { userId: user_id } });
    appAssert(user, NOT_FOUND, "User infomation not found");
    console.log(user);

    const avatars = await this.avatar_repository.find({
      where: { user: { userId: user_id } },
      order: { createdAt: "DESC" },
    });

    return avatars;
  }

  async createAvatar(
    user_id: string,
    avatar_data: CreateAvatarDto,
  ): Promise<Avatar> {
    const { img_url, ...data } = avatar_data;
    const user = await this.findUser(user_id);

    // Set default avatar into not default
    await this.avatar_repository
      .createQueryBuilder()
      .update(Avatar)
      .set({ is_default: false })
      .where("user_id = :userId AND is_default = true", { userId: user_id })
      .execute();

    // Add new avatar
    const new_avatar = this.avatar_repository.create({
      ...data,
      img_url: img_url ? [img_url] : [],
      user,
    });

    return await this.avatar_repository.save(new_avatar);
  }

  async updateAvatarById(
    id: string,
    user_id: string,
    update_data: UpdateAvatarDto,
  ): Promise<Avatar> {
    const user = await this.findUser(user_id);

    if (update_data.is_default === true) {
      await this.avatar_repository
        .createQueryBuilder()
        .update(Avatar)
        .set({ is_default: false })
        .where("user_id = :userId AND is_default = true", { userId: user_id })
        .execute();
    }

    await this.avatar_repository.update({ avatarId: id }, update_data);

    const updated_data = await this.avatar_repository.findAvatarById(id);

    return updated_data;
  }
}
