import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Provider,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccountTokenService } from './account-token.service';
import {
  AuthRequirementMetadata,
  AUTH_METADATA_KEY,
  SKIP,
} from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountTokenService: AccountTokenService,
  ) {}

  /**
   * @description Get credentials from request.
   * @param request Node request object.
   */
  extractCredentials(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) return null;
    return authHeader.split(' ')[1] ?? null;
  }

  async authenticate(request: Request): Promise<boolean> {
    const token = this.extractCredentials(request);
    const currentUser = await this.accountTokenService.verifyToken(token);
    // inject CurrentUser to request context
    (request as any).currentUser = currentUser.get();
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authRequirements = this.reflector.get<AuthRequirementMetadata[]>(
      AUTH_METADATA_KEY,
      context.getHandler(),
    );
    if (!authRequirements || authRequirements.find(re => re === SKIP)) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    return await this.authenticate(request);
  }
}

export const AuthProvider: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
