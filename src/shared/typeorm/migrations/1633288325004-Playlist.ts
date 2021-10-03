import { MigrationInterface, QueryRunner } from 'typeorm';

export class Playlist1633288325004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS playlists (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                owner INT NOT NULL,
                created_by INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                FOREIGN KEY(owner) REFERENCES users (id),
                FOREIGN KEY(created_by) REFERENCES users (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS playlists;
        `);
    }
}
