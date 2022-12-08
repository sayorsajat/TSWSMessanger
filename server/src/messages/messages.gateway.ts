import { 
  WebSocketGateway,
   SubscribeMessage,
   MessageBody,
   OnGatewayInit,
   WsResponse,
   OnGatewayConnection,
   OnGatewayDisconnect,
   WebSocketServer
 } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { HttpException, HttpStatus, Logger, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Socket, Server } from 'socket.io'
import { JwtAuthGuard } from '../auth/auth.guard';
import { JwtWsAuthGuard } from '../auth/auth.ws.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthWsFakeware } from '../auth/auth.ws.fakeware';

interface IJoinRoomDto {
  roomId: string
  authorization: string
}

@WebSocketGateway(8000, {cors: "localhost:3000"})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly messagesService: MessagesService,
              private readonly fakewareService: AuthWsFakeware) {}
    
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('MessagesGateway');
  private room: string = 'global';

  afterInit(server: Server) {
    this.logger.log('Init success');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.join(this.room);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: IJoinRoomDto) {
    client.leave(this.room);
    this.room = data.roomId;
    client.join(data.roomId);
  }

  // @MessageBody() createMessageDto: CreateMessageDto,
  //                         @UploadedFile() image
  // @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('newMessageToServer')
  // @UseInterceptors(FileInterceptor('image'))
  handleMessageFromClient(client: Socket, data: any): void {
    //creates a new message in database, and sends it to other clients
    this.logger.log(data.formData);
    if(this.fakewareService.isLegitWSMessage(data.formData)) {
      const message = this.messagesService.createMessage(data.formData, data.image);
      
      message.then(data => {
        this.wss.to(this.room).emit('newMessageToClientsInRoom', data);
      })
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
