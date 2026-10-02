import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('donation_reminders')
export class DonationReminder {
  @PrimaryGeneratedColumn() id!: number;
  @Column() email!: string;
  @Column({ name: 'campaign_id' }) campaignId!: string;
  @Column({ name: 'campaign_title' }) campaignTitle!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}