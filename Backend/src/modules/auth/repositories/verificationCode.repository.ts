import { MoreThan, Repository } from "typeorm";
import { VerificationCode } from "../entities/verificationCode.entity";
import { AppData } from "../../../config/db";
import { verificationCodeType } from "../../../config/verificationCodeTypes";
import { User } from "../../user/entities/user.entity";

export class VerificationCodeRepository extends Repository<VerificationCode> {
  constructor() {
    super(VerificationCode, AppData.manager);
  }

  async createVerifyCode(
    data: Partial<VerificationCode>,
  ): Promise<VerificationCode> {
    const verifyCode = this.create(data);

    return this.save(verifyCode);
  }

  async getVericationCodeById(code: string): Promise<VerificationCode | null> {
    return await this.createQueryBuilder("verificationCode")
      .leftJoinAndSelect("verificationCode.user", "user")
      .where("verificationCode.verificationId = :verificationId", {
        verificationCodeId: code,
      })
      .getOne();
  }

  async countRecentResetCode(user: User, timethreshold: Date): Promise<number> {
    return this.count({
      where: {
        user: user,
        type: verificationCodeType.ResetPassword,
        createAt: MoreThan(timethreshold),
      },
    });
  }
}
