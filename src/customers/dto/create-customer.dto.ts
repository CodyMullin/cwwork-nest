import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  @IsString({ each: true })
  email: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  phoneNumber: string[];

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  reference: string;

  @IsNotEmpty()
  preference: string;
}
