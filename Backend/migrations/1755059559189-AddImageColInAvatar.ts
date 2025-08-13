import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageColInAvatar1755059559189 implements MigrationInterface {
    name = 'AddImageColInAvatar1755059559189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatars" ADD "img_url" text array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatars" DROP COLUMN "img_url"`);
    }

}
