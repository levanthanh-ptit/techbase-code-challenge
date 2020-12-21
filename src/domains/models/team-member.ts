import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { Team } from './team.model';
import { User } from './user.model';

export interface ITeamMember {
  teamId: number;
  memberId: number;
}

@Table({
  timestamps: false,
})
export class TeamMember extends Model implements ITeamMember {
  @ForeignKey(() => Team)
  teamId: number;

  @ForeignKey(() => User)
  memberId: number;
}
