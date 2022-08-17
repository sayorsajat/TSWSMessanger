import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator'

export class CreateUserRoomDto {

    @ApiProperty({example: 'global', description: "room's id"})
    @IsString({message: "must be a string"})
    roomId: string;

    @ApiProperty({example: '1', description: "user's id"})
    @IsNumber({}, {message: "must be a number"})
    userId: number;
}
