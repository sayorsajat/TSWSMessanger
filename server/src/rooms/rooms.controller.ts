import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateUserRoomDto } from './dto/create-user-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  createUserRoom(@Body() createUserRoomDto: CreateUserRoomDto) {
    return this.roomsService.createUserRoom(createUserRoomDto);
  }

  @Get('/:userId')
  findAllUserRooms(@Param('userId') userId: string) {
    return this.roomsService.findAllUserRooms(userId);
  }
}
