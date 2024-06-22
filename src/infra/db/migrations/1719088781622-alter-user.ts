import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUser1719088781622 implements MigrationInterface {
    name = 'AlterUser1719088781622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
