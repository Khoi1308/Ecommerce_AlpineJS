import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyFeatureOfProduct1750833456848 implements MigrationInterface {
    name = 'ModifyFeatureOfProduct1750833456848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

}
