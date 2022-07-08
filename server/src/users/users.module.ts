import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Room } from 'src/rooms/rooms.model';
import { UserRooms } from 'src/rooms/user-rooms.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Room, UserRooms])
  ],
  exports: [UsersService]
})
export class UsersModule {}
