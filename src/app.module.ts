import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import entities from "./typeorm";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: parseFloat(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "root_db",
      entities,
      synchronize: true
    }),
    UserModule
  ]
})
export class AppModule {
}
