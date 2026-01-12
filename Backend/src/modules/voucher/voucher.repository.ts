import { EntityManager, QueryRunner, Repository } from "typeorm";
import { Voucher } from "./entities/voucher.entity";
import { AppData } from "../../config/db";
import { CreateVoucherDto } from "./dtos/create_voucher.dto";

export class VoucherRepository {
  private entityManager: EntityManager;
  private voucher_repository: Repository<Voucher>;

  constructor(entityManager?: EntityManager) {
    this.entityManager = entityManager || AppData.manager;
    this.voucher_repository = this.entityManager.getRepository(Voucher);
  }

  withTransaction(entityManager: EntityManager): VoucherRepository {
    return new VoucherRepository(entityManager);
  }

  async createVoucher(
    voucher_data: CreateVoucherDto,
    queryRunner: QueryRunner,
  ): Promise<Voucher> {
    const new_voucher = queryRunner.manager.create(Voucher, voucher_data);

    return this.voucher_repository.save(new_voucher);
  }
}
