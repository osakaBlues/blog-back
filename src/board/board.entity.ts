import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';

/**
 * Post Entity
 * @param id primary key
 * @param title
 * @param content
 * @param date
 * @param user
 * @param category
 */
@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  date: Date;
  @Column()
  updated_date: Date;
  @ManyToOne(() => User, (user) => user.board, { eager: true })
  user: User;
  @ManyToOne(() => Category, (category) => category.board, { eager: true })
  category: Category;
}
