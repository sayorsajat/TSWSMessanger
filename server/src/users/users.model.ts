import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Room } from "../rooms/rooms.model";
import { UserRooms } from "../rooms/user-rooms.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Table({tableName: 'users'})
export class User extends Model<User, CreateUserDto> {

    @ApiProperty({example: '1', description: 'unique identifier for users'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'XxPredatorxX', description: "user's nickname"})
    @Column({type: DataType.STRING, unique: true, primaryKey: true, allowNull: false})
    userName: string;

    @ApiProperty({example: '12345678', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: '["global", "local"]', description: 'array of rooms that user has joined'})
    @BelongsToMany(() => Room, () => UserRooms)
    rooms: Room[];
}