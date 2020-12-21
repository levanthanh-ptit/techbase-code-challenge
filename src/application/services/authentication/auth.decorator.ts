import { SetMetadata } from '@nestjs/common';

export const AUTH_METADATA_KEY = 'AUTH_METADATA_KEY';

export type AuthRequirementMetadata = 'AUTHENTICATED' | 'SKIP';
export const AUTHENTICATED = 'AUTHENTICATED';
export const SKIP = 'SKIP';

export const Auth = (...args: AuthRequirementMetadata[]) =>
  SetMetadata(AUTH_METADATA_KEY, args);
