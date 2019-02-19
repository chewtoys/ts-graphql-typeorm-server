import bcrypt from 'bcryptjs';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  googleId: string;

  @Column('varchar', { length: 100, nullable: false })
  username: string;

  @Column('varchar', { length: 255, nullable: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('boolean', { default: false })
  confirmed: boolean;

  @Column('boolean', { default: false })
  resetPasswordLocked: boolean;

  @BeforeInsert()
  async hashPasswordBeforeInser() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
