import { NOT_FOUND } from "../../config/http";
import { appAssert } from "../../utils/appAssert";
import { UserService } from "../user/services/user.service";
import { BannerRepository } from "./banner.repository";
import { Banner } from "./entities/banner.entity";

export class BannerService {
  private banner_repository: BannerRepository;
  private user_service: UserService;

  constructor() {
    this.banner_repository = new BannerRepository();
    this.user_service = new UserService();
  }

  async findAll(): Promise<Banner[]> {
    const banners = this.banner_repository.find({
      order: {
        banner_order: "ASC",
      },
    });

    return banners;
  }

  async createBanner(user_id: string, files: string[]): Promise<Banner[]> {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const banners = files.map((url, index) =>
      this.banner_repository.create({
        img_url: url,
        banner_order: index + 1,
        createdBy: user_id,
      }),
    );
    return await this.banner_repository.save(banners);
  }
}
