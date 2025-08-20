import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePaymentSchema1755640957982 implements MigrationInterface {
    name = 'UpdatePaymentSchema1755640957982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_items" ("cartItemId" uuid NOT NULL DEFAULT uuid_generate_v4(), "item_quantity" integer NOT NULL DEFAULT '0', "unit_price" numeric(10,2) NOT NULL, "is_selected" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatesAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cartCartId" uuid, "inventoryInventoryId" uuid, CONSTRAINT "PK_9066a7c9058632f82cb918c67c0" PRIMARY KEY ("cartItemId"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_fc581a724674e5937cf792832a0" FOREIGN KEY ("cartCartId") REFERENCES "carts"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_18260d24b75f96136fb890a567e" FOREIGN KEY ("inventoryInventoryId") REFERENCES "inventories"("inventoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_18260d24b75f96136fb890a567e"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_fc581a724674e5937cf792832a0"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
    }

}
