import { ApiProperty } from '@nestjs/swagger';
import { IDepartmentCreator } from '../../domains/models/department.model';

export class DepartmentCreator implements IDepartmentCreator {
  @ApiProperty()
  name: string;

  @ApiProperty()
  managerId: number;
}
