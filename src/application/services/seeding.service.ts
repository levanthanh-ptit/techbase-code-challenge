import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Role } from '../../domains/models/user.model';
import {
  PasswordHashServiceBindingKey,
  PasswordHashService,
} from '../../domains/services/password-hash.service';
import { PostgresProvider } from '../../infrastructure/providers/postgres.providers';

import {
  UserRepository,
  UserRepositoryBindingKey,
} from '../../infrastructure/repositories/user.repository';

@Injectable()
export class SeedingService implements OnApplicationBootstrap {
  constructor(
    @Inject(UserRepositoryBindingKey)
    private userRepository: UserRepository,
    private postgres: PostgresProvider,
    @Inject(PasswordHashServiceBindingKey)
    private passwordHashService: PasswordHashService,
  ) {}

  async onApplicationBootstrap() {
    try {
      const now = DateTime.local().toISO();
      const password = '123456';
      const hashPassword = this.passwordHashService.hash(password);

      await this.postgres.query(`
      drop procedure if exists seed_users;
      CREATE PROCEDURE seed_users()
      language plpgsql
      as $$
      declare
      n integer:= 1;
      begin
        loop
          exit when n > 1500;
          INSERT INTO "Users" ("id", "email", "name", "role", "hashPassword", "createdAt", "updatedAt")
          VALUES (DEFAULT, concat(n, '@gmail.com'), 'Thanh Le', '${Role.User}', '${hashPassword}', '${now}', '${now}');
          n := n + 1;
        end loop;
      end;$$;
      call seed_users();
      `);
    } catch (e) {
      console.log(e);
    }
  }
}
