import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/findAll')
  findAll(@Body() roomId: number) {
    return this.messagesService.findAll(roomId)
  }
}
