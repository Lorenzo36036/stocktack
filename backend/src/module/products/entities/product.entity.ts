import { User } from '@/module/user/entity/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
