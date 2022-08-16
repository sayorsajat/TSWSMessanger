import { IsString } from 'class-validator'

export class CreateRoomDto {

    @IsString({message: "must be a string"})
    id: string;
}
