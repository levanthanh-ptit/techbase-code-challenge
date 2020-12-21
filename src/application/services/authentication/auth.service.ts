import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domains/models/user.model';
import {
  UserRepository,
  UserRepositoryBindingKey,
} from '../../../infrastructure/repositories/user.repository';
import { UserCredential } from '../../dtos/user.dtos';

export type WithToken<T> = T & { token: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryBindingKey)
    private userRepository: UserRepository,
  ) {}

  async verifyCredentials({ id }: UserCredential): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user)
      throw new HttpException('account_not_found', HttpStatus.NOT_FOUND);
    return user;
  }
}
