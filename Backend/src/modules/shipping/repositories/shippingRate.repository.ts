import { Repository } from "typeorm";
import { ShippingRate } from "../entities/shippingZone.entity";
import { AppData } from "../../../config/db";

export class ShippingRateRepository extends Repository<ShippingRate> {
  constructor() {
    super(ShippingRate, AppData.manager);
  }

  async getShippingRateById(rate_id: string): Promise<ShippingRate | null> {
    const shipping_rate = this.findOne({
      where: {
        rateId: rate_id,
      },
    });

    return shipping_rate;
  }
}
