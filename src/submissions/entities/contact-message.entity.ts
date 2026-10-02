import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: 'first_name' }) firstName!: string;
  @Column({ name: 'last_name' }) lastName!: string;
  @Column({ name: 'contact_number', nullable: true }) contactNumber?: string;
  @Column() email!: string;
  @Column('text') message!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}