import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabaseSchema1751875000734 implements MigrationInterface {
    name = 'UpdateDatabaseSchema1751875000734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "category_description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "category_description" SET NOT NULL`);
    }

}
