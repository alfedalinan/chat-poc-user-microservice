import { Table, Column, Model, AutoIncrement, PrimaryKey, DataType, AllowNull } from 'sequelize-typescript'

@Table
export class UserRegister extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId: number

    @AllowNull(false)
    @Column(DataType.STRING)
    registerId: string

    @Column(DataType.STRING)
    ipPort: string

    @Column(DataType.STRING)
    ipAddress: string

    @Column(DataType.DATE)
    expiresAt: string
}