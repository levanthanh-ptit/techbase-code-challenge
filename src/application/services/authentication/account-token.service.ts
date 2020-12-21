import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { User } from '../../../domains/models/user.model';
import { UserCredential } from '../../dtos/user.dtos';

@Injectable()
export class AccountTokenService {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async verifyToken(token?: string): Promise<User> {
    if (!token) {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const userCredential = this.jwtService.verify<UserCredential>(token);
      return this.authService.verifyCredentials(userCredential);
    } catch {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }
  }

  generateToken(credential: UserCredential): string {
    return this.jwtService.sign(credential);
  }
}
