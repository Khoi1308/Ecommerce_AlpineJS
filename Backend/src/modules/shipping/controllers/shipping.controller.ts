import { AppData } from "../../../config/db";
import { CREATED, SUCCESS } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { ShippingZoneService } from "../services/shipping.service";

export class ShippingController {
  private shipping_service: ShippingZoneService;

  constructor() {
    this.shipping_service = new ShippingZoneService(AppData);
  }

  createShippingZoneHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const data_zone = req.body;

    const new_zone = await this.shipping_service.createShippingZone(
      user_id,
      data_zone,
    );

    res.status(CREATED).json({
      success: true,
      message: "shipping created successfully",
      data: new_zone,
    });
  });

  findOneShippingZoneHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const zone_id = req.params.id;
    const zone = await this.shipping_service.findShippingZoneById(
      user_id,
      zone_id,
    );
    res.status(SUCCESS).json({
      success: true,
      data: zone,
    });
  });

  createShippingRateHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const data_rate = req.body;

    const shipping_rate = await this.shipping_service.createShippingRate(
      user_id,
      data_rate,
    );

    res.status(CREATED).json({
      success: true,
      message: "shipping created successfully",
      data: shipping_rate,
    });
  });

  getShippingRateByIdHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const rate_id = req.params.id;

    const shipping_rate = await this.shipping_service.findShippingRateById(
      user_id,
      rate_id,
    );

    res.status(SUCCESS).json({
      success: true,
      data: shipping_rate,
    });
  });

  createShippingDistanceTierHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const data_distance_tier = req.body;

    const shipping_distance_tier =
      await this.shipping_service.createShippingDistanceTier(
        user_id,
        data_distance_tier,
      );

    res.status(CREATED).json({
      success: true,
      message: "shipping created successfully",
      data: shipping_distance_tier,
    });
  });

  getShippingDistanceTierByIdHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const distance_tier_id = req.params.id;

    const distance_tier =
      await this.shipping_service.findShippingDistanceTierById(
        user_id,
        distance_tier_id,
      );

    res.status(SUCCESS).json({
      success: true,
      data: distance_tier,
    });
  });
}
