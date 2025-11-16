import { Repository } from "typeorm";
import { Shipping } from "../entities/shippingZone.entity";
import { AppData } from "../../../config/db";

export class ShippingZoneRepository extends Repository<Shipping> {
  constructor() {
    super(Shipping, AppData.manager);
  }

  async getShippingZoneById(zone_id: string): Promise<Shipping | null> {
    const shipping_zone = this.findOne({ where: { zoneId: zone_id } });

    return shipping_zone;
  }
}
