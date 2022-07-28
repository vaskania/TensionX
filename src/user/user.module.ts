import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CryptoModule } from "../utils/crypto.module";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../typeorm";
import { GuardModule } from "../guard/guard.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CryptoModule,
    AuthModule,
    GuardModule
  ],
  controllers: [UserController],
  providers: [UserService]
})

export class UserModule {
}