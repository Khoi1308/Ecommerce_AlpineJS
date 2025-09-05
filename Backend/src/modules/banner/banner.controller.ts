import { CREATED, SUCCESS } from "../../config/http";
import { catchErrors } from "../../utils/catchErrors";
import { BannerService } from "./banner.service";

export class BannerController {
  private banner_service: BannerService;

  constructor() {
    this.banner_service = new BannerService();
  }

  getAllBannerHandler = catchErrors(async (req, res) => {
    const banners = await this.banner_service.findAll();

    res.status(SUCCESS).json({
      success: true,
      data: banners,
    });
  });
  createBannerHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const data = req.body;

    const banners = await this.banner_service.createBanner(
      user_id,
      data.images,
    );

    res.status(CREATED).json({
      success: true,
      data: banners,
    });
  });
}
