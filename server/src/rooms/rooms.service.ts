import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  createRoom(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAllRooms() {
    return `This action returns all rooms`;
  }
}
