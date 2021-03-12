import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  salesCost: string;

  @IsNotEmpty()
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  purchaseCost: string;

  @IsNotEmpty()
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  installCost: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  measurement: string;
}
