import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async register(createUserDto: CreateUserDto) {
        const candidate = await this.userService.findUserByName(createUserDto.userName);
    }
    async login(createUserDto: CreateUserDto) {
        throw new Error('Method not implemented.');
    }
}
