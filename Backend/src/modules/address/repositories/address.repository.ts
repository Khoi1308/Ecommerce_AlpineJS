import { Repository } from "typeorm";
import { Address } from "../entities/address.entity";
import { AppData } from "../../../config/db";
import { CreateAddressDto } from "../dtos/createAddress.dto";

export class AddressRepository extends Repository<Address> {
  constructor() {
    super(Address, AppData.manager);
  }

  async findAllAddress(): Promise<Address[]> {
    return await this.find({
      relations: ["user"],
    });
  }

  async createAddress(data: CreateAddressDto): Promise<Address> {
    const address = this.create(data);

    return await this.save(address);
  }

  async getAddressById(address_id: string): Promise<Address | null> {
    const address = this.findOne({
      where: {
        addressId: address_id,
      },
    });

    return address;
  }
}
