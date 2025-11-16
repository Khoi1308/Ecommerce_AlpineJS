import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShipping1759137225371 implements MigrationInterface {
    name = 'CreateShipping1759137225371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."shipping_zones_shipping_scope_enum" AS ENUM('domestic', 'international')`);
        await queryRunner.query(`ALTER TABLE "shipping_zones" ADD "shipping_scope" "public"."shipping_zones_shipping_scope_enum" NOT NULL DEFAULT 'domestic'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_zones" DROP COLUMN "shipping_scope"`);
        await queryRunner.query(`DROP TYPE "public"."shipping_zones_shipping_scope_enum"`);
    }

}
