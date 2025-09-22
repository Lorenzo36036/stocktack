import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { userRoles } from '../../../common/utils/enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'enum', enum: userRoles, default: 'user' })
  rol: userRoles;
}
