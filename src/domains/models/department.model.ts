import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Team } from './team.model';
import { User } from './user.model';

interface IDepartment {
  id: number;
  name: string;
  managerId: number;
}

interface IDepartmentCreator extends Omit<IDepartment, 'id'> {}

@Table
export class Department extends Model implements IDepartment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column
  name: string;

  @ForeignKey(() => User)
  managerId: number;

  @BelongsTo(() => User, {
    foreignKey: 'managerId',
  })
  manager: User;

  @HasMany(() => Team, {
    foreignKey: 'departmentId',
  })
  teams: Array<Team>;
}
