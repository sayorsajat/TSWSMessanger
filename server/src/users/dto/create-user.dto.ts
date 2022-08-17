import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator'

export class CreateUserDto {
    
    @ApiProperty({example: 'XxPredatorxX', description: "user's nickname"})
    @IsString({message: "must be a string"})
    @Length(3, 18, {message: "must be longer than 3 characters and shorter than 18"})
    userName: string;

    @ApiProperty({example: '12345678', description: 'password'})
    @IsString({message: "must be a string"})
    @Length(8, 24, {message: "must be longer than 8 characters and shorter than 24"})
    password: string;
}
