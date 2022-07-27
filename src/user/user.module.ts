import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CryptoModule } from "../utils/crypto.module";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User]),CryptoModule, AuthModule],
  controllers: [UserController],
  providers: [UserService]
})

export class UserModule {
}