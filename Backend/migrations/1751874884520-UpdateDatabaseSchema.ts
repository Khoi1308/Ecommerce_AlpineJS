import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabaseSchema1751874884520 implements MigrationInterface {
    name = 'UpdateDatabaseSchema1751874884520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "product_attribure"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "product_attribure" uuid NOT NULL`);
    }

}
