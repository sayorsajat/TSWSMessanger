import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './rooms.model';
import { User } from 'src/users/users.model';
import { UserRooms } from './user-rooms.model';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Room, User, UserRooms])
  ]
})
export class RoomsModule {}
