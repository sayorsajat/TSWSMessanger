import * as dotenv from "dotenv"
dotenv.config({path: __dirname + `../.${process.env.NODE_ENV}.env`})

import { forwardRef, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from "../config.service";
import { AuthWsFakeware } from "./auth.ws.fakeware";
//configService.get<string>("envFilePath")
const configService: ConfigService = new ConfigService();
const secKey = configService.privateKey;

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthWsFakeware],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: String(secKey) || "SECRET_KEY",
      privateKey: String(secKey),
      publicKey: "SECRET_KEY",
      signOptions: {
        expiresIn: '12h'
      },
    }),
  ],
  exports: [
    AuthWsFakeware,
    AuthService,
    JwtModule,
  ]
})

export class AuthModule {}
