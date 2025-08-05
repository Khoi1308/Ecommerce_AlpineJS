import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRelationshipUserAddress1754369761198 implements MigrationInterface {
    name = 'ModifyRelationshipUserAddress1754369761198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6de63ed9c7d202b9cadae024d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74de4f43d79bc7d7cb5c20d770"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "is_default"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD "userAddressId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "PK_6fdf8905a58ed0f936d7e17e6e6"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "PK_c78faf4f325a09c7d8469c19292" PRIMARY KEY ("user_id", "address_id", "userAddressId")`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD "is_default" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "PK_c78faf4f325a09c7d8469c19292"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "PK_82df581c012a3f16629cdb250ff" PRIMARY KEY ("address_id", "userAddressId")`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ALTER COLUMN "address_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "PK_82df581c012a3f16629cdb250ff"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "PK_8498cbf594faaa64f8e3cca5c9a" PRIMARY KEY ("userAddressId")`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705" FOREIGN KEY ("address_id") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "PK_8498cbf594faaa64f8e3cca5c9a"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "PK_82df581c012a3f16629cdb250ff" PRIMARY KEY ("address_id", "userAddressId")`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ALTER COLUMN "address_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "PK_82df581c012a3f16629cdb250ff"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "PK_c78faf4f325a09c7d8469c19292" PRIMARY KEY ("user_id", "address_id", "userAddressId")`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP COLUMN "is_default"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP CONSTRAINT "PK_c78faf4f325a09c7d8469c19292"`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "PK_6fdf8905a58ed0f936d7e17e6e6" PRIMARY KEY ("user_id", "address_id")`);
        await queryRunner.query(`ALTER TABLE "users_addresses" DROP COLUMN "userAddressId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "is_default" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE INDEX "IDX_74de4f43d79bc7d7cb5c20d770" ON "users_addresses" ("address_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6de63ed9c7d202b9cadae024d" ON "users_addresses" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705" FOREIGN KEY ("address_id") REFERENCES "addresses"("addressId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
