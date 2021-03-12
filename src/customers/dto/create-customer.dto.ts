import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  email: string;

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
