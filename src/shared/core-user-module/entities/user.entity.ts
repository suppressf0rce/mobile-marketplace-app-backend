import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Role } from './role.entity';

/** This is a TypeScript class representing a User entity with various properties and relationships. */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false, nullable: false })
  isEmailVerified: boolean;

  @Column({ default: false, nullable: false })
  isAccountSuspended: boolean;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];
}
