import { AppData } from "../../../config/db";
import { CREATED, SUCCESS } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { UpdateAddressDto } from "../dtos/createAddress.dto";
import { AddressService } from "../services/address.service";

export class AddressController {
  private address_service: AddressService;

  constructor() {
    this.address_service = new AddressService(AppData);
  }

  getAllByUserIdHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const addesses = await this.address_service.findAllByUserId(user_id);

    res.status(SUCCESS).json({
      success: true,
      data: addesses,
    });
  });

  getAddressHandler = catchErrors(async (req, res) => {
    const address_param = req.params.id;

    const address = await this.address_service.getAddressById(address_param);

    res.status(SUCCESS).json({
      success: true,
      data: address,
    });
  });

  createAddressHandler = catchErrors(async (req, res) => {
    const address_data = req.body;
    const address = await this.address_service.createAddress(address_data);

    res.status(CREATED).json({
      success: true,
      data: address,
    });
  });

  updateAddressHandler = catchErrors(async (req, res) => {
    const { id } = req.params;
    const address_data: UpdateAddressDto = req.body;

    const updated_address = await this.address_service.updateAddressById(
      id,
      address_data,
    );

    res.status(SUCCESS).json({
      success: true,
      data: updated_address,
    });
  });
}
