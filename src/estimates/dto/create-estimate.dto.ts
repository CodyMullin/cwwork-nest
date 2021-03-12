import { IsNotEmpty } from 'class-validator';

export class CreateEstimateDto {
  @IsNotEmpty()
  customerName: string;
}
