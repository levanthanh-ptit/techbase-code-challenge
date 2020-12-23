import { ApiProperty } from '@nestjs/swagger';
import { ITeamMember } from '../../domains/models/team-member';
import { ITeamCreator } from '../../domains/models/team.model';

export class TeamCreator implements ITeamCreator {
  @ApiProperty()
  name: string;
}

export class TeamMemberCreator implements ITeamMember {
  @ApiProperty()
  teamId: number;

  @ApiProperty()
  memberId: number;
}
