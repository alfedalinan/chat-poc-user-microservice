import { Table, Column, Model, AutoIncrement, PrimaryKey, DataType, Unique, AllowNull } from 'sequelize-typescript'

@Table
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    username: string

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string
}