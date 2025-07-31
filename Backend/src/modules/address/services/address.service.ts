import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { CreateAddressDto } from "../dtos/createAddress.dto";
import { Address } from "../entities/address.entity";
import { AddressRepository } from "../repositories/address.repository";

export class AddressService {
  private address_repository: AddressRepository;

  constructor() {
    this.address_repository = new AddressRepository();
  }

  async createAddress(data: CreateAddressDto): Promise<Address> {
    const address = await this.address_repository.createAddress(data);

    return address;
  }

  async getAddressById(address_id: string): Promise<Address> {
    const address = await this.address_repository.getAddressById(address_id);
    appAssert(address, NOT_FOUND, "Address not found");

    return address;
  }
}
