import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdempotency1757575426087 implements MigrationInterface {
    name = 'CreateIdempotency1757575426087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_idempotency_expires" ON "idempotency_records" ("expiresAt") `);
        await queryRunner.query(`CREATE INDEX "idx_idempotency_key_expires" ON "idempotency_records" ("idempotency_key", "expiresAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_idempotency_key_expires"`);
        await queryRunner.query(`DROP INDEX "public"."idx_idempotency_expires"`);
    }

}
