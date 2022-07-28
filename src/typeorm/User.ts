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
  @Column({
    nullable: false,
    type: "enum",
    enum: ["admin", "user", "supervisor", "guest"],
    default: "guest"
  })
  role: string;
  @Column({
    nullable: false
  })
  password: string;
  @Column()
  salt: string;
}