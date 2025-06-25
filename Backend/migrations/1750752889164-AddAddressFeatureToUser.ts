import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressFeatureToUser1750752889164 implements MigrationInterface {
    name = 'AddAddressFeatureToUser1750752889164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_address" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_0d8590e0dce4c4284f733692279" FOREIGN KEY ("order_address") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_0d8590e0dce4c4284f733692279"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_address"`);
    }

}
