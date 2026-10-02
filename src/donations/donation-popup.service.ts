import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateDonationCommentDto,
  CreateDonationIntentDto,
  CreateDonationReminderDto,
  CreateDonationReportDto,
} from './dto/donation-popup.dto.js';
import { DonationComment } from './entities/donation-comment.entity.js';
import { DonationIntent } from './entities/donation-intent.entity.js';
import { DonationReminder } from './entities/donation-reminder.entity.js';
import { DonationReport } from './entities/donation-report.entity.js';

@Injectable()
export class DonationPopupService {
  constructor(
    @InjectRepository(DonationIntent) private readonly intentRepository: Repository<DonationIntent>,
    @InjectRepository(DonationReminder) private readonly reminderRepository: Repository<DonationReminder>,
    @InjectRepository(DonationComment) private readonly commentRepository: Repository<DonationComment>,
    @InjectRepository(DonationReport) private readonly reportRepository: Repository<DonationReport>,
  ) {}

  async createIntent(dto: CreateDonationIntentDto) {
    try {
      const email = dto.email.trim().toLowerCase();
      const phoneNumber = dto.phone?.replace(/\D/g, '');
      const duplicateQuery = this.intentRepository
        .createQueryBuilder('donationIntent')
        .where('LOWER(TRIM(donationIntent.email)) = :email', { email });

      if (phoneNumber) {
        duplicateQuery.orWhere(
          "REGEXP_REPLACE(COALESCE(donationIntent.phone, ''), '[^0-9]', '', 'g') = :phoneNumber",
          { phoneNumber },
        );
      }

      const duplicate = await duplicateQuery.getOne();
      if (duplicate) {
        throw new ConflictException('User already exists with this email or contact number.');
      }

      const record = await this.intentRepository.save(this.intentRepository.create({
        ...dto,
        amount: dto.amount.toString(),
        email: dto.email.trim().toLowerCase(),
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        phone: dto.phone?.trim() || undefined,
      }));
      console.log('[DonationPopupService] Recorded pending donation intent', { id: record.id });
      return record;
    } catch (error) {
      console.error('[DonationPopupService] Failed to record donation intent', error);
      throw error;
    }
  }

  async createReminder(dto: CreateDonationReminderDto) {
    try {
      const record = await this.reminderRepository.save(this.reminderRepository.create({
        ...dto,
        email: dto.email.trim().toLowerCase(),
      }));
      console.log('[DonationPopupService] Recorded donation reminder', { id: record.id });
      return record;
    } catch (error) {
      console.error('[DonationPopupService] Failed to record donation reminder', error);
      throw error;
    }
  }

  async createComment(dto: CreateDonationCommentDto) {
    try {
      const record = await this.commentRepository.save(this.commentRepository.create({
        ...dto,
        comment: dto.comment.trim(),
      }));
      console.log('[DonationPopupService] Recorded donation comment', { id: record.id });
      return record;
    } catch (error) {
      console.error('[DonationPopupService] Failed to record donation comment', error);
      throw error;
    }
  }

  async createReport(dto: CreateDonationReportDto) {
    try {
      const record = await this.reportRepository.save(this.reportRepository.create({
        ...dto,
        reportText: dto.reportText.trim(),
      }));
      console.log('[DonationPopupService] Recorded donation report', { id: record.id });
      return record;
    } catch (error) {
      console.error('[DonationPopupService] Failed to record donation report', error);
      throw error;
    }
  }
}