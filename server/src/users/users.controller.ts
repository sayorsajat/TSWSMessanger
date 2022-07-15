import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/nickname/:userName')
  findUserByName(@Param('userName') userName: string) {
    return this.usersService.findUserByName(userName);
  }
}
