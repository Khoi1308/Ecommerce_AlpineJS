import { AppData } from "../../../config/db";
import { CREATED, NOT_FOUND, SUCCESS } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { catchErrors } from "../../../utils/catchErrors";
import { uploadImage } from "../../../utils/uploadImage";
import { CreateAddressDto } from "../../address/dtos/createAddress.dto";
import { AddressService } from "../../address/services/address.service";
import { CreateAvatarDto, UpdateAvatarDto } from "../dtos/avatar.ts";
import { mapEntityToDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";

export class UserController {
  private address_service: AddressService;
  private user_service: UserService;

  constructor() {
    this.user_service = new UserService();
    this.address_service = new AddressService(AppData);
  }

  getUserHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const user = await this.user_service.findUser(user_id);

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

  getAvatarByUserIdHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;

    const avatars = await this.user_service.findAllByUserId(user_id);

    res.status(SUCCESS).json({
      success: true,
      data: avatars,
    });
  });
  // Avatar
  createAvatarHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const create_data: CreateAvatarDto = req.body;

    const avatar = await this.user_service.createAvatar(user_id, create_data);

    res.status(CREATED).json({
      success: true,
      data: avatar,
    });
  });

  updateAvatarHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const user_id = req.userId;
    const update_data: UpdateAvatarDto = req.body;

    const image = await this.user_service.updateAvatarById(
      id,
      user_id,
      update_data,
    );
    res.status(SUCCESS).json({
      success: true,
      data: image,
    });
  });
  //
  // Upload avatar
  uploadAvatarHandler = catchErrors(async (req, res) => {
    const image_file = req.file?.path;
    appAssert(image_file, NOT_FOUND, "Image url not found");

    const image_url = await uploadImage(image_file);

    res.status(SUCCESS).json({
      success: true,
      message: "Image is uploaded",
      data: image_url,
    });
  });
}
