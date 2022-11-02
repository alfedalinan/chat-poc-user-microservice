import { Table, Column, Model, AutoIncrement, PrimaryKey, DataType, Unique, AllowNull, HasMany } from 'sequelize-typescript'
import { UserContact } from './user-contact.entity'

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

    @Column(DataType.STRING)
    firstName: string

    @Column(DataType.STRING)
    lastName: string

    @HasMany(() => UserContact)
    userContacts: UserContact[]
}