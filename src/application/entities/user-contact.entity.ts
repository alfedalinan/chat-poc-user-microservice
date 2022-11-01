import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, BelongsTo, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { User } from './user.entity'

@Table
export class UserContact extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number

    @AllowNull(false)
    @Column(DataType.INTEGER)
    contactId: number

    @Column(DataType.STRING)
    displayFirstName: string

    @Column(DataType.STRING)
    displayLastName: string

    @BelongsTo(() => User)
    user: User
}