import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "src/rooms/rooms.model";
import { User } from "src/users/users.model";

@Table({tableName: 'user_rooms', createdAt: false, updatedAt: false})
export class UserRooms extends Model<UserRooms> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Room)
    @Column({type: DataType.STRING, allowNull: false})
    roomId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: string;
}