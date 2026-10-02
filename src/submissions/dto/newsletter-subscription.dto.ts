import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNewsletterSubscriptionDto {
  @IsString() @MinLength(1) firstName!: string;
  @IsString() @MinLength(1) lastName!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsBoolean() optIn?: boolean;
}
export class UpdateNewsletterSubscriptionDto extends PartialType(CreateNewsletterSubscriptionDto) {}