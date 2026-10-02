import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('donation_intents')
export class DonationIntent {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: 'campaign_id' }) campaignId!: string;
  @Column({ name: 'campaign_title' }) campaignTitle!: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount!: string;
  @Column({ length: 3 }) currency!: string;
  @Column({ length: 16 }) frequency!: string;
  @Column({ nullable: true }) designation?: string;
  @Column({ name: 'first_name' }) firstName!: string;
  @Column({ name: 'last_name' }) lastName!: string;
  @Column() email!: string;
  @Column({ nullable: true }) phone?: string;
  @Column({ default: 'pending' }) status!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}