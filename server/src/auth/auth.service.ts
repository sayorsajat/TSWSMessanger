import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) { }

    async generateToken(user: User) {
        const payload = {id: user.id, userName: user.userName, rooms: user.rooms}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async register(createUserDto: CreateUserDto) {
        const candidate = await this.userService.findUserByName(createUserDto.userName);
        if (candidate) {
            throw new HttpException('User already registered', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const user = await this.userService.createUser({...createUserDto, password: hashPassword})
        return this.generateToken(user)
    }


    async validateUser(createUserDto: CreateUserDto) {
        const user = await this.userService.findUserByName(createUserDto.userName);
        const passwordEquals = await bcrypt.compare(createUserDto.password, user.password)
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Invalid password or nickname'})
    }

    async login(createUserDto: CreateUserDto) {
        const user = await this.validateUser(createUserDto)
        return this.generateToken(user)    
    }
}
