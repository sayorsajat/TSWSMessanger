import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from '../auth/auth.module';
import { Room } from '../rooms/rooms.model';
import { RoomsModule } from '../rooms/rooms.module';
import { UserRooms } from '../rooms/user-rooms.model';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserRooms]),
    RoomsModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
