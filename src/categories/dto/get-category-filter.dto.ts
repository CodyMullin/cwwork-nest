import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryStatus } from '../category-status.enum';

export class GetCategoryFilterDto {
  @IsOptional()
  @IsIn([CategoryStatus.ACTIVE, CategoryStatus.INACTIVE])
  active: CategoryStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
