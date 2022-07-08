import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({where: {id: id}});
    return user
  }

  async findUserByName(userName: string) {
    const user = await this.userRepository.findOne({where: {userName: userName}});
    return user
  }
}
