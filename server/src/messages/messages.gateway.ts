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
import { Logger, UploadedFile, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io'
import { JwtAuthGuard } from '../auth/auth.guard';
import { JwtWsAuthGuard } from '../auth/auth.ws.guard';

interface IJoinRoomDto {
  roomId: string
  authorization: string
}

@WebSocketGateway(8000, {cors: "localhost:3000"})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly messagesService: MessagesService) {}
    
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
    this.logger.log(this.room);
    client.join(data.roomId);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('newMessageToServer')
  handleMessageFromClient(@MessageBody() createMessageDto: CreateMessageDto,
                          @UploadedFile() image): void {
    //creates a new message in database, and sends it to other clients
    const message = this.messagesService.createMessage(createMessageDto, image);
    this.logger.log(this.room);
    message.then(data => {
      this.wss.to(this.room).emit('newMessageToClientsInRoom', data);
    })
  }
}
