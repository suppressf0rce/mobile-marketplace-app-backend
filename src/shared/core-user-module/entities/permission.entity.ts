import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/** This is a TypeScript class representing a Permission entity with an id and a unique name column. */
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;
}
