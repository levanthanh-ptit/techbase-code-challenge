import { Op, OperatorsAliases } from 'sequelize';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../domains/models/user.model';
import { Department } from '../../domains/models/department.model';
import { Team } from '../../domains/models/team.model';
import { TeamMember } from '../../domains/models/team-member';
import { Company } from '../../domains/models/company.model';

const operatorsAliases = Object.keys(Op).reduce<OperatorsAliases>(
  (accumulator, cur) => {
    accumulator[`$${cur}`] = Op[cur];
    return accumulator;
  },
  {},
);

@Injectable()
export class PostgresProvider extends Sequelize implements OnModuleInit {
  constructor() {
    super({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT ?? 5432,
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'dev_db',
      operatorsAliases: operatorsAliases,
      repositoryMode: true,
      logging: true,
    });
    this.addModels([User, Department, Team, TeamMember, Company]);
  }
  async onModuleInit() {
    await super.sync({
      force: process.env.AUTO_DROP_DB === 'true',
      alter: true,
    });
  }
}
