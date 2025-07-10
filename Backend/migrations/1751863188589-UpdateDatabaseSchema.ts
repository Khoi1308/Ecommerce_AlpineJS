import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabaseSchema1751863188589 implements MigrationInterface {
    name = 'UpdateDatabaseSchema1751863188589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_0d8590e0dce4c4284f733692279"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_de08738901be6b34d2824a1e243"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "parent_category_id" TO "product_attribure"`);
        await queryRunner.query(`CREATE TABLE "shipping" ("shippingId" uuid NOT NULL DEFAULT uuid_generate_v4(), "shipping_name" character varying(50) NOT NULL, "shipping_price" numeric(10,2) NOT NULL, CONSTRAINT "PK_7bb53fc029bd38a48d26ffefce5" PRIMARY KEY ("shippingId"))`);
        await queryRunner.query(`CREATE TABLE "clothing_attributes" ("clothingId" uuid NOT NULL DEFAULT uuid_generate_v4(), "clothing_size" character varying(10) NOT NULL, "clothing_color" character varying(50) NOT NULL, "clothing_material" character varying(50) NOT NULL, "product_id" uuid, CONSTRAINT "PK_72b9cd04e5254a22c77763f3311" PRIMARY KEY ("clothingId"))`);
        await queryRunner.query(`CREATE TABLE "book_attributes" ("bookId" uuid NOT NULL DEFAULT uuid_generate_v4(), "book_title" character varying(255) NOT NULL, "book_pages" integer NOT NULL DEFAULT '0', "publish_date" date NOT NULL, "product_id" uuid, CONSTRAINT "PK_82059196c9f28acea26ace447e6" PRIMARY KEY ("bookId"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_address"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_id" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "product_attribure" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26" FOREIGN KEY ("shipping_id") REFERENCES "shipping"("shippingId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clothing_attributes" ADD CONSTRAINT "FK_4adc6cee6212403019a58d94325" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_attributes" ADD CONSTRAINT "FK_a7e4d9ac829fec2d459db238a54" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_attributes" DROP CONSTRAINT "FK_a7e4d9ac829fec2d459db238a54"`);
        await queryRunner.query(`ALTER TABLE "clothing_attributes" DROP CONSTRAINT "FK_4adc6cee6212403019a58d94325"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "product_attribure" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_address" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" uuid`);
        await queryRunner.query(`DROP TABLE "book_attributes"`);
        await queryRunner.query(`DROP TABLE "clothing_attributes"`);
        await queryRunner.query(`DROP TABLE "shipping"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "product_attribure" TO "parent_category_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_de08738901be6b34d2824a1e243" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_0d8590e0dce4c4284f733692279" FOREIGN KEY ("order_address") REFERENCES "addresses"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
