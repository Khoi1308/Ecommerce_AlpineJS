import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdempotency1757574442412 implements MigrationInterface {
    name = 'CreateIdempotency1757574442412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "idempotency_records" ("idempotencyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "idempotency_key" character varying(255) NOT NULL, "result_data" jsonb NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatesAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_87ea14d80e196d8e5d995a43a32" UNIQUE ("idempotency_key"), CONSTRAINT "PK_b019de5eced70e09b42bbdad113" PRIMARY KEY ("idempotencyId"))`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD "version" bigint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "quantity" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "inventory_id" uuid`);
        await queryRunner.query(`ALTER TABLE "book_attributes" ALTER COLUMN "book_author" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_fa1ef9b9358b8f7d4ec7505359b" FOREIGN KEY ("inventory_id") REFERENCES "inventories"("inventoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_fa1ef9b9358b8f7d4ec7505359b"`);
        await queryRunner.query(`ALTER TABLE "book_attributes" ALTER COLUMN "book_author" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "inventory_id"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "inventories" DROP COLUMN "version"`);
        await queryRunner.query(`DROP TABLE "idempotency_records"`);
    }

}
