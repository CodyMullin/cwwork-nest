import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateWorkDto {
  @IsNotEmpty()
  material: string;

  @IsNotEmpty()
  area: number;

  @IsNotEmpty()
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  workCost: string;
}
