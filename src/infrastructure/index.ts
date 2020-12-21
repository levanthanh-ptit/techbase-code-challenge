import { Module } from '@nestjs/common';
import { PostgresProvider } from './providers/postgres.providers';
import { userRepository } from './repositories/user.repository';
import { BcryptPasswordProvider } from './providers/bcrypt-password.provider';

@Module({
  providers: [PostgresProvider, BcryptPasswordProvider, userRepository],
  exports: [PostgresProvider, BcryptPasswordProvider, userRepository],
})
export class InfrastructureModule {}
