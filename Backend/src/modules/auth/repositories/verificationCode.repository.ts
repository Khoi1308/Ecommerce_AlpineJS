import { Repository } from "typeorm";
import { VertificationCode } from "../entities/vertificationCode.entity";
import { AppData } from "../../../config/db";

export class VerificationCodeRepository extends Repository<VertificationCode> {
  constructor() {
    super(VertificationCode, AppData.manager);
  }

  async createVerifyCode(
    data: Partial<VertificationCode>,
  ): Promise<VertificationCode> {
    const verifyCode = this.create(data);

    return this.save(verifyCode);
  }
}
