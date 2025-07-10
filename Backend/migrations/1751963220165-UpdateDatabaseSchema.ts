import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabaseSchema1751963220165 implements MigrationInterface {
    name = 'UpdateDatabaseSchema1751963220165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL`);
    }

}
