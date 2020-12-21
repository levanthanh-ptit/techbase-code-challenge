import { Provider } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { User } from '../../domains/models/user.model';
import { PostgresProvider } from '../providers/postgres.providers';

export const UserRepositoryBindingKey = 'UserRepository';

export type UserRepository = Repository<User>;

export const userRepository: Provider<typeof User> = {
  provide: UserRepositoryBindingKey,
  useFactory: (postgresProvider: PostgresProvider) =>
    postgresProvider.getRepository(User),
  inject: [PostgresProvider],
};
