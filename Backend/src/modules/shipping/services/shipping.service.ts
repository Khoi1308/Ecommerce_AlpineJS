import { DataSource } from "typeorm";
import { CreateShippingZoneDto } from "../dtos/shippingZone.dto";
import { UserService } from "../../user/services/user.service";
import { appAssert } from "../../../utils/appAssert";
import { NOT_FOUND } from "../../../config/http";
import { ShippingZoneRepository } from "../repositories/shippingZone.repository";
import { ShippingRateRepository } from "../repositories/shippingRate.repository";
import { CreateShippingRateDto } from "../dtos/shippingRate.dto";
import { ShippingDistanceTierRepository } from "../repositories/shippingDistanceTier.repository";
import { CreateShippingDistanceTierDto } from "../dtos/shippingDistanceTier.dto";

export class ShippingZoneService {
  private shipping_zone_repository: ShippingZoneRepository;
  private shipping_rate_repository: ShippingRateRepository;
  private shipping_distance_tier_repository: ShippingDistanceTierRepository;
  private user_service: UserService;
  private data_source: DataSource;

  constructor(dataSource: DataSource) {
    this.data_source = dataSource;
    this.shipping_zone_repository = new ShippingZoneRepository();
    this.shipping_rate_repository = new ShippingRateRepository();
    this.shipping_distance_tier_repository =
      new ShippingDistanceTierRepository();
    this.user_service = new UserService();
  }

  // Shipping zone
  async createShippingZone(user_id: string, data: CreateShippingZoneDto) {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found ");

    try {
      const new_zone = this.shipping_zone_repository.create(data);

      return await this.shipping_zone_repository.save(new_zone);
    } catch (error) {
      throw new Error(`Shipping-zone create: ${error}`);
    }
  }

  async findShippingZoneById(user_id: string, zone_id: string) {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const zone =
      await this.shipping_zone_repository.getShippingZoneById(zone_id);
    appAssert(zone, NOT_FOUND, "Shipping zone not found");

    return zone;
  }

  // Shipping rate
  async createShippingRate(user_id: string, rate_data: CreateShippingRateDto) {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    try {
      const new_rate = this.shipping_rate_repository.create(rate_data);

      return await this.shipping_rate_repository.save(new_rate);
    } catch (error) {
      throw new Error(`Shipping-rate create: ${error}`);
    }
  }

  async findShippingRateById(user_id: string, rate_id: string) {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const shipping_rate =
      await this.shipping_rate_repository.getShippingRateById(rate_id);

    return shipping_rate;
  }

  async createShippingDistanceTier(
    user_id: string,
    distance_tier_data: CreateShippingDistanceTierDto,
  ) {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    try {
      const new_distance_tier =
        this.shipping_rate_repository.create(distance_tier_data);

      return await this.shipping_rate_repository.save(new_distance_tier);
    } catch (error) {
      throw new Error(`Shipping-distance-tier create: ${error}`);
    }
  }

  async findShippingDistanceTierById(
    user_id: string,
    distance_tier_id: string,
  ) {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const shipping_rate =
      await this.shipping_rate_repository.getShippingRateById(distance_tier_id);

    return shipping_rate;
  }
}
