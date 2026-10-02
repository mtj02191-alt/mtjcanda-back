import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVolunteerApplicationDto, UpdateVolunteerApplicationDto } from './dto/volunteer-application.dto.js';
import { VolunteerApplication } from './entities/volunteer-application.entity.js';

@Injectable()
export class VolunteerApplicationsService {
  constructor(@InjectRepository(VolunteerApplication) private readonly repository: Repository<VolunteerApplication>) {}

  async findAll() {
    try {
      const records = await this.repository.find({ order: { createdAt: 'DESC' } });
      console.log('[VolunteerApplicationsService] Listed volunteer applications', { count: records.length });
      return records;
    } catch (error) {
      console.error('[VolunteerApplicationsService] Failed to list volunteer applications', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.getRecordOrThrow(id);
      console.log('[VolunteerApplicationsService] Retrieved volunteer application', { id });
      return record;
    } catch (error) {
      console.error('[VolunteerApplicationsService] Failed to retrieve volunteer application', { id, error });
      throw error;
    }
  }

  async create(dto: CreateVolunteerApplicationDto) {
    try {
      const email = dto.email.trim().toLowerCase();
      const phoneNumber = dto.phoneNumber.replace(/\D/g, '');
      const duplicateQuery = this.repository
        .createQueryBuilder('application')
        .where('LOWER(TRIM(application.email)) = :email', { email });

      if (phoneNumber) {
        duplicateQuery.orWhere(
          "REGEXP_REPLACE(application.phoneNumber, '[^0-9]', '', 'g') = :phoneNumber",
          { phoneNumber },
        );
      }

      const duplicate = await duplicateQuery.getOne();
      if (duplicate) {
        throw new ConflictException('User already exists with this email or contact number.');
      }

      const record = await this.repository.save(this.repository.create(dto));
      console.log('[VolunteerApplicationsService] Created volunteer application', { id: record.id });
      return record;
    } catch (error) {
      console.error('[VolunteerApplicationsService] Failed to create volunteer application', error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateVolunteerApplicationDto) {
    try {
      const record = await this.getRecordOrThrow(id);
      const updatedRecord = await this.repository.save({ ...record, ...dto });
      console.log('[VolunteerApplicationsService] Updated volunteer application', { id });
      return updatedRecord;
    } catch (error) {
      console.error('[VolunteerApplicationsService] Failed to update volunteer application', { id, error });
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const record = await this.getRecordOrThrow(id);
      await this.repository.remove(record);
      console.log('[VolunteerApplicationsService] Deleted volunteer application', { id });
      return { deleted: true };
    } catch (error) {
      console.error('[VolunteerApplicationsService] Failed to delete volunteer application', { id, error });
      throw error;
    }
  }

  private async getRecordOrThrow(id: number) {
    const record = await this.repository.findOneBy({ id });
    if (!record) throw new NotFoundException('Volunteer application not found');
    return record;
  }
}