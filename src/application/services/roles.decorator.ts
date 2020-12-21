import { SetMetadata } from '@nestjs/common';

/**
 * This feature is not in use
 */
export const Roles = (...args: string[]) => SetMetadata('roles', args);
