import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * This feature is not in use but would useful for next phase.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const acceptedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!acceptedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // TODO: get auth header => get user
    const currentUser = request.currentUser;
    return !!acceptedRoles.find(v => v === currentUser.role);
  }
}
