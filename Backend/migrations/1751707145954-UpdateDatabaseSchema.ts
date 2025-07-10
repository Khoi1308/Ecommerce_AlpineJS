import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabaseSchema1751707145954 implements MigrationInterface {
    name = 'UpdateDatabaseSchema1751707145954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a89bd51c8d5b29c8b344da255c"`);
        await queryRunner.query(`CREATE TABLE "promotions" ("promotionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "promotion_name" character varying(50) NOT NULL, "promotion_discount" numeric(10,2) NOT NULL DEFAULT '0', "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_685072e22d6413c91bc4b92390a" PRIMARY KEY ("promotionId"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying(50) NOT NULL, "category_description" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parent_category_id" uuid, CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TABLE "variations" ("variationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "variation_name" character varying(50) NOT NULL, "category_id" uuid, CONSTRAINT "PK_9efbc99366b6697239fbf66eb22" PRIMARY KEY ("variationId"))`);
        await queryRunner.query(`CREATE TABLE "variation_options" ("variationOptionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "option_value" character varying(50) NOT NULL, "variation_id" uuid, CONSTRAINT "PK_28c31f8296dd37022dc2ae518d2" PRIMARY KEY ("variationOptionId"))`);
        await queryRunner.query(`CREATE TABLE "inventories" ("inventoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity_on_stock" integer NOT NULL DEFAULT '0', "available_stock" integer NOT NULL DEFAULT '0', "reserved_stock" integer NOT NULL DEFAULT '0', "sku" character varying(50) NOT NULL, "img_url" text array DEFAULT '{}', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" uuid NOT NULL, "product_id" uuid, CONSTRAINT "PK_79fa97e66bebd5549e4be0c11ef" PRIMARY KEY ("inventoryId"))`);
        await queryRunner.query(`CREATE TABLE "categories_promotions" ("promotion_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_a91fc0529ce6381b5ffb813fdc9" PRIMARY KEY ("promotion_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a669efcb2ed113493634c0e7d8" ON "categories_promotions" ("promotion_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf5b5be4ac6f34e7df70408adc" ON "categories_promotions" ("category_id") `);
        await queryRunner.query(`CREATE TABLE "inventories_variationOptions" ("variation_option_id" uuid NOT NULL, "inventory_id" uuid NOT NULL, CONSTRAINT "PK_1d31609f5724c66d23f26e9edcc" PRIMARY KEY ("variation_option_id", "inventory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5ababd600191c8e5f09583c39" ON "inventories_variationOptions" ("variation_option_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_77cac5a2dbf7a65dacb7772a42" ON "inventories_variationOptions" ("inventory_id") `);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_discount"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock_quantity"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "reversed_quantity"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_type"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "clothing_size"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_de08738901be6b34d2824a1e243" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variations" ADD CONSTRAINT "FK_d8d59bfc4d994fb45f1d2be0931" FOREIGN KEY ("category_id") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variation_options" ADD CONSTRAINT "FK_54a7b8efdb5abca6f903e8318dc" FOREIGN KEY ("variation_id") REFERENCES "variations"("variationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_92fc0c77bab4a656b9619322c62" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_promotions" ADD CONSTRAINT "FK_a669efcb2ed113493634c0e7d8c" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("promotionId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_promotions" ADD CONSTRAINT "FK_bf5b5be4ac6f34e7df70408adc4" FOREIGN KEY ("category_id") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventories_variationOptions" ADD CONSTRAINT "FK_d5ababd600191c8e5f09583c39e" FOREIGN KEY ("variation_option_id") REFERENCES "variation_options"("variationOptionId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inventories_variationOptions" ADD CONSTRAINT "FK_77cac5a2dbf7a65dacb7772a424" FOREIGN KEY ("inventory_id") REFERENCES "inventories"("inventoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories_variationOptions" DROP CONSTRAINT "FK_77cac5a2dbf7a65dacb7772a424"`);
        await queryRunner.query(`ALTER TABLE "inventories_variationOptions" DROP CONSTRAINT "FK_d5ababd600191c8e5f09583c39e"`);
        await queryRunner.query(`ALTER TABLE "categories_promotions" DROP CONSTRAINT "FK_bf5b5be4ac6f34e7df70408adc4"`);
        await queryRunner.query(`ALTER TABLE "categories_promotions" DROP CONSTRAINT "FK_a669efcb2ed113493634c0e7d8c"`);
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_92fc0c77bab4a656b9619322c62"`);
        await queryRunner.query(`ALTER TABLE "variation_options" DROP CONSTRAINT "FK_54a7b8efdb5abca6f903e8318dc"`);
        await queryRunner.query(`ALTER TABLE "variations" DROP CONSTRAINT "FK_d8d59bfc4d994fb45f1d2be0931"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_de08738901be6b34d2824a1e243"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "clothing_size" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "author" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "reversed_quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stock_quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_discount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "productId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77cac5a2dbf7a65dacb7772a42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5ababd600191c8e5f09583c39"`);
        await queryRunner.query(`DROP TABLE "inventories_variationOptions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf5b5be4ac6f34e7df70408adc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a669efcb2ed113493634c0e7d8"`);
        await queryRunner.query(`DROP TABLE "categories_promotions"`);
        await queryRunner.query(`DROP TABLE "inventories"`);
        await queryRunner.query(`DROP TABLE "variation_options"`);
        await queryRunner.query(`DROP TABLE "variations"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "promotions"`);
        await queryRunner.query(`CREATE INDEX "IDX_a89bd51c8d5b29c8b344da255c" ON "products" ("product_type") `);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
