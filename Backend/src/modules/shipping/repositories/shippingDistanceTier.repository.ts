import { Repository } from "typeorm";
import { ShippingDistanceTier } from "../entities/shippingZone.entity";
import { AppData } from "../../../config/db";

export class ShippingDistanceTierRepository extends Repository<ShippingDistanceTier> {
  constructor() {
    super(ShippingDistanceTier, AppData.manager);
  }

  async findShippingDistanceTierById(
    distance_tier_id: string,
  ): Promise<ShippingDistanceTier | null> {
    const distance_tier = await this.findOne({
      where: {
        tierId: distance_tier_id,
      },
    });

    return distance_tier;
  }
}
