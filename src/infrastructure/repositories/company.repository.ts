import { Provider } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Company } from '../../domains/models/company.model';
import { PostgresProvider } from '../providers/postgres.providers';

export const CompanyRepositoryBindingKey = 'TamRepository';

export type CompanyRepository = Repository<Company>;

export const companyRepository: Provider<CompanyRepository> = {
  provide: CompanyRepositoryBindingKey,
  useFactory: (postgresProvider: PostgresProvider) =>
    postgresProvider.getRepository(Company),
  inject: [PostgresProvider],
};
