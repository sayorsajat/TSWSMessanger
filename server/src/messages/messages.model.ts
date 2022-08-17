import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "../rooms/rooms.model";
import { User } from "../users/users.model";
import { MessageCreationAttrs } from "./types/create-message.type4model";


@Table({tableName: 'messages'})
export class Message extends Model<Message, MessageCreationAttrs> {

    @ApiProperty({example: '1', description: 'unique identifier for message'})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Hello world!', description: 'content of the message'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: 'global', description: 'what room does the message belong to'})
    @ForeignKey(() => Room)
    @Column({type: DataType.STRING, allowNull: false})
    roomId: string;

    @ApiProperty({example: 'XxPredatorxX', description: 'author of the message'})
    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: false})
    userName: string;

    @ApiProperty({example: '8652ae40-ca77-48b5-8bb3-05afe7c92340.jpg', description: 'image url'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    image: string;
}