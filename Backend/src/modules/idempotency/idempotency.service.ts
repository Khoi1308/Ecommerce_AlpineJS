import { MoreThan } from "typeorm";
import { IdempotencyRepository } from "./idempotency.repository";
import { Idempotency } from "./idempotency.entity";

export class IdempotencyService {
  private idempotency_repository: IdempotencyRepository;

  constructor() {
    this.idempotency_repository = new IdempotencyRepository();
  }

  async checkIdempotency(key: string) {
    const result = await this.idempotency_repository.findOne({
      where: {
        idempotency_key: key,
        expiresAt: MoreThan(new Date()),
      },
    });

    return result ? result : null;
  }

  async saveIdempotency(key: string, result: any, expire_time: Date) {
    await this.idempotency_repository
      .createQueryBuilder()
      .insert()
      .into(Idempotency)
      .values({
        idempotency_key: key,
        result_data: result,
        expiresAt: expire_time,
      })
      .orUpdate(["result_data", "expiresAt", "updatedAt"], ["idempotency_key"])
      .execute();
  }
}
