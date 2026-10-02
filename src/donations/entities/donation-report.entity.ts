import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('donation_reports')
export class DonationReport {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: 'campaign_id' }) campaignId!: string;
  @Column({ name: 'campaign_title' }) campaignTitle!: string;
  @Column({ name: 'report_text', type: 'text' }) reportText!: string;
  @Column() confirmed!: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}