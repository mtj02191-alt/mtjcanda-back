import { Equals, IsBoolean, IsEmail, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

const currencies = ['PKR', 'USD', 'EUR', 'GBP', 'CAD', 'AED'];

export class CreateDonationIntentDto {
  @IsString() @MinLength(1) campaignId!: string;
  @IsString() @MinLength(1) campaignTitle!: string;
  @IsNumber() @Min(1) @Max(1000000000) amount!: number;
  @IsIn(currencies) currency!: string;
  @IsIn(['once', 'monthly']) frequency!: string;
  @IsOptional() @IsString() designation?: string;
  @IsString() @MinLength(1) firstName!: string;
  @IsString() @MinLength(1) lastName!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() @MaxLength(40) phone?: string;
}

export class CreateDonationReminderDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(1) campaignId!: string;
  @IsString() @MinLength(1) campaignTitle!: string;
}

export class CreateDonationCommentDto {
  @IsString() @MinLength(1) @MaxLength(2000) comment!: string;
  @IsString() @MinLength(1) campaignId!: string;
  @IsString() @MinLength(1) campaignTitle!: string;
}

export class CreateDonationReportDto {
  @IsString() @MinLength(5) @MaxLength(500) reportText!: string;
  @Equals(true) @IsBoolean() confirmed!: boolean;
  @IsString() @MinLength(1) campaignId!: string;
  @IsString() @MinLength(1) campaignTitle!: string;
}