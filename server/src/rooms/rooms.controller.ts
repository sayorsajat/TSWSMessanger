import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateUserRoomDto } from './dto/create-user-room.dto';
import { Room } from './rooms.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({summary: "Creates User_Room relationship in db"})
  @ApiResponse({status: 200, type: Room})
  @Post()
  createUserRoom(@Body() createUserRoomDto: CreateUserRoomDto) {
    return this.roomsService.createUserRoom(createUserRoomDto);
  }

  @ApiOperation({summary: "Finds every room that specific user is member of"})
  @ApiResponse({status: 200, type: Array<Room>})
  @Get('/:userId')
  findAllUserRooms(@Param('userId') userId: string) {
    return this.roomsService.findAllUserRooms(userId);
  }
}
