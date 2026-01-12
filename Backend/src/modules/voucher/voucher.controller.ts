import { CREATED } from "../../config/http";
import { appAssert } from "../../utils/appAssert";
import { catchErrors } from "../../utils/catchErrors";
import { VoucherService } from "./voucher.service";

export class VoucherControler {
  private voucher_service: VoucherService;

  constructor() {
    this.voucher_service = new VoucherService();
  }

  createVoucherHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const data = req.body;

    const new_voucher = await this.voucher_service.createVoucher(user_id, data);

    res.status(CREATED).json({
      success: true,
      data: new_voucher,
    });
  });
}
