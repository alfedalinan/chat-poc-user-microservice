import { Table, Column, Model, AutoIncrement, PrimaryKey, DataType, Unique, AllowNull, Default, Sequelize } from 'sequelize-typescript'

@Table
export class User extends Model {
    @Column(DataType.INTEGER)
    @AutoIncrement
    @PrimaryKey
    id: number

    @Column
    @AllowNull(false)
    username: string

    @Column(DataType.STRING)
    @AllowNull(false)
    @Unique
    email: string

    @Column(DataType.STRING)
    @AllowNull(false)
    password: string
}