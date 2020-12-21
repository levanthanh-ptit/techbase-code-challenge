import { Provider } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import {
  PasswordHashService,
  PasswordHashServiceBindingKey,
} from '../../domains/services/password-hash.service';

class BcryptPasswordService implements PasswordHashService {
  private salt: string;
  private saltRoundNumber: number;
  constructor() {
    this.saltRoundNumber = +process.env.PASSWORD_SALT_ROUND ?? 10;
    this.salt = genSaltSync(this.saltRoundNumber);
  }

  hash(password: string): string {
    return hashSync(password, this.salt);
  }
  compare(password: string, hashPassword: any): boolean {
    return compareSync(password, hashPassword);
  }
}

export const BcryptPasswordProvider: Provider = {
  provide: PasswordHashServiceBindingKey,
  useClass: BcryptPasswordService,
};
