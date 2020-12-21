import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Department } from './department.model';
import { TeamMember } from './team-member';
import { User } from './user.model';

export type ITeam = {
  id: number;
  name: string;
  departmentId: number;
};

export type TeamCreator = Omit<ITeam, 'id'>;

@Table
export class Team extends Model implements ITeam {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column
  name: string;

  @ForeignKey(() => Department)
  departmentId: number;

  @BelongsTo(() => Department, {
    foreignKey: 'departmentId',
  })
  department: Department;

  @BelongsToMany(() => User, {
    through: () => TeamMember,
    as: 'members',
    foreignKey: 'teamId',
    otherKey: 'memberId',
  })
  members: Array<User & { TeamMember: TeamMember }>;
}
