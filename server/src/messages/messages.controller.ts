import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { devEndpointGuard } from '../guards/devEndpoint.guard';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({summary: "Finds all messages in specific room"})
  @ApiResponse({status: 200, type: Array<Message>, description: "Array of messages from specific room"})
  @UseGuards(JwtAuthGuard)
  @Post('/findAll')
  findAll(@Body() createRoomDto: CreateRoomDto) {
    return this.messagesService.findAll(createRoomDto)
  }

  //endpoint for development
  //is the same as handleMessageFromClient in gateway
  @ApiOperation({summary: "Creates new message"})
  @ApiResponse({status: 200, type: Message, description: "Message object"})
  @UseGuards(devEndpointGuard, JwtAuthGuard)
  @Post('/newMessageToServer')
  @UseInterceptors(FileInterceptor('image'))
  handleMessageFromClient(@Body() createMessageDto: CreateMessageDto,
                          @UploadedFile() image): Promise<Message> {
    //creates a new message in database, and sends it to other clients
    const message = this.messagesService.createMessage(createMessageDto, image);
  
    return message
  }
}
