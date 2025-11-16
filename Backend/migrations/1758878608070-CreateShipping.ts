import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShipping1758878608070 implements MigrationInterface {
    name = 'CreateShipping1758878608070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26"`);
        await queryRunner.query(`CREATE TABLE "shipping_zones" ("zoneId" uuid NOT NULL DEFAULT uuid_generate_v4(), "zone_name" character varying(100) NOT NULL, "free_distance" numeric(8,2), "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatesAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8c608d024b1647032f9ddfb045e" PRIMARY KEY ("zoneId"))`);
        await queryRunner.query(`CREATE TYPE "public"."shipping_rates_rate_strategy_enum" AS ENUM('economic', 'express', 'standard')`);
        await queryRunner.query(`CREATE TABLE "shipping_rates" ("rateId" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate_name" character varying(100) NOT NULL, "rate_strategy" "public"."shipping_rates_rate_strategy_enum" NOT NULL, "base_price" numeric(10,2) NOT NULL, "base_distance" numeric(8,2) NOT NULL, "price_per_weight" numeric(10,2), "estimated_devivery_time" integer, "max_distance" numeric(8,2), "max_weight" numeric(8,2), "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatesAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "zone_id" uuid, CONSTRAINT "PK_ec60aea70fcae8cf7a0b329e03b" PRIMARY KEY ("rateId"))`);
        await queryRunner.query(`CREATE TABLE "shipping_distance_tiers" ("tierId" uuid NOT NULL DEFAULT uuid_generate_v4(), "min_distance" numeric(8,2) NOT NULL, "max_distance" numeric(8,2), "tier_price" numeric(10,2) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "tier_order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "shipping_rate_id" uuid, CONSTRAINT "PK_e775daf96a8cb782660f37dc070" PRIMARY KEY ("tierId"))`);
        await queryRunner.query(`ALTER TABLE "shipping_rates" ADD CONSTRAINT "FK_815ef893e8b41030146099282ac" FOREIGN KEY ("zone_id") REFERENCES "shipping_zones"("zoneId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping_distance_tiers" ADD CONSTRAINT "FK_ab1886840840263066985eb8229" FOREIGN KEY ("shipping_rate_id") REFERENCES "shipping_rates"("rateId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26" FOREIGN KEY ("shipping_id") REFERENCES "shipping_zones"("zoneId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26"`);
        await queryRunner.query(`ALTER TABLE "shipping_distance_tiers" DROP CONSTRAINT "FK_ab1886840840263066985eb8229"`);
        await queryRunner.query(`ALTER TABLE "shipping_rates" DROP CONSTRAINT "FK_815ef893e8b41030146099282ac"`);
        await queryRunner.query(`DROP TABLE "shipping_distance_tiers"`);
        await queryRunner.query(`DROP TABLE "shipping_rates"`);
        await queryRunner.query(`DROP TYPE "public"."shipping_rates_rate_strategy_enum"`);
        await queryRunner.query(`DROP TABLE "shipping_zones"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26" FOREIGN KEY ("shipping_id") REFERENCES "shipping"("shippingId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
