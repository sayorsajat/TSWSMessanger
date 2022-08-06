import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageRepository: typeof Message) {}

  async findAll(roomId): Promise<Message[]> {
    const messages = await this.messageRepository.findAll({where: {roomId}});
    return messages
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = await this.messageRepository.create(createMessageDto);
    return message
  }
}
