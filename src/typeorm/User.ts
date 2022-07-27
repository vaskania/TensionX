import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: ""
  })
  email: string;
  @Column()
  role: string;
  @Column()
  password: string;
  @Column()
  salt: string;
}