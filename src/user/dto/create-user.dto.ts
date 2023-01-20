import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsCurrency()
  salary: string;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  department: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  on_contract: string;

  @ApiProperty()
  @IsString()
  sub_department: string;
}
