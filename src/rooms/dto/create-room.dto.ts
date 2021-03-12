import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  work: string;

  @IsNotEmpty()
  @IsString({ each: true })
  materials: string[];
}
