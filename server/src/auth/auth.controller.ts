import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'User authentication'})
  @ApiResponse({status: 200, description: 'Existing user\'s token'})
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({summary: 'User registration'})
  @ApiResponse({status: 200, description: 'Created user\'s token'})
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
