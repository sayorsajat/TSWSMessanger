import { IsString, IsNumber } from 'class-validator'

export class CreateUserRoomDto {

    @IsString({message: "must be a string"})
    id: string;

    @IsNumber({}, {message: "must be a number"})
    userId: number;
}
