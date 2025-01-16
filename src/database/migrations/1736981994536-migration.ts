import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736981994536 implements MigrationInterface {
    name = 'Migration1736981994536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lighting_ad" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "brand" text NOT NULL, "price" text NOT NULL, "gallery" text NOT NULL, "createdById" integer, "categoryId" integer, CONSTRAINT "PK_278a2888e5e3cd363dc56873787" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text NOT NULL, "type" text NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adFavourites" ("lightingAdId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_79167d29748436c919cff6671cf" PRIMARY KEY ("lightingAdId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5a905df78f14799e3dee7145ea" ON "adFavourites" ("lightingAdId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78b4b2f3ad7c50ee89681c3917" ON "adFavourites" ("userId") `);
        await queryRunner.query(`ALTER TABLE "lighting_ad" ADD CONSTRAINT "FK_96dcd596b683b0bfc6888216585" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lighting_ad" ADD CONSTRAINT "FK_1cc8e32880e317fa80702739d48" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adFavourites" ADD CONSTRAINT "FK_5a905df78f14799e3dee7145ea1" FOREIGN KEY ("lightingAdId") REFERENCES "lighting_ad"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "adFavourites" ADD CONSTRAINT "FK_78b4b2f3ad7c50ee89681c39170" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adFavourites" DROP CONSTRAINT "FK_78b4b2f3ad7c50ee89681c39170"`);
        await queryRunner.query(`ALTER TABLE "adFavourites" DROP CONSTRAINT "FK_5a905df78f14799e3dee7145ea1"`);
        await queryRunner.query(`ALTER TABLE "lighting_ad" DROP CONSTRAINT "FK_1cc8e32880e317fa80702739d48"`);
        await queryRunner.query(`ALTER TABLE "lighting_ad" DROP CONSTRAINT "FK_96dcd596b683b0bfc6888216585"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78b4b2f3ad7c50ee89681c3917"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a905df78f14799e3dee7145ea"`);
        await queryRunner.query(`DROP TABLE "adFavourites"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "lighting_ad"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
