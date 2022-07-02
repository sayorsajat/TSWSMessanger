import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CreateUserDto } from "./dto/create-user.dto";

@Table({tableName: 'users'})
export class User extends Model<User, CreateUserDto> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, primaryKey: true, allowNull: false})
    userName: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}