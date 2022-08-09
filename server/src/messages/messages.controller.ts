import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { devEndpointGuard } from 'src/guards/devEndpoint.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/findAll')
  findAll(@Body() roomId: number) {
    return this.messagesService.findAll(roomId)
  }

  //endpoint for development
  //is the same as handleMessageFromClient in gateway
  @UseGuards(devEndpointGuard)
  @Post('/newMessageToServer')
  @UseInterceptors(FileInterceptor('image'))
  handleMessageFromClient(@Body() createMessageDto: CreateMessageDto,
                          @UploadedFile() image): Promise<Message> {
    //creates a new message in database, and sends it to other clients
    const message = this.messagesService.createMessage(createMessageDto, image);
  
    return message
  }
}
