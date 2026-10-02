import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactMessageDto, UpdateContactMessageDto } from './dto/contact-message.dto.js';
import { ContactMessage } from './entities/contact-message.entity.js';

@Injectable()
export class ContactMessagesService {
  constructor(@InjectRepository(ContactMessage) private readonly repository: Repository<ContactMessage>) {}

  async findAll() {
    try {
      const records = await this.repository.find({ order: { createdAt: 'DESC' } });
      console.log('[ContactMessagesService] Listed contact messages', { count: records.length });
      return records;
    } catch (error) {
      console.error('[ContactMessagesService] Failed to list contact messages', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.getRecordOrThrow(id);
      console.log('[ContactMessagesService] Retrieved contact message', { id });
      return record;
    } catch (error) {
      console.error('[ContactMessagesService] Failed to retrieve contact message', { id, error });
      throw error;
    }
  }

  async create(dto: CreateContactMessageDto) {
    try {
      const email = dto.email.trim().toLowerCase();
      const contactNumber = dto.contactNumber?.replace(/\D/g, '');
      const duplicateQuery = this.repository
        .createQueryBuilder('contactMessage')
        .where('LOWER(TRIM(contactMessage.email)) = :email', { email });

      if (contactNumber) {
        duplicateQuery.orWhere(
          "REGEXP_REPLACE(contactMessage.contactNumber, '[^0-9]', '', 'g') = :contactNumber",
          { contactNumber },
        );
      }

      const duplicate = await duplicateQuery.getOne();
      if (duplicate) {
        throw new ConflictException('User already exists with this email or contact number.');
      }

      const record = await this.repository.save(this.repository.create(dto));
      console.log('[ContactMessagesService] Created contact message', { id: record.id });
      return record;
    } catch (error) {
      console.error('[ContactMessagesService] Failed to create contact message', error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateContactMessageDto) {
    try {
      const record = await this.getRecordOrThrow(id);
      const updatedRecord = await this.repository.save({ ...record, ...dto });
      console.log('[ContactMessagesService] Updated contact message', { id });
      return updatedRecord;
    } catch (error) {
      console.error('[ContactMessagesService] Failed to update contact message', { id, error });
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const record = await this.getRecordOrThrow(id);
      await this.repository.remove(record);
      console.log('[ContactMessagesService] Deleted contact message', { id });
      return { deleted: true };
    } catch (error) {
      console.error('[ContactMessagesService] Failed to delete contact message', { id, error });
      throw error;
    }
  }

  private async getRecordOrThrow(id: number) {
    const record = await this.repository.findOneBy({ id });
    if (!record) throw new NotFoundException('Contact message not found');
    return record;
  }
}