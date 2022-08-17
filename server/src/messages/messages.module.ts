import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

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
