import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { EstimateStatus } from '../estimate-status.enum';

export class GetEstimateFilterDto {
  @IsOptional()
  @IsIn([
    EstimateStatus.ACCEPTED,
    EstimateStatus.PENDING,
    EstimateStatus.REJECTED,
  ])
  active: EstimateStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
