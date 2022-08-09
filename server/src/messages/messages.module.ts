import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [MessagesGateway, MessagesService],
  controllers: [MessagesController],
  imports: [
    SequelizeModule.forFeature([Message]),
    FilesModule,
    JwtModule
  ]
})
export class MessagesModule {}
