import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageRepository: typeof Message,
              private readonly filesService: FilesService) {}

  async findAll(createRoomDto: CreateRoomDto): Promise<Message[]> {
    const messages = await this.messageRepository.findAll({where: {roomId: createRoomDto.id}});
    return messages
  }

  async createMessage(createMessageDto: CreateMessageDto, image: any): Promise<Message> {
    let fileName = null;
    if (image !== null && image !== undefined) {
      fileName = (await this.filesService.createJpgFile(image.buffer)).toString();
    }
    const message = await this.messageRepository.create({...createMessageDto, image: fileName});
    return message
  }
}
