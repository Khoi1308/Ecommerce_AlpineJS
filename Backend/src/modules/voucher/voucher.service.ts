import { UserService } from "../user/services/user.service";
import { CreateVoucherDto } from "./dtos/create_voucher.dto";
import { Voucher } from "./entities/voucher.entity";
import { VoucherRepository } from "./voucher.repository";

export class VoucherService {
  private voucher_repository: VoucherRepository;
  private user_service: UserService;

  constructor() {
    this.voucher_repository = new VoucherRepository();
    this.user_service = new UserService();
  }

  async createVoucher(
    user_id: string,
    voucher_data: CreateVoucherDto,
  ): Promise<Voucher> {
    const new_voucher = await this.voucher_repository.createVoucher({
      ...voucher_data,
      createdBy: user_id,
    });

    return new_voucher;
  }
}
