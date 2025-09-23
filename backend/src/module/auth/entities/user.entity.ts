import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { userRoles } from '../../../common/utils/enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({ unique: true })
  username: string;
  @Column({ select: false })
  password: string;
  @Column({ unique: true })
  email: string;

  @Column({ default: true, select: false })
  isActive: boolean;
  @Column({ type: 'enum', enum: userRoles, default: 'user' })
  rol: userRoles;
}
