import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateUserRoomDto } from './dto/creat-user-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateUserRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get('/:userId')
  findAllUserRooms(@Param('userId') userId: string) {
    return this.roomsService.findAllUserRooms(userId);
  }
}
