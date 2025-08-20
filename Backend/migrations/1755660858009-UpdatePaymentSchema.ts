import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePaymentSchema1755660858009 implements MigrationInterface {
    name = 'UpdatePaymentSchema1755660858009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" ADD "product_price" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "createdBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "inventories" DROP COLUMN "product_price"`);
    }

}
