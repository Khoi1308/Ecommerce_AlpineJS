import { QueryRunner } from "typeorm";
import { UserService } from "../../user/services/user.service";
import { CreateVoucherDto } from "../dtos/create_voucher.dto";
import { Voucher } from "../entities/voucher.entity";
import { VoucherRepository } from "../repositories/voucher.repository";
import { AppData } from "../../../config/db";
import { appAssert } from "../../../utils/appAssert";
import { BAD_REQUEST } from "../../../config/http";

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
    const queryRunner: QueryRunner = AppData.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate voucher code
      const exist_voucher = await this.voucher_repository.getVoucherByCode(
        voucher_data.voucher_code,
      );
      appAssert(exist_voucher, BAD_REQUEST, "Voucher code already exist");

      // Validate dates
      this.validateDates(voucher_data.end_date, voucher_data.start_date);

      // Validate overlap applicable & exclude in product
      this.validateOverlap(
        voucher_data.applicable_product_ids,
        voucher_data.excluded_product_ids,
        "Product",
      );

      const voucher_transaction_repo = this.voucher_repository.withTransaction(
        queryRunner.manager,
      );
      const new_voucher = await voucher_transaction_repo.createVoucher({
        ...voucher_data,
        createdBy: user_id,
      });

      return new_voucher;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private validateDates(start_date: Date, end_date: Date): void {
    appAssert(
      new Date(start_date) < new Date(end_date),
      BAD_REQUEST,
      "Start date must be before end date",
    );
  }

  private validateOverlap(
    applicable_ids: string[] | undefined,
    excluded_ids: string[] | undefined,
    type: string,
  ) {
    if (
      applicable_ids &&
      excluded_ids &&
      applicable_ids.length &&
      excluded_ids.length
    ) {
      const overlap = applicable_ids.some((id) => excluded_ids.includes(id));
      appAssert(
        overlap,
        BAD_REQUEST,
        `${type} cannot be both applicable and excluded  `,
      );
    }
  }
}
