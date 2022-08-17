import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UserRooms } from "./user-rooms.model";

@Table({tableName: 'rooms'})
export class Room extends Model<Room, CreateRoomDto> {

    @ApiProperty({example: '1', description: 'unique identifier for rooms'})
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({description: 'array of users who are members of this room'})
    @BelongsToMany(() => User, () => UserRooms)
    users: User[];
}