import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// export type UserRoleType = "admin" | "user" | "supervisor" | "guest"

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
    type: "enum",
    enum: ["admin", "user", "supervisor", "guest"],
    default: "guest"
  })
  role: string;
  @Column()
  password: string;
  @Column()
  salt: string;
}