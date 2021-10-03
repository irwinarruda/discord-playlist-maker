import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlaylistColumn1633293286977 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE playlists
            ADD COLUMN is_active BOOLEAN DEFAULT true;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE playlists
            DROP COLUMN is_active;
        `);
    }
}
