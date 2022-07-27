import { HashPassword } from "./crypto";
import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [HashPassword],
  exports: [HashPassword]
})
export class CryptoModule {
}