import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { CreateUserRoomDto } from "./dto/create-user-room.dto";
import { Room } from "./rooms.model";

@Table({tableName: 'user_rooms', createdAt: false, updatedAt: false})
export class UserRooms extends Model<UserRooms, CreateUserRoomDto> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Room)
    @Column({type: DataType.STRING, allowNull: false})
    roomId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
}