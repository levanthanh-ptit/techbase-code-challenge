import { Module } from '@nestjs/common';
import { PostgresProvider } from './providers/postgres.providers';
import { userRepository } from './repositories/user.repository';
import { BcryptPasswordProvider } from './providers/bcrypt-password.provider';
import { teamRepository } from './repositories/team.repository';
import { departmentRepository } from './repositories/department.repository';
import { companyRepository } from './repositories/company.repository';
import { teamMemberRepository } from './repositories/team-member.repository';

@Module({
  providers: [
    PostgresProvider,
    BcryptPasswordProvider,
    userRepository,
    companyRepository,
    departmentRepository,
    teamRepository,
    teamMemberRepository,
  ],
  exports: [
    PostgresProvider,
    BcryptPasswordProvider,
    userRepository,
    companyRepository,
    departmentRepository,
    teamRepository,
    teamMemberRepository,
  ],
})
export class InfrastructureModule {}
