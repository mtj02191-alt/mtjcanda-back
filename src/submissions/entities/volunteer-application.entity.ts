import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('volunteer_applications')
export class VolunteerApplication {
  @PrimaryGeneratedColumn() id!: number;
  @Column() email!: string;
  @Column({ name: 'first_name' }) firstName!: string;
  @Column({ name: 'last_name' }) lastName!: string;
  @Column({ name: 'phone_number' }) phoneNumber!: string;
  @Column() age!: string;
  @Column() location!: string;
  @Column('text', { array: true }) expertise!: string[];
  @Column({ name: 'other_expertise_text', default: '' }) otherExpertiseText!: string;
  @Column('text', { array: true }) availability!: string[];
  @Column({ name: 'how_did_you_hear', default: '' }) howDidYouHear!: string;
  @Column({ name: 'other_hear_text', default: '' }) otherHearText!: string;
  @Column() consent!: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt!: Date;
}