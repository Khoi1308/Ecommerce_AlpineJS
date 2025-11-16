import { Repository } from "typeorm";
import { Idempotency } from "./idempotency.entity";
import { AppData } from "../../config/db";

export class IdempotencyRepository extends Repository<Idempotency> {
  constructor() {
    super(Idempotency, AppData.manager);
  }
}
