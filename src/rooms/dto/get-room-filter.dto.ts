import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetRoomFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
