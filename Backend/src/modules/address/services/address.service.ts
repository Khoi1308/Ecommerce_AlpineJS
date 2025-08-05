import { DataSource } from "typeorm";
import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateAddressDto, UpdateAddressDto } from "../dtos/createAddress.dto";
import { Address } from "../entities/address.entity";
import { AddressRepository } from "../repositories/address.repository";
import { UserAddress } from "../../user/entities/userAddress.entity";

export class AddressService {
  private address_repository: AddressRepository;
  private user_repository: UserRepository;
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.address_repository = new AddressRepository();
    this.user_repository = new UserRepository();
    this.dataSource = dataSource;
  }

  async findAllByUserId(user_id: string): Promise<Address[]> {
    const addresses = await this.address_repository
      .createQueryBuilder("address")
      .leftJoinAndSelect("address.users", "userAddress")
      .leftJoin("userAddress.user", "user")
      .where("user.userId = :userId", { userId: user_id })
      .orderBy("userAddress.createdAt", "DESC")
      .getMany();

    return addresses;
  }

  async getAddressById(address_id: string): Promise<Address> {
    const address = await this.address_repository.getAddressById(address_id);
    appAssert(address, NOT_FOUND, "Address not found");

    return address;
  }

  async createAddress(data: CreateAddressDto): Promise<Address> {
    const address = await this.address_repository.createAddress(data);

    return address;
  }

  async createAddressByUserId(
    user_id: string,
    data: CreateAddressDto,
  ): Promise<Address> {
    const user = await this.user_repository.findOne({
      where: { userId: user_id },
    });
    appAssert(user, NOT_FOUND, "User's infomation not found");

    return await this.dataSource.transaction(async (manager) => {
      const address = manager.create(Address, data);
      const savedAddress = await manager.save(address);

      const userAddress = manager.create(UserAddress, {
        user: user,
        address: savedAddress,
        is_default: true,
      });
      await manager.save(userAddress);

      return savedAddress;
    });
  }

  async updateAddressById(
    address_id: string,
    data: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.address_repository.findOne({
      where: { addressId: address_id },
    });
    appAssert(address, NOT_FOUND, "Address not found");

    await this.address_repository
      .createQueryBuilder()
      .update(Address)
      .set(data)
      .where("addressId = :id", { id: address_id })
      .execute();

    return (await this.address_repository.findOne({
      where: {
        addressId: address_id,
      },
    })) as Address;
  }
}
