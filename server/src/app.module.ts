import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Room } from "./rooms/rooms.model";
import { RoomsModule } from "./rooms/rooms.module";
import { UserRooms } from "./rooms/user-rooms.model";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { MicroserviceModule } from './microservice/microservice.module';

@Module({
    imports: [
        UsersModule,
        RoomsModule,
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Room, UserRooms],
            autoLoadModels: true
        }),
        AuthModule,
        MicroserviceModule,
    ]
})
export class AppModule {
    
}

