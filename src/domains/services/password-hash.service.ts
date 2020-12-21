export interface PasswordHashService {
  hash(password: string): string;
  compare(password: string, hashPassword): boolean;
}

export const PasswordHashServiceBindingKey = 'PasswordHashService';
