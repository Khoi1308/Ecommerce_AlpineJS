import { AppData } from "../../../config/db";
import { CREATED, NOT_FOUND, SUCCESS } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { catchErrors } from "../../../utils/catchErrors";
import { CreateAddressDto } from "../../address/dtos/createAddress.dto";
import { AddressService } from "../../address/services/address.service";
import { mapEntityToDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
  private user_repository: UserRepository;
  private address_service: AddressService;

  constructor() {
    this.user_repository = new UserRepository();
    this.address_service = new AddressService(AppData);
  }

  getUserHandler = catchErrors(async (req, res) => {
    const user = await this.user_repository.findOne({
      where: { userId: req.userId },
      relations: ["role"],
    });
    appAssert(user, NOT_FOUND, "User not found");

    res.status(SUCCESS).json({
      user: mapEntityToDto(user),
    });
  });

  // Address in user
  createAddressInUserHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const address_data: CreateAddressDto = req.body;

    const address = await this.address_service.createAddressByUserId(
      user_id,
      address_data,
    );

    res.status(CREATED).json({
      success: true,
      data: address,
    });
  });
}
