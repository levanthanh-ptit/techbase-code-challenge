import { Provider } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Department } from '../../domains/models/department.model';
import { PostgresProvider } from '../providers/postgres.providers';

export const DepartmentRepositoryBindingKey = 'DepartmentRepository';

export type DepartmentRepository = Repository<Department>;

export const departmentRepository: Provider<typeof Department> = {
  provide: DepartmentRepositoryBindingKey,
  useFactory: (postgresProvider: PostgresProvider) =>
    postgresProvider.getRepository(Department),
  inject: [PostgresProvider],
};
