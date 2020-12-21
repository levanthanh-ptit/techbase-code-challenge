import { Inject, Injectable } from '@nestjs/common';
import {
  PasswordHashService,
  PasswordHashServiceBindingKey,
} from '../../domains/services/password-hash.service';
import { User } from '../../domains/models/user.model';

import {
  UserRepository,
  UserRepositoryBindingKey,
} from '../../infrastructure/repositories/user.repository';
import { UserCreator } from '../dtos/user.dtos';

@Injectable()
export class AccountService {
  constructor(
    @Inject(UserRepositoryBindingKey)
    private userRepository: UserRepository,
    @Inject(PasswordHashServiceBindingKey)
    private passwordHashService: PasswordHashService,
  ) {}

  async checkUserExisted({ email }: UserCreator): Promise<boolean> {
    return !!(await this.userRepository.findOne({
      where: {
        email,
      },
    }));
  }

  async buildUser({ email, name, password, role }: UserCreator): Promise<User> {
    return this.userRepository.build({
      email,
      name,
      role,
      hashPassword: this.passwordHashService.hash(password),
    });
  }

  verifiedPassword(user: User, password: string): boolean {
    return this.passwordHashService.compare(password, user.hashPassword);
  }
}
