import { ApiProperty } from '@nestjs/swagger';
import { ICompanyCreator } from '../../domains/models/company.model';

export class CompanyCreator implements ICompanyCreator {
  @ApiProperty()
  directorId: number;

  @ApiProperty()
  name: string;
}
