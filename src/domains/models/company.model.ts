import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

export interface ICompany {
  id: number;
  name: string;
  directorId: number;
}

export type ICompanyCreator = Pick<ICompany, 'directorId' | 'name'>;

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
}
