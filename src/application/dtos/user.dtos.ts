import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from '../../domains/models/user.model';

export class UserCreator extends PickType(User, [
  'email',
  'name',
  'role',
] as const) {
  @ApiProperty()
  password: string;
}

export class UserPublicData extends PickType(User, [
  'id',
  'email',
  'name',
  'role',
]) {}

export class UserWithToken extends UserPublicData {
  @ApiProperty()
  token: string;
}

export class UserCredential {
  id: number;
}

export class BasicLogin {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
