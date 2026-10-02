import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationComment } from './entities/donation-comment.entity.js';
import { DonationIntent } from './entities/donation-intent.entity.js';
import { DonationReminder } from './entities/donation-reminder.entity.js';
import { DonationReport } from './entities/donation-report.entity.js';
import { DonationPopupController } from './donation-popup.controller.js';
import { DonationPopupService } from './donation-popup.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([DonationIntent, DonationReminder, DonationComment, DonationReport])],
  controllers: [DonationPopupController],
  providers: [DonationPopupService],
})
export class DonationPopupModule {}