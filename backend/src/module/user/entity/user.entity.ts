import { Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { userRoles } from '../../../common/utils/enum';
import { Product } from './../../products/entities/product.entity';

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
  @Column({
    type: 'enum',
    enum: userRoles,
    default: [userRoles.user],
    array: true,
  })
  roles: userRoles[];

  @OneToMany(() => Product, (product) => product.user, { cascade: true })
  products: Product[];
}
