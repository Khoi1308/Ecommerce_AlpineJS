import { Repository } from "typeorm";
import { Address } from "../entities/address.entity";
import { AppData } from "../../../config/db";

export class AddressRepository extends Repository<Address> {
  constructor() {
    super(Address, AppData.manager);
  }

  async findAllAddress(): Promise<Address[]> {
    return await this.find({
      relations: ["user"],
    });
  }

  async createAddress(): Promise<Address> {
}
