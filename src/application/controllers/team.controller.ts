import { Body, Delete, Inject, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import {
  TeamMemberRepository,
  TeamMemberRepositoryBindingKey,
} from '../../infrastructure/repositories/team-member.repository';
import { TeamCreator, TeamMemberCreator } from '../dtos/team.dtos';

@Controller('team')
@ApiTags('team')
@ApiBearerAuth()
export class TeamController {
  constructor(
    @Inject(TeamMemberRepositoryBindingKey)
    private teamMemberRepository: TeamMemberRepository,
  ) {}

  @Post(':id/member')
  @ApiBody({
    type: TeamMemberCreator,
  })
  async addMember(@Param('id') id: number, @Body() body: TeamCreator) {
    return this.teamMemberRepository.create(body);
  }

  @Delete(':id/member/:memberId')
  async removeMember(
    @Param('id') teamId: number,
    @Param('memberId') memberId: number,
  ) {
    return this.teamMemberRepository.destroy({
      where: {
        teamId,
        memberId,
      },
    });
  }
}
