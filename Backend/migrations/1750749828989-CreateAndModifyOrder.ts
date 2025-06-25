import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAndModifyOrder1750749828989 implements MigrationInterface {
    name = 'CreateAndModifyOrder1750749828989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."fees_fee_type_enum" AS ENUM('FIXED', 'PERCENTAGE')`);
        await queryRunner.query(`CREATE TABLE "fees" ("feeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fee_name" character varying NOT NULL, "fee_type" "public"."fees_fee_type_enum" NOT NULL, "fee_amount" numeric NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_91f2c864927aee4fa537e06d1c5" PRIMARY KEY ("feeId"))`);
        await queryRunner.query(`CREATE TYPE "public"."vouchers_voucher_type_enum" AS ENUM('PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING')`);
        await queryRunner.query(`CREATE TABLE "vouchers" ("voucherId" uuid NOT NULL DEFAULT uuid_generate_v4(), "voucher_code" character varying NOT NULL, "voucher_type" "public"."vouchers_voucher_type_enum" NOT NULL, "description" character varying NOT NULL, "voucher_value" numeric(10,2) NOT NULL, "min_order_value" numeric(10,2), "max_discount" numeric(10,2), "voucher_limit" integer NOT NULL DEFAULT '1', "voucher_used" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_1445a42f62127bf6cde38b4de47" UNIQUE ("voucher_code"), CONSTRAINT "PK_c9fa7aaaaf8bb9c0c80e4ab8545" PRIMARY KEY ("voucherId"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("orderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_price" numeric NOT NULL, "payment_method" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`CREATE TABLE "orders_vouchers" ("orderVoucherId" uuid NOT NULL DEFAULT uuid_generate_v4(), "appliedDiscount" numeric NOT NULL, "orderId" uuid, "voucher_id" uuid, CONSTRAINT "PK_9e8f9f569849da8db5908601508" PRIMARY KEY ("orderVoucherId"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("orderItemId" uuid NOT NULL DEFAULT uuid_generate_v4(), "unit_price" numeric(10,2) NOT NULL, "total_price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "orderId" uuid, "productId" uuid, CONSTRAINT "PK_4e1bb5fea3ad96dcc899be6cc7d" PRIMARY KEY ("orderItemId"))`);
        await queryRunner.query(`CREATE TABLE "order_status_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "old_status" character varying NOT NULL, "new_status" character varying NOT NULL, "note" character varying, "changed_at" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid, CONSTRAINT "PK_e6c66d853f155531985fc4f6ec8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_fees" ("order_id" uuid NOT NULL, "fee_id" uuid NOT NULL, CONSTRAINT "PK_895cd2af48a680bd1426286122a" PRIMARY KEY ("order_id", "fee_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_36912be2e1c4f8106115d5e44f" ON "orders_fees" ("order_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e6205d75fd130438dd311bede" ON "orders_fees" ("fee_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD "img_url" text array DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stock_quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "reversed_quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "is_signature" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_vouchers" ADD CONSTRAINT "FK_8dd11f21d717c8bb156f703ee3c" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_vouchers" ADD CONSTRAINT "FK_e86503f959361448bc92228a194" FOREIGN KEY ("voucher_id") REFERENCES "vouchers"("voucherId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_status_history" ADD CONSTRAINT "FK_689db3835e5550e68d26ca32676" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_fees" ADD CONSTRAINT "FK_36912be2e1c4f8106115d5e44fd" FOREIGN KEY ("order_id") REFERENCES "orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_fees" ADD CONSTRAINT "FK_5e6205d75fd130438dd311bede8" FOREIGN KEY ("fee_id") REFERENCES "fees"("feeId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_fees" DROP CONSTRAINT "FK_5e6205d75fd130438dd311bede8"`);
        await queryRunner.query(`ALTER TABLE "orders_fees" DROP CONSTRAINT "FK_36912be2e1c4f8106115d5e44fd"`);
        await queryRunner.query(`ALTER TABLE "order_status_history" DROP CONSTRAINT "FK_689db3835e5550e68d26ca32676"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`ALTER TABLE "orders_vouchers" DROP CONSTRAINT "FK_e86503f959361448bc92228a194"`);
        await queryRunner.query(`ALTER TABLE "orders_vouchers" DROP CONSTRAINT "FK_8dd11f21d717c8bb156f703ee3c"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "is_signature"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "reversed_quantity"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock_quantity"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e6205d75fd130438dd311bede"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36912be2e1c4f8106115d5e44f"`);
        await queryRunner.query(`DROP TABLE "orders_fees"`);
        await queryRunner.query(`DROP TABLE "order_status_history"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "orders_vouchers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "vouchers"`);
        await queryRunner.query(`DROP TYPE "public"."vouchers_voucher_type_enum"`);
        await queryRunner.query(`DROP TABLE "fees"`);
        await queryRunner.query(`DROP TYPE "public"."fees_fee_type_enum"`);
    }

}
