import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { MaterialStatus } from '../material-status.enum';

export class GetMaterialFilterDto {
  @IsOptional()
  @IsIn([MaterialStatus.ACTIVE, MaterialStatus.INACTIVE])
  active: MaterialStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
