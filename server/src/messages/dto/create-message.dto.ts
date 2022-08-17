import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator'

export class CreateMessageDto {

    @ApiProperty({example: 'Hello World!', description: "content of the message"})
    @IsString({message: "must be a string"})
    @Length(1, 2000, {message: "must not be empty and smaller than 2000 characters"})
    content: string;

    @ApiProperty({example: 'global', description: "room's id"})
    @IsString({message: "must be a string"})
    @Length(1, 20, {message: "must not be empty and longer than 20 characters"})
    roomId: string;

    @ApiProperty({example: 'XxPredatorxX', description: "user's nickname"})
    @IsString({message: "must be a string"})
    //there you need to put existing user, so "too long" should be enough
    @Length(1, 18, {message: "must not be empty and too long"})
    userName: string;
}