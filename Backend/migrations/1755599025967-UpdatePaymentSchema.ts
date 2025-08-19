import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePaymentSchema1755599025967 implements MigrationInterface {
    name = 'UpdatePaymentSchema1755599025967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_method" ("paymentMethodId" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "pm_type" character varying NOT NULL, "brand" character varying, "last4" character varying(4), "token_ref" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c07b0b12b34981558fc7612ee8a" PRIMARY KEY ("paymentMethodId"))`);
        await queryRunner.query(`CREATE TABLE "user_payment_method" ("upmId" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_default" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "payment_method_id" uuid NOT NULL, CONSTRAINT "PK_1874551d97931394a8d5852f5af" PRIMARY KEY ("upmId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "uq_user_one_default_pm" ON "user_payment_method" ("user_id", "is_default") WHERE "is_default" = true`);
        await queryRunner.query(`CREATE TABLE "payment" ("paymentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL, "currency_code" character varying(3) NOT NULL DEFAULT 'VND', "status" character varying NOT NULL DEFAULT 'PENDING', "transaction_id" character varying, "paid_at" TIMESTAMP WITH TIME ZONE, "failed_reason" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" uuid NOT NULL, "payment_method_id" uuid, CONSTRAINT "UQ_82c3470854cf4642dfb0d7150cd" UNIQUE ("transaction_id"), CONSTRAINT "PK_67ee4523b649947b6a7954dc673" PRIMARY KEY ("paymentId"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_method"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_status" character varying NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_status" character varying NOT NULL DEFAULT 'UNPAID'`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" ADD CONSTRAINT "FK_410a5c63b418406480c3fd3c7d6" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" ADD CONSTRAINT "FK_1cbbb25292b05ec6daf39b0bfd4" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("paymentMethodId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f5221735ace059250daac9d9803" FOREIGN KEY ("order_id") REFERENCES "orders"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_365af7f69f9142427cf30395b00" FOREIGN KEY ("payment_method_id") REFERENCES "user_payment_method"("upmId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_365af7f69f9142427cf30395b00"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f5221735ace059250daac9d9803"`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" DROP CONSTRAINT "FK_1cbbb25292b05ec6daf39b0bfd4"`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" DROP CONSTRAINT "FK_410a5c63b418406480c3fd3c7d6"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_status"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_status"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_method" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP INDEX "public"."uq_user_one_default_pm"`);
        await queryRunner.query(`DROP TABLE "user_payment_method"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
    }

}
