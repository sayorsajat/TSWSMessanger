import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "src/rooms/rooms.model";
import { User } from "src/users/users.model";
import { CreateMessageDto } from "./dto/create-message.dto";

@Table({tableName: 'messages'})
export class Message extends Model<Message, CreateMessageDto> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => Room)
    @Column({type: DataType.STRING, allowNull: false})
    roomId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: false})
    userName: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    img: string;
}