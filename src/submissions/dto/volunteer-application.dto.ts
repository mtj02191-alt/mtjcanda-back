import { PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateVolunteerApplicationDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(1) firstName!: string;
  @IsString() @MinLength(1) lastName!: string;
  @IsString() @MinLength(1) phoneNumber!: string;
  @IsString() @MinLength(1) age!: string;
  @IsString() @MinLength(1) location!: string;
  @IsArray() @IsString({ each: true }) expertise!: string[];
  @IsOptional() @IsString() otherExpertiseText?: string;
  @IsArray() @IsString({ each: true }) availability!: string[];
  @IsOptional() @IsString() howDidYouHear?: string;
  @IsOptional() @IsString() otherHearText?: string;
  @IsString() @MinLength(1) consent!: string;
}
export class UpdateVolunteerApplicationDto extends PartialType(CreateVolunteerApplicationDto) {}