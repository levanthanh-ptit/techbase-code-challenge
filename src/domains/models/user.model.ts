import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { TeamMember } from './team-member';
import { Team } from './team.model';

export enum Role {
  User = 'USER',
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: Role;
  hashPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreator
  extends Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  indexes: [
    {
      fields: ['email'],
    },
  ],
})
export class User extends Model implements IUser {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  @Column
  email!: string;

  @ApiProperty()
  @Column
  name!: string;

  @ApiProperty()
  @Column
  role!: Role;

  @ApiProperty()
  @Exclude()
  @Column
  hashPassword!: string;

  @ApiProperty()
  public readonly createdAt!: Date;

  @ApiProperty()
  public readonly updatedAt!: Date;

  @BelongsToMany(() => Team, {
    through: () => TeamMember,
    as: 'joinedTeams',
    foreignKey: 'memberId',
    otherKey: 'teamId',
  })
  joinedTeams: Array<Team & { TeamMember: TeamMember }>;

  getUserPublicData() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toJSON() {
    return this.getUserPublicData();
  }
}
