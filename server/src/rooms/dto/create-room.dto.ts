import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator'

export class CreateRoomDto {

    @ApiProperty({example: 'global', description: "room's id"})
    @IsString({message: "must be a string"})
    id: string;
}
