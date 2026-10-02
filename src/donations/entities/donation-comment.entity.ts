import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('donation_comments')
export class DonationComment {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: 'campaign_id' }) campaignId!: string;
  @Column({ name: 'campaign_title' }) campaignTitle!: string;
  @Column('text') comment!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}