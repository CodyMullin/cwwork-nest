import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { CustomerStatus } from '../customer-status.enum';

export class GetCustomerFilterDto {
  @IsOptional()
  @IsIn([CustomerStatus.ACTIVE, CustomerStatus.INACTIVE])
  active: CustomerStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
