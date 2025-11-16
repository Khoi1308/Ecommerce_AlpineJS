import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateShipping1759333002685 implements MigrationInterface {
    name = 'UpdateShipping1759333002685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "subtotal_price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_fee" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "discount_amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_distance" numeric(8,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_weight" numeric(8,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "estimate_delivery_time" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_rate_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "total_price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5ebbea496b8842d7a90f1251a34" FOREIGN KEY ("shipping_rate_id") REFERENCES "shipping_rates"("rateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5ebbea496b8842d7a90f1251a34"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "total_price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_rate_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "estimate_delivery_time"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_weight"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_distance"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "discount_amount"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_fee"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "subtotal_price"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26" FOREIGN KEY ("shipping_id") REFERENCES "shipping_zones"("zoneId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
