import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { InfrastructureModule } from './infrastructure';
import {
  AuthService,
  AuthProvider,
  AccountTokenService,
} from './application/services/authentication';
import { AccountService } from './application/services/account.service';
import { UserController } from './application/controllers/user.controller';
import { SeedingService } from './application/services/seeding.service';
import { TeamController } from './application/controllers/team.controller';
import { CompanyController } from './application/controllers/company.controller';
import { DepartmentController } from './application/controllers';

/**
 * Main module contain current context
 */
@Module({
  imports: [
    InfrastructureModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'TechBaseCodeChallenge',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    UserController,
    CompanyController,
    DepartmentController,
    TeamController,
  ],
  providers: [
    AuthService,
    AccountTokenService,
    AuthProvider,
    AccountService,
    SeedingService,
  ],
})
export class AppModule {}
