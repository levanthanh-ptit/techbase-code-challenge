import { Provider } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';

import { TeamMember } from '../../domains/models/team-member';
import { PostgresProvider } from '../providers/postgres.providers';

export const TeamMemberRepositoryBindingKey = 'TeamMemberRepository';

export type TeamMemberRepository = Repository<TeamMember>;

export const teamMemberRepository: Provider<typeof TeamMember> = {
  provide: TeamMemberRepositoryBindingKey,
  useFactory: (postgresProvider: PostgresProvider) =>
    postgresProvider.getRepository(TeamMember),
  inject: [PostgresProvider],
};
