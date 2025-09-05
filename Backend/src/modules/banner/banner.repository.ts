import { Repository } from "typeorm";

import { AppData } from "../../config/db";
import { Banner } from "./entities/banner.entity";

export class BannerRepository extends Repository<Banner> {
  constructor() {
    super(Banner, AppData.manager);
  }
}
