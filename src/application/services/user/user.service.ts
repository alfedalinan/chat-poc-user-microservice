import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../../entities'
import { UserDto } from '../../dtos'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async create(userDto: UserDto): Promise<User> {
        let data: any = userDto
        const created = await this.userModel.build(data).save()
        const result = await this.userModel.findOne({
            where: {
                id: created.id
            }
        })

        return result ? result.get() : null
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.findAll()
    }

    async findOne(id: number) {
        const result = await this.userModel.findOne({
            where: {
                id
            }
        })

        return result ? result.get() : null
    }

    async update(id: number, userDto: UserDto): Promise<[affectedCount: number]> {
        let data: any = userDto
        return await this.userModel.update(data, {
            where: {
                id
            }
        })
    }

    async remove(id: number): Promise<number> {
        return await this.userModel.destroy({
            where: {
                id
            }
        })
    }
}
