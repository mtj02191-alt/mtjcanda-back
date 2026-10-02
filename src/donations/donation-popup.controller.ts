import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateDonationCommentDto,
  CreateDonationIntentDto,
  CreateDonationReminderDto,
  CreateDonationReportDto,
} from './dto/donation-popup.dto.js';
import { DonationPopupService } from './donation-popup.service.js';

@ApiTags('donations')
@Controller('donation-popup')
export class DonationPopupController {
  constructor(private readonly service: DonationPopupService) {}

  @Post('intents') createIntent(@Body() dto: CreateDonationIntentDto) {
    return this.service.createIntent(dto);
  }

  @Post('reminders') createReminder(@Body() dto: CreateDonationReminderDto) {
    return this.service.createReminder(dto);
  }

  @Post('comments') createComment(@Body() dto: CreateDonationCommentDto) {
    return this.service.createComment(dto);
  }

  @Post('reports') createReport(@Body() dto: CreateDonationReportDto) {
    return this.service.createReport(dto);
  }
}