import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdmin1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO roles (id, role_name, description)
      VALUES (
        '11111111-1111-1111-1111-111111111111',
        'admin',
        'Administrador del sistema'
      )
      ON CONFLICT (role_name) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO users (id, email, password, name, is_active)
      VALUES (
        '22222222-2222-2222-2222-222222222222',
        'admin@example.com',
        '$scrypt$ln=17,r=8,p=1$tXmcJ1asc5dnWHQ5fM3jNQ$phaLeC8FgOO/1J5UXTONV4tHY4LlvqVBrDmhnQF+8S0',
        'Administrador',
        true
      )
      ON CONFLICT (email) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO users_roles (user_id, role_id)
      VALUES (
        '22222222-2222-2222-2222-222222222222',
        '11111111-1111-1111-1111-111111111111'
      )
      ON CONFLICT DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users WHERE email = 'admin@example.com';
    `);
    await queryRunner.query(`
      DELETE FROM roles WHERE role_name = 'admin';
    `);
  }
}