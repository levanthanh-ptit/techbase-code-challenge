import { ApiProperty } from '@nestjs/swagger';
import { BeforeCreate, BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

export interface ICompany {
  id: number;
  name: string;
  directorId: number;
}

@Table
export class Company extends Model implements ICompany {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  directorId: number;

  @BelongsTo(() => User, {
    foreignKey: 'directorId',
  })
  director: User;

  @BeforeCreate
  static async restrictOneCompany() {
    if ((await Company.count()) > 0)
      throw new Error('can_not_create_more_than_one_company');
  }
}
