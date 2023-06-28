import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("notifications")
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sourceName: string;

  @Column()
  sourceEmail: string;

  @Column()
  targetName: string;

  @Column()
  targetEmail: string;

  @Column()
  message: string;

  @Column()
  status: string;

  @Column()
  pendency: string;

  @Column()
  read: boolean;

  @Column()
  createdAt: Date;
}
