import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateContactMessageDto {
  @IsString() @MinLength(1) firstName!: string;
  @IsString() @MinLength(1) lastName!: string;
  @IsOptional() @IsString() contactNumber?: string;
  @IsEmail() email!: string;
  @IsString() @MinLength(1) message!: string;
}
export class UpdateContactMessageDto extends PartialType(CreateContactMessageDto) {}