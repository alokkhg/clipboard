import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SalariedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  salary: number;

  @Column()
  currency: string;

  @Column()
  department: string;

  @Column()
  sub_department: string;

  @Column({
    default: false,
  })
  on_contract: boolean;
}
