import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyProductFeature1750663973675 implements MigrationInterface {
    name = 'ModifyProductFeature1750663973675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "img_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
    }

}
