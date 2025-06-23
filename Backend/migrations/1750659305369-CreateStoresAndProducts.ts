import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoresAndProducts1750659305369 implements MigrationInterface {
    name = 'CreateStoresAndProducts1750659305369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_737afcb238d4c29a719958ce041"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_9be70f9d779f931ec0d32a4aa58"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_737afcb238d4c29a719958ce04"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9be70f9d779f931ec0d32a4aa5"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "permission_id" TO "permissionId"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME CONSTRAINT "PK_1717db2235a5b169822e7f753b1" TO "PK_b4b17d691e3c22be36b2b9f355a"`);
        await queryRunner.query(`CREATE TABLE "products" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" character varying NOT NULL, "product_price" numeric NOT NULL, "product_discount" numeric NOT NULL, "author" character varying, "clothing_size" character varying, "product_type" character varying NOT NULL, CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a89bd51c8d5b29c8b344da255c" ON "products" ("product_type") `);
        await queryRunner.query(`CREATE TABLE "stores" ("storeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_aae7a9efec0e6e614522d90c840" PRIMARY KEY ("storeId"))`);
        await queryRunner.query(`CREATE TABLE "store_product" ("store_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_eb8d5fcb214fac7025e9ef0d6dc" PRIMARY KEY ("store_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d4c18c1e1f18ea7dc540ba82f8" ON "store_product" ("store_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4f685a135a1e11dc5cf892fe5" ON "store_product" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7a743e2ec75657049bdca476c65"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_9be70f9d779f931ec0d32a4aa58" PRIMARY KEY ("rolesRoleId")`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "permissionsPermissionId"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_9be70f9d779f931ec0d32a4aa58"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "rolesRoleId"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719" PRIMARY KEY ("role_id")`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "permission_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("role_id", "permission_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON "roles_permissions" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON "roles_permissions" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "roles"("roleId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permissionId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_d4c18c1e1f18ea7dc540ba82f89" FOREIGN KEY ("store_id") REFERENCES "stores"("storeId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_f4f685a135a1e11dc5cf892fe54" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_f4f685a135a1e11dc5cf892fe54"`);
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_d4c18c1e1f18ea7dc540ba82f89"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719" PRIMARY KEY ("role_id")`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "permission_id"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_7d2dad9f14eddeb09c256fea719"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "rolesRoleId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_9be70f9d779f931ec0d32a4aa58" PRIMARY KEY ("rolesRoleId")`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "permissionsPermissionId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "PK_9be70f9d779f931ec0d32a4aa58"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "PK_7a743e2ec75657049bdca476c65" PRIMARY KEY ("permissionsPermissionId", "rolesRoleId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4f685a135a1e11dc5cf892fe5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4c18c1e1f18ea7dc540ba82f8"`);
        await queryRunner.query(`DROP TABLE "store_product"`);
        await queryRunner.query(`DROP TABLE "stores"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a89bd51c8d5b29c8b344da255c"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME CONSTRAINT "PK_b4b17d691e3c22be36b2b9f355a" TO "PK_1717db2235a5b169822e7f753b1"`);
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "permissionId" TO "permission_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_9be70f9d779f931ec0d32a4aa5" ON "roles_permissions" ("rolesRoleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_737afcb238d4c29a719958ce04" ON "roles_permissions" ("permissionsPermissionId") `);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_9be70f9d779f931ec0d32a4aa58" FOREIGN KEY ("rolesRoleId") REFERENCES "roles"("roleId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_737afcb238d4c29a719958ce041" FOREIGN KEY ("permissionsPermissionId") REFERENCES "permissions"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
