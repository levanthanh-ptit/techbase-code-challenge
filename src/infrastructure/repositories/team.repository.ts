import { Provider } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Team } from '../../domains/models/team.model';
import { PostgresProvider } from '../providers/postgres.providers';

export const TeamRepositoryBindingKey = 'TamRepository';

export type TeamRepository = Repository<Team>;

export const teamRepository: Provider<typeof Team> = {
  provide: TeamRepositoryBindingKey,
  useFactory: (postgresProvider: PostgresProvider) =>
    postgresProvider.getRepository(Team),
  inject: [PostgresProvider],
};
