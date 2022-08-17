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

@WebSocketGateway(8000)
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly messagesService: MessagesService) {}
    
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('MessagesGateway');
  private room: string = '';

  afterInit(server: Server) {
    this.logger.log('Init success')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.leave(this.room);
    this.room = room;
    client.join(room)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('newMessageToServer')
  handleMessageFromClient(@MessageBody() createMessageDto: CreateMessageDto,
                          @UploadedFile() image): void {
    //creates a new message in database, and sends it to other clients
    const message = this.messagesService.createMessage(createMessageDto, image);
  
    this.wss.to(this.room).emit('newMessageToClientsInRoom', message)
  }
}
