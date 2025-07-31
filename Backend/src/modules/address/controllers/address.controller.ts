import { CREATED, SUCCESS } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { AddressService } from "../services/address.service";

export class AddressController {
  private address_service: AddressService;

  constructor() {
    this.address_service = new AddressService();
  }

  createAddressHandler = catchErrors(async (req, res) => {
    const address_data = req.body;
    const address = await this.address_service.createAddress(address_data);

    res.status(CREATED).json({
      success: true,
      data: address,
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
}
