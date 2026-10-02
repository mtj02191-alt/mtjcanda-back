import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateNewsletterSubscriptionDto, UpdateNewsletterSubscriptionDto } from './dto/newsletter-subscription.dto.js';
import { NewsletterSubscription } from './entities/newsletter-subscription.entity.js';

@Injectable()
export class NewsletterSubscriptionsService {
  constructor(@InjectRepository(NewsletterSubscription) private readonly repository: Repository<NewsletterSubscription>) {}

  async findAll() {
    try {
      const records = await this.repository.find({ order: { createdAt: 'DESC' } });
      console.log('[NewsletterSubscriptionsService] Listed newsletter subscriptions', { count: records.length });
      return records;
    } catch (error) {
      console.error('[NewsletterSubscriptionsService] Failed to list newsletter subscriptions', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.getRecordOrThrow(id);
      console.log('[NewsletterSubscriptionsService] Retrieved newsletter subscription', { id });
      return record;
    } catch (error) {
      console.error('[NewsletterSubscriptionsService] Failed to retrieve newsletter subscription', { id, error });
      throw error;
    }
  }

  async create(dto: CreateNewsletterSubscriptionDto) {
    try {
      const email = dto.email.trim().toLowerCase();
      const duplicate = await this.repository
        .createQueryBuilder('subscription')
        .where('LOWER(TRIM(subscription.email)) = :email', { email })
        .getOne();

      if (duplicate) {
        throw new ConflictException('User already exists with this email.');
      }

      const record = await this.repository.save(this.repository.create({ ...dto, optIn: dto.optIn ?? true }));
      console.log('[NewsletterSubscriptionsService] Created newsletter subscription', { id: record.id });
      return record;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        const conflict = new ConflictException('User already exists with this email.');
        console.error('[NewsletterSubscriptionsService] Failed to create newsletter subscription', conflict);
        throw conflict;
      }
      console.error('[NewsletterSubscriptionsService] Failed to create newsletter subscription', error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateNewsletterSubscriptionDto) {
    try {
      const record = await this.getRecordOrThrow(id);
      const updatedRecord = await this.repository.save({ ...record, ...dto });
      console.log('[NewsletterSubscriptionsService] Updated newsletter subscription', { id });
      return updatedRecord;
    } catch (error) {
      console.error('[NewsletterSubscriptionsService] Failed to update newsletter subscription', { id, error });
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const record = await this.getRecordOrThrow(id);
      await this.repository.remove(record);
      console.log('[NewsletterSubscriptionsService] Deleted newsletter subscription', { id });
      return { deleted: true };
    } catch (error) {
      console.error('[NewsletterSubscriptionsService] Failed to delete newsletter subscription', { id, error });
      throw error;
    }
  }

  private async getRecordOrThrow(id: number) {
    const record = await this.repository.findOneBy({ id });
    if (!record) throw new NotFoundException('Newsletter subscription not found');
    return record;
  }
}