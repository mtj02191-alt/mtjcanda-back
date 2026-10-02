import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('newsletter_subscriptions')
export class NewsletterSubscription {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: 'first_name' }) firstName!: string;
  @Column({ name: 'last_name' }) lastName!: string;
  @Column({ unique: true }) email!: string;
  @Column({ default: false }) optIn!: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}