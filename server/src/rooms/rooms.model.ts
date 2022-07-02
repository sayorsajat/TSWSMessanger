import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UserRooms } from "./user-rooms.model";

@Table({tableName: 'rooms'})
export class Room extends Model<Room, CreateRoomDto> {

    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string;

    @BelongsToMany(() => User, () => UserRooms)
    users: User[];
}