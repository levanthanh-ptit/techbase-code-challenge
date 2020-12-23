import { Body, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import {
  CompanyRepository,
  CompanyRepositoryBindingKey,
} from '../../infrastructure/repositories/company.repository';
import { CompanyCreator } from '../dtos/company.dtos';

@Controller('company')
@ApiTags('company')
@ApiBearerAuth()
export class CompanyController {
  constructor(
    @Inject(CompanyRepositoryBindingKey)
    private companyRepository: CompanyRepository,
  ) {}

  @Post()
  @ApiBody({
    type: CompanyCreator,
  })
  async create(@Body() body: CompanyCreator) {
    const count = await this.companyRepository.count();
    if (count > 0)
      throw new HttpException('restrict_one_company', HttpStatus.BAD_REQUEST);
    return this.companyRepository.create(body);
  }
}
