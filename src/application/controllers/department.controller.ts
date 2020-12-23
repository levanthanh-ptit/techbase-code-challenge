import { Body, Inject, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import {
  DepartmentRepository,
  DepartmentRepositoryBindingKey,
} from '../../infrastructure/repositories/department.repository';
import {
  TeamRepositoryBindingKey,
  TeamRepository,
} from '../../infrastructure/repositories/team.repository';
import { DepartmentCreator } from '../dtos/department.dtos';
import { TeamCreator } from '../dtos/team.dtos';

@Controller('department')
@ApiTags('department')
@ApiBearerAuth()
export class DepartmentController {
  constructor(
    @Inject(DepartmentRepositoryBindingKey)
    private departmentRepository: DepartmentRepository,
    @Inject(TeamRepositoryBindingKey)
    private teamRepository: TeamRepository,
  ) {}

  @Post()
  @ApiBody({
    type: DepartmentCreator,
  })
  async create(@Body() body: DepartmentCreator) {
    return this.departmentRepository.create(body);
  }

  @Post('/:id/team')
  @ApiBody({
    type: TeamCreator,
  })
  async createTeam(
    @Param('id') departmentId: number,
    @Body() body: TeamCreator,
  ) {
    return this.teamRepository.create({
      ...body,
      departmentId,
    });
  }
}
