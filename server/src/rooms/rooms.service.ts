import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserRoomDto } from './dto/create-user-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.model';
import { UserRooms } from './user-rooms.model';

@Injectable()
export class RoomsService {

  constructor(@InjectModel(Room) private roomRepository: typeof Room,
              @InjectModel(UserRooms) private userRoomsRepository: typeof UserRooms
  
  ) {}

  async createUserRoom(createUserRoomDto: CreateUserRoomDto) {
    const room = await this.roomRepository.create(Object(createUserRoomDto.id))
    await this.userRoomsRepository.create(createUserRoomDto)
    return room
  }

  async findAllUserRooms(userId) {
    const rooms = await this.userRoomsRepository.findAll({where: {userId: userId}});
    return rooms
  }
}
